import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
    excerpt: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    tags: {
      type: [String],
      default: [],
    },
    featuredImage: {
      type: String,
      default: "",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title before saving
PostSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  
  // Auto-generate excerpt if empty
  if (!this.excerpt && this.body) {
    this.excerpt = this.body.substring(0, 150).trim() + "...";
  }
  
  next();
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
