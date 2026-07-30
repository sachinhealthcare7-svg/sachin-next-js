import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// GET /api/blogs -> public, returns all blog posts
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Blogs GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/blogs -> admin only (enforced by middleware.js)
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json(
        { success: false, message: "Title, excerpt and content are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const slug = body.slug ? slugify(body.slug) : slugify(body.title);

    const existing = await Blog.findOne({ slug });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const blog = await Blog.create({
      title: body.title.trim(),
      slug: finalSlug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      image: body.image?.trim() || "",
      author: body.author?.trim() || "SK Healthcare",
      category: body.category?.trim() || "General Health",
      tags: body.tags
        ? body.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      metaTitle: body.metaTitle?.trim() || "",
      metaDescription: body.metaDescription?.trim() || "",
      keywords: body.keywords
        ? body.keywords.split(",").map((k) => k.trim()).filter(Boolean)
        : [],
    });

    return NextResponse.json(
      { success: true, message: "Blog published", data: blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blogs POST error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}