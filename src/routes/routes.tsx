import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import FloralHome from "@/pages/FloralHome";
import ProductDetails from "@/pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <FloralHome />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
    ],
  },
]);
export default router;
