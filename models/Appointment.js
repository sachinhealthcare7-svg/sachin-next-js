import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
    },
    date: {
      type: String, // stored as "YYYY-MM-DD" from <input type="date">
      required: [true, "Appointment date is required"],
    },
    time: {
      type: String, // stored as "HH:mm" from <input type="time">
      required: [true, "Appointment time is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: 100,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
      maxlength:100,
    },
    disease: {
      type: String,
      required: [true, "Please describe your health concern"],
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Prevents "OverwriteModelError" during Next.js hot reload in development
export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);