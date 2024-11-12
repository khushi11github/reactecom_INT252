import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <>
      {cart?.items?.length === 0 ? (
        <div className="cart-empty-state">
          <button
            className="btn btn-warning continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <div className="cart-summary">
          <div className="cart-summary-details">
            <button className="btn btn-info total-qty-btn">
              Total Qty: {qty}
            </button>
            <button className="btn btn-warning total-price-btn">
              Total Price: ₹{price}
            </button>
          </div>
        </div>
      )}

      {cart?.items?.map((product) => (
        <div key={product._id} className="cart-item-card">
          <div className="cart-item">
            <div className="cart-item-image">
              <img
                src={product.imgSrc}
                alt={product.title}
                className="cart-img"
              />
            </div>
            <div className="cart-item-details">
              <h2 className="cart-item-title">{product.title}</h2>
              <p className="cart-item-price">₹{product.price}</p>
              <p className="cart-item-qty">Qty: {product.qty}</p>
            </div>
            <div className="cart-item-actions">
              <button
                className="btn btn-warning qty-decrease-btn"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info qty-increase-btn"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger remove-item-btn"
                onClick={() => {
                  if (confirm("Are you sure you want to remove this item?")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="cart-footer">
          <button
            className="btn btn-warning checkout-btn"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="btn btn-danger clear-cart-btn"
            onClick={() => {
              if (confirm("Are you sure you want to clear the cart?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
