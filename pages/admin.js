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
    author: "Syed Yameen Rafiqi",
    tags: "",
    featuredImage: "",
    published: true,
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
          author: "Syed Yameen Rafiqi",
          tags: "",
          featuredImage: "",
          published: true,
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
      author: "Syed Yameen Rafiqi",
      tags: "",
      featuredImage: "",
      published: true,
    });
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Admin Login
            </h1>
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {loginError}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(""); // Clear error when user types
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              + Create New Post
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Body * (Markdown supported)
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="tech, web, design"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.featuredImage}
                  onChange={(e) =>
                    setFormData({ ...formData, featuredImage: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="mr-2 w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium">
                    Publish immediately
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Posts</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">No posts yet. Create your first post!</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span
                          className={
                            post.published ? "text-green-600" : "text-red-600"
                          }
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
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
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                      >
                        Delete
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
