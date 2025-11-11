import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { connectToDatabase } from "../../lib/mongoose";
import Post from "../../models/Post";
import ReactMarkdown from "react-markdown";
import { processImageUrl } from "../../lib/imageUtils";

export default function PostPage({ post }) {
  const router = useRouter();
  const [views, setViews] = useState(post?.views || 0);
  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const [comments, setComments] = useState(post?.comments || []);
  const [showLikePrompt, setShowLikePrompt] = useState(false);
  const [showCommentPrompt, setShowCommentPrompt] = useState(false);
  const [likeName, setLikeName] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    if (post?.slug) {
      // Increment view count when page loads
      fetch(`/api/posts/${post.slug}/increment-view`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.views) {
            setViews(data.views);
          }
        })
        .catch((err) => console.error("Error incrementing view:", err));
    }
  }, [post?.slug]);

  const handleLike = async () => {
    if (!likeName.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.slug}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: likeName }),
      });

      const data = await res.json();
      if (data.success) {
        setLikes(data.likes);
        setShowLikePrompt(false);
        setLikeName("");
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Failed to like post");
    }
  };

  const handleComment = async () => {
    if (!commentName.trim() || !commentText.trim()) {
      alert("Please enter your name and comment");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName, comment: commentText }),
      });

      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
        setShowCommentPrompt(false);
        setCommentName("");
        setCommentText("");
      }
    } catch (error) {
      console.error("Error commenting:", error);
      alert("Failed to add comment");
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/posts/${post.slug}`;
    const shareText = `Check out this article: ${post.title}`;

    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        if (error.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Link copied to clipboard!");
      },
      () => {
        alert("Failed to copy link");
      }
    );
  };

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
          {post.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-yellow-400 text-black font-black text-sm uppercase border-2 border-black">
                {post.category}
              </span>
            </div>
          )}
          
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
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{views.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        <div className="border-4 border-black bg-white mb-12">
          <div className="border-b-4 border-black"></div>
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Bookman Old Style', 'URW Bookman', serif" }}>
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

        {/* Like and Comment Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setShowLikePrompt(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-4 border-black font-black uppercase hover:bg-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </button>
          
          <button
            onClick={() => setShowCommentPrompt(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border-4 border-black font-black uppercase hover:bg-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-white border-4 border-black font-black uppercase hover:bg-yellow-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {comments.length > 0 && (
          <div className="mb-12 border-4 border-black bg-white p-6">
            <h2 className="text-3xl font-black mb-6 uppercase">Comments</h2>
            {(showAllComments ? comments : comments.slice(0, 3)).map((comment, index) => (
              <div key={index} className="mb-4 pb-4 border-b-2 border-gray-300 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-black">{comment.name}</span>
                  <span className="text-sm text-gray-600">
                    {new Date(comment.timestamp).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-gray-800">{comment.comment}</p>
              </div>
            ))}
            {comments.length > 3 && !showAllComments && (
              <button
                onClick={() => setShowAllComments(true)}
                className="mt-4 px-4 py-2 bg-black text-white font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors"
              >
                READ MORE... ({comments.length - 3} more)
              </button>
            )}
          </div>
        )}

        {/* Like Prompt Modal */}
        {showLikePrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-yellow-400 border-4 border-black p-8 max-w-md w-full">
              <h2 className="text-3xl font-black mb-4 uppercase">What's Your Name?</h2>
              <input
                type="text"
                value={likeName}
                onChange={(e) => setLikeName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-4 border-black font-mono mb-4 text-black"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  disabled={!likeName.trim()}
                  className="flex-1 px-6 py-3 bg-black text-white font-black uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  LIKE
                </button>
                <button
                  onClick={() => {
                    setShowLikePrompt(false);
                    setLikeName('');
                  }}
                  className="flex-1 px-6 py-3 bg-white text-black border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Comment Prompt Modal */}
        {showCommentPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-yellow-400 border-4 border-black p-8 max-w-md w-full">
              <h2 className="text-3xl font-black mb-4 uppercase">Leave a Comment</h2>
              <input
                type="text"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 border-4 border-black font-mono mb-4 text-black"
              />
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Your comment"
                rows="4"
                className="w-full px-4 py-3 border-4 border-black font-mono mb-4 text-black resize-none"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleComment}
                  disabled={!commentName.trim() || !commentText.trim()}
                  className="flex-1 px-6 py-3 bg-black text-white font-black uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  SUBMIT
                </button>
                <button
                  onClick={() => {
                    setShowCommentPrompt(false);
                    setCommentName('');
                    setCommentText('');
                  }}
                  className="flex-1 px-6 py-3 bg-white text-black border-4 border-black font-black uppercase hover:bg-black hover:text-white transition-colors"
                >
                  CANCEL
                </button>
              </div>
            </div>
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
