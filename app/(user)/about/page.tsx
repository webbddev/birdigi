import Image from 'next/image';
import contactImg from '../../../images/contact-me-original.jpg';
// import aboutImg from '../../../images/imageAboutAlya.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function About() {
  return (
    <div className='mx-auto h-full'>
      {/* text & img wrapper */}
      <div className='flex flex-col lg:flex-row h-full items-center justify-center gap-x-24 text-center lg:text-left lg:pt-24'>
        {/* image */}
        <div className='flex-1 md:max-h-full lg:max-h-max overflow-hidden'>
          <Image
            src={contactImg}
            className='object-cover md:w-full'
            alt='portrait of an author'
          />
        </div>
        {/* text */}
        <div className='flex-1 pt-16 pb-14 lg:pt-0 lg:w-auto z-10 flex flex-col justify-center items-center lg:items-start'>
          <h1 className='text-5xl md:text-base lg:text-9xl pb-8 dark:text-gray-200 font-light tracking-tighter font-display'>
            About Me
          </h1>
          <p className='mb-12 md:mb-6 max-w-[450px] font-light tracking-normal'>
            <p className='text-xl font-semibold p-0 '>Welcome to Birdigi</p>
            <br />
            <br /> My name is Alya. I bring a wealth of experience from my
            dynamic career in journalism, where I&apos;ve served as a seasoned
            TV host, conducting engaging live interviews and crafting compelling
            articles. With a background deeply rooted in TV production,
            I&apos;ve honed my skills in delivering content that captivates
            audiences.
            <br />
            <br />
            Driven by a passion for staying at the forefront of digital trends,
            I&apos;m currently embarking on a new journey in the realms of
            digital marketing and SEO. My expertise now extends to the
            ever-evolving landscape of online visibility and strategic
            marketing.
            <br />
            <br />
            Here at Birdigi, I share insights and knowledge garnered from my
            experiences, aiming to demystify the intricacies of SEO and other
            digital marketing facets. Join me on this exciting exploration of
            the digital realm, where I blend my journalistic prowess with a keen
            understanding of the online landscape.
            <br />
            <br />I warmly welcome fellow SEO and digital marketing specialists
            to contribute their expertise to enrich the discussions on Birdigi.
            Let&apos;s build a community where insights flow freely and
            collectively elevate our understanding of digital strategies.
            <br />
            <br />
            <span className='font-semibold tracking-wider'>Alya Gordienko</span>
          </p>
          <Button asChild className='self-start mt-4 lg:mt-7 border'>
            <Link href='/contact'>
              <Mail className='mr-2 h-4 w-4' />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
