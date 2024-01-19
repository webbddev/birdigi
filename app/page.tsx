import dynamic from 'next/dynamic';

const DynamicHeroSection = dynamic(
  () => import('./components/HeroSection')
);
const DynamicBlogSection = dynamic(() => import('./components/BlogSection'));

export default function Home() {
  return (
    <>
      <DynamicHeroSection />
      <DynamicBlogSection />
    </>
  );
}

// import BlogSection from './components/BlogSection';
// import HeroSectionFlat from './components/HeroSectionFlat';

// export default function Home() {
//   return (
//     <>
//       <HeroSectionFlat />
//       <BlogSection />
//     </>
//   );
// }
