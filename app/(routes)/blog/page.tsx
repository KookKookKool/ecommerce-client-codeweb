import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getBlog from "@/actions/get-blog";
import { Blog } from "@/types-db";

export const revalidate = 0;

const AllBlogsPage = async () => {
  const blogs: Blog[] = await getBlog();

  // Sort blogs by creation date
  const sortedBlogs = blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <Container className="px-4 md:px-12">
      <section className="my-4 py-12 flex flex-col items-center justify-center">
        <h2 className="text-5xl md:text-5xl font-bold tracking-wider uppercase text-Title my-4">
          All Blogs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="p-4 border rounded-lg cursor-pointer">
                <img src={blog.imageUrl} alt={blog.label} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-2xl font-bold mb-2">{blog.label}</h3>
                <p className="text-base text-Title2">
                  {blog.ContentLabel.slice(0, 120)}{blog.ContentLabel.length > 120 && '...'}
                </p>
                <p className="text-base text-Title2">Date Posted: {blog.createdAt.toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/">
            <Button className="px-8 py-4 rounded-full bg-primary hover:bg-red-900">
              Back to Home
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default AllBlogsPage;
