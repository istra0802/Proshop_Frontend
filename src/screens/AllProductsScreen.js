import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { listProducts } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import AllProductForm from "../componant/allProductScreenCompo/AllProductListing";
// import UpdateModal from "../componant/allProductScreenCompo/AddEditModal";
import Filter from "../componant/HomeScreen/filter/Filter";

import { cartlist } from "../Slices/cartSlice";

const AllProductsScreen = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList);
  const { loading, error, products } = item;

  // const cartItems = useSelector((state) => state.cart.cartList.cartItems);

  useEffect(() => {
    // dispatch(existedCartItem());
    dispatch(cartlist());
    dispatch(listProducts());
  }, [dispatch]);

  // const [showModal, setShowModal] = useState(false);
  // const handleShow = () => setShowModal(true);
  // const handleClose = () => setShowModal(false);

  // const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <Row>
      <Col>
        <Row className="align-items-center mb-3">
        
            <Col lg={10} md={10} sm={9} className="col-8">
              <h1 style={{ marginBottom: "0px" }}>All Products </h1>
            </Col>
            <Col lg={2} md={2} sm={2} className="col-4">
              <Filter />
            </Col>
          
        </Row>

        {loading ? (
          <Loader />
        ) : error && products.length === 0 ? (
          <Message>There is no product.</Message>
        ) : (
          <div>
            <AllProductForm />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default React.memo(AllProductsScreen);
