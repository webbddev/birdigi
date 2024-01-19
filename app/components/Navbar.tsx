'use client';

import Link from 'next/link';
import blackLogo from '../../public/Black logo - no background.svg';
import whiteLogo from '../../public/White logo - no background.svg';

import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import MobileNav from './MobileNav';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();

  const links = [
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Articles',
      href: '/articles',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ];

  const logoSrc =
    theme === 'light'
      ? blackLogo
      : theme === 'dark'
      ? whiteLogo
      : typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ? whiteLogo
      : blackLogo;

  return (
    <>
      <nav className='w-full relative flex items-center justify-between max-w-6xl mx-auto px-4 py-5'>
        <Link href='/'>
          <Image
            priority
            src={logoSrc}
            alt='Logo'
            width={250}
            height={60}
            className='w-40 md:w-44 lg:w-56 h-auto'
          />
        </Link>

        <div className='flex items-center justify-between'>
          <div className='hidden gap-12 md:flex md:mr-4 lg:mr-10'>
            {links.map((link, idx) => (
              <div key={idx}>
                {pathname === link.href ? (
                  <Link
                    className='text-lg font-semibold text-teal-500'
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    className='text-lg font-semibold text-gray-600 dark:text-gray-400 transition duration-100 hover:text-primary relative group overflow-hidden'
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div>
            <MobileNav />
          </div>

          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
