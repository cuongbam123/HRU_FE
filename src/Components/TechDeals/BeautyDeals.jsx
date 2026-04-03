import React from "react";
import "./BeautyDeals.css";
import deal1 from "../Assets/deal_makeup_remover.png";
import deal2 from "../Assets/deal_serum.png";
import deal3 from "../Assets/deal_sunscreen.png";

const BeautyDeals = () => {
  const deals = [
    {
      id: 1,
      title: "Flash Sale Mỹ Phẩm",
      description: "Giảm đến 40% cho nước tẩy trang & sữa rửa mặt",
      image: deal1,
      discount: "40% OFF",
      timeLeft: "Kết thúc trong 3 giờ",
    },
    {
      id: 2,
      title: "Ưu đãi Cuối Tuần",
      description: "Serum và dưỡng tóc chính hãng – giảm đến 60%",
      image: deal2,
      discount: "60% OFF",
      timeLeft: "Kết thúc trong 2 ngày",
    },
    {
      id: 3,
      title: "Chống Nắng Toàn Diện",
      description: "Mua 1 tặng 1 – Kem chống nắng cao cấp Queen Beauty",
      image: deal3,
      discount: "MUA 1 TẶNG 1",
      timeLeft: "Hết hạn cuối tháng",
    },
  ];

  return (
    <div className="beauty-deals">
      <h1>Ưu đãi đặc biệt</h1>
      <div className="deals-container">
        {deals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <div className="deal-image">
              <img src={deal.image} alt={deal.title} />
              <div className="discount-badge">{deal.discount}</div>
            </div>
            <div className="deal-content">
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <div className="time-left">{deal.timeLeft}</div>
              <button className="shop-now-btn">Mua ngay</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeautyDeals;
