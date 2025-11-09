import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { connectToDatabase } from "../../lib/mongoose";
import Post from "../../models/Post";
import ReactMarkdown from "react-markdown";
import { processImageUrl } from "../../lib/imageUtils";

export default function PostPage({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="inline-block px-8 py-4 bg-yellow-400 border-4 border-black font-black text-2xl animate-pulse">
            LOADING...
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-yellow-400 border-8 border-black p-12 text-center transform -rotate-1">
            <h1 className="text-6xl font-black mb-4">404</h1>
            <p className="text-2xl font-mono mb-8">POST NOT FOUND</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-black text-white font-black border-4 border-black hover:bg-white hover:text-black transition-all"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Layout>
      <article className="max-w-6xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-black text-white font-black border-4 border-black hover:bg-yellow-400 hover:text-black transition-all mb-8 group"
        >
          <svg className="w-6 h-6 mr-2 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          BACK
        </Link>

        {post.featuredImage && (
          <div className="border-8 border-black mb-12 overflow-hidden transform hover:scale-[1.02] transition-transform">
            <img
              src={processImageUrl(post.featuredImage)}
              alt={post.title}
              className="w-full h-80 md:h-[500px] object-cover"
            />
          </div>
        )}

        <header className="mb-12 pb-8 border-b-4 border-black">
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 break-words">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-base md:text-lg font-mono">
            <div className="text-black font-black uppercase">
              {post.author}
            </div>
            <div className="text-gray-600">
              {formattedDate}
            </div>
          </div>
        </header>

        <div className="border-4 border-black bg-white mb-12">
          <div className="border-b-4 border-black"></div>
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none font-mono text-lg leading-relaxed">
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      src={processImageUrl(props.src)}
                      alt={props.alt || ''}
                      className="w-full h-auto border-4 border-black my-4"
                    />
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-black text-white text-sm font-mono uppercase border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="bg-yellow-400 border-4 border-black p-8 text-center transform hover:scale-[1.02] transition-transform">
          <p className="text-2xl font-black mb-4">READ MORE POSTS</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-black text-white font-black border-4 border-black hover:bg-white hover:text-black transition-all"
          >
            ← BACK TO HOME
          </Link>
        </div>
      </article>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  // Return null if MongoDB URI is not configured (e.g., during build)
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not configured - returning null post");
    return {
      props: {
        post: null,
      },
    };
  }

  try {
    await connectToDatabase();
    const post = await Post.findOne({ slug: params.slug, published: true }).lean();

    if (!post) {
      return {
        props: {
          post: null,
        },
      };
    }

    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        post: null,
      },
    };
  }
}
