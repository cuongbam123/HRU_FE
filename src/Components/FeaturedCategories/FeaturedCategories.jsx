import React from "react";
import "./FeaturedCategories.css";
import makeup_remover from "../Assets/makeup_remover.png";
import serum from "../Assets/serum.png";
import cleanser from "../Assets/cleanser.png";
import haircare from "../Assets/haircare.png";
import sunscreen from "../Assets/sunscreen.png";
import { useNavigate } from "react-router-dom";

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Nước tẩy trang",
      image: makeup_remover,
      description: "Làm sạch nhẹ nhàng, mang lại làn da tươi mát và rạng rỡ.",
      route: "/nuoc-tay-trang",
    },
    {
      id: 2,
      name: "Serum",
      image: serum,
      description: "Tinh chất dưỡng sâu, giúp làn da căng bóng và khỏe mạnh.",
      route: "/serum",
    },
    {
      id: 3,
      name: "Sữa rửa mặt",
      image: cleanser,
      description: "Làm sạch bụi bẩn, dịu nhẹ cho mọi loại da.",
      route: "/sua-rua-mat",
    },
    {
      id: 4,
      name: "Dưỡng tóc",
      image: haircare,
      description: "Phục hồi hư tổn, cho mái tóc suôn mượt tự nhiên.",
      route: "/duong-toc",
    },
    {
      id: 5,
      name: "Kem chống nắng",
      image: sunscreen,
      description: "Bảo vệ da khỏi tia UV và dưỡng ẩm suốt ngày dài.",
      route: "/kem-chong-nang",
    },
  ];

  return (
    <div className="featured-categories" id="featured-categories">
      <h1>Danh mục nổi bật</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-image">
              <img src={category.image} alt={category.name} />
            </div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button
              className="explore-btn"
              onClick={() => navigate(category.route)}
            >
              Khám phá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
