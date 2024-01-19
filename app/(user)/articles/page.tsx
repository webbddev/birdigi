import BlogSection from '@/app/components/BlogSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
};

export default function Articles() {
  return (
    <div>
      <BlogSection />
    </div>
  );
}
