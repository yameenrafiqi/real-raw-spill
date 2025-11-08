import { connectToDatabase } from "../../../../lib/mongoose";
import Post from "../../../../models/Post";

export default async function handler(req, res) {
  await connectToDatabase();

  const { method, query } = req;
  const { slug } = query;

  if (method === "GET") {
    try {
      const post = await Post.findOne({ slug, published: true }).lean();
      
      if (!post) {
        return res.status(404).json({ success: false, error: "Post not found" });
      }
      
      res.status(200).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ success: false, error: "Method not allowed" });
  }
}
