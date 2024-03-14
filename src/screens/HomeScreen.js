import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { cartlist } from "../Slices/cartSlice";
import "../scss/Homescreen_searchbar.scss";
import SortItems from "../componant/HomeScreen/SortItems";
import Filter from "../componant/HomeScreen/filter/Filter"; // Import your Filter component

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productList;
  const products = productList.products;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(listProducts());
    dispatch(cartlist());

    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [dispatch, location.search]);

  // Handle filter change
  const handleFilterChange = useCallback((newPriceRange) => {
    setPriceRange(newPriceRange);
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [products, priceRange]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    navigate(`?search=${searchValue}`);
  };

  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Filter handleFilter={handleFilterChange} /> {/* Pass handleFilterChange */}
        <SortItems onSortChange={handleSortChange} />
      </div>

      <div className="d-flex align-items-center justify-content-between mb-3 search-container">
        <h1>Latest Products</h1>
        <Form.Group className="mb=0">
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </Form.Group>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
