import { Link } from "react-router-dom";
import { BiErrorAlt } from "react-icons/bi";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center text-left">
      <div className="flex flex-col space-y-11">
        <div className="font-black">
          <BiErrorAlt className="text-2xl font-black text-red-500"></BiErrorAlt>
          <p className="py-5">Oops..</p>
          <span className="text-red-600 text-xl font-bold">
            Page Not Found!
          </span>
        </div>
        <h2 className="text-5xl md:text-9xl font-black">4 O 4</h2>
        <h1 className="text-2xl font-black text-red-600"> e r r o r !</h1>
        <Link to={"/"}>
          <div className="flex gap-2 text-sm bg-black py-3 px-5 rounded-md hover:bg-lime-500 hover:text-black text-white">
            <span className="font-semibold">Go floral-fantasy home!</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
