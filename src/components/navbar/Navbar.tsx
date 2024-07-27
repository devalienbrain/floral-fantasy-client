import { FaCartPlus } from "react-icons/fa6";
import logoIcon from "../../../public/assets/flowerLogo.png";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "@/redux/api/api";
const Navbar = () => {
  const {
    data: productsData,
  } = useGetProductsQuery({ addedToCart: true });

    // Calculate total items and total price
  const cartProducts = productsData?.data || [];
  const totalItems = cartProducts.length;
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center p-7">
        <Link to="/">
          <div className="flex justify-start items-center gap-3">
            <img className="w-10" src={logoIcon} />
            <span className="text-2xl font-black">
              Floral{" "}
              <span className="text-lime-500 text-2xl font-black">Fantasy</span>
            </span>
          </div>
        </Link>
        <div className="justify-end flex items-center gap-5 pr-3">
          <Link to="categories">
            <span className="hover:text-lime-600">Categories</span>
          </Link>
          <Link to="products">
            <span className="hover:text-lime-600">Products</span>
          </Link>
          <Link to="cart">
            <div className="relative">
              <span>
                <FaCartPlus className="text-3xl font-black" />
              </span>
              <div className="w-6 h-6 border border-lime-900 rounded-full absolute -top-5 -right-5 text-lime-500 flex justify-center items-center font-bold text-xl z-10">
                {totalItems}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
