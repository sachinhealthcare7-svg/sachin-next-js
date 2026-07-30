import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

// GET /api/products -> public, returns all products
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products -> admin only (enforced by middleware.js)
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.description || body.price === undefined) {
      return NextResponse.json(
        { success: false, message: "Name, description and price are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const product = await Product.create({
      name: body.name.trim(),
      description: body.description.trim(),
      price: Number(body.price),
      category: body.category?.trim() || "General",
      image: body.image?.trim() || "",
      stock: body.stock !== undefined ? Number(body.stock) : 0,
    });

    return NextResponse.json(
      { success: true, message: "Product added", data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}