import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

// ✅ Match your file name: Capital I !
import { Item } from '../Components/Item/Item';

import './ShopCategory.css'; // ✅ This file must exist!

export const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="shopcategory">
      <img src={banner} alt="Banner" className="shopcategory-banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing:</span> All {category} Products
        </p>
        <select className="shopcategory-sort">
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      <div className="shopcategory-products">
        {all_product &&
          all_product
            .filter((item) => item.category === category)
            .map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
      </div>

      <button className="shopcategory-loadmore">Load More</button>
    </div>
  );
};
