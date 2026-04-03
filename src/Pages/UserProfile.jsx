import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get("https://my-backend-gbqg.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải thông tin người dùng");
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://my-backend-gbqg.onrender.com/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedOrders = res.data?.data;
        setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
        toast.error("Không thể tải danh sách đơn hàng");
        setOrders([]);
      }
    };

    fetchUser();
    fetchOrders();
  }, []);

  const handleEdit = () => {
    setEditUser(user);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://my-backend-gbqg.onrender.com/api/users/users/update-profile",
        editUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      toast.success("Cập nhật thành công!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    }
  };

  // 🌸 Map trạng thái sang tiếng Việt
  const translateStatus = (status) => {
    const map = {
      pending: "⏳ Đang xử lý", 
      shipping: "🚚 Đang giao hàng",
      completed: "✅ Hoàn thành",
      cancelled: "❌ Đã hủy",
    };
    return map[status] || "Đã giao";
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 2px 12px #e3f0ff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 32,
          background: "linear-gradient(90deg, #36a2eb 0%, #3498db 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textTransform: "uppercase",
          letterSpacing: 1.5,
          textShadow: "0 2px 12px #b3e0ff",
          marginBottom: 32,
        }}
      >
        Thông tin cá nhân
      </h2>

      <div style={styles.infoBox}>
        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            {renderInput("Họ tên", "fullname", editUser, setEditUser)}
            {renderInput("Email", "email", editUser, setEditUser, "email")}
            {renderInput("Số điện thoại", "phone", editUser, setEditUser)}
            {renderInput("Ngày sinh", "birthday", editUser, setEditUser, "date")}

            <button type="submit" style={styles.btn}>
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              style={styles.btnCancel}
            >
              Hủy
            </button>
          </form>
        ) : (
          <>
            {renderText("Họ tên", user.fullname)}
            {renderText("Email", user.email)}
            {renderText("Số điện thoại", user.phone)}
            {renderText(
              "Ngày sinh",
              user.birthday
                ? new Date(user.birthday).toLocaleDateString("vi-VN")
                : ""
            )}
            <button onClick={handleEdit} style={styles.btn}>
              Chỉnh sửa thông tin
            </button>
          </>
        )}
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 700, margin: "32px 0 18px 0" }}>
        Lịch sử đơn hàng
      </h3>

      {orders.length === 0 ? (
        <p
          style={{
            color: "#888",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Chưa có đơn hàng nào.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Mã đơn</th>
                <th style={styles.th}>Ngày đặt</th>
                <th style={styles.th}>Tổng tiền</th>
                <th style={styles.th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td style={styles.td}>{order._id}</td>
                  <td style={styles.td}>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                      : "—"}
                  </td>
                  <td style={styles.td}>
                    {order.total?.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td style={styles.td}>{translateStatus(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Helpers
const renderInput = (label, name, obj, setObj, type = "text") => (
  <div style={{ marginBottom: 12 }}>
    <label style={styles.label}>{label}:</label>
    <input
      type={type}
      value={obj[name] || ""}
      onChange={(e) => setObj((u) => ({ ...u, [name]: e.target.value }))}
      style={styles.input}
      required
    />
  </div>
);

const renderText = (label, value) => (
  <div style={{ marginBottom: 10 }}>
    <span style={styles.label}>{label}:</span> {value || "Chưa cập nhật"}
  </div>
);

// Styles
const styles = {
  label: {
    display: "inline-block",
    minWidth: 120,
    fontWeight: 600,
    marginBottom: 6,
  },
  input: {
    padding: "7px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
    width: 260,
    maxWidth: "100%",
  },
  btn: {
    background: "#36a2eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    marginTop: 10,
    marginRight: 10,
  },
  btnCancel: {
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },
  infoBox: {
    background: "#f8fbff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 28,
    boxShadow: "0 2px 8px #e3f0ff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 2px 8px #e3f0ff",
  },
  th: {
    background: "#e3f0ff",
    fontWeight: 700,
    padding: 10,
    borderBottom: "1.5px solid #d0e6fa",
    fontSize: 15,
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #f0f0f0",
    fontSize: 15,
  },
};

export default UserProfile;
