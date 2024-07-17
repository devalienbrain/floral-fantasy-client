
import Banner from "@/components/banner/Banner";
import ProductContainer from "@/components/floralHome/ProductContainer";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/ui/Container";


const FloralHome = () => {
  return (
    <>
    <Container>
      {/* <h1 className="text-center text-4xl font-bold py-5">Floral Fantasy: Online Flower Shop</h1> */}
      <Navbar/>
      <Banner/>
      <ProductContainer/>
    </Container>
    <div>
      <Footer/>
    </div>
    </>
  );
};
export default FloralHome;