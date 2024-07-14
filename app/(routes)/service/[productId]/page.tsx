import getProducts from "@/actions/get-products"
import Container from "@/components/container";
import getProduct from "@/actions/get-product";
import Box from "@/components/box";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import Gallery from "./components/gallery/gallery";
import Info from "./components/info";
import SuggestedList from "./components/suggested-lists";

interface ProductPageProps {
  params : {
    productId : string
  }
}

// server-side code
export const revalidate = 0;

const ProductPage = async ( {params} : ProductPageProps) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts ({ category: product?.category })

  return (
    <div>
      <Container className="bg-background rounded-lg my-4 px-4">
        <Box className="text-Title text-sm items-center mt-12">
          <Link href="/" className="flex items-center gap-2">
          <Home className="w-5 h-5" />Main Page
          </Link>

          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <Link
          href="/service"
          className="flex items-center gap-2 text-muted-foreground"
          >
            Service
          </Link>
        </Box>

        <div className="px-4 py-10 sm:px-6 lg:px-8 space-y-10">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery section */}
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px0 lg:mt-0">
              {/* Info section */}
              <Info product={product} />
            </div>
          </div>
          <SuggestedList products={suggestedProducts} />
        </div>
      </Container>
    </div>
  )
}

export default ProductPage;