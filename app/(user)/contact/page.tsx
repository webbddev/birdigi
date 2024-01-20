'use client';

import { useState } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import contactImg from '../../../images/contact_me-crop-removebg-hd.webp';
import { Metadata } from 'next';
import metadataContact from './metaContact';

const metadata: Metadata = {
  title: 'Contact',
};

// const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
// const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
// const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

const serviceId = 'service_01cdr11';
const publicKey = 'E0ZusFaL6tRW0y_Fo';
const templateId = 'template_h6hfhke';

if (!serviceId || !templateId || !publicKey) {
  console.error('One or more EmailJS variables are not defined.');
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState<null | string>(null);

  // send email using EmailJS
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Birdigi',
      message: message,
    };

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        setNotification('An email has been sent');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      } else {
        console.error('EmailJS variables are not defined.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className=' '>
      <div className='mx-auto h-full'>
        <div className='flex flex-col lg:flex-row h-full items-center justify-start pt-16 gap-x-8 text-center lg:text-left'>
          {/* bg */}
          {/* <div className='hidden lg:flex bg-teal-50 dark:bg-[#7b736f] absolute bottom-0 left-0 right-0 top-1/3 -z-10 '></div> */}
          {/* text & form */}
          <div className='lg:flex-1 lg:pt-32 px-4'>
            <h1 className='text-5xl lg:text-9xl pb-8 dark:text-gray-200 font-light tracking-tighter font-display'>
              Contact me
            </h1>
            <p className='mb-12'>I am open for my new business adventure.</p>

            {/* form */}
            <form
              // ref={form}
              id='blogContactId'
              onSubmit={sendEmail}
              className='flex flex-col gap-y-4'
            >
              <div className='flex gap-x-10'>
                {/* name */}
                <input
                  type='text'
                  placeholder='Your name'
                  className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name='from_name'
                />
                {/* email */}
                <input
                  type='email'
                  placeholder='Your email address'
                  className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name='from_email'
                />
              </div>
              {/* message */}
              <input
                placeholder='Your message'
                className='outline-none border-b border-b-primary h-[60px] bg-transparent font-secondary w-full pl-3 placeholder:text-[#757879]'
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name='message'
              />
              {/* Confirmation of sent email */}
              {notification && (
                <div className='text-green-400'>{notification}</div>
              )}
              <button
                type='submit'
                className='lg:mx-0 self-start mt-7 border cursor-pointer'
              >
                <Button asChild>
                  <span>
                    <Mail className='mr-2 h-4 w-4' />
                    Send It
                  </span>
                </Button>
              </button>
            </form>
          </div>
          {/* image */}
          <div className='lg:flex-1'>
            <Image src={contactImg} alt='portrait of an author' />
          </div>
        </div>
      </div>
    </div>
  );
}
