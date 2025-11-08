import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    author: "Syed Nayer Ahtisham",
    tags: "",
    featuredImage: "",
    published: true,
    trending: false,
  });

  useEffect(() => {
    const savedPass = localStorage.getItem("adminPass");
    if (savedPass) {
      setPassword(savedPass);
      setIsAuthenticated(true);
      fetchPosts(savedPass);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      // Verify the password with the API
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!data.success) {
        setLoginError("Wrong password. Please try again.");
        setLoading(false);
        return;
      }

      // Password is correct
      localStorage.setItem("adminPass", password);
      setIsAuthenticated(true);
      fetchPosts(password);
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminPass");
    setIsAuthenticated(false);
    setPassword("");
    setPosts([]);
  };

  const fetchPosts = async (pass) => {
    try {
      setLoading(true);
      const res = await fetch("/api/posts", {
        headers: {
          "x-admin-pass": pass,
        },
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const postData = {
      ...formData,
      tags: tagsArray,
    };

    try {
      const url = editingPost ? `/api/posts/${editingPost._id}` : "/api/posts";
      const method = editingPost ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-pass": password,
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingPost ? "Post updated!" : "Post created!");
        setShowForm(false);
        setEditingPost(null);
        setFormData({
          title: "",
          body: "",
          author: "Syed Nayer Ahtisham",
          tags: "",
          featuredImage: "",
          published: true,
          trending: false,
        });
        fetchPosts(password);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      body: post.body,
      author: post.author,
      tags: post.tags.join(", "),
      featuredImage: post.featuredImage || "",
      published: post.published,
      trending: post.trending || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-pass": password,
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Post deleted!");
        fetchPosts(password);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
    setFormData({
      title: "",
      body: "",
      author: "Syed Nayer Ahtisham",
      tags: "",
      featuredImage: "",
      published: true,
      trending: false,
    });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        {/* Hero Section */}
        <div className="bg-black text-white py-20 px-6 border-b-8 border-yellow-400">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl mb-6 leading-none" style={{ fontFamily: "'Permanent Marker', cursive" }}>
              ADMIN
            </h1>
            <p className="text-2xl font-mono text-yellow-400">
              Dashboard Login
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div className="bg-white border-8 border-black p-12 transform hover:scale-[1.01] transition-transform">
            {loginError && (
              <div className="mb-8 p-6 bg-red-600 border-4 border-black text-white">
                <div className="flex items-center">
                  <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-black text-xl">{loginError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-8">
                <label className="block text-black font-black mb-4 text-2xl">
                  ADMIN PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                  className="w-full px-6 py-4 border-4 border-black font-mono text-lg focus:outline-none focus:border-yellow-400 bg-white"
                  placeholder="Enter password..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-5 bg-black text-white font-black text-xl border-4 border-black hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {loading ? "CHECKING..." : "LOGIN →"}
              </button>
            </form>

            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 border-4 border-black transform rotate-45"></div>
          </div>

          {/* Info Box */}
          <div className="mt-8 border-4 border-black p-6 bg-yellow-400">
            <p className="font-mono text-black">
              <span className="font-black">NOTE:</span> This area is restricted to administrators only. 
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-black text-white py-16 px-6 border-b-8 border-yellow-400">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black mb-2 leading-none">
              DASHBOARD
            </h1>
            <p className="text-xl font-mono text-yellow-400">
              Content Management
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-yellow-400 text-black font-black border-4 border-yellow-400 hover:bg-white transition-all transform hover:scale-105"
            >
              + NEW POST
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-black text-white font-black border-4 border-white hover:bg-red-600 hover:border-red-600 transition-all transform hover:scale-105"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white border-8 border-black p-8 mb-8 relative">
            <h2 className="text-4xl font-black text-black mb-8 border-b-4 border-black pb-4">
              {editingPost ? "EDIT POST" : "CREATE NEW POST"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-black font-black mb-3 text-xl">
                  TITLE *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:border-yellow-400"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-black font-black mb-3 text-xl">
                  BODY * (Markdown supported)
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:border-yellow-400 h-64 resize-none"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-black font-black mb-3 text-xl">
                  AUTHOR
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:border-yellow-400"
                />
              </div>

                            <div className="mb-6">
                <label className="block text-black font-black mb-3 text-xl">
                  TAGS (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:border-yellow-400"
                  placeholder="tech, web, design"
                />
              </div>

              <div className="mb-6">
                <label className="block text-black font-black mb-3 text-xl">
                  FEATURED IMAGE URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData({ ...formData, featuredImage: e.target.value })
                  }
                  className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:border-yellow-400"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="mr-3 w-6 h-6 border-4 border-black"
                  />
                  <span className="text-black font-black text-lg">
                    PUBLISH IMMEDIATELY
                  </span>
                </label>
              </div>

              <div className="mb-8">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.trending}
                    onChange={(e) =>
                      setFormData({ ...formData, trending: e.target.checked })
                    }
                    className="mr-3 w-6 h-6 border-4 border-black"
                  />
                  <span className="text-black font-black text-lg">
                    TRENDING (SHOW ON HOME PAGE)
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-black text-white font-black border-4 border-black hover:bg-yellow-400 hover:text-black transition-all disabled:opacity-50 transform hover:scale-105"
                >
                  {loading ? "SAVING..." : editingPost ? "UPDATE POST" : "CREATE POST"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 bg-white text-black font-black border-4 border-black hover:bg-red-600 hover:text-white transition-all transform hover:scale-105"
                >
                  CANCEL
                </button>
              </div>
            </form>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 border-4 border-black transform rotate-45"></div>
          </div>
        )}

        <div className="bg-white border-8 border-black p-8">
          <h2 className="text-4xl font-black text-black mb-8 border-b-4 border-black pb-4">ALL POSTS</h2>
          {loading ? (
            <p className="font-mono text-xl">LOADING...</p>
          ) : posts.length === 0 ? (
            <div className="border-4 border-black p-8 bg-yellow-400 text-center">
              <p className="font-black text-2xl">NO POSTS YET!</p>
              <p className="font-mono mt-2">Create your first post to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border-4 border-black p-6 hover:bg-yellow-400 transition relative"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <h3 className="text-2xl font-black text-black mb-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm font-mono mb-3">
                        <span className="font-bold">{post.author}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span
                          className={`font-bold ${
                            post.published ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {post.published ? "PUBLISHED" : "DRAFT"}
                        </span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-black text-white text-xs font-mono border-2 border-black"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-6 py-3 bg-yellow-400 text-black font-black border-4 border-black hover:bg-white transition transform hover:scale-105"
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-6 py-3 bg-red-600 text-white font-black border-4 border-black hover:bg-black hover:text-red-600 transition transform hover:scale-105"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
