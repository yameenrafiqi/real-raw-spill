# 🚀 Quick Start Guide

## Your blog is ready! Follow these steps:

### 1. Start the Development Server (Already Running!)
The server is running at: **http://localhost:3000**

### 2. Test Database Connection
Open in browser: **http://localhost:3000/api/test-db**

You should see:
```json
{"message":"✅ MongoDB connected successfully!"}
```

### 3. Seed Sample Blog Posts
Open in browser: **http://localhost:3000/api/seed**

This will create 3 sample blog posts.

### 4. View Your Blog
- **Home Page**: http://localhost:3000
- **About Page**: http://localhost:3000/about
- **Admin Dashboard**: http://localhost:3000/admin

### 5. Login to Admin Dashboard
1. Go to: http://localhost:3000/admin
2. Enter password: **`supersecret123`**
3. Start creating, editing, or deleting posts!

## 📝 Next Steps

1. **Customize the About Page**
   - Edit: `pages/about.js`
   - Update your name, bio, and social links

2. **Create Your First Post**
   - Go to Admin Dashboard
   - Click "Create New Post"
   - Write your content (Markdown supported!)
   - Click "Create Post"

3. **Customize the Design**
   - Edit: `tailwind.config.js` for colors/fonts
   - Edit: `components/Header.js` for site name
   - Edit: `styles/globals.css` for global styles

4. **Change Admin Password**
   - Edit: `.env.local`
   - Update `ADMIN_PASS` to your new password
   - Restart the server

## 🎨 Features to Try

- ✍️ Write posts with **Markdown** formatting
- 🏷️ Add **tags** to organize content
- 🖼️ Add **featured images** from URLs
- 📝 Save as **draft** or publish immediately
- ✏️ **Edit** and **delete** posts from admin

## 💡 Tips

- Use Unsplash for free images: https://unsplash.com
- Separate tags with commas: `tech, design, web`
- Slug is auto-generated from title
- Excerpt is auto-generated from first 150 chars

## 🐛 Troubleshooting

If you encounter issues:
1. Check terminal for error messages
2. Verify `.env.local` exists with credentials
3. Ensure MongoDB Atlas is accessible
4. Try clearing browser cache/localStorage

## 📚 Documentation

Full documentation is in `README.md`

---

**Enjoy your new blog! 🎉**
