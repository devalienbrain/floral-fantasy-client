import Banner from "@/components/banner/Banner";
import ProductContainer from "@/components/floralHome/ProductContainer";
import Shine from "@/components/shine/Shine";
import { Helmet } from "react-helmet-async";

const FloralHome = () => {
  return (
    <>
      <Helmet>
        <title>Floral Fantasy | Home</title>
      </Helmet>
      <div className="bg-black/80 text-white">
        <Banner />
      </div>
      <div className="h-full w-full max-w-7xl mx-auto px-10 pt-5 bg-white text-black">
        <ProductContainer />
      </div>
      <div className="bg-black text-white">
        <Shine />
      </div>
    </>
  );
};
export default FloralHome;
