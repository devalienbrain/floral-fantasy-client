import { useState } from "react";
import { useGetProductsQuery } from "@/redux/api/api";
import CartItemsCard from "@/components/cartItemsCard/CartItemsCard";
import { Link } from "react-router-dom";

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

const Cart = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    category: "",
    quantity: 0,
    description: "",
    rating: 0,
    image: "",
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery({});
  console.log(productsData);

  return (
    <div className="p-10 bg-gradient-to-b from-black/80 va-black/90 to-black text-white">
      <h1 className="text-center py-10 text-6xl font-black text-red-600">
        My Cart
      </h1>
      {/* To Checkout/Payment */}
      <div className="py-5">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl ">Total Items = ?</div>
          <div className="font-bold text-xl text-lime-500">Total Price = ?</div>
          <Link to="/payment">
            <button className="px-6 py-3 hover:bg-white hover:text-black bg-lime-500 text-white shadow-xl rounded-md transition duration-300">
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
            <tr className="font-bold text-base text-white">
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
              productsData?.data?.map((product: TProduct) => (
                <CartItemsCard key={product._id} {...product} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
