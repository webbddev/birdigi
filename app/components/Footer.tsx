import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className='w-full bg-primary text-center max-w-6xl mx-auto px-4 py-5 mt-5'>
      <p className='text-white'>
        &copy; {currentYear} Birdigi. All rights reserved.
      </p>
    </div>
  );
}
