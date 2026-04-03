import React, { useContext } from "react";
import "./Popular.css";
import { ShopContext } from "../../Context/ShopContext";
import Item from "../Item/Item";

const Popular = () => {
  const { all_product } = useContext(ShopContext);

  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  const normalizeImage = (img) => {
    if (!img) return ""; 

    if (img.startsWith("http://localhost:3001")) return img.replace("http://localhost:3001", BASE_URL);
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/")) return `${BASE_URL}${img}`;
    if (img.startsWith("uploads/")) return `${BASE_URL}/${img}`;
    return `${BASE_URL}/uploads/${img}`;
  };

  const formatVND = (price) => {
    if (price === undefined || price === null || price === "") return "Chưa có giá";
    return Number(price).toLocaleString("vi-VN") + "đ";
  };

  // Lấy 4 sản phẩm giá cao nhất
  const popularProducts = [...(all_product || [])]
    .sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
    .slice(0, 4);

  return (
    <div className="popular">
      <h1>POPULAR SERUM</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          const imageUrl = normalizeImage(item.image);

          if (process.env.NODE_ENV === "development") {
            console.log("Popular imageUrl:", imageUrl, "Price:", item.price);
          }

          return (
            <Item
              key={item._id || i}
              id={item._id}
              name={item.name || ""}
              image={imageUrl}
              new_price={formatVND(item.price)} // dùng đúng field từ DB
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
