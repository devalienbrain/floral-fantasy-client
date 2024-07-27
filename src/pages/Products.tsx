import { useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { useGetProductsQuery, useAddProductMutation } from "@/redux/api/api";
import ProductCard from "@/components/productsCard/ProductCard";

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

const Products = () => {
  const [category, setCategory] = useState("");
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

  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ category, page, limit });
  console.log(productsData);

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
    <div className="p-10">
      <h1 className="text-center py-10 text-6xl font-bold">Products</h1>
      <div className="mx-auto flex justify-center text-white pb-10">
        <div className="lg:tooltip" data-tip="Click to add a new product">
          <button
            className="w-20 h-20 rounded-full text-3xl font-black text-black border"
            onClick={() => document.getElementById("my_modal_6").showModal()}
          >
            +
          </button>
        </div>

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
              <label>Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Product price"
                className="input input-bordered w-full mt-4"
              />
              <label>Category</label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                placeholder="Product category"
                className="input input-bordered w-full mt-4"
              />
              <label>Quantity</label>
              <input
                type="number"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value),
                  })
                }
                placeholder="Product quantity"
                className="input input-bordered w-full mt-4"
              />
              <label>Description of the product</label>
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                placeholder="Product description"
                className="input input-bordered w-full mt-4"
              />
              <label>Rating</label>
              <input
                type="number"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    rating: parseFloat(e.target.value),
                  })
                }
                placeholder="Product rating"
                className="input input-bordered w-full mt-4"
              />
              <label>ImageURL</label>
              <input
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                placeholder="Product image URL"
                className="input input-bordered w-full mt-4"
              />
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
      {/* Set page limit And Products search part */}
      <div className="py-5">
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <input
              type="number"
              // value={newProduct.title}
              placeholder="Products number per page"
              className="input input-bordered rounded-r-none w-full bg-white text-black border border-black"
            />
            <button
              onClick={() => setCategory(e.target.value)}
              className="px-6 py-3 border bg-black text-white rounded-md rounded-l-none transition duration-300"
            >
              Set
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
        </div>
      </div>
      {/* Products table */}
      <div className="bg-white text-black py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
  );
};

export default Products;
