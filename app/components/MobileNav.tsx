import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Library, Indent } from 'lucide-react';

const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openMenu, menuRef]);

  return (
    <nav>
      {/* button to open/close the mobile menu */}
      <div
        onClick={handleMenuToggle}
        className='md:hidden text-3xl cursor-pointer ml-4'
      >
        <Library className='mr-1' />
      </div>

      {/* mobile menu */}
      <div
        ref={menuRef}
        className={`${
          openMenu ? 'opacity-95' : 'opacity-0'
        } dark:bg-teal-600 bg-white shadow-2xl w-full absolute top-0 right-0 max-w-xs h-screen z-20 md:hidden rounded-l-lg`}
        style={{
          transition: 'opacity 0.4s ease-in-out',
          pointerEvents: openMenu ? 'auto' : 'none',
        }}
      >
        {/* icon */}
        <div
          onClick={handleMenuToggle}
          className='text-4xl absolute z-30 left-4 top-14 text-primary dark:text-teal-300 cursor-pointer'
        >
          <Indent />
        </div>
        {/* menu links */}
        <ul className='h-full flex flex-col justify-center items-center gap-y-8 text-primary dark:text-gray-200 font-primary font-bold text-2xl'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <li>
            <Link href='/articles'>Articles</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileNav;
