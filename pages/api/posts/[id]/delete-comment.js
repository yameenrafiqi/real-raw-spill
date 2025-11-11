import { connectToDatabase } from "../../../../lib/mongoose";
import Post from "../../../../models/Post";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Verify authentication
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    await connectToDatabase();

    const { id } = req.query;
    const { commentIndex } = req.body;

    if (commentIndex === undefined) {
      return res.status(400).json({ message: "Comment index is required" });
    }

    const post = await Post.findOne({ slug: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Remove the comment at the specified index
    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ success: true, comments: post.comments });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
}
