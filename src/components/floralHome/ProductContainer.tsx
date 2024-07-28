import { useState } from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { useGetCategoriesQuery, useGetProductsQuery } from "@/redux/api/api";
import toast, { Toaster } from "react-hot-toast";
import ProductCard from "../productsCard/ProductCard";
import MosaicViewImages from "../mosaicViewImages/MosaicViewImages";

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
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery(null);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ category, search, page, limit, sortBy, sortOrder });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleSortChange = (sortField) => {
    setSortBy(sortField);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Toaster />

      {/* Products container and card Starts here */}
      <div className="py-24 max-w-7xl mx-auto px-10">
        <hr />
        <h1 className="text-center py-10 text-6xl font-black text-red-500">
          Products
        </h1>
        <hr />
        {/* Set page limit And Products search part */}
        <div className="py-5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1 flex md:justify-start items-center gap-2">
              <span>Search by category</span>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                className="px-6 py-3 border border-black rounded-md bg-white text-black"
              >
                <option value="">All Categories</option>
                {categories?.data?.map((category: CategoryCardProps, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex md:justify-center items-center gap-0">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="write keyword"
                className="input input-bordered rounded-r-none w-full bg-white text-black border border-black"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 border bg-black text-white rounded-md rounded-l-none transition duration-300"
              >
                Search
              </button>
            </div>
            <div className="flex-1 flex md:justify-end gap-3 items-center">
              <button
                onClick={() => handleSortChange("price")}
                className="px-6 py-3 border border-black hover:bg-black text-black hover:text-white rounded-md transition duration-300"
              >
                Sort by price
              </button>
              <button
                onClick={() => handleSortChange("name")}
                className="px-6 py-3 border border-black hover:bg-black text-black hover:text-white rounded-md transition duration-300"
              >
                Sort by name
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
      <div className="bg-black p-5">
        <div className="max-w-7xl mx-auto px-10">
          <MosaicViewImages />
        </div>
      </div>
      {/* Category Container and cards part Starts here*/}
      <div className="py-10 max-w-7xl mx-auto px-10">
        <hr />
        <h1 className="text-center py-10 text-6xl font-black text-lime-600">
          Categories
        </h1>
        <hr />
        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 pt-24">
          {categories?.data?.map((category: CategoryCardProps, index) => (
            <div key={index} className="bg-black/5 shadow-md px-10 rounded-xl">
              <div className="p-4">
                <p className="text-red-600 text-xl font-black">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Category Container and cards part Ends here */}
    </>
  );
};

export default ProductContainer;
