import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function PaypalCheckoutButton({ amount }) {
    const [paid, setPaid] = useState(false);
    const [payerName, setPayerName] = useState("");
    const navigate = useNavigate();

    const handleApprove = (details) => {
        setPayerName(details.payer.name.given_name);
        setPaid(true);

        // 👉 Nếu muốn lưu đơn hàng vào database, bạn có thể gọi API POST ở đây
        // fetch("https://my-backend-gbqg.onrender.com/api/orders", {...})
    };

    if (paid) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: "40px 50px",
                        borderRadius: "12px",
                        textAlign: "center",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                        maxWidth: "500px",
                        width: "90%",
                    }}
                >
                    <div style={{ fontSize: "80px", color: "green", marginBottom: "20px" }}>✔</div>
                    <h1 style={{ color: "green", fontSize: "28px", marginBottom: "20px" }}>
                        Thanh toán thành công!
                    </h1>
                    <p>Cảm ơn <strong>{payerName}</strong> đã mua hàng 💖</p>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            marginTop: "20px",
                            padding: "12px 24px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "16px",
                            cursor: "pointer",
                        }}
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) =>
                actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: amount.toString(), // USD
                            },
                        },
                    ],
                })
            }
            onApprove={(data, actions) =>
                actions.order.capture().then(handleApprove)
            }
            onError={(err) => {
                console.error("Lỗi PayPal:", err);
                alert("❌ Đã xảy ra lỗi khi thanh toán.");
            }}
        />
    );
}

export default PaypalCheckoutButton;
