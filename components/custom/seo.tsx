import Head from "next/head";
import { FC } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

const SEO: FC<SEOProps> = ({
  title = "Meisterhaus Bed & Breakfast",
  description = "Experience charming hospitality at Meisterhaus Bed & Breakfast, a historic retreat in Morristown, Minnesota. Enjoy comfortable accommodations, homemade breakfast, and the peaceful ambiance of small-town Minnesota.",
  keywords = "bed and breakfast, Morristown MN, historic B&B, Minnesota lodging, Meisterhaus, weekend getaway",
  ogImage = "https://meisterhausbandb.com/default-og-image.jpg",
  ogUrl = "https://meisterhausbandb.com",
  canonical,
}) => {
  const siteTitle = title ? `${title} | Your Site Name` : "Your Site Name";

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;
