import { connectToDatabase } from "../../../../lib/mongoose";
import Post from "../../../../models/Post";
import Notification from "../../../../models/Notification";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Slug and name are required" });
    }

    await connectToDatabase();

    const post = await Post.findOneAndUpdate(
      { slug: id, published: true },
      { 
        $push: { 
          likes: { 
            name,
            timestamp: new Date()
          } 
        } 
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create notification for like
    await Notification.create({
      type: "like",
      postTitle: post.title,
      postSlug: post.slug,
      userName: name,
      read: false,
      timestamp: new Date(),
    });

    return res.status(200).json({ 
      success: true, 
      likes: post.likes.length 
    });
  } catch (error) {
    console.error("Error adding like:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
