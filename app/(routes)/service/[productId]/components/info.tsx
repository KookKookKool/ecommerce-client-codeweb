"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";
import { cn } from "@/lib/utils";
import { Product } from "@/types-db";
import { ShoppingCart } from "lucide-react";

interface InfoProp {
  product: Product;
}

export const revalidate = 0;

const Info = ({ product }: InfoProp) => {
    const [qty, setQty] = useState(1);

    const cart = useCart();

    const handleQty = (num: number) => {
        setQty(num);
        cart.updateItemQuantity(product.id, num);
    };

    const addToCart = (data: Product) => {
        cart.addItem({ ...data, qty: qty });
    };

    const formattedPrice = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
    }).format(product.price);

    return (
        <div>
            <h1 className="text-3xl font-bold text-Title">{product.name}</h1>
            <div className="mt-3 flex items-end justify-between">
                <p className="text-base text-left text-Title2">
                    {product.DetailsInfo.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>
            </div>

            <div className="w-full flex items-center justify-start gap-2 flex-wrap px-2 mt-8">
                {product.category && (
                    <div className="rounded-md bg-background2 px-3 py-2 text-Title3 font-semibold capitalize flex items-center gap-2">
                        {product.category}
                    </div>
                )}

                {product.size && (
                    <div className="rounded-md bg-background2 px-3 py-2 text-Title3 font-semibold capitalize flex items-center gap-2">
                        {product.size}
                    </div>
                )}
            </div>

            <div className="w-full grid grid-cols-4 my-12">
                <div className="col-span-1 space-y-8">
                    <p className="text-lg font-semibold text-Title">Price</p>
                    <p className="text-lg font-semibold text-Title">Qty</p>
                </div>
                <div className="col-span-3 space-y-8">
                    <p className="text-xl font-bold text-white"> {formattedPrice}</p>
                    <div className="flex items-center gap-2">
                        {[1].map((num) => (
                            <div
                                key={num}
                                className={cn(
                                    "w-8 h-8 cursor-pointer rounded-md flex items-center justify-center border border-primary",
                                    qty === num
                                        ? "bg-primary shadow-md text-white"
                                        : "bg-transparent shadow-none"
                                )}
                                onClick={() => handleQty(num)}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Button
                onClick={() => addToCart(product)}
                className="w-full py-6 text-xl font-semibold hover:bg-primary hover:text-white flex items-center justify-center gap-3"
            >
                Add to cart
                <ShoppingCart className="w-4 h-4" />
            </Button>
        </div>
    );
};

export default Info;
