import { useState } from "react";
import { useGetProductsQuery, useUpdateProductMutation } from "@/redux/api/api";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

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

const Cart = () => {
  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({ addedToCart: true });

  const [updateProduct] = useUpdateProductMutation();
  const [productIdToRemove, setProductIdToRemove] = useState<string | null>(
    null
  );

  const handleConfirmRemove = (id: string) => {
    setProductIdToRemove(id);
    document.getElementById("delete_modal").showModal();
  };

  const handleRemoveFromCart = async () => {
    if (productIdToRemove) {
      try {
        const productToRemove = productsData.data.find(
          (product: TProduct) => product._id === productIdToRemove
        );
        const updatedProduct = { ...productToRemove, addedToCart: false };
        await updateProduct({
          id: productIdToRemove,
          data: updatedProduct,
        }).unwrap();
        toast.success("Product removed from cart!");
        setProductIdToRemove(null);
      } catch (error) {
        console.error("Failed to remove product from cart!", error);
        toast.error("Failed to remove product from cart!");
      }
      document.getElementById("delete_modal").close();
    }
  };

  // Calculate total items and total price
  const cartProducts = productsData?.data || [];
  const totalItems = cartProducts.length;
  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  return (
    <>
      <Toaster />
      <Helmet>
        <title>Floral Fantasy | My Cart</title>
      </Helmet>
      <div className=" max-w-7xl mx-auto p-10 text-black">
        <Toaster />
        <h1 className="text-center py-10 text-6xl font-black text-red-600">
          My Cart
        </h1>
        {/* To Checkout/Payment */}
        <div className="py-5">
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl ">Total Items = {totalItems}</div>
            <div className="font-bold text-xl text-lime-600">
              Total Price = ${totalPrice.toFixed(2)}
            </div>
            <Link to="/payment">
              <button className="px-6 py-3 hover:bg-white hover:text-black bg-lime-800 text-white shadow-xl rounded-md transition duration-300">
                Checkout
              </button>
            </Link>
          </div>
        </div>
        <hr />
        {/* Products table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-bold text-base">
                <th className="text-left">SI</th>
                <th className="text-left font-bold">Title</th>
                <th className="text-left">Category</th>
                <th className="text-left">Image</th>
                <th className="text-left font-bold">Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isProductsLoading ? (
                <p className="text-green-500">Loading...</p>
              ) : isProductsError ? (
                <p className="text-red-500">Oops! Error loading products</p>
              ) : (
                cartProducts.map((product: TProduct, index: number) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>
                      <img src={product.image} alt={product.title} width="50" />
                    </td>
                    <td>${product.price}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleConfirmRemove(product._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete confirmation modal */}
      <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            Are you sure you want to remove this product from your cart?
          </h3>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleRemoveFromCart}>
              Delete
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("delete_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Cart;
