import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
// import Offers from "../Components/Offers/Offers";
// import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import FeaturedCategories from "../Components/FeaturedCategories/FeaturedCategories";
import TechDeals from "../Components/TechDeals/BeautyDeals";
import BrandShowcase from "../Components/BrandShowcase/BrandShowcase";

const Shop = () => {
  return (
    <div className="shop-container">
      <Hero />
      <FeaturedCategories />
      <Popular />
      <TechDeals />
      {/* <Offers /> */}
      {/* <NewCollections /> */}
      <BrandShowcase />
      <NewsLetter />
    </div>
  );
};

export default Shop;
