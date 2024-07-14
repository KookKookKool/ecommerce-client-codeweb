
"use client";

import Box from "@/components/box";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-carts";
import { Products } from "@/types-db";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CartItemProps {
  item: Products;
}

const CartItem = ({ item }: CartItemProps) => {
  const [qty, setQty] = useState(item.qty ?? 1);

  const cart = useCart();

  const handleQuantity = (num: number) => {
    if (num < 1) return;
    setQty(num);
    cart.updateItemQuantity(item.id, num);
  };

  const formattedPrice = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(item.price * item.qty);

  return (
    <Box className="flex flex-wrap items-center gap-4 border border-white-200 p-3 rounded-lg sm:flex-nowrap">
      <div className="aspect-square w-24 min-w-24 h-24 min-h-24 rounded-md bg-background2 flex items-center justify-center relative overflow-hidden">
        <Image
          alt={item.name}
          fill
          className="w-full h-full object-contain"
          src={item.images[0].url}
        />
      </div>
      <div>
        <h2 className="w-full min-w-44 whitespace-nowrap truncate font-semibold text-2xl text-white">
          {item.name}
        </h2>
        <div className="w-full flex items-center justify-start gap-2 flex-wrap mt-4">
          {item.category && (
            <div className="rounded-md bg-background px-2 py-[2px] text-[12px] font-semibold capitalize">
              {item.category}
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-start gap-2 flex-wrap mt-4">
          {item.size && (
            <div className="rounded-md bg-background px-2 py-[2px] text-[12px] font-semibold capitalize">
              {item.size}
            </div>
          )}
        </div>
      </div>

      <Box className="flex items-center justify-center h-full">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-primary bg-transparent shadow-none pb-[1.5px]"
            onClick={() => handleQuantity(qty - 1)}
          >
            -
          </button>
          <input
            type="number"
            className=" w-12 h-8 text-center text-white border border-primary rounded-md bg-background appearance-none"
            value={qty}
            onChange={(e) => handleQuantity(parseInt(e.target.value) || 1)}
            min="1"
          />
          <button
            className="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center border border-primary bg-transparent shadow-none pb-[1.5px]"
            onClick={() => handleQuantity(qty + 1)}
          >
            +
          </button>
        </div>
      </Box>

      <Box className="flex items-center justify-center h-full">
        <h2>{formattedPrice}</h2>
      </Box>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => cart.removeItem(item.id)}
        className="cursor-pointer p-2 text-muted-foreground hover:text-red-500"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </Box>
  );
};

export default CartItem;

