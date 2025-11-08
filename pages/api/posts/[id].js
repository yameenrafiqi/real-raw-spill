import { connectToDatabase } from "../../../lib/mongoose";
import Post from "../../../models/Post";

// Middleware to check admin password
function checkAdminAuth(req) {
  const adminPass = req.headers["x-admin-pass"];
  return adminPass === process.env.ADMIN_PASS;
}

export default async function handler(req, res) {
  await connectToDatabase();

  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id).lean();
        if (!post) {
          return res.status(404).json({ success: false, error: "Post not found" });
        }
        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        // Check admin authentication
        if (!checkAdminAuth(req)) {
          return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        // Generate slug if title is being updated
        const updateData = { ...req.body };
        if (updateData.title) {
          updateData.slug = updateData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }

        // Auto-generate excerpt if empty
        if (!updateData.excerpt && updateData.body) {
          updateData.excerpt = updateData.body.substring(0, 150).trim() + "...";
        }

        const post = await Post.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });

        if (!post) {
          return res.status(404).json({ success: false, error: "Post not found" });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        // Check admin authentication
        if (!checkAdminAuth(req)) {
          return res.status(401).json({ success: false, error: "Unauthorized" });
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
          return res.status(404).json({ success: false, error: "Post not found" });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "Method not allowed" });
      break;
  }
}
