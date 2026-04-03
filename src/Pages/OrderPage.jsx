import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./CSS/OrderPage.css";

const OrderPage = () => {
  const { cartItems, all_product, getTotalCartAmount, setCartItems } =
    useContext(ShopContext);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🛒 Chuyển giỏ hàng thành danh sách sản phẩm gửi server
  const products = all_product
  .filter((product) => cartItems[product._id])
  .map((product) => ({
    id_product: product._id,
    name_product: product.name,
    price_product: Number(product.price),
    count: Number(cartItems[product._id]),
  }));


  // 📝 Tạo ghi chú
  const createNote = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Bạn cần đăng nhập trước khi đặt hàng!");

      // Gửi data note. Nếu backend cần khác key, chỉnh tương ứng.
      const noteData = { fullname, phone, content: note };
      const res = await fetch("https://my-backend-gbqg.onrender.com/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteData),
      });

      const data = await res.json();

      if (!res.ok || !data?.data?._id) {
        console.error("Tạo ghi chú lỗi:", data);
        throw new Error(data?.message || "Không thể tạo ghi chú");
      }

      return data.data._id;
    } catch (error) {
      console.error("Lỗi khi tạo ghi chú:", error);
      throw error;
    }
  };

  // 🛍️ Gửi đơn hàng lên server
  const createOrderToServer = async (orderData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("https://my-backend-gbqg.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setCartItems({});
        const orderId = result?.data?._id || result?.order?._id;
        navigate(`/order-success/${orderId}`);
      } else {
        console.error("❌ Lỗi khi tạo đơn:", result);
        alert(result?.message || "Không thể tạo đơn hàng. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      alert("❌ Lỗi kết nối tới server!");
    } finally {
      setLoading(false);
    }
  };

  // 💵 Thanh toán COD
  const handleCODSubmit = async () => {
    // prevent double submit
    if (loading) return;

    if (!fullname || !phone || !address || products.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin và giỏ hàng không được rỗng.");
      return;
    }

    // lấy tổng an toàn từ context
    const rawTotal = Number(getTotalCartAmount());
    console.log("🛒 Tổng giỏ hàng (raw):", rawTotal, "products:", products);

    if (!Number.isFinite(rawTotal) || rawTotal <= 0) {
      alert("❌ Lỗi: tổng tiền giỏ hàng không hợp lệ!");
      return;
    }

    const totalAmount = rawTotal + 30000;

    try {
      setLoading(true);
      const noteId = await createNote();

      const orderData = {
        address,
        total: totalAmount,
        status: "pending",
        paid: false,
        shippingFee: 30000,
        payment: "COD",
        note: noteId,
        products,
      };

      await createOrderToServer(orderData);
    } catch (err) {
      console.error("🚨 Lỗi trong khi gửi đơn hàng:", err);
      alert(err?.message || "Lỗi khi tạo ghi chú/đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // 💳 PayPal
  const renderPayPal = () => {
    // tính total an toàn cho PayPal (USD)
    const rawTotal = Number(getTotalCartAmount());
    const vnTotal = Number.isFinite(rawTotal) ? rawTotal + 30000 : 0;
    // chuyển sang USD giả định tỉ giá 23000 VND = 1 USD
    const usdAmount = (vnTotal / 23000) || 0;

    return (
      <PayPalScriptProvider
        options={{
          "client-id":
            "AZ1yjvwq5m_1hf_Ioy2SgJRz2P2O3ZPZk_uWTMZKZPs5eovHFBn71u1DFo08RU8VuqkHj-0v5zgi06AB",
        }}
      >
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "pill",
            label: "paypal",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: usdAmount.toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              setLoading(true);
              // const details = await actions.order.capture(); // optional
              const noteId = await createNote();

              const raw = Number(getTotalCartAmount());
              if (!Number.isFinite(raw) || raw <= 0) {
                alert("Tổng tiền không hợp lệ, không thể tạo đơn.");
                return;
              }
              const orderData = {
                address,
                total: raw + 30000,
                status: "pending",
                paid: true,
                shippingFee: 30000,
                payment: "PAYPAL",
                note: noteId,
                products,
              };

              await createOrderToServer(orderData);
            } catch (err) {
              console.error("PayPal flow error:", err);
              alert("Thanh toán PayPal thất bại hoặc không thể tạo đơn.");
            } finally {
              setLoading(false);
            }
          }}
          onError={(err) => {
            console.error("PayPal error:", err);
            alert("Thanh toán PayPal thất bại.");
          }}
        />
      </PayPalScriptProvider>
    );
  };

  // hiển thị tổng an toàn (nếu chưa sẵn sàng, show 0)
  const displayedTotal = Number(getTotalCartAmount()) || 0;

  return (
    <div className="order-bg">
      <div className="order-page">
        <h2 className="order-title">📦 Thông tin đặt hàng</h2>
        <form className="order-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Họ tên người nhận"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="order-input"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="order-input"
          />
          <textarea
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="order-input"
          ></textarea>
          <textarea
            placeholder="Ghi chú (ví dụ: gọi trước khi giao...)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="order-input"
          ></textarea>

          <div className="order-row">
            <label className="order-label">Phương thức thanh toán:</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="order-select"
            >
              <option value="COD">Thanh toán khi nhận hàng</option>
              <option value="PAYPAL">PayPal</option>
            </select>
          </div>

          <div className="order-total">
            🧾 Tổng tiền: {displayedTotal.toLocaleString()} VNĐ + 30.000 VNĐ phí ship
          </div>

          {payment === "COD" ? (
            <button
              onClick={handleCODSubmit}
              className="order-btn"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "🚀 Xác nhận đặt hàng"}
            </button>
          ) : (
            <div className="order-paypal">{renderPayPal()}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
