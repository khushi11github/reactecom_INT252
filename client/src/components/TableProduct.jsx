import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import './Tableproduct.css';  // Import the CSS file here

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Qty++</th>
            <th>Qty--</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.imgSrc} alt={product.title} />
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.qty}</td>
              <td>
                <button
                  className="action-btn"
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
                  +
                </button>
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  -
                </button>
              </td>
              <td>
                <button
                  className="action-btn remove-btn"
                  onClick={() => {
                    if (confirm('Are you sure you want to remove this product from the cart?')) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  ✖
                </button>
              </td>
            </tr>
          ))}

          <tr className="total-row">
            <td></td>
            <td>Total</td>
            <td>{price}</td>
            <td>{qty}</td>
            <td colSpan="3">
              <button className="checkout-btn">Checkout</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

TableProduct.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        imgSrc: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        qty: PropTypes.number.isRequired,
        productId: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default TableProduct;
