import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const loading = () => {
  return (
    <Skeleton className='mt-8'>
      <div>
        <Skeleton className='text-sm font-normal text-center leading-6 tracking-wide	text-primary'></Skeleton>
      </div>

      <Skeleton className='mt-2 mb-3 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl'></Skeleton>

      <Skeleton className='flex items-center md:flex-col justify-center max-w-sm mx-auto mt-2 text-center rounded-xl'>
        <Image
          src={''}
          width={80}
          height={80}
          className='object-cover w-12 h-12 md:w-14 md:h-14 rounded-full border dark:border-amber-50 mr-2'
          alt=''
        />
        <div className='flex flex-col items-center p-2'>
          <Skeleton className='text-sm md:text-base text-primary mt-2 tracking-wide'></Skeleton>
          <Skeleton className='text-sm md:text-base'></Skeleton>
        </div>
      </Skeleton>

      {/* Individual Blog Post Head Image */}
      <div className='w-full mx-auto'>
        <Skeleton className='rounded-lg mt-4 border mx-auto' />
      </div>

      <Skeleton className='mt-2 md:mt-10 mb-10 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary max-w-none mx-auto'></Skeleton>
    </Skeleton>
  );
};

export default loading;
