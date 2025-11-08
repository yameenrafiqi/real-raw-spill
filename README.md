# 📝 RawSpill Blog

A minimal, modern full-stack blog built with **Next.js**, **MongoDB (Mongoose)**, and **Tailwind CSS**. Features a clean, minimalist design with a password-protected admin dashboard for managing blog posts.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)

## ✨ Features

- 📰 **Main Page** - Browse all published blog posts with card-based layout
- 👤 **About Page** - Author information with social links
- 🔐 **Admin Dashboard** - Password-protected area to create, edit, and delete posts
- 📱 **Responsive Design** - Mobile-first, clean, minimalist UI
- 🎨 **Modern Styling** - Tailwind CSS with soft shadows and rounded cards
- 🔍 **SEO-Friendly** - Server-side rendering with Next.js
- ✍️ **Markdown Support** - Write posts in Markdown format
- 🏷️ **Tags & Categories** - Organize posts with tags
- 🖼️ **Featured Images** - Support for post cover images
- 🔄 **Auto-Generation** - Automatic slug and excerpt generation

## 🚀 Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- MongoDB Atlas account (already configured)

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd rawspill_Nayer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables are already configured** in `.env.local`:
   ```
   MONGODB_URI="mongodb+srv://yameem369_db_user:qPNIo5bcA8ZjRMI7@rawspillcluster.7criqzj.mongodb.net/blogdb?appName=RawspillCluster"
   ADMIN_PASS="supersecret123"
   ```

4. **Seed the database with sample posts (optional):**
   ```bash
   npm run dev
   ```
   Then visit: `http://localhost:3000/api/seed` in your browser
   
   You should see: `✅ Successfully seeded 3 posts!`

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:3000`

## 📁 Project Structure

```
rawspill_Nayer/
├── components/
│   ├── Footer.js          # Footer component
│   ├── Header.js          # Navigation header
│   ├── Layout.js          # Main layout wrapper
│   └── PostCard.js        # Blog post card component
├── lib/
│   └── mongoose.js        # MongoDB connection utility
├── models/
│   └── Post.js            # Mongoose Post schema
├── pages/
│   ├── api/
│   │   ├── posts/
│   │   │   ├── index.js          # GET/POST posts
│   │   │   ├── [id].js           # GET/PUT/DELETE by ID
│   │   │   └── slug/[slug].js    # GET by slug
│   │   ├── seed.js               # Seed sample data
│   │   └── test-db.js            # Test DB connection
│   ├── posts/
│   │   └── [slug].js      # Individual post page
│   ├── _app.js            # App wrapper
│   ├── _document.js       # HTML document
│   ├── about.js           # About page
│   ├── admin.js           # Admin dashboard
│   └── index.js           # Home page
├── styles/
│   └── globals.css        # Global styles
├── .env.local             # Environment variables
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## 🎯 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with all published posts |
| `/about` | About the author |
| `/posts/[slug]` | Individual blog post |
| `/admin` | Admin dashboard (password protected) |
| `/api/posts` | GET all posts / POST new post |
| `/api/posts/[id]` | GET/PUT/DELETE post by ID |
| `/api/posts/slug/[slug]` | GET post by slug |
| `/api/seed` | Seed sample posts |
| `/api/test-db` | Test database connection |

## 🔐 Admin Dashboard

1. Navigate to `/admin`
2. Enter admin password: **`supersecret123`**
3. You can now:
   - ✅ Create new posts
   - ✏️ Edit existing posts
   - 🗑️ Delete posts
   - 📊 View all posts (published and drafts)

### Admin Features:
- **Create/Edit Form** with:
  - Title (required)
  - Body/Content (Markdown supported)
  - Author name
  - Tags (comma-separated)
  - Featured image URL
  - Publish toggle
- **Post Management**:
  - View all posts in a list
  - Edit any post
  - Delete posts with confirmation
  - See publish status

## 🗄️ Database Schema

### Post Model

```javascript
{
  title: String,           // Post title (required)
  slug: String,            // Auto-generated from title (unique)
  excerpt: String,         // Auto-generated from body (first 150 chars)
  body: String,            // Post content (required)
  author: String,          // Author name (default: "Admin")
  tags: [String],          // Array of tags
  featuredImage: String,   // URL to cover image
  published: Boolean,      // Publish status (default: false)
  createdAt: Date,         // Auto-generated
  updatedAt: Date,         // Auto-generated
}
```

## 🎨 Customization

### Update Site Name
Edit `components/Header.js`:
```javascript
<Link href="/">RawSpill</Link>
```

### Update Author Info
Edit `pages/about.js` to change:
- Author name
- Bio
- Social links
- Profile picture

### Change Color Scheme
Edit `tailwind.config.js` to customize colors, fonts, etc.

### Modify Admin Password
Edit `.env.local`:
```
ADMIN_PASS="your-new-password"
```

## 🛠️ API Reference

### Get All Posts
```http
GET /api/posts
```

### Get Single Post by ID
```http
GET /api/posts/:id
```

### Get Post by Slug
```http
GET /api/posts/slug/:slug
```

### Create Post (Admin Only)
```http
POST /api/posts
Headers: { "x-admin-pass": "supersecret123" }
Body: { title, body, author, tags, featuredImage, published }
```

### Update Post (Admin Only)
```http
PUT /api/posts/:id
Headers: { "x-admin-pass": "supersecret123" }
Body: { ...fields to update }
```

### Delete Post (Admin Only)
```http
DELETE /api/posts/:id
Headers: { "x-admin-pass": "supersecret123" }
```

## 🧪 Testing

### Test Database Connection
Visit: `http://localhost:3000/api/test-db`

Expected response: `✅ MongoDB connected successfully!`

### Test with Sample Data
Visit: `http://localhost:3000/api/seed`

This will create 3 sample blog posts.

## 📦 Production Build

```bash
# Build the app
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables:
   - `MONGODB_URI`
   - `ADMIN_PASS`
4. Deploy!

### Deploy to Other Platforms

Make sure to set the environment variables on your hosting platform.

## 📝 Usage Tips

1. **Writing Posts**: Use Markdown formatting in the body field for rich text
2. **Images**: Use external image URLs (Unsplash, Imgur, etc.) for featured images
3. **Tags**: Separate multiple tags with commas
4. **Drafts**: Uncheck "Publish immediately" to save as draft
5. **SEO**: Title and excerpt are used for meta tags

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Confirm credentials in `.env.local`

### Pages Not Loading
- Run `npm run dev` to start the server
- Check console for errors
- Clear browser cache

### Admin Login Issues
- Verify password matches `.env.local`
- Check browser console for errors
- Clear localStorage: `localStorage.clear()`

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Syed Yameen Rafiqi**

- GitHub: [@your-github](https://github.com)
- Twitter: [@your-twitter](https://twitter.com)
- LinkedIn: [your-linkedin](https://linkedin.com)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database: [MongoDB Atlas](https://www.mongodb.com/atlas)
- Icons & Images: [Unsplash](https://unsplash.com/)

---

**Happy Blogging! 🎉**
