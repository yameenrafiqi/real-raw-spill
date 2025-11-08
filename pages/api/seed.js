import { connectToDatabase } from "../../lib/mongoose";
import Post from "../../models/Post";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    // Clear existing posts (optional - remove in production)
    await Post.deleteMany({});

    const samplePosts = [
      {
        title: "Welcome to RawSpill Blog",
        body: "This is the first post on our new blog platform. We're excited to share our thoughts and ideas with you. Stay tuned for more content about technology, design, and everything in between.\n\nThis blog is built with Next.js, MongoDB, and Tailwind CSS for a modern, fast, and beautiful experience.",
        author: "Syed Yameen Rafiqi",
        tags: ["welcome", "introduction", "tech"],
        featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
        published: true,
      },
      {
        title: "Building Modern Web Applications",
        body: "Modern web development has evolved significantly over the years. With frameworks like Next.js, we can build fast, SEO-friendly applications with ease.\n\nKey features of modern web apps:\n• Server-side rendering\n• Static site generation\n• API routes\n• Optimized performance\n• Great developer experience\n\nThe combination of these technologies allows us to create amazing user experiences.",
        author: "Syed Yameen Rafiqi",
        tags: ["web development", "nextjs", "react"],
        featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        published: true,
      },
      {
        title: "The Power of Minimalist Design",
        body: "Less is more. This philosophy applies perfectly to web design. A minimalist approach focuses on what truly matters - content and user experience.\n\nBenefits of minimalist design:\n• Faster load times\n• Better focus on content\n• Easier navigation\n• Cleaner aesthetics\n• Improved accessibility\n\nOur blog embraces this philosophy with clean typography, ample white space, and subtle design elements.",
        author: "Syed Yameen Rafiqi",
        tags: ["design", "minimalism", "ux"],
        featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800",
        published: true,
      },
    ];

    const posts = await Post.insertMany(samplePosts);

    res.status(200).json({
      success: true,
      message: `✅ Successfully seeded ${posts.length} posts!`,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Seeding failed",
      error: error.message,
    });
  }
}
