import { useState } from "react";
import AddProductModal from "./AddProductModal";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/redux/api/api";

type TProduct = {
  _id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  rating: number;
  image: string;
};
interface CategoryCardProps {
  name: string;
}

const ProductContainer = () => {
  const [category, setCategory] = useState("");

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery(null);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ category });

  return (
    <>
      {/* Category Container */}
      <div>
        <h1 className="text-center py-10 text-6xl font-bold">Categories</h1>
        {/* <CategoryContainer categories={categories?.data || []}>  </CategoryContainer> */}
        <div className="flex justify-between gap-10 rounded-xl">
          {" "}
          {categories?.data?.map((category: CategoryCardProps, index) => (
            <div key={index} className="bg-white/5 shadow-md px-10 rounded-xl">
              {" "}
              <div className="p-4">
                <p className="text-lime-950 text-xl font-bold">{category.name}</p>
              </div>{" "}
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-center py-10 text-6xl font-bold">Products</h1>
      {/* Products table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-semibold text-black">
              <th className="text-left">Image</th>
              <th className="text-left">Title</th>
              <th className="text-left">Price</th>
              <th className="text-left">Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isProductsLoading ? (
              <p className="text-green-500">Loading...</p>
            ) : isProductsError ? (
              <p className="text-red-500">Oops! Error loading products</p>
            ) : (
              products?.data?.map((product: TProduct) => (
                <ProductCard key={product._id} {...product} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductContainer;
