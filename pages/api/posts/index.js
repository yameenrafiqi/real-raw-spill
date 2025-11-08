import { connectToDatabase } from "../../../lib/mongoose";
import Post from "../../../models/Post";

// Middleware to check admin password
function checkAdminAuth(req) {
  const adminPass = req.headers["x-admin-pass"];
  return adminPass === process.env.ADMIN_PASS;
}

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // Get all published posts
        const posts = await Post.find({ published: true })
          .sort({ createdAt: -1 })
          .lean();
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        // Check admin authentication
        if (!checkAdminAuth(req)) {
          return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        // Prepare post data
        const postData = { ...req.body };
        
        // Generate slug from title
        if (postData.title) {
          postData.slug = postData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }

        // Auto-generate excerpt if empty
        if (!postData.excerpt && postData.body) {
          postData.excerpt = postData.body.substring(0, 150).trim() + "...";
        }

        const post = await Post.create(postData);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "Method not allowed" });
      break;
  }
}
