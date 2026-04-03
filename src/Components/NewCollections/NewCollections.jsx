import React, { useContext } from "react";
import "./NewCollections.css";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const NewCollections = () => {
  const { all_product } = useContext(ShopContext);
  // Lấy 8 sản phẩm mới nhất (giả sử backend trả về sản phẩm mới nhất ở cuối mảng)
  const newProducts = all_product.slice(-8).reverse();
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections product-list">
        {newProducts.map((product, i) => (
          <div key={product._id || i} className="product-card">
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name_product} />
            </Link>
            <div className="product-info">
              <h3>{product.name_product}</h3>
              <p>
                {product.price_product &&
                  product.price_product.toLocaleString()}{" "}
                VNĐ
                {product.old_price && (
                  <span className="old-price" style={{ marginLeft: 8 }}>
                    {product.old_price.toLocaleString()} VNĐ
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
