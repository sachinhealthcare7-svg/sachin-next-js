import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "A short excerpt is required"],
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    author: {
      type: String,
      trim: true,
      default: "SK Healthcare",
    },
    category: {
      type: String,
      trim: true,
      default: "General Health",
    },
    tags: {
      type: [String],
      default: [],
    },

    // ---------- SEO / AEO / GEO fields ----------
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
      default: "",
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    keywords: {
      type: [String],
      default: [],
    },
    readTime: {
      type: Number, // in minutes, auto-calculated on save
      default: 1,
    },
  },
  { timestamps: true }
);

// Auto-calculate estimated read time (~200 words/minute) whenever content changes
BlogSchema.pre("save", function (next) {
  if (this.isModified("content")) {
    const wordCount = this.content.trim().split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);