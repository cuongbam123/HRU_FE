import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import axios from "axios";
import { toast } from "react-toastify";

const ShopCategory = ({ banner, category }) => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");

  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortType, setSortType] = useState("");
  const [products, setProducts] = useState([]);

  const { addToCart } = useContext(ShopContext);

  // ✅ Lấy URL backend từ .env
  const API_URL = process.env.REACT_APP_API_URL || "https://my-backend-gbqg.onrender.com/api";
  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://my-backend-gbqg.onrender.com";

  useEffect(() => {
    console.log("🔍 API_URL:", API_URL);
    console.log("🔍 BASE_URL:", BASE_URL);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải sản phẩm:", err);
      toast.error("Không thể tải danh sách sản phẩm!");
    }
  };

  const filteredProducts = products.filter((p) => {
    const catMatch =
      p.category?._id === category || p.category?._id === category?._id;
    const brandMatch = !brand || p.brand?.toLowerCase().includes(brand.toLowerCase());
    const typeMatch = !type || p.name?.toLowerCase().includes(type.toLowerCase());
    return catMatch && brandMatch && typeMatch;
  });

  const sortedProducts = [...filteredProducts];
  if (sortType === "asc") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortType === "desc") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortType === "az") sortedProducts.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  else if (sortType === "za") sortedProducts.sort((a, b) => b.name.localeCompare(a.name, "vi"));

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={banner} alt="banner" />

      <div className="shopcategory-indexSort">
        <div></div>
        <div
          className="shopcategory-sort"
          style={{
            position: "relative",
            marginLeft: 0,
            marginTop: 0,
          }}
        >
          <span onClick={() => setSortOpen((open) => !open)} style={{ cursor: "pointer" }}>
            Sắp xếp <img src={dropdown_icon} alt="" style={{ verticalAlign: "middle" }} />
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
                padding: "8px 0",
              }}
            >
              {[
                { key: "asc", label: "Giá: Thấp đến Cao" },
                { key: "desc", label: "Giá: Cao đến Thấp" },
                { key: "az", label: "Tên: A → Z" },
                { key: "za", label: "Tên: Z → A" },
                { key: "", label: "Mặc định" },
              ].map((opt) => (
                <div
                  key={opt.key}
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    color: sortType === opt.key ? "#3498db" : undefined,
                  }}
                  onClick={() => {
                    setSortType(opt.key);
                    setSortOpen(false);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.slice(0, visibleCount).map((product) => {
            let imageUrl = product.image || "";
if (imageUrl.startsWith("http://localhost:3001")) {
  imageUrl = imageUrl.replace("http://localhost:3001", BASE_URL);
} else if (imageUrl.startsWith("/")) {
  imageUrl = `${BASE_URL}${imageUrl}`;
}

            console.log("🖼️ Product image URL:", imageUrl);

            return (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img src={imageUrl} alt={product.name} />
                </Link>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category-name">
                    {product.category?.name || "Không rõ danh mục"}
                  </p>
                  <p>
                    {product.price.toLocaleString()} VNĐ
                    {product.discount && product.discount > 0 && (
                      <span
                        className="old-price"
                        style={{ marginLeft: 8, textDecoration: "line-through" }}
                      >
                        {(
                          product.price / (1 - product.discount / 100)
                        ).toLocaleString()} VNĐ
                      </span>
                    )}
                  </p>
                </div>

                <button onClick={() => addToCart(product._id)}>Thêm vào giỏ</button>
              </div>
            );
          })
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>

      {visibleCount < sortedProducts.length && (
        <div className="text-center mt-4">
          <button onClick={() => setVisibleCount((prev) => prev + 12)} className="load-more-btn">
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
