import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { all_product, addToCart } = useContext(ShopContext);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState("");

  let filteredProducts = all_product.filter(
    (product) =>
      product &&
      product.name_product &&
      query &&
      product.name_product.toLowerCase().includes(query.toLowerCase())
  );

  // Sắp xếp sản phẩm nếu có chọn sort
  if (sortType === "asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(a.price_product) - Number(b.price_product)
    );
  } else if (sortType === "desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => Number(b.price_product) - Number(a.price_product)
    );
  } else if (sortType === "az") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.name_product.localeCompare(b.name_product, 'vi', { sensitivity: 'base' })
    );
  } else if (sortType === "za") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.name_product.localeCompare(a.name_product, 'vi', { sensitivity: 'base' })
    );
  }

  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Kết quả tìm kiếm cho: {query}</span>
        </p>
        <div className="shopcategory-sort" style={{ position: "relative", marginLeft: 0, marginTop: 0 }}>
          <span onClick={() => setSortOpen((open) => !open)} style={{ cursor: "pointer" }}>
            Sort by <img src={require("../Components/Assets/dropdown_icon.png")} alt="" style={{ verticalAlign: "middle" }} />
          </span>
          {sortOpen && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                background: "#fff",
                border: "1px solid #00d2dd",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                zIndex: 10,
                minWidth: "170px",
                padding: "8px 0"
              }}
            >
              <div
                style={{ padding: "10px 20px", cursor: "pointer", color: sortType === "asc" ? "#3498db" : undefined }}
                onClick={() => { setSortType("asc"); setSortOpen(false); }}
              >
                Giá: Thấp đến Cao
              </div>
              <div
                style={{ padding: "10px 20px", cursor: "pointer", color: sortType === "desc" ? "#3498db" : undefined }}
                onClick={() => { setSortType("desc"); setSortOpen(false); }}
              >
                Giá: Cao đến Thấp
              </div>
              <div
                style={{ padding: "10px 20px", cursor: "pointer", color: sortType === "az" ? "#3498db" : undefined }}
                onClick={() => { setSortType("az"); setSortOpen(false); }}
              >
                Tên: A → Z
              </div>
              <div
                style={{ padding: "10px 20px", cursor: "pointer", color: sortType === "za" ? "#3498db" : undefined }}
                onClick={() => { setSortType("za"); setSortOpen(false); }}
              >
                Tên: Z → A
              </div>
              <div
                style={{ padding: "10px 20px", cursor: "pointer", color: sortType === "" ? "#3498db" : undefined }}
                onClick={() => { setSortType(""); setSortOpen(false); }}
              >
                Mặc định
              </div>
            </div>
          )}
        </div>
        <p>Tìm thấy {filteredProducts.length} sản phẩm</p>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name_product} />
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
              </Link>
              <button onClick={() => addToCart(product._id)}>
                Thêm vào giỏ
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
