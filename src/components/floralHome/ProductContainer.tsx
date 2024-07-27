import { useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useAddCategoryMutation,
  useAddProductMutation,
} from "@/redux/api/api";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../productsCard/ProductCard";

type TProduct = {
  _id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  rating: number;
  image: string;
  addedToCart: boolean;
};

interface CategoryCardProps {
  name: string;
}

const ProductContainer = () => {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery(null);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ category, page, limit });
  // console.log(productsData);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Toaster />

      {/* Category Container and cards part Starts here*/}
      <div className="py-10">
        <hr />
        <h1 className="text-center py-10 text-6xl font-bold">Categories</h1>
        <hr />
        {/* Category cards*/}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-24">
          {categories?.data?.map((category: CategoryCardProps, index) => (
            <div key={index} className="bg-black/5 shadow-md px-10 rounded-xl">
              <div className="p-4">
                <p className="text-lime-600 text-xl font-black">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Category Container and cards part Ends here*/}
      {/* Products container and card Starts here */}
      <div className="py-24">
        <hr />
        <h1 className="text-center py-10 text-6xl font-bold">Products</h1>
        <hr />
        {/* Set page limit And Products search part */}
        <div className="py-5">
          <div className="flex justify-between items-center">
            <div className="flex justify-end gap-3 items-center">
              <button
                onClick={() => setCategory("price")}
                className="px-6 py-3 border border-black hover:bg-black text-black hover:text-white rounded-md transition duration-300"
              >
                Sort by price
              </button>
              <button
                onClick={() => setCategory("category")}
                className="px-6 py-3 border border-black hover:bg-black text-black hover:text-white rounded-md transition duration-300"
              >
                Sort by category
              </button>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="text"
                // value={newProduct.title}
                placeholder="Product title"
                className="input input-bordered rounded-r-none w-full bg-white text-black border border-black"
              />
              <button
                onClick={() => setCategory("category")}
                className="px-6 py-3 border bg-black text-white rounded-md rounded-l-none transition duration-300"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="bg-white text-black py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {isProductsLoading ? (
              <p className="text-green-500">Loading...</p>
            ) : isProductsError ? (
              <p className="text-red-500">Oops! Error loading products</p>
            ) : (
              productsData?.data?.map((product: TProduct) => (
                <ProductCard key={product._id} {...product} />
              ))
            )}
          </div>
          {/* Pagination */}
          <div className="my-4 flex justify-between items-center">
            <button
              className="w-10 h-10 rounded-full"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              <MdOutlineNavigateBefore className="text-2xl font-black" />
            </button>
            <span className="mx-4">
              Page {productsData?.pagination?.currentPage} of{" "}
              {productsData?.pagination?.totalPages}
            </span>
            <button
              className="w-10 h-10 rounded-full"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= productsData?.pagination?.totalPages}
            >
              <MdOutlineNavigateNext className="text-2xl font-black" />
            </button>
          </div>
        </div>
      </div>
      {/* Products container and card Ends here */}
    </>
  );
};

export default ProductContainer;
