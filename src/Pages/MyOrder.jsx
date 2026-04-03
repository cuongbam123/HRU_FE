import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/api/orders/my", {
            method: "GET",
            headers: {
                "Content-Type": "application/json", // ✅ nên có
                Authorization: `Bearer ${token}`,   // ✅ rất quan trọng
            },
            });
        const data = await res.json();

        if (data.success) {
          setOrders(data.data);
        } else {
          setError(data.message || "Không thể lấy đơn hàng");
        }
      } catch (err) {
        setError("Lỗi kết nối đến máy chủ");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p style={{ padding: 40 }}>🔄 Đang tải danh sách đơn hàng...</p>;
  if (error)
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h2>❌ Lỗi:</h2>
        <p>{error}</p>
        <Link to="/">⬅️ Quay lại trang chủ</Link>
      </div>
    );

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700 }}>📦 Đơn hàng của bạn</h2>
      {orders.length === 0 ? (
        <p style={{ marginTop: 20 }}>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
          {orders.map((order) => (
            <li
              key={order._id}
              style={{
                marginBottom: 20,
                padding: 16,
                border: "1px solid #ccc",
                borderRadius: 12,
                background: "#fdfdfd",
              }}
            >
              <h3 style={{ marginBottom: 8 }}>🆔 Mã đơn: {order._id}</h3>
              <p>📍 Địa chỉ: {order.address}</p>
              <p>💰 Tổng tiền: {Number(order.total).toLocaleString()} VNĐ</p>
              <p>📦 Trạng thái: {order.status}</p>
              <p>🔒 Thanh toán: {order.pay ? "Đã thanh toán" : "Chưa thanh toán"}</p>
              <Link to={`/order-success/${order._id}`} style={{ marginTop: 8, display: "inline-block", color: "#0a84ff" }}>
                📄 Xem chi tiết
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
