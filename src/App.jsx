import React, { StrictMode } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout/Layout";
import NotFound from "./pages/Not Found/NotFound";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";

import Cart from "./pages/Cart/Cart";
import TokenCotextProvider from "./context/tokenContext";
import { ProtactRoute } from "./components/Protact/ProtactRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/es/devtools";
import ProductDetails from "./pages/Product/ProductDetails/ProductDetails";
import CartContextProvider from "./context/cartContext";
import PaymentContextProvider from "./context/paymentContext";
import Payment from "./pages/payment/Payment";
import AllOrder from "./pages/All Orders/allorder";
import WishlistContextProvider from "./context/wishlistContext";
import Wishlist from "./pages/Wishlist/Wishlist";
import Profile from "./pages/profile/Profile";


const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtactRoute>
            <Home />
          </ProtactRoute>
        ),
      },

      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },

      {
        path: "products",
        element: (
          <ProtactRoute>
            <Product />
          </ProtactRoute>
        ),
      },
      {
        path: "Home",
        element: (
          <ProtactRoute>
            <Home />
          </ProtactRoute>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtactRoute>
            <Cart />
          </ProtactRoute>
        ),
      },

      {
        path: "ProductDetails/:id",
        element: (
          <ProtactRoute>
            <ProductDetails />
          </ProtactRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtactRoute>
            <Payment />
          </ProtactRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtactRoute>
            <AllOrder />
          </ProtactRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtactRoute>
            <Wishlist />
          </ProtactRoute>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtactRoute>
            <Profile />
          </ProtactRoute>
        ),
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const query = new QueryClient();
  return (
    <>
      {/* <StrictMode> */}
      <QueryClientProvider client={query}>
        <ToastContainer />
        <TokenCotextProvider>
            <CartContextProvider>
          <WishlistContextProvider>
              <PaymentContextProvider>
                <RouterProvider router={router} />
              </PaymentContextProvider>
          </WishlistContextProvider>
            </CartContextProvider>
        </TokenCotextProvider>
        {/* <ReactQueryDevtools></ReactQueryDevtools> */}
      </QueryClientProvider>
      {/* </StrictMode> */}
    </>
  );
}
