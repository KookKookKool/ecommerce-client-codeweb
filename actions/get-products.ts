import { Products } from "@/types-db";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    size?: string;
    isFeatured?: boolean;
    cuisine?: string;
    category?: string;
    kitchen?: string;
}

const getProducts = async (query: Query): Promise<Products> => {
    const queryString = qs.stringify({
        size: query.size,
        isFeatured: query.isFeatured,
        cuisine: query.cuisine,
        category: query.category,
        kitchen: query.kitchen,
    });

    const url = `${URL}?${queryString}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
};

export default getProducts;
