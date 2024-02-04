import { fullBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// fetch data for a specific blog post based on its slug
// export const revalidate = 120; // revalidate at most 120 seconds
export const dynamic = 'force-dynamic';

async function fetchData(slug: string) {
  const query = `
    *[_type == "post" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      metaDescription,
      titleImage,
      publishedAt,
      "author": *[_type == 'author' && _id == ^.author._ref][0] {
        name,
        "authorImage": authorImage.asset->url,
        'bioText': bio[0].children[0].text
      }
    }[0]
  `;

  return await client.fetch(query);
}

// generate metadata for a specific blog post
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

    const imageUrl = urlFor(data.titleImage).width(1200).height(630).url();

    const publishedAt = data.publishedAt
      ? new Date(data.publishedAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';

    return {
      title: data.title,
      description: data.metaDescription || 'No description available',
      openGraph: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}`, //TODO see if that is needed?
        images: [{ url: imageUrl }],
      },
      alternates: {
        canonical: `/post/${data.currentSlug}`,
        languages: {
          'en-US': `/en-US/post/${data.currentSlug}`,
        },
      },
      publishedAt,
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Not found',
    };
  }
}

// generate static parameters for pre-rendering
export async function generateStaticParams() {
  const query = `
    *[_type == "post"] {
      "slug": slug.current
    }
  `;

  const slugs = await client.fetch(query);

  const params = slugs.map((slug: { slug: string }) => ({
    params: {
      slug: slug.slug,
    },
  }));

  return params;
}

// Main component to render a blog article
export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await fetchData(params.slug);

  if (!data) {
    // Redirect to 404 page if data is not found
    return notFound();
  }

  // Configuration for rendering images inside the article content
  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          // priority
          src={urlFor(value).width(500).height(300).url()}
          alt='Blog Post Inner Image'
          className='rounded-lg mx-auto'
          sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px'
          width={500}
          height={500}
          loading='lazy'
        />
      ),
    },
  };

  return (
    <div className='mt-8'>
      <div>
        <p className='text-sm font-normal text-center leading-6 tracking-wide	text-primary'>
          {new Date(data.publishedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <span className='mt-2 mb-3 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl'>
        {data.title}
      </span>

      <div className='flex items-center md:flex-col justify-center max-w-sm mx-auto mt-2 text-center rounded-xl'>
        {data.author.authorImage && (
          <>
            <link
              rel='preload'
              as='image'
              href={urlFor(data.author.authorImage).url()}
            />
            <Image
              src={urlFor(data.author.authorImage).url()}
              width={80}
              height={80}
              className='object-cover w-12 h-12 md:w-14 md:h-14 rounded-full border dark:border-amber-50 mr-2'
              alt='Authors Profile Image'
            />
          </>
        )}
        <div className='flex flex-col items-center p-2'>
          <p className='text-sm md:text-base text-primary mt-2 tracking-wide'>
            By {data.author.name}
          </p>
          <p className='text-sm md:text-base'>{data.author.bioText}</p>
        </div>
      </div>

      {/* Individual Blog Post Head Image */}
      <link rel='preload' as='image' href={urlFor(data.titleImage).url()} />
      <div className='w-full mx-auto'>
        <Image
          src={urlFor(data.titleImage).width(500).height(300).url()}
          alt='Blog Post Head Image'
          // layout='responsive'
          width={800}
          height={800}
          // priority
          loading='eager'
          className='rounded-lg mt-4 border mx-auto'
          sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px'
        />
      </div>

      <div className='mt-2 md:mt-10 mb-10 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-none md:w-4/5 mx-auto'>
        <PortableText value={data.content} components={PortableTextComponent} />
      </div>
    </div>
  );
}
