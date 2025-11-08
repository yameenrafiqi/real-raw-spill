# RAWSPILL - Brutalist Blog

A modern, brutalist-designed blog built with Next.js, MongoDB, and Tailwind CSS.

## Features

- 🎨 Brutalist design with bold typography and animations
- 📝 Full blog with markdown support
- 🔐 Admin dashboard for content management
- 📧 Contact form
- 📱 Responsive design
- ⚡ Server-side rendering with Next.js

## Deployment to Netlify

### Step 1: Set Environment Variables in Netlify

**CRITICAL**: You must set these environment variables in Netlify before the build will succeed.

1. Go to your Netlify site dashboard
2. Navigate to: **Site settings → Build & deploy → Environment → Environment variables**
3. Click **Add a variable** and add the following:

#### Required Environment Variables:

**MONGODB_URI**
- Value: Your MongoDB connection string
- Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blogdb?retryWrites=true&w=majority`
- Get this from your MongoDB Atlas dashboard

**ADMIN_PASSWORD**
- Value: Your admin dashboard password
- Example: `supersecret123` (change this to something secure!)

### Step 2: MongoDB Atlas Network Access

Make sure your MongoDB Atlas cluster allows connections from Netlify:

1. Go to MongoDB Atlas → Network Access
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
   - Or add specific Netlify IPs if you prefer

### Step 3: Deploy

After setting the environment variables:

1. Push your code to GitHub (already done!)
2. In Netlify, click **Deploy site** or **Trigger deploy**
3. The build should now complete successfully

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yameenrafiqi/real-raw-spill.git
cd real-raw-spill
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
MONGODB_URI=your_mongodb_connection_string
ADMIN_PASSWORD=supersecret123
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Network Access (for testing on other devices)

```bash
npm run dev:network
```

Then access from: `http://YOUR_LOCAL_IP:3000`

## Project Structure

```
├── components/          # React components
│   ├── Header.js
│   ├── Footer.js
│   └── Layout.js
├── lib/
│   └── mongoose.js     # MongoDB connection
├── models/
│   └── Post.js         # Post schema
├── pages/
│   ├── api/            # API routes
│   ├── posts/          # Blog post pages
│   ├── index.js        # Home page
│   ├── about.js        # About page
│   └── admin.js        # Admin dashboard
├── public/             # Static files
└── styles/
    └── globals.css     # Global styles & animations
```

## Admin Dashboard

Access the admin dashboard at: `/admin`

Default password: `supersecret123` (configured via `ADMIN_PASSWORD` env var)

Features:
- Create new posts
- Edit existing posts
- Delete posts
- Publish/unpublish posts
- Add tags and featured images

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS with custom brutalist design
- **Markdown**: react-markdown
- **Hosting**: Netlify

## Troubleshooting

### Build fails with "MONGODB_URI not defined"
- Make sure you've added `MONGODB_URI` to Netlify environment variables
- Redeploy after adding the variable

### Can't connect to MongoDB
- Check your MongoDB Atlas network access settings
- Verify your connection string is correct
- Ensure the database user has proper permissions

### Admin login not working
- Verify `ADMIN_PASSWORD` is set in environment variables
- Clear browser cache and try again

## Contact

- Email: syednayer016@gmail.com
- GitHub: [@yameenrafiqi](https://github.com/yameenrafiqi)

## License

MIT
