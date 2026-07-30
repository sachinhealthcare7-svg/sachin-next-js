import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import { sendAdminNotification, sendPatientConfirmation } from "@/lib/mailer";

// Simple server-side validation, in addition to the Mongoose schema rules
function validateBody(body) {
  const errors = {};

  if (!body.name || body.name.trim().length < 2) {
    errors.name = "Please enter your full name";
  }

  if (!body.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!body.phone || !/^[0-9]{10}$/.test(body.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number";
  }

  if (!body.date) {
    errors.date = "Please select a date";
  } else {
    const selected = new Date(body.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.date = "Date cannot be in the past";
    }
  }

  if (!body.time) {
    errors.time = "Please select a time";
  }

  if (!body.city || body.city.trim().length < 2) {
    errors.city = "Please enter your city";
  }

  if (!body.state || body.state.trim().length < 2) {
    errors.state = "Please select your state";
  }

  if (!body.disease || body.disease.trim().length < 3) {
    errors.disease = "Please briefly describe your health concern";
  }

  return errors;
}

// POST /api/appointment  -> create a new appointment
export async function POST(request) {
  try {
    const body = await request.json();

    const errors = validateBody(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    await connectDB();

    const appointment = await Appointment.create({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      date: body.date,
      time: body.time,
      city: body.city.trim(),
      state: body.state.trim(),
      disease: body.disease.trim(),
    });

    // Email notifications are best-effort: if they fail, the booking is
    // still saved and the user still sees a success response.
    try {
      await Promise.all([
        sendAdminNotification(appointment),
        sendPatientConfirmation(appointment),
      ]);
    } catch (emailError) {
      console.error("Appointment email notification error:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        data: appointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Appointment POST error:", error);

    // Mongoose validation error
    if (error.name === "ValidationError") {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/appointment -> list all appointments (for an admin dashboard, etc.)
export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Appointment GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}