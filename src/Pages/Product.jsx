import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisPlay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { fetchProductById } from "../hook/productApi";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await fetchProductById(productId);
      if (fetchedProduct) setProduct(fetchedProduct);
    };

    loadProduct();
  }, [productId]);

  if (!product) return <div>Đang tải...</div>;

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts
        currentName={product.name_product}
        currentId={product._id}
      />
    </div>
  );
};

export default Product;
