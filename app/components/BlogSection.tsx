import { Card, CardContent } from '@/components/ui/card';
import { MoveUpRight } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { simplePostCard } from '../lib/interface';
import { Button } from '@/components/ui/button';

// fetch data from Sanity.io for the blog section
async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage,
      categories[]->{
      _id,
      title
     }
  }`;
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await client.fetch(query);

  return data;
}

export default async function BlogSection() {
  // fetch data using the getData function
  const data: simplePostCard[] = await getData();

  return (
    <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-5'>
      {data?.length > 0 &&
        data.map((post, idx) => (
          <Card key={idx}>
            <link
              rel='preload'
              as='image'
              href={urlFor(post.titleImage).url()}
            />
            <Image
              // loading='lazy'
              priority // mobile Lighthouse - 69
              src={urlFor(post.titleImage)
                .width(500)
                .height(300)
                // .quality(80)
                .url()}
              alt='Head Section Title Image'
              width={500}
              height={300}
              className='rounded-t-lg h-[200px] object-cover w-full'
              sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px'
            />

            <CardContent className='mt-5'>
              <h3 className='text-xl dark:text-gray-200 font-semibold line-clamp-2 tracking-normal'>
                {post.title}
              </h3>
              <p className='line-clamp-3 text-base mt-2 text-gray-600 dark:text-gray-300'>
                {post.smallDescription}
              </p>

              <div>
                {post.categories && (
                  <div className='mt-4'>
                    <span className='text-sm p-1 border rounded-lg font-semibold text-teal-500 tracking-wider'>
                      {post.categories
                        .map((category) => `#${category.title}`)
                        .join(' ')}
                    </span>
                  </div>
                )}
              </div>

              <Button asChild className='w-full mt-7 border'>
                <Link href={`/blog/${post.currentSlug}`}>
                  Read An Article
                  <MoveUpRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
