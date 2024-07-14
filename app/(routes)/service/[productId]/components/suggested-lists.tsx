"use client";

import { useEffect, useState } from "react";
import { PopularContent } from "@/components/popular-content";
import { Products } from "@/types-db";
import { useParams } from "next/navigation";

interface SuggestedListProps {
  products: Products[];
}

const SuggestedList = ({ products }: SuggestedListProps) => {
  const { productId } = useParams();
  const [updatedProducts, setUpdatedProducts] = useState<Products[]>(products);

  const fetchUpdatedProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await response.json();

      // จัดเรียงสินค้าตามราคา
      const sortedProducts = data.sort((a: Products, b: Products) => a.price - b.price);

      setUpdatedProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchUpdatedProducts();
  }, [productId]);

  return (
    <div>
      <h2 className="text-3xl text-Title font-semibold">Related Products</h2>

      {updatedProducts.length === 0 ? (
        <p>No Product</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-20 md:gap-y-24 my-6 py-12">
          {updatedProducts.filter(item => item.id !== productId).map(item => (
            <PopularContent key={item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedList;

// server-side code
export const revalidate = 0;
