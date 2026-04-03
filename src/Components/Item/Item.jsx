import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
// Nhớ import file helper vào đây (đường dẫn lùi ra ngoài cho đúng thư mục utils)
import { formatImageUrl } from "../../utils/formatImage"; 

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        {/* ✅ Bọc props.image qua hàm formatImageUrl */}
        <img onClick={() => window.scrollTo(0, 0)} src={formatImageUrl(props.image)} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">
          {props.new_price && props.new_price.toLocaleString()} VNĐ
        </div>
      </div>
    </div>
  );
};

export default Item;