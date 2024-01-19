import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Get Sitemap from Sanity CMS
  // const sitemap = await fetch('https://birdigi.vercel.app/sitemap.xml');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/contact',
    },
    sitemap: `https://birdigi.vercel.app/}/sitemap.xml`,
    // sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}

// The sitemap property in the returned object is specifying the URL of your sitemap. In the provided code, it is set to a placeholder URL, 'https://acme.com/sitemap.xml'.

// In a real-world scenario, this URL should point to the actual location where your sitemap file is hosted. A sitemap is an XML file that provides information about the pages, images, and other files on your site and how they are organized. Search engines, like Google, use this sitemap to better understand and index your website.

// Here's a breakdown of that part:

// sitemap: This is a key in the object returned by the robots function. It tells search engine crawlers where to find the sitemap for your website.

// 'https://acme.com/sitemap.xml': This is the placeholder URL. You should replace it with the actual URL where your sitemap is hosted. For example, if your sitemap is hosted at 'https://example.com/sitemap.xml', you would replace it with that URL.

// The real value for the sitemap URL will depend on your deployment setup, where you host your sitemap file, and the URL structure you decide to use. Ensure that this URL is accessible to search engine crawlers and points to the correct sitemap file.

// An ERROR after running the test on pagespeed.web.dev
// The error message “Lighthouse was unable to download a robots.txt file” indicates that Lighthouse was not able to access your robots.txt file. The robots.txt file is a text file that tells search engine crawlers which pages or files on your website they can or cannot request.

// In your code snippet, you are returning an object that specifies the URL of your sitemap, but the sitemap property is set to a placeholder URL, ‘https://acme.com/sitemap.xml’ 1. In a real-world scenario, this URL should point to the actual location where your sitemap file is hosted.

// To fix the issue, you should replace the placeholder URL with the actual URL where your sitemap is hosted. For example, if your sitemap is hosted at ‘https://example.com/sitemap.xml’, you would replace it with that URL 1.

// The real value for the sitemap URL will depend on your deployment setup, where you host your sitemap file, and the URL structure you decide to use. Ensure that this URL is accessible to search engine crawlers and points to the correct sitemap file.

// I hope this helps! Let me know if you have any other questions.
