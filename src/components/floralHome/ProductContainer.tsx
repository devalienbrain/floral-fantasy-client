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
interface CategoryCardProps {
  name: string;
  }

const ProductContainer = () => {
  const [category, setCategory] = useState('');

  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useGetCategoriesQuery(null);
  const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useGetProductsQuery({ category });

  return (
    <div>
      <div>
      {/* <CategoryContainer categories={categories?.data || []}>  </CategoryContainer> */}
      <div className='bg-white border border-lime-300 rounded-b-md px-5 flex justify-between py-5'> {categories?.data?.map((category: CategoryCardProps, index) => (
        <div key={index}>  <div className="p-4">
        <p className="mt-2 text-lime-900">Category: {category.name}</p>
      </div> </div>
      ))}</div>
      </div>
      <div className="flex flex-col justify-between mb-5">
        
        <CategoryFilter category={category} setCategory={setCategory} categories={categories?.data || []} />
        <AddProductModal />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="py-5 w-full h-full rounded-lg space-y-3">
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
