import Search from './Search';

const HeroSection = () => {
  return (
    // Hero Container
    <div className='flex max-w-6xl mx-auto p-6 lg:mt-8'>
      {/* Content Container */}
      <div className='flex flex-col space-y-7 mb-2 items-center'>
        <h1 className='text-5xl font-bold text-center lg:text-6xl md:text-center p-3'>
          Unlock Digital Success: SEO Insights
        </h1>
        <p className='text-xl md:text-2xl text-center dark:text-gray-550 lg:text-center'>
          Embark on a Journey of Insights: Discover the Latest in Digital
          Marketing, SEO, and AI Strategies for Sustainable Success
        </p>
        <div className='block mx-auto text-center text-2xl lg:text-4xl tracking-wider text-gray-700'>
          ...
        </div>
        {/* <div className='block mx-auto text-center'>
          <Search />
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
