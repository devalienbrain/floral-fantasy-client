import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import FloralHome from "@/pages/FloralHome";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import Categories from "@/pages/Categories";
import Payment from "@/pages/Payment";

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
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
]);
export default router;
