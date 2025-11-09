# Image Guide for RAWSPILL

## How to Add Images to Your Posts

### Option 1: Local Images (Recommended for Control)
1. Place your images in `public/images/posts/`
2. Use the path: `/images/posts/your-image.jpg`

**Example in Markdown:**
```markdown
![My Photo](/images/posts/my-photo.jpg)
```

---

### Option 2: Google Drive Images

**Step 1: Upload to Google Drive**
- Upload your image to Google Drive
- Right-click the image → "Get link"
- Set sharing to "Anyone with the link can view"

**Step 2: Copy the Link**
You'll get a link like:
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```

**Step 3: Use in Your Post**
Just paste the Google Drive link directly! The system will automatically convert it.

**Featured Image (in admin):**
```
https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing
```

**In Markdown Content:**
```markdown
![Description](https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing)
```

---

### Supported Google Drive Link Formats

✅ Sharing links: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
✅ Open links: `https://drive.google.com/open?id=FILE_ID`
✅ Direct links: `https://drive.google.com/uc?export=view&id=FILE_ID`

All formats are automatically converted to work properly!

---

### Tips for Best Results

1. **Image Size**: Keep images under 5MB for faster loading
2. **Dimensions**: Recommended 1200x630px for featured images
3. **Format**: Use JPG for photos, PNG for graphics with transparency
4. **Google Drive**: Make sure images are set to "Anyone with link can view"

---

### Troubleshooting

**Image not showing from Google Drive?**
- Check sharing settings (must be "Anyone with link")
- Make sure the link contains the file ID
- Wait a few seconds for Google Drive to process

**Local image not showing?**
- Verify the file is in `public/images/posts/`
- Check the path starts with `/` (e.g., `/images/posts/photo.jpg`)
- File names are case-sensitive!

