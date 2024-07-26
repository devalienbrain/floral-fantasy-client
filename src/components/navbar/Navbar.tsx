import { FaCartPlus } from "react-icons/fa6";
import logoIcon from "../../../public/assets/flowerLogo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
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
            <span>
              <FaCartPlus className="text-3xl font-black" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Navbar;
