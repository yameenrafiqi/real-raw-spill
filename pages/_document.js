import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Permanent+Marker&display=swap" rel="stylesheet" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RAWSPILL" />
        <meta property="og:image" content="https://690ed4b9824cac4bd2c9c63e--rawspillsnp.netlify.app/nayer_peer.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="RAWSPILL - Unfiltered thoughts on life, growth, and exploration" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://690ed4b9824cac4bd2c9c63e--rawspillsnp.netlify.app/nayer_peer.jpeg" />
        <meta name="twitter:image:alt" content="RAWSPILL - Unfiltered thoughts on life, growth, and exploration" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#FACC15" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
