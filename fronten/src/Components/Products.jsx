import React from 'react';
import './PageStyle.css';

const Products = () => {
  return (
    <div className="page-container">
      <h2>Our Products</h2>
      <p>Explore our most popular product categories:</p>
      <ul>
        <li>
          <strong>Men's Clothing:</strong> Explore trendy T-shirts, formal shirts, jeans, jackets, ethnic wear, and more for every occasion.
        </li>
        <li>
          <strong>Women's Clothing:</strong> Discover the latest in fashion: kurtis, sarees, tops, dresses, co-ords, leggings, and beyond.
        </li>
        <li>
          <strong>Kids' Fashion:</strong> Stylish and comfortable clothes for boys and girls — from playwear to partywear.
        </li>
        <li>
          <strong>New Arrivals:</strong> Stay ahead of trends with our handpicked latest fashion drops, updated weekly.
        </li>
        <li>
          <strong>Best Sellers:</strong> Shop our most-loved clothing pieces — top-rated by thousands of happy customers.
        </li>
        <li>
          <strong>Offers & Discounts:</strong> Great style meets great savings! Don’t miss our ongoing deals and festive offers.
        </li>
        <li>
          <strong>Seasonal Collections:</strong> Whether it’s summer breezy or winter cozy, shop our exclusive seasonal edits.
        </li>
        <li>
          <strong>Ethnic & Festive Wear:</strong> Celebrate culture in style with our curated range of traditional Indian wear.
        </li>
      </ul>
    </div>
  );
};

export default Products;
