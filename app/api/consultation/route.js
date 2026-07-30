import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import { sendAdminNotification } from "@/lib/mailer";

// POST /api/consultation -> public, anyone can submit
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, message: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (!/^[0-9]{10}$/.test(body.phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit phone number" },
        { status: 400 }
      );
    }

    await connectDB();

    const consultation = await Consultation.create({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      disease: body.disease?.trim() || "",
      doctor: body.doctor?.trim() || "General Physician",
      message: body.message?.trim() || "",
    });

    // Reuses the same admin notification template as appointments
    try {
      await sendAdminNotification({
        name: consultation.name,
        email: consultation.email,
        phone: consultation.phone,
        date: "Consultation Request",
        time: consultation.doctor,
        city: "-",
        state: "-",
        disease: `${consultation.disease}${consultation.message ? " — " + consultation.message : ""}`,
      });
    } catch (emailError) {
      console.error("Consultation email error:", emailError);
    }

    return NextResponse.json(
      { success: true, message: "Consultation request received", data: consultation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consultation POST error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET /api/consultation -> used by the admin dashboard
export async function GET() {
  try {
    await connectDB();
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: consultations });
  } catch (error) {
    console.error("Consultation GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}