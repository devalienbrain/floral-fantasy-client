import { FaCartPlus } from "react-icons/fa6";
import logoIcon from "../../../public/assets/flowerLogo.png";
const Navbar = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center p-7">
        <div className="flex justify-start items-center gap-3">
          <img className="w-10" src={logoIcon} />
          <span className="text-2xl font-black">Floral <span className="text-lime-500 text-2xl font-black">Fantasy</span></span>
        </div>
        <div className="justify-end flex items-center gap-5 pr-3">
          <span className="hover:text-lime-300">Categories</span>
          <span className="hover:text-lime-300">Products</span>
          <span>
            <FaCartPlus className="text-3xl font-black" />
          </span>
        </div>
      </div>
    </>
  );
};
export default Navbar;
