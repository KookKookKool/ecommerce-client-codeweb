// actions/get-blog.ts
import { Blog } from "@/types-db";
import { Timestamp } from "firebase/firestore";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const getBlog = async (): Promise<Blog[]> => {
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const blogs: Blog[] = await res.json();

  // Convert createdAt to JavaScript Date objects
  return blogs.map(blog => {
    const createdAt = (blog.createdAt as unknown as { seconds: number }).seconds 
      ? new Date((blog.createdAt as unknown as { seconds: number }).seconds * 1000)
      : new Date(blog.createdAt as unknown as string);
    
    return {
      ...blog,
      createdAt: Timestamp.fromDate(createdAt),  // Convert back to Timestamp
    };
  });
};

export default getBlog;
