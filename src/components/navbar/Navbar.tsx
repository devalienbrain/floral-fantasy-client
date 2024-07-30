

import { FaCartPlus } from "react-icons/fa6";
import logoIcon from "../../../public/assets/flowerLogo.png";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/api/api";

const Navbar = () => {
  const { data: productsData } = useGetProductsQuery({ addedToCart: true });

  // Calculate total quantity
  const cartProducts = productsData?.data || [];
  const totalQuantity = cartProducts.reduce((sum, product) => sum + product.cartQuantity, 0);

  return (
    <>
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row gap-10 justify-center md:justify-between items-center py-5">
        <div className="flex-1 md:w-1/2">
          <Link to="/">
            <div className="flex justify-start items-center gap-3">
              <img className="w-10" src={logoIcon} />
              <span className="text-2xl font-black">
                Floral{" "}
                <span className="text-lime-500 text-2xl font-black">
                  Fantasy
                </span>
              </span>
            </div>
          </Link>
        </div>
        <div className="w-full md:w-1/2 justify-between md:justify-end flex items-center gap-5 pr-3">
          <div className="flex gap-2 md:gap-4">
            <Link to="categories">
              <span className="hover:text-lime-600">Categories</span>
            </Link>
            <Link to="products">
              <span className="hover:text-lime-600">Products</span>
            </Link>
            <Link to="paymentHistory">
              <span className="hover:text-lime-600">Transactions</span>
            </Link>
          </div>
          <Link to="cart">
            <div className="relative">
              <span>
                <FaCartPlus className="text-3xl font-black" />
              </span>
              <div className="w-5 h-5 border border-lime-200 bg-lime-300 rounded-full absolute -top-5 -right-5 text-lime-950 flex justify-center items-center font-semibold text-sm z-10">
                {totalQuantity}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
