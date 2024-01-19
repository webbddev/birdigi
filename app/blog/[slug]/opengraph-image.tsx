import { fullBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import Image from 'next/image';
import { ImageResponse } from 'next/og';

// fetch data for a specific blog post based on its slug
async function fetchData(slug: string) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
      title,
      metaDescription,
      titleImage {
        asset -> {
          url
        }
      }
    }[0]
  `;

  return await client.fetch(query);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const data: fullBlog = await fetchData(params.slug);

    if (!data) {
      console.error('Data not available');
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      };
    }

    // Generate metadata based on the fetched data
    const imageUrl = urlFor(data.titleImage).width(1200).height(630).url();

    return {
      title: data.title,
      description: data.metaDescription || 'No description available',
      openGraph: {
        images: [{ url: imageUrl }],
      },
      alternates: {
        canonical: `/post/${data.currentSlug}`,
        languages: {
          'en-US': `/en-US/post/${data.currentSlug}`,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Not found',
    };
  }
}

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function generateImage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch the data for the post
  const data: fullBlog = await fetchData(params.slug);

  // Font
  const interSemiBold = fetch(
    new URL('../Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>{data.title}</h1>
        <p>{data.metaDescription}</p>
        <Image src={urlFor(data.titleImage).url()} alt={data.title} />
        {/* <Image src={data.titleImage} alt={data.title} /> */}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
