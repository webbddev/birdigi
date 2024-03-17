import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/theme-privider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  ),
  title: { default: 'Birdigi', template: `%s | Birdigi` },
  description: 'Explore the latest post in the world of digital marketing',
  keywords: ['SEO', 'digital marketing', 'keywords analysis', 'SEO trends'],
  twitter: {
    card: 'summary_large_image',
  },
  // verification: {
  //   google: 'google-site-verification=132123123', // TODO - follow ChatGPT on how to obtain a Google Site Verification code and why it's good to have it
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className='max-w-6xl mx-auto px-4 min-h-screen'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
