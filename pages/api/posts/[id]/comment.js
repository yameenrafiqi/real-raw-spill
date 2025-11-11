import { connectToDatabase } from "../../../../lib/mongoose";
import Post from "../../../../models/Post";
import Notification from "../../../../models/Notification";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { name, comment } = req.body;

    if (!id || !name || !comment) {
      return res.status(400).json({ message: "Slug, name, and comment are required" });
    }

    await connectToDatabase();

    const post = await Post.findOneAndUpdate(
      { slug: id, published: true },
      { 
        $push: { 
          comments: { 
            name,
            comment,
            timestamp: new Date()
          } 
        } 
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create notification for comment
    await Notification.create({
      type: "comment",
      postTitle: post.title,
      postSlug: post.slug,
      userName: name,
      comment,
      read: false,
      timestamp: new Date(),
    });

    return res.status(200).json({ 
      success: true, 
      comments: post.comments 
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
