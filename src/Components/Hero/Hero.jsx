import React from "react";
import "./Hero.css";
import flower_icon from "../Assets/flower_icon.png";
import arrow from "../Assets/arrow.png";
import hero_image from "../Assets/queen_logo.png"; // ảnh mới chủ đề mỹ phẩm

const Hero = () => {
  const handleScroll = () => {
    const el = document.getElementById("featured-categories");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero">
      <div className="hero-left">
        <h2>HRU COSMETICS COLLECTION</h2>
        <div>
          <div className="hero-text-icon">
            <p>Khám phá</p>
            <img src={flower_icon} alt="flower icon" />
          </div>
          <p>Vẻ đẹp tự nhiên</p>
          <p>Cho làn da rạng rỡ</p>
        </div>

        <div className="hero-btn" onClick={handleScroll}>
          <div>Mua sắm ngay</div>
          <img src={arrow} alt="arrow" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="Mỹ phẩm cao cấp" />
      </div>
    </div>
  );
};

export default Hero;
