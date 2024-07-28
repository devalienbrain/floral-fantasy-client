import { useState } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/api/api";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import ProductTable from "@/components/floralHome/ProductTable";

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

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();
  const [addProduct, { isLoading: isAddingProduct }] = useAddProductMutation();
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ category, page, limit });
  const [updateProduct, { isLoading: isUpdatingProduct }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeletingProduct }] =
    useDeleteProductMutation();
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);

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
      document.getElementById("my_modal_6").close();
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handleEditProduct = (id: string) => {
    const product = productsData.data.find((p: TProduct) => p._id === id);
    setEditingProduct(product);
    document.getElementById("edit_modal").showModal();
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast("Product deleted!");
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const handleUpdateProduct = async () => {
    if (editingProduct) {
      try {
        const { _id, ...updateData } = editingProduct;
        await updateProduct({ id: _id, data: updateData }).unwrap();
        setEditingProduct(null);
        document.getElementById("edit_modal").close();
      } catch (error) {
        console.error("Failed to update product", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Products</title>
      </Helmet>

      <div className="p-10">
        <h1 className="text-center py-10 text-6xl font-black">
          <span className="text-red-500 font-black">Products</span> Management
        </h1>
        <div className="mx-auto flex justify-center text-white pb-10">
          <div className="lg:tooltip" data-tip="Click to add a new product">
            <button
              className="w-20 h-20 rounded-full text-3xl font-black text-lime-600 border"
              onClick={() => document.getElementById("my_modal_6").showModal()}
            >
              +
            </button>
          </div>

          <dialog
            id="my_modal_6"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add a new product</h3>
              <div className="py-4">
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
                <select
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  className="input input-bordered w-full mt-4"
                >
                  <option value="">Select category</option>
                  {isCategoriesLoading ? (
                    <option>Loading categories...</option>
                  ) : isCategoriesError ? (
                    <option>Error loading categories</option>
                  ) : (
                    categoriesData.data.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
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
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
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
          <div className="flex w-full">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-6 py-3 w-full border border-black rounded-md bg-white text-black"
            >
              <option value="">All Categories</option>
              {categoriesData?.data?.map(
                (category: CategoryCardProps, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        {/* Products table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-bold  text-base text-lime-900">
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
                  <ProductTable
                    key={product._id}
                    {...product}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                  />
                ))
              )}
            </tbody>
          </table>
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

      {/* Edit/ update modal starts */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box bg-lime-600 text-white">
          <h3 className="font-bold text-lg">Edit product</h3>
          {editingProduct && (
            <div className="py-4">
              <label>Title</label>
              <input
                type="text"
                value={editingProduct.title}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    title: e.target.value,
                  })
                }
                placeholder="Product title"
                className="input input-bordered w-full"
              />
              {/* Repeat for other fields */}
              <label>Price</label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Product price"
                className="input input-bordered w-full mt-4"
              />
              {/* Add other fields similarly */}
              <label>Category</label>
              <input
                disabled
                type="text"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                placeholder="Product category"
                className="input input-bordered w-full mt-4"
              />
              <label>Quantity</label>
              <input
                type="number"
                value={editingProduct.quantity}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    quantity: parseFloat(e.target.value),
                  })
                }
                placeholder="Product quantity"
                className="input input-bordered w-full mt-4"
              />
              <label>Description of the Product</label>
              <input
                type="text"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                placeholder="Product description"
                className="input input-bordered w-full mt-4"
              />
              <label>Rating</label>
              <input
                type="number"
                value={editingProduct.rating}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    rating: parseFloat(e.target.value),
                  })
                }
                placeholder="Product rating"
                className="input input-bordered w-full mt-4"
              />
              <label>ImageURL</label>
              <input
                type="text"
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    image: e.target.value,
                  })
                }
                placeholder="Product image url"
                className="input input-bordered w-full mt-4"
              />
            </div>
          )}
          <div className="modal-action">
            <button
              className="btn"
              onClick={handleUpdateProduct}
              disabled={isUpdatingProduct}
            >
              {isUpdatingProduct ? "Updating..." : "Update"}
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("edit_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {/* Edit/ update modal Ends */}
    </>
  );
};

export default Products;
