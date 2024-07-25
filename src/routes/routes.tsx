import App from "@/App";
import ProductDetails from "@/pages/ProductDetails";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
  },
]);
export default router;
