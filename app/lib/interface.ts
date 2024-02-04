export interface Author {
  name: string;
  bioText: string;
  authorImage: any;
  // Add other author-related properties if needed
}

export interface Category {
  _id: string;
  title: string;
  // Add other category-related properties if needed
}

export interface simplePostCard {
  title: string;
  author: Author; // added this
  smallDescription: string;
  currentSlug: string;
  titleImage: any;
  categories?: Category[]; // Optional, as it might not exist in all cases
}

// ? it is an interface for a head post page. Think if I want to add some data related to author's name, author's image and publishing date

export interface fullBlog {
  currentSlug: string;
  title: string;
  smallDescription: string; // Add smallDescription to the interface
  metaDescription: string;
  author: Author; // added this
  authorImage: Author;
  content: any;
  titleImage: any;
  publishedAt: string;
}

export interface NotificationProps {
  message: string;
  onClose: () => void;
}

export interface Result {
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: any; // replace 'any' with the actual type
  categories: { _id: string; title: string }[];
}
