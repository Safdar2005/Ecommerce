import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Button, Chip } from '@mui/material';

export const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    addToCart(product.id);
    console.log("🛒 Add to Cart Clicked - ID:", product.id, "Size:", selectedSize);
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert("Please select a size before ordering.");
      return;
    }
    addToCart(product.id);
    navigate('/checkout');
    console.log("🚀 Order Now Clicked - ID:", product.id, "Size:", selectedSize);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {[1, 2, 3, 4].map((_, i) => (
            <img key={i} src={product.image} alt={`thumb-${i}`} />
          ))}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="main product" />
        </div>
      </div>

      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-stars">
          {[...Array(4)].map((_, i) => <img key={i} src={star_icon} alt="star" />)}
          <img src={star_dull_icon} alt="star-dull" />
          <p>(122)</p>
        </div>

        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">${product.old_price}</div>
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>

        <div className="productdisplay-right-description">
          A lightweight, knitted, pullover shirt with round neckline and short sleeves. Perfect for any occasion.
        </div>

        <div className="productdisplay-right-size">
          <h3>Select Size</h3>
          <div className="productdisplay-right-size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Chip
                key={size}
                label={size}
                clickable
                onClick={() => handleSizeSelect(size)}
                color={selectedSize === size ? "primary" : "default"}
                sx={{ marginRight: 1, marginBottom: 1 }}
              />
            ))}
          </div>
        </div>

        <div className="productdisplay-buttons">
          <Button variant="contained" color="success" onClick={handleAddToCart} sx={{ marginRight: 2 }}>
            ADD TO CART
          </Button>
          <Button variant="outlined" color="primary" onClick={handleOrderNow}>
            ORDER NOW
          </Button>
        </div>

        <p className="productdisplay-right-category">
          <span>Category:</span> Women, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};
