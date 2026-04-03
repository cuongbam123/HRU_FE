import React, { useState } from "react";
import "./DescriptionBox.css";

const mockReviews = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    content: "Sản phẩm chất lượng, giao hàng nhanh, đóng gói cẩn thận.",
    date: "2024-06-01",
  },
  {
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    content: "Giá tốt, tư vấn nhiệt tình, sẽ ủng hộ lần sau.",
    date: "2024-05-28",
  },
  {
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/40?img=3",
    rating: 5,
    content: "Đặt hàng dễ dàng, sản phẩm đúng mô tả.",
    date: "2024-05-20",
  },
];

const DescriptionBox = () => {
  const [tab, setTab] = useState("desc");
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box${tab === "desc" ? "" : " fade"}`}
          onClick={() => setTab("desc")}
          style={{ cursor: "pointer" }}
        >
          Description
        </div>
        <div
          className={`descriptionbox-nav-box${tab === "review" ? "" : " fade"}`}
          onClick={() => setTab("review")}
          style={{ cursor: "pointer" }}
        >
          Reviews (122)
        </div>
      </div>
      {tab === "desc" ? (
        <div className="descriptionbox-description">
          <p>
            Website bán mỹ phẩm của chúng tôi chuyên cung cấp các sản phẩm làm
            đẹp chính hãng như: sản phẩm chăm sóc da (kem dưỡng, serum, mặt nạ),
            sản phẩm trang điểm (son môi, kem nền, phấn má), sản phẩm chăm sóc
            tóc, nước hoa và nhiều loại mỹ phẩm cao cấp khác. Chúng tôi cam kết
            mang đến cho khách hàng trải nghiệm mua sắm tiện lợi, nhanh chóng
            cùng mức giá cạnh tranh nhất thị trường và đảm bảo chất lượng, nguồn
            gốc rõ ràng của sản phẩm.
          </p>
          <p>
            Tất cả sản phẩm đều có thông tin chi tiết về thành phần, công dụng,
            hình ảnh thực tế, giá bán rõ ràng và nhiều lựa chọn về thương hiệu,
            dòng sản phẩm, màu sắc (đối với đồ trang điểm). Khách hàng được hỗ
            trợ tư vấn tận tình về cách sử dụng, chính sách đổi trả minh bạch,
            giao hàng toàn quốc và nhiều chương trình khuyến mãi hấp dẫn. Mỗi
            sản phẩm đều có trang thông tin riêng giúp bạn dễ dàng so sánh, lựa
            chọn sản phẩm phù hợp với loại da và nhu cầu làm đẹp của mình.
          </p>
        </div>
      ) : (
        <div
          className="descriptionbox-review-list"
          style={{
            border: "1px solid #D0D0D0",
            padding: 32,
            borderTop: "none",
          }}
        >
          {mockReviews.map((r, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
                alignItems: "flex-start",
              }}
            >
              <img
                src={r.avatar}
                alt={r.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>
                  {r.name}{" "}
                  <span style={{ color: "#f5b301" }}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </span>
                </div>
                <div style={{ fontSize: 15, margin: "4px 0 2px 0" }}>
                  {r.content}
                </div>
                <div style={{ fontSize: 13, color: "#888" }}>
                  {new Date(r.date).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
