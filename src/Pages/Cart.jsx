import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import "./CSS/Cart.css";

const Cart = () => {
  const {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  // URL backend Render
  const BASE_URL =
    process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  // Lọc các sản phẩm có trong giỏ
  const cartProducts = all_product.filter((product) => cartItems[product._id]);

  // Xóa hẳn sản phẩm khỏi giỏ
  const removeItemCompletely = (id) => {
    const newCart = { ...cartItems };
    delete newCart[id];
    setCartItems(newCart);
  };

  // Thanh toán
  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }
    navigate("/order");
  };

  return (
    <div className="cart-bg">
      <div className="cart-page">
        <h2 className="cart-title">🛒 Giỏ hàng</h2>
        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map((product) => {
              const price = Number(product.price) || 0; // vẫn giữ nguyên field price
              const quantity = cartItems[product._id] || 0;
              const total = price * quantity;

              // ✅ Sửa chỗ image: nếu là localhost thì đổi sang Render URL
              let imageUrl = product.image || "/no-image.png";
              if (imageUrl.includes("localhost:3001")) {
                const filename = imageUrl.split("/").pop();
                imageUrl = `${BASE_URL}/uploads/${filename}`;
              }

              return (
                <div key={product._id} className="cart-item">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="cart-item-img"
                    onError={(e) => (e.target.src = "/no-image.png")}
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-title">
                      {product.name || "Sản phẩm"}
                    </div>
                    <div className="cart-item-price">
                      Giá: <span>{price.toLocaleString()} VNĐ</span>
                    </div>
                    <div className="cart-item-qty">
                      Số lượng:
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="cart-qty-btn"
                      >
                        -
                      </button>
                      <span className="cart-qty-value">{quantity}</span>
                      <button
                        onClick={() => addToCart(product._id)}
                        className="cart-qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      Thành tiền: <span>{total.toLocaleString()} VNĐ</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItemCompletely(product._id)}
                    className="cart-item-remove"
                  >
                    Xóa
                  </button>
                </div>
              );
            })}

            <div className="cart-total">
              <span>
                🧾 Tổng tiền:{" "}
                <span>{getTotalCartAmount().toLocaleString()} VNĐ</span>
              </span>
              <button onClick={handleCheckout} className="cart-checkout-btn">
                🚀 Thanh toán
              </button>
            </div>
          </>
        ) : (
          <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
