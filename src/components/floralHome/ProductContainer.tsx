import { useState } from "react";
import AddProductModal from "./AddProductModal";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useAddCategoryMutation,
  useAddProductMutation,
} from "@/redux/api/api";

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
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    category: "",
    quantity: 0,
    description: "",
    rating: 0,
    image: "",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [addCategory, { isLoading: isAddingCategory }] =
    useAddCategoryMutation();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();

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

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: newCategoryName }).unwrap();
      setNewCategoryName("");
      document.getElementById("my_modal_5").close();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct).unwrap();
      setNewProduct({
        title: "",
        price: 0,
        category: "",
        quantity: 0,
        description: "",
        rating: 0,
        image: "",
      });
      console.log(newProduct);
      document.getElementById("my_modal_6").close();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {/* Category Container */}
      <div>
        <h1 className="text-center py-10 text-6xl font-bold">Categories</h1>
        <div className="mx-auto flex justify-center text-white pb-10 ">
          <button
            className="w-20 h-20 rounded-full text-3xl font-black text-black border"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            +
          </button>

          {/* Open the modal using document.getElementById('my_modal_5').showModal() method */}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add a new category</h3>
              <div className="py-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="modal-action">
                <button
                  className="btn"
                  onClick={handleAddCategory}
                  disabled={isAddingCategory}
                >
                  {isAddingCategory ? "Adding..." : "Add"}
                </button>
                <button
                  className="btn"
                  onClick={() => document.getElementById("my_modal_5").close()}
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        </div>

        {/* Add a category modal*/}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {categories?.data?.map((category: CategoryCardProps, index) => (
            <div key={index} className="bg-black/5 shadow-md px-10 rounded-xl">
              <div className="p-4">
                <p className="text-lime-950 text-xl font-bold">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="text-center py-10 text-6xl font-bold">Products</h1>
      <div className="mx-auto flex justify-center text-white pb-10">
        <button
          className="w-20 h-20 rounded-full text-3xl font-black text-black border"
          onClick={() => document.getElementById("my_modal_6").showModal()}
        >
          +
        </button>

        {/* Open the modal using document.getElementById('my_modal_6').showModal() method */}
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a new product</h3>
            <div className="py-4">
              {/* Product form inputs */}
              <label>Title</label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                placeholder="Product title"
                className="input input-bordered w-full"
              />
              {/* More form inputs */}
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={handleAddProduct}
                disabled={isAddingProduct}
              >
                {isAddingProduct ? "Adding..." : "Add"}
              </button>
              <button
                className="btn"
                onClick={() => document.getElementById("my_modal_6").close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>

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
              productsData?.data?.map((product: TProduct) => (
                <ProductCard key={product._id} {...product} />
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <button
            className="btn"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="mx-4">
            Page {productsData?.pagination?.currentPage} of {productsData?.pagination?.totalPages}
          </span>
          <button
            className="btn"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= productsData?.pagination?.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductContainer;
