import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
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
    disease: {
      type: String,
      trim: true,
      default: "",
    },
    doctor: {
      type: String,
      trim: true,
      default: "General Physician",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "scheduled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Consultation ||
  mongoose.model("Consultation", ConsultationSchema);