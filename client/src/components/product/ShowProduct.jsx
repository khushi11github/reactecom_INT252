import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import './ShowProduct.css'; // Importing the custom CSS

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);
  return (
    <div className="products-container">
      <div className="row">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className="col-md-4 col-sm-6 product-card"
          >
            <div className="card">
              <Link to={`/product/${product._id}`} className="product-image-link">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="product-image"
                />
              </Link>
              <div className="card-body">
                <h5 className="product-title">{product.title}</h5>
                <div className="price-cart-container">
                  <button className="price-btn">{product.price} ₹</button>
                  <button
                    className="cart-btn"
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
