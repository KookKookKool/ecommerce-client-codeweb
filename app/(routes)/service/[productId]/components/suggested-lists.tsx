"use client";

import { useEffect, useState } from "react";
import { PopularContent } from "@/components/popular-content";
import { Product } from "@/types-db";
import { useParams } from "next/navigation";

interface SuggestedListProps {
  products: Product[];
}

const SuggestedList = ({ products }: SuggestedListProps) => {
  const { productId } = useParams();
  const [updatedProducts, setUpdatedProducts] = useState<Product[]>(products);

  const fetchUpdatedProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Product[] = await response.json();
      
      // Verify the data structure and sorting
      console.log('Fetched Products:', data);

      const sortedProducts = data.sort((a, b) => a.price - b.price);

      // Verify the sorted products
      console.log('Sorted Products:', sortedProducts);

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
        <p className="text-2xl text-Title font-semibold">No Product</p>
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
