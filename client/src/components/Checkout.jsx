import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";
import './Checkout.css';

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
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

  const handlePayment = async () => {
    try {
      const orderRepons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      console.log("order response", orderRepons);
      const { orderId, amount: orderAmount } = orderRepons.data;

      var options = {
        key: "rzp_test_gHH711O4gcSjCq", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits. Default currency is INR.
        currency: "INR",
        name: "Web Dev Mastery",
        description: "Web Dev Mastery",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(`${url}/payment/verify-payment`, paymentData);

          console.log("razorpay res ", api.data);

          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          }
        },
        prefill: {
          name: "Web Dev Mastery",
          email: "webdevmastery@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Vijay Nagar Indore",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading text-center">Order Summary</h1>

      <div className="checkout-content">
        {/* Shipping Address Section - now comes first */}
        <div className="checkout-section shipping-details">
          <h2 className="section-heading">Shipping Address</h2>
          <ul className="shipping-address-list">
            <li><strong>Name:</strong> {userAddress?.fullName}</li>
            <li><strong>Phone:</strong> {userAddress?.phoneNumber}</li>
            <li><strong>Country:</strong> {userAddress?.country}</li>
            <li><strong>State:</strong> {userAddress?.state}</li>
            <li><strong>PinCode:</strong> {userAddress?.pincode}</li>
            <li><strong>Address:</strong> {userAddress?.address}</li>
          </ul>
        </div>

        {/* Product Details Section */}
        <div className="checkout-section product-details">
          <h2 className="section-heading">Product Details</h2>
          <TableProduct cart={cart} />
        </div>
      </div>

      <div className="checkout-footer text-center">
        <button className="btn btn-primary btn-lg" onClick={handlePayment}>
          Proceed to Pay ₹{price}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
