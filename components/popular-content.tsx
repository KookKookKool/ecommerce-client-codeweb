"use client";

import React from 'react';
import { Products } from "@/types-db";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import useCart from "@/hooks/use-carts";
import { useRouter } from "next/navigation";

interface PopularContentProps {
  data: Products;
}

export const PopularContent = ({ data }: PopularContentProps) => {
  const formattedPrice = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(data.price);

  const router = useRouter();

  const cart = useCart();

  const addToCart = (data: Products) => {
    cart.addItem({ ...data, qty: 1 });
    router.push('/cart');
  };

  //

  return (
    <>
      <div className="w-full lg:w-[100%] min-w-[280px] px-10 pt-16 pb-8 bg-background2 rounded-lg self-stretch hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
        <Link href={`/service/${data.id}`}>
          <h2 className="text-center font-semibold text-lg tracking-wider text-Title mb-3 drop-shadow-[3px_3px_5px_rgba(91,91,91,0.58)] hover:text-primary">
            {data.name}
          </h2>
        </Link>
        <p className="text-center tracking-tighter block mb-14">
          <span className="text-4xl font-bold">{formattedPrice}</span>
        </p>
        <button
          className="w-full p-2 bg-background text-white rounded-md font-semibold hover:bg-[#FF0000] transition-all duration-150 ease-in mb-8 border-[#13181f]"
          onClick={() => addToCart(data)}
        >
          Add to cart
        </button>
        <ol className="list-disc text-[#ff2865] w-[80%] mx-auto">
          <div className="flex flex-row gap-2 mb-2">
            {data.category && (
              <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[9px] text-Title2 font-semibold capitalize whitespace-nowrap w-full truncate text-center">
                {data.category}
              </div>
            )}

            {data.size && (
              <div className="rounded-md bg-red-500/10 px-2 py-[2px] text-[9px] text-Title2 font-semibold capitalize whitespace-nowrap w-full truncate text-center">
                {data.size}
              </div>
            )}
          </div>
        </ol>
        <CardDescription className="text-left text-[16px] text-Title2 text-wrap px-2 my-3 w-[14rem] tacking-wider">
          {data.Details.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </CardDescription>
      </div>
    </>
  );
};
