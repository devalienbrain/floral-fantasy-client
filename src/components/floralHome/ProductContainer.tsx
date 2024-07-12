import { useState } from 'react';
import AddProductModal from './AddProductModal';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/redux/api/api';

type TProduct = {
    _id: string;
    title: string;
    price: number;
    category: string;
    quantity: number;
    description: string;
    rating: number;
    image: string;
  }

const ProductContainer = () => {
  const [category, setCategory] = useState('');
  
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery(null);
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery({ category });

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddProductModal />
        <CategoryFilter category={category} setCategory={setCategory} categories={categories?.data || []} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
          {isProductsLoading ? (
            <p>Loading...</p>
          ) : isProductsError ? (
            <p>Error loading products</p>
          ) : (
            products?.data?.map((product: TProduct) => <ProductCard key={product._id} {...product} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
