import React, { useEffect, useMemo, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const API_URL = process.env.REACT_APP_API_URL;

const getSessionId = () => {
  let sid = localStorage.getItem("sid");
  if (!sid) {
    sid = "guest-" + Math.random().toString(36).slice(2) + "-" + Date.now();
    localStorage.setItem("sid", sid);
  }
  return sid;
};

const RelatedProducts = ({ currentId, limit = 4, mode = "mixed" }) => {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);

  const sid = useMemo(() => getSessionId(), []);

  useEffect(() => {
    if (!currentId) return;

    const run = async () => {
      setLoading(true);
      try {
        // 1) log view (để co-view có dữ liệu)
        await fetch(`${API_URL}/products/${currentId}/view`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-session-id": sid,
            // Nếu bạn có JWT:
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({}), // BE không cần body vẫn ok
        });

        // 2) fetch recommendations
        const res = await fetch(
          `${API_URL}/products/${currentId}/recommend?mode=${mode}&limit=${limit}`,
          {
            headers: {
              "x-session-id": sid,
              // Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setRelated(Array.isArray(data?.items) ? data.items : []);
      } catch (err) {
        console.error("RelatedProducts error:", err);
        setRelated([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [currentId, limit, mode, sid]);

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />

      {loading && <p style={{ padding: "8px 0" }}>Loading...</p>}

      <div className="relatedproducts-item">
        {related.map((p, i) => (
          <Item
            key={p._id || i}
            id={p._id}
            name={p.name}
            image={p.image}
            new_price={p.price}
            old_price={p.old_price} // nếu BE không có old_price thì Item tự xử lý hoặc bạn bỏ prop này
          />
        ))}
      </div>

      {!loading && related.length === 0 && (
        <p style={{ padding: "8px 0" }}>Không có sản phẩm liên quan.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
