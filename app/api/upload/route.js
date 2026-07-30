import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// POST /api/upload -> admin only (enforced by middleware.js)
// Accepts multipart/form-data with a "file" field, uploads it to Cloudinary,
// and returns the resulting hosted image URL.
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file was provided" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "Image must be smaller than 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary's Node SDK expects a base64 data URI for simple uploads
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "sk-healthcare",
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Image upload failed. Please try again." },
      { status: 500 }
    );
  }
}