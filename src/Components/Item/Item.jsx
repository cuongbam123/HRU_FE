import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { formatImageUrl } from "../../utils/formatImage"; // Nhớ import đường dẫn cho đúng

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        {/* Dùng hàm formatImageUrl bọc props.image lại */}
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