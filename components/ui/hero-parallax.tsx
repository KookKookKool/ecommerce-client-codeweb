"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] w-[98vw] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
      <div
        ref={ref}
        className="h-[400vh] w-[98vw] py-[80vh] justify-center items-center overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
      >
        <Link href={"/service"}>
          <Button className="xl:text-[20px] lg:text-[18px] mb-4 font-bold px-8 md:px-16 py-4 md:py-6 rounded-xl tracking-wide bg-primary hover:bg-red-900">
            บริการต่างๆ
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="bg-background max-w-7xl md:max-w-5xl relative mx-auto py-20 md:py-40 mx-18 w-[100%] p-[44px] left-0 top-0">
      <h1 className="text-2xl xl:text-[40px] lg:text-[38px] font-bold dark:text-white">
        About Us
      </h1>
      <p className="max-w-2xl xl:text-[20px] lg:text-[18px] text-base mt-8 dark:text-neutral-200 my">
        ที่โค้ดเว็บ
        เรามุ่งมั่นที่จะสร้างสรรค์เว็บไซต์ที่ไม่เพียงแต่สวยงามและทันสมัย
        แต่ยังใช้งานง่ายและตอบสนองความต้องการของผู้ใช้ทุกคน
        ด้วยทีมงานที่เชี่ยวชาญและมีประสบการณ์ เรามอบบริการที่ครบวงจร
        ตั้งแต่การออกแบบ UI/UX ที่ดึงดูดใจ
        ไปจนถึงการพัฒนาเว็บไซต์ที่มีประสิทธิภาพ
        เราเชื่อว่าเว็บไซต์ที่ดีไม่เพียงแต่สร้างความประทับใจแรกให้กับผู้เยี่ยมชม
        แต่ยังช่วยเพิ่มมูลค่าและเสริมสร้างความสำเร็จให้กับธุรกิจของคุณในโลกดิจิทัล.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link href={product.link}>
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {/* {product.title} */}
      </h2>
    </motion.div>
  );
};
