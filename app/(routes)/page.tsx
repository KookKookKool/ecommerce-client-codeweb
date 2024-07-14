// app/(routes)/page.tsx
import Spline from "@splinetool/react-spline/next";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import getProducts from "@/actions/get-products";
import { PopularContent } from "@/components/popular-content";
import CardAbout from "@/components/card-aboutus";
import getBlogs from "@/actions/get-blog";
import { Blog } from "@/types-db";
import LogoCarousel from "@/components/logo-slider";
import Image from "next/image";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });

  const sortedProducts = products.sort((a, b) => a.price - b.price);

  const blogs: Blog[] = await getBlogs();
  // Sort blogs by creation date
  const sortedBlogs = blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <>
      <Container className="px-4 md:px-12 overflow-x-hidden">
        <section className="my-4 py-4 sm:py-12 flex flex-col items-center justify-center mx-4">
          <h2 className="text-2xl text-center justify-center xl:text-[40px] lg:text-[38px] md:text-3xl font-bold tracking-wider uppercase text-Title my-4 ">
          &quot;สร้างเว็บไซต์ที่ดึงดูดผู้ใช้ และเต็มไปด้วยความคิดสร้างสรรค์&quot;
          </h2>
          <p className="w-full text-center xl:text-[20px] lg:text-[18px] text-base tracking-wide text-Title2 my-2">
          เพิ่มโอกาสทางธุรกิจด้วยดีไซน์ UI/UX ที่ยอดเยี่ยม พร้อมกลยุทธ์การตลาดที่เหนือกว่า
          </p>

          <Spline
            className="fixed -z-10 top-2 right-0 w-full lg:w-[120%] max-h-[1100px] min-h-[990px]"
            scene="https://prod.spline.design/ojku5dECrVz7XVKl/scene.splinecode"
          />

          <div className="my-4 pt-[88%] sm:pt-[42%]  md:pt-[40%] lg:pt-[38%] flex text-center justify-center gap-6 w-full md:w-auto">
            <Link href={"/service"}>
              <Button className="text-[18px] font-bold px-8 md:px-16 py-4 md:py-6 rounded-full tracking-wide bg-primary hover:bg-red-900">
                บริการต่างๆ
              </Button>
            </Link>
            <Link href={"/about"}>
              <Button
                className="text-[18px] font-bold px-8 md:px-16 py-4 md:py-6 rounded-full tracking-wide text-white"
                variant="outline"
              >
                อ่านเพิ่มเติม
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-20 md:gap-12 my-4 mx-4 py-12">
          {sortedProducts.slice(0, 4).map((item) => (
            <PopularContent key={item.id} data={item} />
          ))}
        </section>

        {/* why choose */}
        <section className="my-4 py-12 md:px-6 flex flex-col items-center justify-center bg-background mx-4 rounded-2xl">
          <h2 className="text-2xl text-center justify-center xl:text-[40px] lg:text-[38px] font-bold tracking-wider uppercase text-Title my-4">
            ทำไมต้องโค้ดเว็บ ?
          </h2>
          <p className="w-full text-center xl:text-[20px] lg:text-[18px] px-8 tracking-wide text-Title2">
          &quot;เพราะโค้ดเว็บมุ่งเน้นการสร้างเว็บไซต์ที่ไม่เพียงแค่สวยงาม แต่ยังใช้งานง่าย สะดวกสบายต่อผู้ใช้ทุกคน ด้วยดีไซน์ที่สร้างความประทับใจแรก พร้อมกับฟังก์ชันที่ตอบสนองทุกความต้องการของธุรกิจคุณ ให้ธุรกิจของคุณโดดเด่นในโลกดิจิทัลและเพิ่มประสิทธิภาพการทำงานอย่างแท้จริง&quot;.{" "}
          </p>
        </section>

        <section>
          <CardAbout />
        </section>

        <section className="my-4 py-4 sm:py-12 flex flex-col items-center justify-center mx-4">
            <LogoCarousel />
          </section>

        {/* blog layout */}
        <section className="bg-background px-12 py-12 rounded-2xl">

          <div className="flex justify-between align-center items-center">
          <h2 className="text-2xl xl:text-[40px] lg:text-[38px] md:text-3xl font-bold tracking-wide uppercase text-Title">
            บทความ
          </h2>
          <div className="text-center mt-8 mb-4">
            <Link href="/blog">
              <Button className=" text-[18px] px-8 py-4 md:px-6 md:py-2 rounded-full tracking-wide bg-primary hover:bg-red-900">
                อ่านเพิ่มเติม
              </Button>
            </Link>
          </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogs.slice(0, 3).map((blog) => (
              <Link href={`/blog/${blog.id}`} key={blog.id}>
                <div className="p-4 border rounded-lg cursor-pointer">
                  <Image src={blog.imageUrl} alt={blog.label} width={400} height={300} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{blog.label}</h3>
                  <p className="text-base text-Title2">
                    {blog.ContentLabel.slice(0, 120)}{blog.ContentLabel.length > 120 && '...'}
                  </p>
                  <p className="text-base text-Title3">Date Posted: {blog.createdAt.toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </Container>
    </>
  );
};

export default HomePage;
