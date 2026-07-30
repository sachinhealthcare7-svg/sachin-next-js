import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET /api/blogs/[slug] -> public, single blog post
export async function GET(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("Blog GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[slug] -> admin only (enforced by middleware.js)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deleted = await Blog.findOneAndDelete({ slug: params.slug });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("Blog DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}