import getCategories from '@/actions/get-categories';
import Box from '@/components/box2';
import Container from '@/components/container';
import FilterContainer from '@/components/filter-container';
import React from 'react'
import CategoryFilters from './components/category-filters';
import getSizes from '@/actions/get-sizes';
import SizesFilter from './components/size-filters';
import getProducts from '@/actions/get-products';
import PageContent from './components/page-content';

export const revalidate = 0;

interface ServiceProps {
    searchParams: {
        size?: string;
        isFeatured?: boolean;
        cuisine?: string;
        category?: string;
        kitchen?: string;
    };
}

const ServicePage = async ({searchParams} : ServiceProps) => {
    const categories = await getCategories();
    const sizes = await getSizes();

    const products = await getProducts({
        size : searchParams?.size,
        isFeatured : searchParams?.isFeatured,
        category : searchParams?.category,
    });

    const sortedProducts = products.sort((a, b) => a.price - b.price);

  return (
    <Container className='px-4 md:px-12 '>
        <div className='grid grid-cols-1 md:grid-cols-12 py-12 gap-2 '>
            <div className='hidden md:block col-span-2 border-r border-gray-100 top-24'>
                <FilterContainer>
                    <CategoryFilters categories={categories} />
                    <SizesFilter sizes={sizes} />
                </FilterContainer>
            </div>
            <Box className='col-span-12 md:col-span-10 flex-col w-full'>
                <PageContent products={products} />
            </Box>
        </div>
    </Container>
  )
}

export default ServicePage;