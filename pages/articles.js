import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { connectToDatabase } from "../lib/mongoose";
import Post from "../models/Post";
import { processImageUrl } from "../lib/imageUtils";
import { CATEGORIES } from "../lib/categories";

export default function Articles({ posts, allCategories }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const fullText = "All writings and reflections";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Layout pattern for brutalist asymmetric grid
  const getCardSize = (index) => {
    const patterns = [
      "col-span-2 row-span-2", // Large
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-2", // Tall
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-1", // Small
      "col-span-1 row-span-1", // Small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white py-20 px-6 border-b-8 border-yellow-400">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/books.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-9xl mb-8 leading-none animate-slide-in" style={{ fontFamily: "'Permanent Marker', cursive" }}>
              ARTICLES
            </h1>
            <p className="text-xl md:text-2xl font-mono text-yellow-400 animate-fade-in min-h-[2em]">
              {typedText}
              <span className="animate-blink">|</span>
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-6">FILTER BY CATEGORY</h2>
          <div className="max-w-md">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-6 py-4 text-lg font-mono font-black uppercase border-4 border-black bg-yellow-400 text-black focus:outline-none focus:border-black cursor-pointer hover:bg-yellow-300 transition-colors"
            >
              <option value="All" className="font-black">
                ALL ({posts.length})
              </option>
              {allCategories.map((category) => {
                const count = posts.filter(p => p.category === category).length;
                if (count === 0) return null;
                return (
                  <option key={category} value={category} className="font-black">
                    {category.toUpperCase()} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block bg-yellow-400 text-black p-8 md:p-12 border-4 md:border-8 border-black transform -rotate-2">
              <h2 className="text-3xl md:text-4xl font-black mb-4">NO ARTICLES IN THIS CATEGORY</h2>
              <p className="text-lg md:text-xl font-mono">Try selecting a different category!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {filteredPosts.map((post, index) => {
              const isHovered = hoveredIndex === index;
              const colors = [
                "bg-yellow-400",
                "bg-black text-white",
                "bg-white",
                "bg-yellow-400",
              ];
              const borders = ["border-black", "border-yellow-400", "border-black"];

              return (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug}`}
                  className={`${getCardSize(
                    index
                  )} ${colors[index % colors.length]} border-4 md:border-8 ${
                    borders[index % borders.length]
                  } p-4 md:p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group ${
                    isHovered ? "z-10" : ""
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Featured Image */}
                  {post.featuredImage && (
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity">
                      <img
                        src={processImageUrl(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col h-full justify-between relative z-10">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight group-hover:underline">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm md:text-base font-mono line-clamp-3 opacity-80">
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs font-mono px-2 py-1 bg-black text-white border-2 border-black group-hover:bg-yellow-400 group-hover:text-black transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="opacity-60">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="font-black group-hover:translate-x-2 transition-transform inline-block">
                          READ →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-r-[40px] border-r-black opacity-10 group-hover:opacity-20 transition-opacity" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  if (process.env.NODE_ENV === "development" && !process.env.MONGODB_URI) {
    return {
      props: {
        posts: [],
      },
    };
  }

  try {
    await connectToDatabase();
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    // Get unique categories from posts that have a category set
    const categoriesFromPosts = [...new Set(
      posts
        .filter(post => post.category)
        .map(post => post.category)
    )];

    // Sort categories to match the order in CATEGORIES constant
    const allCategories = CATEGORIES.filter(cat => categoriesFromPosts.includes(cat));

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        allCategories,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      props: {
        posts: [],
        allCategories: [],
      },
    };
  }
}
