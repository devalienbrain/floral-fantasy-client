import Banner from "@/components/banner/Banner";
import ProductContainer from "@/components/floralHome/ProductContainer";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/ui/Container";

const FloralHome = () => {
  return (
    <>
      <div className="bg-black text-white">
        <div>
          <Navbar />
          <Banner />
        </div>
        <Container>
          {/* <h1 className="text-center text-4xl font-bold py-5">Floral Fantasy: Online Flower Shop</h1> */}

          <ProductContainer />
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default FloralHome;
