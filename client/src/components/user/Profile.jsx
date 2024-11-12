import { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";
import './Profile.css';
const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      <div className="profile-container container my-5 p-4 shadow-lg rounded">
        <div className="profile-header text-center mb-4">
          <h1 className="welcome-text">Welcome,</h1>
          <h1 className="user-name">{user?.name}</h1>
          <h3 className="user-email">{user?.email}</h3>
          <h2 className="order-count">Total Orders: {userOrder?.length}</h2>
        </div>

        <div className="order-table container">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th className="text-center">Order Items</th>
                <th className="text-center">Order Details & Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              {userOrder?.map((product) => (
                <tr key={product._id}>
                  <td className="order-items">
                    <ShowOrderProduct items={product?.orderItems} />
                  </td>
                  <td className="order-details">
                    <ul>
                      <li><strong>Order ID:</strong> {product?.orderId}</li>
                      <li><strong>Payment ID:</strong> {product?.paymentId}</li>
                      <li><strong>Payment Status:</strong> {product?.payStatus}</li>
                      <li><strong>Recipient:</strong> {product?.userShipping?.fullName}</li>
                      <li><strong>Phone:</strong> {product?.userShipping?.phoneNumber}</li>
                      <li><strong>Country:</strong> {product?.userShipping?.country}</li>
                      <li><strong>State:</strong> {product?.userShipping?.state}</li>
                      <li><strong>Pin Code:</strong> {product?.userShipping?.pincode}</li>
                      <li><strong>Address:</strong> {product?.userShipping?.address}</li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;
