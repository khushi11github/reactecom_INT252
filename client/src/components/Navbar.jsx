import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };

  return (
    <div className="navbar-container sticky-top">
      <div className="navbar">
      <div className="navbar-brand-container">
  <img src="./logo.jpeg" className="navbar-logo" />
  <h3>Horizen Limited</h3>
</div>

        <form className="search-bar" onSubmit={submitHandler}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search Products..."
          />
          <button type="submit" className="search-button">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <Link to={"/cart"} className="btn-cart">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cart?.items?.length > 0 && (
                  <span className="cart-badge">{cart?.items?.length}</span>
                )}
              </Link>
              <Link to={"/profile"} className="btn-profile">
                Profile
              </Link>
              <button className="btn-logout" onClick={() => { logout(); navigate("/"); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"} className="btn-login">Login</Link>
              <Link to={"/register"} className="btn-register">Register</Link>
            </>
          )}
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="filters">
          <div className="filter-item" onClick={() => setFilteredData(products)}>No Filter</div>
          <div className="filter-item" onClick={() => filterbyCategory("mobiles")}>Mobiles</div>
          <div className="filter-item" onClick={() => filterbyCategory("laptops")}>Laptops</div>
          <div className="filter-item" onClick={() => filterbyCategory("cameras")}>Cameras</div>
          <div className="filter-item" onClick={() => filterbyCategory("headphones")}>Headphones</div>
          <div className="filter-item" onClick={() => filterbyPrice(15999)}>15999</div>
          <div className="filter-item" onClick={() => filterbyPrice(25999)}>25999</div>
          <div className="filter-item" onClick={() => filterbyPrice(49999)}>49999</div>
          <div className="filter-item" onClick={() => filterbyPrice(69999)}>69999</div>
          <div className="filter-item" onClick={() => filterbyPrice(89999)}>89999</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
