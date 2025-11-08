import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { connectToDatabase } from "../lib/mongoose";
import Post from "../models/Post";

export default function Home({ posts }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Unfiltered thoughts on life, growth, and exploration.";
  
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
      {/* Hero Section with Brutalist Typography and Images */}
      <div className="relative overflow-hidden bg-black text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <h1 className="text-6xl md:text-9xl mb-8 leading-none animate-slide-in" style={{ fontFamily: "'Permanent Marker', cursive" }}>
              RAWSPILL
            </h1>
            <p className="text-xl md:text-2xl font-mono text-yellow-400 animate-fade-in min-h-[2em]">
              {typedText}
              <span className="animate-blink">|</span>
            </p>
          </div>
          
          {/* Brutalist Image Collage */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 right-10 w-48 h-48 border-8 border-yellow-400 overflow-hidden rotate-12 animate-pulse-slow">
              <img src="/images/PHOTO-2025-11-08-17-08-40.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-20 left-10 w-56 h-56 border-8 border-yellow-400 overflow-hidden -rotate-6 animate-float">
              <img src="/images/PHOTO-2025-11-08-17-09-12.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-1/3 left-1/4 w-40 h-40 border-8 border-yellow-400 overflow-hidden rotate-45 animate-spin-slow">
              <img src="/images/PHOTO-2025-11-08-17-08-28.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-10 right-1/4 w-44 h-44 border-8 border-yellow-400 overflow-hidden -rotate-12">
              <img src="/images/PHOTO-2025-11-08-17-10-04.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="bg-white py-16 border-t-8 border-b-8 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Images collage */}
            <div className="relative h-96">
              <div className="absolute top-0 left-0 w-2/3 h-2/3 border-8 border-black overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/images/PHOTO-2025-11-08-17-08-40.jpg" alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 border-8 border-yellow-400 bg-black overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/images/PHOTO-2025-11-08-17-09-12.jpg" alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            {/* Right side - Text */}
            <div className="space-y-6">
              <div className="bg-black text-white p-8 border-8 border-black transform hover:translate-x-2 hover:translate-y-2 transition-transform">
                <h2 className="text-4xl font-black mb-4 text-yellow-400">TRENDING NOW</h2>
                <p className="font-mono text-lg">
                  Raw thoughts, unfiltered stories, and real reflections on life, growth, and everything in between.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-400 border-4 border-black p-6 transform hover:-rotate-2 transition-transform">
                  <div className="text-4xl font-black mb-2">{posts.length}</div>
                  <div className="font-mono text-sm">TRENDING POSTS</div>
                </div>
                <div className="bg-white border-4 border-black p-6 transform hover:rotate-2 transition-transform">
                  <div className="text-4xl font-black mb-2">∞</div>
                  <div className="font-mono text-sm">RAW IDEAS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brutalist Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-yellow-400 border-8 border-black transform -rotate-1">
            <p className="text-4xl font-black text-black mb-4">NO POSTS YET</p>
            <p className="text-xl font-mono">Check back soon for raw content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {posts.map((post, index) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug}`}
                  className={`${getCardSize(index)} group relative overflow-hidden border-4 border-black bg-white hover:bg-yellow-400 transition-all duration-500 transform hover:scale-105 hover:-rotate-2 cursor-pointer`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Featured Image Background */}
                  {post.featuredImage && (
                    <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags && post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-black text-white text-xs font-mono uppercase border-2 border-black group-hover:bg-white group-hover:text-black transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3 group-hover:underline decoration-4 decoration-black">
                        {post.title}
                      </h2>
                      
                      <p className="text-sm font-mono text-gray-700 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-xs font-mono uppercase">
                        <p className="font-bold">{post.author}</p>
                        <p className="text-gray-600">{formattedDate}</p>
                      </div>
                      
                      <div className={`w-10 h-10 bg-black group-hover:bg-white border-2 border-black flex items-center justify-center transition-all ${
                        hoveredIndex === index ? "rotate-90" : ""
                      }`}>
                        <svg className="w-6 h-6 text-white group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Animated Corner Element */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 border-2 border-black transform rotate-45 transition-transform group-hover:scale-125"></div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Brutalist CTA Section */}
      <div className="bg-yellow-400 border-t-8 border-b-8 border-black py-16 px-6 my-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Left - Image 1 */}
            <div className="relative flex justify-center">
              <div className="relative border-8 border-black overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-64 h-[500px]">
                <img 
                  src="/images/nayerpeer.jpg" 
                  alt="Nayer" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative element with kitaab image */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-8 border-black transform rotate-12 overflow-hidden">
                <img 
                  src="/images/kitaab.jpg" 
                  alt="Book" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center - Text */}
            <div className="text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-none">
                STAY RAW.
                <br />
                STAY REAL.
              </h2>
              <p className="text-lg md:text-xl font-mono mb-8 leading-relaxed">
                Follow the journey of growth, exploration, and authentic living.
              </p>
              <div className="relative inline-block">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-black text-white text-xl font-black uppercase border-4 border-black hover:bg-white hover:text-black transition-all transform hover:scale-105 hover:rotate-2"
                >
                  CONNECT WITH ME →
                </Link>
              </div>
            </div>

            {/* Right - Image 2 */}
            <div className="relative flex justify-center">
              <div className="relative border-8 border-black overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 w-64 h-[500px]">
                <img 
                  src="/images/peer_curly.jpg" 
                  alt="Nayer" 
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Decorative element with laptop image */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-8 border-black transform -rotate-12 overflow-hidden">
                <img 
                  src="/images/laptop.jpg" 
                  alt="Laptop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements with images */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-black overflow-hidden opacity-80">
          <img src="/images/food.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-black -rotate-12 overflow-hidden opacity-40">
          <img src="/images/sofa.jpeg" alt="" className="w-full h-full object-cover rotate-12" />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Return empty posts if MongoDB URI is not configured (e.g., during build)
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not configured - returning empty posts");
    return {
      props: {
        posts: [],
      },
    };
  }

  try {
    await connectToDatabase();
    const posts = await Post.find({ published: true, trending: true })
      .sort({ createdAt: -1 })
      .lean();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
