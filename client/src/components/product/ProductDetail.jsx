import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext";

const ProductDetail = () => {
  const { addToCart } = useContext(AppContext);
  const [product, setProduct] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    if (product && product._id) {
      navigate(`/shipping/${product._id}`);
    } else {
      console.error("Product ID is undefined. Cannot navigate.");
    }
  };

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{ width: "250px", height: "250px", borderRadius: '10px' }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>{product?.price} ₹</h1>
          <div className="my-5">
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: 'bold' }}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="btn btn-warning"
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

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
