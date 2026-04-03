// src/Context/ShopContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // 🧾 Lấy danh sách sản phẩm từ backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://my-backend-gbqg.onrender.com/api/products");
        setAllProduct(res.data.data || []);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách sản phẩm:", error);
      }
    };

    // 🛒 Lấy giỏ hàng từ localStorage (nếu có)
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.warn("⚠️ cartItems từ localStorage không hợp lệ, bỏ qua.", err);
        setCartItems({});
      }
    }

    fetchProducts();
  }, []);

  // 💾 Lưu giỏ hàng xuống localStorage mỗi khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (err) {
      console.warn("⚠️ Không thể lưu cartItems vào localStorage:", err);
    }
  }, [cartItems]);

  // ➕ Thêm sản phẩm vào giỏ
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  // ➖ Giảm số lượng hoặc xoá sản phẩm khỏi giỏ
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId] -= 1;
      else delete updated[itemId];
      return updated;
    });
  };

  // 🧮 Tính tổng tiền giỏ hàng - đảm bảo trả về Number (không trả NaN)
  const getTotalCartAmount = () => {
  let total = 0;
  try {
    for (const id in cartItems) {
      const product = all_product.find((p) => String(p._id) === String(id));
      const qty = Number(cartItems[id]) || 0;
      if (product && product.price) {
        const price = Number(product.price);
        if (!isNaN(price) && price > 0) {
          total += price * qty;
        }
      }
    }
    // ✅ Đảm bảo trả về số hợp lệ (0 nếu NaN)
    return Number.isFinite(total) ? Number(total) : 0;
  } catch (err) {
    console.error("❌ Error in getTotalCartAmount:", err);
    return 0;
  }
};


  // 🔢 Tính tổng số lượng sản phẩm trong giỏ
  const getTotalCartItem = () => {
    return Object.values(cartItems).reduce((acc, val) => acc + Number(val || 0), 0);
  };

  // 🗑️ Xoá toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems({});
    try {
      localStorage.removeItem("cartItems");
    } catch (err) {
      console.warn("Không thể xóa cartItems từ localStorage:", err);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        getTotalCartItem,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
