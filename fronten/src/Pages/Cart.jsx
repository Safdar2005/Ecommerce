import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

export const Cart = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const cartProducts = all_product.filter(
    (product) => cartItems[product.id] > 0
  );

  const getTotal = () => {
    return cartProducts.reduce(
      (total, product) =>
        total + product.new_price * cartItems[product.id],
      0
    );
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>${product.new_price}</td>
              <td>{cartItems[product.id]}</td>
              <td>${product.new_price * cartItems[product.id]}</td>
              <td>
                <button onClick={() => removeFromCart(product.id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Subtotal: ${getTotal()}</h3>
    </div>
  );
};
