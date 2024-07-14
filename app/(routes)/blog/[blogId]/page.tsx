// [blogId]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { Blog } from "@/types-db";
import getBlogs from "@/actions/get-blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";

export const revalidate = 0;

export async function generateStaticParams() {
  const blogs: Blog[] = await getBlogs();
  return blogs.map((blog) => ({
    blogId: blog.id,
  }));
}

const getBlogById = async (blogId: string) => {
  const blogs: Blog[] = await getBlogs();
  return blogs.find((blog) => blog.id === blogId) || null;
};

const BlogDetailPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;
  const blog = await getBlogById(blogId);

  if (!blog) {
    notFound();
  }

  const blogs: Blog[] = await getBlogs();

  // แปลง createdAt เป็น Date
  const createdAt = (blog.createdAt as Timestamp).toDate();

  return (
    <Container className="px-4 md:px-12">
      <section className="my-4 py-12">
        <h1 className="text-2xl text-center justify-center xl:text-[40px] lg:text-[38px] md:text-3xl font-bold tracking-wider uppercase text-Title my-4 ">
          {blog.label}
        </h1>
        <Image
          src={blog.imageUrl}
          alt={blog.label}
          width={1200} // Adjust accordingly
          height={800} // Adjust accordingly
          className="w-full h-[100%] object-cover rounded-md mb-8"
        />
        <p className="text-lg text-Title2">
          {blog.ContentLabel.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <p className="text-base text-Title2">Date Posted: {createdAt.toLocaleDateString()}</p>

        <div className="text-center mt-8">
          <Link href="/blog">
            <Button className="px-8 py-4 rounded-full bg-primary hover:bg-red-900">
              Go Back Blogs
            </Button>
          </Link>
        </div>
        <div>
          <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-Title my-4">
            Our Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <Link href={`/blog/${blog.id}`} key={blog.id}>
                <div className="p-4 border rounded-lg cursor-pointer">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.label}
                    width={400} // Adjust accordingly
                    height={300} // Adjust accordingly
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{blog.label}</h3>
                  <p className="text-base text-Title2">
                    {blog.ContentLabel.slice(0, 120)}
                    {blog.ContentLabel.length > 120 && "..."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default BlogDetailPage;
