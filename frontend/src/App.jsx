import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Header from "./components/Navbar/Header";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Address from "./pages/Addresss";
import Orders from "./pages/Orders";
import Footer from "./components/Footer/Footer";
import Checkout from "./pages/Checkout";

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
      <Footer />

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
