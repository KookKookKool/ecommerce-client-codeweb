import { Product } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
    const url = `${URL}/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
};

export default getProduct;
