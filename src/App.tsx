import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CartProvider } from "./context/CartContext";

import Root from "./pages/Root";
import Home, { homeLoader as homePageLoader } from "./pages/Home";
import ErrorPage from "./pages/Error";
import Products, { productLoader } from "./pages/Products";
import NavPages, { loadCategoryProducts } from "./pages/NavPages";
import SearchProduct, { productSearchLoader } from "./components/SearchProduct";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Register from "./pages/Register";
import { WishlistProvider } from "./context/WishLIstContext";
import Login from "./pages/Login";
import { registerAction } from "./components/registerAction";
import { loginAction } from "./components/LoginAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: homePageLoader },
      { path: "products/:id", element: <Products />, loader: productLoader },
      {
        path: "category/:apiEndpoint",
        element: <NavPages />,
        loader: loadCategoryProducts,
      },
      {
        path: "search/:searchQuery",
        element: <SearchProduct />,
        loader: productSearchLoader,
      },
      { path: "cart", element: <Cart /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "Register", element: <Register />, action: registerAction},
      { path: "login", element: <Login />, action: loginAction}
    ],
  },
]);

const App: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <RouterProvider router={router} />;
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
