import { MetadataRoute } from 'next';
import { client } from './lib/sanity';

async function getData() {
  try {
    const query = `
      *[_type == 'post'] | order(_createdAt desc) {
        "currentSlug": slug.current,
        "updatedAt": _updatedAt,
      }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getData();

  const postUrls: MetadataRoute.Sitemap =
    posts?.map((post: any) => {
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.currentSlug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    }) || [];

  const additionalRoutes: MetadataRoute.Sitemap = [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
      lastModified: new Date(),
    },
  ];

  return [...additionalRoutes, ...postUrls];
}

// import { client } from './lib/sanity';
// // Get All Posts from Sanity CMS
// async function getData() {
//   const query = `
//     *[_type == 'post'] | order(_createdAt desc) {
//       "currentSlug": slug.current,
//     }`;

//   const data = await client.fetch(query);

//   return data;
// }

// export default async function sitemap() {
//   const posts = await getData();
//   const postsUrls =
//     posts?.map((post: any) => {
//       return {
//         url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.currentSlug}`,
//         lastModified: new Date(),
//       };
//     }) ?? [];

//   return [
//     {
//       url: process.env.NEXT_PUBLIC_BASE_URL,
//       lastModified: new Date(),
//     },
//     ...postsUrls,
//   ];
// }
