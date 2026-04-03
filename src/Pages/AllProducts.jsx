import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/AllProducts.css";
import { motion } from "framer-motion";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import { toast } from "react-toastify";
// ✅ Import helper xử lý ảnh dùng chung
import { formatImageUrl } from "../utils/formatImage"; 

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOpen, setSortOpen] = useState(false);

  const { addToCart } = useContext(ShopContext);
  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://my-backend-gbqg.onrender.com/api";
  
  // (Đã xóa hàm normalizeImageUrl cũ ở đây cho code gọn gàng)

  useEffect(() => {
    fetchProducts();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh mục:", err);
    }
  };

  // 🧩 Lọc sản phẩm
  const filteredProducts = products.filter((p) => {
    const nameMatch = p.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const catMatch =
      !selectedCategory || p.category?._id === selectedCategory;
    return nameMatch && catMatch;
  });

  // 🔄 Sắp xếp
  const sortedProducts = [...filteredProducts];
  if (sortType === "asc") sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortType === "desc") sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortType === "az")
    sortedProducts.sort((a, b) =>
      a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
    );
  else if (sortType === "za")
    sortedProducts.sort((a, b) =>
      b.name.localeCompare(a.name, "vi", { sensitivity: "base" })
    );

  return (
    <div className="all-products-page">
      <h2 className="title">🛍️ Tất cả sản phẩm</h2>

      {/* 🔍 Thanh tìm kiếm + lọc */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Tất cả danh mục</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="sort-menu">
          <span onClick={() => setSortOpen((o) => !o)}>
            Sắp xếp <img src={dropdown_icon} alt="sort" />
          </span>

          {sortOpen && (
            <div className="sort-dropdown">
              {[
                { key: "asc", label: "Giá: Thấp đến Cao" },
                { key: "desc", label: "Giá: Cao đến Thấp" },
                { key: "az", label: "Tên: A → Z" },
                { key: "za", label: "Tên: Z → A" },
                { key: "", label: "Mặc định" },
              ].map((opt) => (
                <div
                  key={opt.key}
                  className={`sort-option ${
                    sortType === opt.key ? "active" : ""
                  }`}
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

      {/* 💄 Danh sách sản phẩm */}
      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.slice(0, visibleCount).map((product) => {
            // ✅ Gọi hàm xử lý ảnh chuẩn từ file helper
            const imageUrl = formatImageUrl(product.image);
            
            return (
              <motion.div
                key={product._id}
                className="product-card"
                whileHover={{ scale: 1.05 }}
              >
                <Link to={`/product/${product._id}`}>
                  <img src={imageUrl} alt={product.name} />
                </Link>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category-name">
                    {product.category?.name || "Khác"}
                  </p>
                  <p className="product-price">
                    {product.price?.toLocaleString()} VNĐ
                    {product.discount > 0 && (
                      <span className="old-price">
                        {(
                          product.price /
                          (1 - product.discount / 100)
                        ).toLocaleString()}{" "}
                        VNĐ
                      </span>
                    )}
                  </p>
                </div>
                <button onClick={() => addToCart(product._id)}>
                  Thêm vào giỏ
                </button>
              </motion.div>
            );
          })
        ) : (
          <p className="no-products">Không tìm thấy sản phẩm nào.</p>
        )}
      </div>

      {visibleCount < sortedProducts.length && (
        <div className="load-more-container">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="load-more-btn"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;