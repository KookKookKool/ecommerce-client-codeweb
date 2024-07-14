import { Blog } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const getBlog = async (): Promise<Blog[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const blogs: Blog[] = await res.json();

  // Convert createdAt to JavaScript Date objects
  return blogs.map(blog => {
    const createdAt = blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000) : new Date(blog.createdAt);
    return {
      ...blog,
      createdAt,
    };
  });
};

export default getBlog;
