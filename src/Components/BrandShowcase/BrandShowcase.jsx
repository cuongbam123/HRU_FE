import React from "react";
import "./BrandShowcase.css";
import loreal from "../Assets/loreal.png";
import innisfree from "../Assets/innisfree.png";
import lancome from "../Assets/lancome.png";
import thebodyshop from "../Assets/thebodyshop.png";
import clinique from "../Assets/clinique.png";
import estee from "../Assets/estee.png";

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: "L'Oréal Paris",
      logo: loreal,
      description: "Vẻ đẹp đẳng cấp từ Pháp",
    },
    {
      id: 2,
      name: "Innisfree",
      logo: innisfree,
      description: "Tinh túy thiên nhiên từ đảo Jeju",
    },
    {
      id: 3,
      name: "Lancôme",
      logo: lancome,
      description: "Sang trọng & quý phái",
    },
    {
      id: 4,
      name: "The Body Shop",
      logo: thebodyshop,
      description: "Thân thiện với môi trường",
    },
    {
      id: 5,
      name: "Clinique",
      logo: clinique,
      description: "Dịu nhẹ cho làn da nhạy cảm",
    },
    {
      id: 6,
      name: "Estée Lauder",
      logo: estee,
      description: "Biểu tượng của sự thanh lịch",
    },
  ];

  return (
    <div className="brand-showcase">
      <h1>Thương hiệu nổi bật</h1>
      <div className="brands-container">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-card">
            <div className="brand-logo">
              <img src={brand.logo} alt={brand.name} />
            </div>
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
            <button className="view-products-btn">Xem sản phẩm</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandShowcase;
