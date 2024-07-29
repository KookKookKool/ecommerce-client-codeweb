import React from "react";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import { Blog } from "@/types-db";
import getBlogs from "@/actions/get-blog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import sanitizeHtml from "sanitize-html"; // Import sanitizeHtml

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
  const createdAt = (blog.createdAt as Timestamp)?.toDate();

  const sortedBlogs = blogs
    .map(blog => ({
      ...blog,
      createdAt: (blog.createdAt as Timestamp).toDate()
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  // Filter out the current blog from the sortedBlogs
  const otherBlogs = sortedBlogs.filter(b => b.id !== blogId);

  // Function to strip HTML tags from a string
  const stripHtmlTags = (html: string): string => {
    return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  };

  return (
    <Container className="px-4 md:px-12">
      <section className="my-4 py-12">
        <h1 className="text-center text-4xl lg:text-5xl font-bold tracking-wider uppercase my-4">
          {blog.label}
        </h1>
        <Image
          src={blog.imageUrl}
          alt={blog.label}
          width={1200}
          height={800}
          className="w-full h-auto object-cover rounded-md mb-8"
        />
        {/* Render ContentLabel with inner HTML */}
        <div
          className="prose prose-lg max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: blog.ContentLabel }}
        />
        <p className="text-base text-gray-600">
          Date Posted: {createdAt?.toLocaleDateString()}
        </p>

        <div className="text-center mt-8">
          <Link href="/blog">
            <Button className="px-8 py-4 rounded-full bg-primary hover:bg-red-900">
              Go Back Blogs
            </Button>
          </Link>
        </div>
        <div>
          <h2 className="text-4xl font-bold tracking-wider uppercase my-4">
            Our Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display the first 3 blogs in otherBlogs */}
            {otherBlogs.slice(0, 3).map((blog) => (
              <Link href={`/blog/${blog.id}`} key={blog.id}>
                <div className="p-4 border rounded-lg cursor-pointer">
                  <Image
                    src={blog.imageUrl}
                    alt={blog.label}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{blog.label}</h3>
                  <p className="text-base text-Title2">
                    {/* Strip HTML tags and truncate the text */}
                    {stripHtmlTags(blog.ContentLabel).slice(0, 120)}
                    {stripHtmlTags(blog.ContentLabel).length > 120 && "..."}
                  </p>
                  <p className="text-base text-grey-600">
                    Date Posted: {createdAt?.toLocaleDateString()}
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
