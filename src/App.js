// src/App.js
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import SearchResults from "./Pages/SearchResults";
import OrderPage from "./Pages/OrderPage";
import serum_banner from "./Components/Assets/serum.png";
import duongtoc_banner from "./Components/Assets/haircare.png";
import srm_banner from "./Components/Assets/cleanser.png";
import tẩytrang_banner from "./Components/Assets/makeup_remover.png";
import kemchongnang_banner from "./Components/Assets/sunscreen.png";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShopContextProvider } from "./Context/ShopContext";
import AdminAddProduct from "./Pages/AdminAddProduct";
import OrderSuccess from "./Pages/OrderSuccess";
import MyOrders from "./Pages/MyOrder";
import UserProfile from "./Pages/UserProfile";
import AllProducts from "./Pages/AllProducts";
import AIChatBox from "./Components/ChatAI/AIChatBox";
import FloatingChatButton from "./Components/ChatAI/FloatingChatButton";
import { useEffect, useState } from "react";

// 🧴 Danh mục mỹ phẩm trong DB của bạn
const CATEGORY_IDS = {
  "sua-rua-mat": "68f60edd8d09c395895f3d2d",
  "nuoc-tay-trang": "68f60ef48d09c395895f3d2f",
  serum: "68f60efd8d09c395895f3d31",
  "duong-toc": "68f60f058d09c395895f3d33",
  "kem-chong-nang": "68f60f0c8d09c395895f3d35",
};

function Layout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const isChatPage = location.pathname === "/chat";

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Shop />} />

        {/* 🌸 Các danh mục mỹ phẩm */}
        <Route
          path="/sua-rua-mat"
          element={
            <ShopCategory
              banner={srm_banner}
              category={CATEGORY_IDS["sua-rua-mat"]}
            />
          }
        />
        <Route
          path="/nuoc-tay-trang"
          element={
            <ShopCategory
              banner={tẩytrang_banner}
              category={CATEGORY_IDS["nuoc-tay-trang"]}
            />
          }
        />
        <Route
          path="/serum"
          element={
            <ShopCategory banner={serum_banner} category={CATEGORY_IDS.serum} />
          }
        />
        <Route
          path="/duong-toc"
          element={
            <ShopCategory
              banner={duongtoc_banner}
              category={CATEGORY_IDS["duong-toc"]}
            />
          }
        />
        <Route
          path="/kem-chong-nang"
          element={
            <ShopCategory
              banner={kemchongnang_banner}
              category={CATEGORY_IDS["kem-chong-nang"]}
            />
          }
        />

        {/* 🛍️ Các trang khác */}
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/chat" element={<AIChatBox />} />
      </Routes>

      <Footer />

      {/* Chat nổi */}
      {!isChatPage && (
        <>
          {showChat && <AIChatBox onClose={() => setShowChat(false)} />}
          <FloatingChatButton onClick={() => setShowChat(true)} />
        </>
      )}
    </>
  );
}
console.log("🔍 API_URL:", process.env.REACT_APP_API_URL);
console.log("🔍 BASE_URL:", process.env.REACT_APP_BASE_URL);


function App() {
  return (
    <ShopContextProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </PayPalScriptProvider>
    </ShopContextProvider>
  );
}

export default App;
