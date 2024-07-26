import Container from "@/components/ui/Container";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Container>
        <div className="bg-black/80 text-white">
          <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
        <div className="bg-black text-white">
          <Footer />
        </div>
      </Container>
    </>
  );
};
export default Layout;
