# 🛠️ Developer Guide

## Project Overview

RawSpill is a full-stack blog built with the JAMstack architecture using Next.js for both frontend and API routes, MongoDB for data persistence, and Tailwind CSS for styling.

## Architecture

### Frontend (React/Next.js)
- **Pages Router**: Using Next.js pages directory for routing
- **SSR**: Server-side rendering for better SEO and performance
- **Components**: Reusable React components for UI elements
- **Client-side State**: Using React hooks for form management and authentication

### Backend (API Routes)
- **Serverless Functions**: Next.js API routes handle all backend logic
- **Mongoose ODM**: Object-data modeling for MongoDB
- **Authentication**: Simple header-based auth for admin routes
- **RESTful API**: Standard CRUD operations

### Database (MongoDB)
- **Cloud-hosted**: MongoDB Atlas
- **Connection Pooling**: Cached connection for performance
- **Schema Validation**: Mongoose schemas enforce data structure

## Key Files Explained

### `/lib/mongoose.js`
Connection utility that maintains a cached connection to MongoDB. This prevents creating new connections on every request.

```javascript
// Cached connection prevents reconnecting on every API call
let cached = global.mongoose;
```

### `/models/Post.js`
Mongoose schema with pre-save hooks for auto-generation:
- Slug from title (URL-friendly)
- Excerpt from body (first 150 chars)

### `/pages/api/posts/index.js`
Main API endpoint:
- `GET`: Returns all published posts
- `POST`: Creates new post (requires admin password)

### `/pages/admin.js`
Complete admin dashboard with:
- Local storage authentication
- CRUD operations via fetch API
- Form state management
- Loading states

## Data Flow

### Creating a Post
1. User fills form in `/admin`
2. Client sends POST to `/api/posts` with admin header
3. API validates password
4. Mongoose creates document
5. Pre-save hook generates slug and excerpt
6. Document saved to MongoDB
7. Success response sent to client
8. Admin page refreshes post list

### Viewing Posts
1. User visits home page
2. `getServerSideProps` runs on server
3. Mongoose queries published posts
4. Data serialized and passed to component
5. React renders post cards
6. Client-side hydration completes

## Environment Variables

Required in `.env.local`:

```env
MONGODB_URI="your-connection-string"
ADMIN_PASS="your-password"
```

**Never commit `.env.local` to version control!**

## API Authentication

Admin routes require the `x-admin-pass` header:

```javascript
headers: {
  'x-admin-pass': process.env.ADMIN_PASS
}
```

## Extending the Project

### Add a New Field to Posts

1. Update schema in `/models/Post.js`:
```javascript
subtitle: {
  type: String,
  default: "",
}
```

2. Update admin form in `/pages/admin.js`:
```javascript
<input
  type="text"
  value={formData.subtitle}
  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
/>
```

3. Update API to handle new field (automatic with Mongoose)

### Add User Comments

1. Create Comment model
2. Add comment API routes
3. Add comment component
4. Link comments to posts via postId

### Add Image Upload

1. Install `multer` or use service like Cloudinary
2. Create upload API route
3. Add file input to admin form
4. Return URL and save to post

### Add Search Functionality

1. Create search API route with text index
2. Add search component
3. Filter posts based on query

## Performance Tips

### Optimize Images
Use Next.js Image component:
```javascript
import Image from 'next/image';
<Image src={post.featuredImage} width={800} height={400} />
```

### Static Generation
For better performance, use `getStaticProps`:
```javascript
export async function getStaticProps() {
  // Generates at build time
}
```

### Add Caching
Implement Redis or ISR (Incremental Static Regeneration)

## Security Considerations

### Current Implementation
- Simple password auth (client-side storage)
- Header-based API protection
- Environment variables for secrets

### Production Improvements
- [ ] Use proper authentication (JWT, NextAuth)
- [ ] Rate limiting on API routes
- [ ] Input sanitization
- [ ] CSRF protection
- [ ] HTTPS only
- [ ] Content Security Policy headers

## Testing

### Manual Testing Checklist
- [ ] Database connection works
- [ ] Can create post
- [ ] Can edit post
- [ ] Can delete post
- [ ] Slug auto-generates correctly
- [ ] Excerpt auto-generates
- [ ] Published/draft toggle works
- [ ] Tags save as array
- [ ] Markdown renders properly
- [ ] Responsive on mobile
- [ ] Admin logout clears session

### Add Automated Tests
```bash
npm install --save-dev jest @testing-library/react
```

Example test:
```javascript
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';

test('renders post title', () => {
  const post = { title: 'Test Post', excerpt: 'Test' };
  render(<PostCard post={post} />);
  expect(screen.getByText('Test Post')).toBeInTheDocument();
});
```

## Deployment Checklist

- [ ] Environment variables set on hosting platform
- [ ] MongoDB Atlas IP whitelist updated (allow all for serverless)
- [ ] Build succeeds locally (`npm run build`)
- [ ] All pages load correctly
- [ ] API routes work in production
- [ ] Admin login works
- [ ] Database connection stable
- [ ] Images load correctly
- [ ] Performance optimized

## Common Issues

### "Cannot read property 'baseUrl'"
Solution: Remove jsconfig.json or fix TypeScript config

### "Module not found: Can't resolve '@/...'"
Solution: Check Next.js version supports absolute imports or add to next.config.js

### "Connection refused" from MongoDB
Solution: 
- Check IP whitelist in Atlas
- Verify connection string
- Ensure cluster is running

### Admin password not working
Solution:
- Check .env.local exists
- Verify ADMIN_PASS matches
- Clear localStorage
- Restart dev server

## Useful Commands

```bash
# View MongoDB logs
# (Check Atlas dashboard)

# Clear Next.js cache
rm -rf .next

# Check bundle size
npm run build

# Find port usage
lsof -ti:3000

# Environment check
node -e "console.log(require('dotenv').config())"
```

## Code Style Guide

### Components
- Use functional components
- One component per file
- Props destructuring preferred
- Named exports for components

### API Routes
- One route per file
- Switch on method
- Always await DB connection
- Return consistent JSON structure

### Styling
- Tailwind utility classes
- Avoid custom CSS when possible
- Use responsive breakpoints
- Follow mobile-first approach

## Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Tailwind Cheatsheet](https://nerdcave.com/tailwind-cheat-sheet)
- [React Hooks](https://react.dev/reference/react)

---

Happy coding! 🚀
