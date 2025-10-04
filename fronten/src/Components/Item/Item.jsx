import React, { useContext } from 'react';
import './Item.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const Item = (props) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleOrderNow = () => {
    console.log("🚀 Order Now Clicked - ID:", props.id);
    addToCart(props.id);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    console.log("🛒 Add to Cart Clicked - ID:", props.id);
    addToCart(props.id);
  };

  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>

      <div className="item-buttons">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleOrderNow}>Order Now</button>
      </div>
    </div>
  );
};
