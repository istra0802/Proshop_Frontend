import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Button, Card, Container, Row } from "react-bootstrap";
import HeartIcon from "../../HeartIcon";
import { Link } from "react-router-dom";
import { addToCart } from "../../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Rating from "../../Rating";
import "./Product_Display.scss";
import Example from "../../HomeScreen/filter/Filter";

const ProductDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState(""); // State for selected brand
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products`
      );
      const filteredProducts = response.data.filter(
        (product) =>
       {
         console.log("my",product.brand)
       if( product.category === category &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] && (selectedBrand === "" || product.brand === selectedBrand) )
        {
          return true;
        }
       
       
       
       })

       setProducts(filteredProducts)
        
    } 
    catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [category, priceRange, selectedBrand]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: userInfo._id,
          productId,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToCart(response?.data?.product));
      toast.success("Product added to cart");
    } catch (error) {
      console.log("Error adding product to cart:", error);
    }
  };

  const handleFilterButtonClick = useCallback((data) => {
    setPriceRange(data);
  }, []);

  const handleBrandFilter = (brand) => {
    setSelectedBrand(brand);
   
    
  };

  return (
    <Container>
      <h1>{category} Products</h1>
      <Example handleFilter={handleFilterButtonClick} handleBrandFilter={handleBrandFilter}/>
      <Row>
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <Card
              className="my-3 p-3 rounded "
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              <div
                className="product-image-container"
                style={{ position: "relative", flex: "1 0 auto" }}
              >
                <Link to={`/product/${product._id}`}>
                  <Card.Img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </Link>
                <HeartIcon product={product} />
                {hovered && (
                  <Button
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                    }}
                    onClick={() => {
                      handleAddToCart(product._id);
                    }}
                    variant="dark"
                    as={Link}
                    block
                    className="w-100 p-1 opacity-75"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
              <Card.Body style={{ flex: "0 0 auto" }}>
                <Link to={`/product/${product._id}`}>
                  <Card.Title as="div">
                    <strong>{product.name}</strong>
                  </Card.Title>
                </Link>
                <Card.Text as="div">
                  <div className="my-3"></div>
                  {product.rating} from {product.numReviews} review
                </Card.Text>
                <Card.Text as="div">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ProductDisplay;
