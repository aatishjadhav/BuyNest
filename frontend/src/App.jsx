import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/products/categories/:category" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList/>} />
      </Routes>
    </>
  );
}

export default App;
