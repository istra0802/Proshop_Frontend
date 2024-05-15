import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, updateSearchHistory } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { cartlist } from "../Slices/cartSlice";
import "../scss/Homescreen_searchbar.scss";
import SortItems from "../componant/HomeScreen/SortItems";
import { socket } from "../config/socket";
import toast from "react-hot-toast";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import Categories from "../componant/categories/Categories";
import Benefit from "../componant/Benefit";
// import { Filter } from "@mui/icons-material";
import Filter from "../componant/HomeScreen/filter/Filter";
import Contact from "../componant/HomeScreen/Contact";
// socket.on('hello', (res) => {
//   toast.success(res.message)
// })
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productList;
  const products = productList.products;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const recentlyViewedIds =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  useEffect(() => {
    dispatch(listProducts());
    console.log(dispatch(listProducts()), "==============================");
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [dispatch, location.search]);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    navigate(`?search=${searchValue}`);
  };
  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };
  const handleFilter = useCallback((selectedPriceRange) => {
    setPriceRange(selectedPriceRange);
  }, []);
  var sortedProducts = [];
  if (sortedProducts != undefined) {
    sortedProducts = [...products].sort((a, b) => {
      switch (sortOption) {
        case "priceLowToHigh":
          return a.price - b.price;
        case "priceHighToLow":
          return b.price - a.price;
        case "nameAZ":
          return a.name.localeCompare(b.name);
        case "nameZA":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );
  const numProductsToShow = 10; //
  const calculateSearchBoxWidth = () => {
    const productCardWidth =
      document.querySelector(".product-card")?.offsetWidth;
    return productCardWidth ? `${productCardWidth}px` : "100%";
  };
  // useEffect(() => {
  //   dispatch(updateSearchHistory(searchTerm));
  // }, [dispatch, searchTerm]);
  // State to hold products with countInStock less than 5
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (products) {
      const lowStock = products.filter((pd) => pd.countInStock < 5);
      setLowStockProducts(lowStock);
    }
  }, [products]);
  return (
    <>
      <Row className="mb-3 ">
        <Col xs={4} lg={2} md={2} sm={3} xl={2} className="mt-3">
          <Filter handleFilter={handleFilter} />
        </Col>

        <Col xs={8} lg={7} md={10} sm={9} xl={7}>
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input mt-3 outline-secondary border border-secondary rounded-3 text-dark"
            style={{ width: calculateSearchBoxWidth(), outlineStyle: "solid", height:"48px" }}
          />
        </Col>
        <Col xs={12} lg={3} md={12} sm={12}  xl={3} className="mt-3">
          <SortItems onSortChange={handleSortChange} />
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row className="mb-5">
            {filteredProducts.slice(0, numProductsToShow).map((product) => (
              <Col key={product._id} className="col-12" sm={6} md={6} lg={4} xl={3} style={{marginBottom:"10px"}}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Categories />
          </Row>
          <Row>
            <Benefit />
          </Row>
          <Row>
            <Contact/>
          </Row>

          {recentlyViewedIds.length === 0 ? (
            <></>
          ) : (
            <Row>
              <RecentlyViewedProducts />
            </Row>
          )}
          
        </>
      )}
    </>
  );
};
export default HomeScreen;
