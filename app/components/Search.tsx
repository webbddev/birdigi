'use client';

import { useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Result, simplePostCard } from '../lib/interface';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  const handleSearch = async () => {
    const query = `
        *[_type == 'post' && title match '${searchTerm}*'] | order(_createdAt desc) {
          title,
          smallDescription,
          "currentSlug": slug.current,
          titleImage,
          categories[]->{
            _id,
            title
          }
        }`;
    const data = await client.fetch(query);
    setResults(data); // handle the search results
  };

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map((result, idx) => (
        <div className='my-5' key={idx}>
          <Card>
            <link
              rel='preload'
              as='image'
              href={urlFor(result.titleImage).url()}
            />
            <Image
              src={urlFor(result.titleImage).width(500).height(300).url()}
              alt='Search Result Image'
              width={500}
              height={300}
              className='rounded-lg object-cover w-full'
              sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px'
            />

            <CardContent className='mt-5'>
              <h3 className='text-xl dark:text-gray-200 font-semibold line-clamp-2 tracking-normal'>
                {result.title}
              </h3>
              <p className='line-clamp-3 text-base mt-2 text-gray-600 dark:text-gray-300'>
                {result.smallDescription}
              </p>

              <div>
                {result.categories && (
                  <div className='mt-4'>
                    <span className='text-sm p-1 border rounded-lg font-semibold text-teal-500 tracking-wider'>
                      {result.categories
                        .map((category) => `#${category.title}`)
                        .join(' ')}
                    </span>
                  </div>
                )}
              </div>

              <Button asChild className='w-full mt-7 border'>
                <Link href={`/blog/${result.currentSlug}`}>
                  Read An Article
                  <MoveUpRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
