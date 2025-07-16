import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Header from "./components/Navbar/Header";
import Footer from "./components/Footer/Footer";

import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const WishList = lazy(() => import("./pages/WishList"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Address = lazy(() => import("./pages/Addresss"));
const Orders = lazy(() => import("./pages/Orders"));
const Checkout = lazy(() => import("./pages/Checkout"));

function App() {
  const location = useLocation();
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            fontSize: "1.2rem",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #253053 31%, #079E83 100%)",
            color: "#fff",
          },
        }}
      />
      <Header />
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/products/categories/:category" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/address" element={<Address />} />
          <Route path="/user/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Suspense>
      <Footer />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
