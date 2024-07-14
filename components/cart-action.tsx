"use client";

import useCart from "@/hooks/use-carts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface CartActionButtonProps {
  onClick?: () => void;
}

const CartActionButton = ({ onClick }: CartActionButtonProps) => {
  const [mounted, setMounted] = useState(false);

  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    router.push("/cart");
  };

  return (
    <div className="ml-4 flex items-center justify-center gap-x-4">
      <Button className="rounded-full w-[60px]" size="icon" onClick={handleClick}>
        <ShoppingBag className="h-4 w-4 text-white" />
        <span className="text-sm font-medium text-white ml-2">{cart.items.length}</span>
      </Button>
    </div>
  );
};

export default CartActionButton;
