import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() === category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <div className="container text-center my-5 p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      <h1 className="mb-4">Related Products</h1>
      <div className="row">
        {relatedProduct?.map((product) => (
          <div
            key={product._id}
            className="col-md-4 d-flex justify-content-center mb-4"
          >
            <div
              className="card text-center"
              style={{
                width: "100%",
                maxWidth: "18rem",
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Link
                to={`/product/${product._id}`}
                className="d-flex justify-content-center align-items-center p-3"
              >
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="my-3">
                  <button className="btn btn-primary mx-3">
                    {product.price} ₹
                  </button>
                  <button
                    className="btn btn-warning cart-btn"
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
                    Add To Cart
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

// Define PropTypes
RelatedProduct.propTypes = {
  category: PropTypes.string.isRequired,
};




export default RelatedProduct;
