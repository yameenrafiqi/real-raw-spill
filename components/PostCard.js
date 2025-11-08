import Link from "next/link";

export default function PostCard({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {post.featuredImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span>{post.author}</span>
          <span>•</span>
          <time>{formattedDate}</time>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <p className="text-gray-700 mb-4">{post.excerpt}</p>
        <Link
          href={`/posts/${post.slug}`}
          className="inline-block text-blue-600 hover:text-blue-800 font-medium transition"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
