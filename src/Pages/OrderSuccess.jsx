import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3001/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message || "Không tìm thấy đơn hàng");
        }
      })
      .catch((err) => setError("Lỗi kết nối server"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Đang tải đơn hàng...</p>;
  if (error)
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h2>❌ Lỗi:</h2>
        <p>{error}</p>
        <Link to="/">⬅️ Quay lại trang chủ</Link>
      </div>
    );

  return (
    <div className="order-success-container">
      <span className="order-success-icon">✅</span>
      <div className="order-success-title">Đặt hàng thành công!</div>
      <div className="order-success-desc">
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận.
      </div>
      <div className="order-success-info">
        <b>Mã đơn hàng:</b>
        <span>{order._id}</span>
        <b>Địa chỉ nhận hàng:</b>
        <span>{order.address}</span>
        <b>Phương thức thanh toán:</b>
        <span>{order.id_payment?.pay_name || order.id_payment}</span>
        <b>Tổng tiền:</b>
        <span>{Number(order.total).toLocaleString()} VNĐ</span>
        {order.id_note && (
          <>
            <b>Người nhận:</b>
            <span>{order.id_note.fullname} - {order.id_note.phone}</span>
            {order.id_note.content && <span>Ghi chú: {order.id_note.content}</span>}
          </>
        )}
      </div>
      <Link to="/" className="order-success-btn">← Về trang chủ</Link>
    </div>
  );
};

export default OrderSuccess;
