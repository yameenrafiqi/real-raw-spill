import { connectToDatabase } from "../../../../lib/mongoose";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Slug is required" });
    }

    await connectToDatabase();

    // Increment the view count
    const post = await Post.findOneAndUpdate(
      { slug: id, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ views: post.views });
  } catch (error) {
    console.error("Error incrementing view:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
