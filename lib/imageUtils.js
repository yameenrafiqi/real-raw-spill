/**
 * Converts Google Drive sharing links to direct image URLs
 * Supports both sharing and direct file URLs
 */
export function convertGoogleDriveLink(url) {
  if (!url) return url;
  
  // Check if it's already a direct Google Drive link
  if (url.includes('drive.google.com/uc?') || url.includes('drive.google.com/thumbnail?')) {
    return url;
  }
  
  // Handle Google Drive sharing links
  // Format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const shareMatch = url.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/);
  if (shareMatch) {
    const fileId = shareMatch[1];
    // Use thumbnail endpoint with large size for better compatibility
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }
  
  // Handle open links
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) {
    const fileId = openMatch[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
  }
  
  // Return original URL if it's not a Google Drive link
  return url;
}

/**
 * Processes image URLs to handle various sources
 */
export function processImageUrl(url) {
  if (!url) return url;
  
  // Convert Google Drive links
  if (url.includes('drive.google.com')) {
    return convertGoogleDriveLink(url);
  }
  
  // Return other URLs as-is (local images, external links, etc.)
  return url;
}
