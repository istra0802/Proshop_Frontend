import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartlist, updateCart } from "../../../Slices/cartSlice";
import Message from "../../../componant/Message";
import "../../../scss/IncrementDecrementBtn.scss";
import { useEffect } from "react";
import { deleteFromCart } from "../cartFunction/deleteFromCart.js";
import { updateCartQuantityHandler } from "../../../service/product.js";

const CartScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(cartlist());
  }, [dispatch]);

  const cartItems = useSelector((state) => state.cart.cartList.cartItems);

  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item._id] = item.addedQtyInCart;
    });
  }, [cartItems]);

  const checkOutHandler = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  const handleQtyChange = async (userId, productId, quantity) => {
    try {
      const response = await updateCartQuantityHandler({
        userId,
        productId,
        newQuantity: quantity,
      });

      dispatch(updateCart(response?.data?.changedItems));
    } catch (error) {
      console.log("error t o  seee ", error);
    }
  };

  // Inside your component...

  const handleDeleteFromCart = async (userId, productId) => {
    await deleteFromCart(userId, productId, dispatch);
  };

  return (
    <Row>
      <Col md={12}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item?.quantity, 0)})
                items
              </h2>
              {cartItems
                .reduce(
                  (acc, item) => acc + item?.quantity * item?.product?.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.product?._id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item?.product?._id}`}>
                      {item?.product?.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item?.product?.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      style={{ padding: "inherit" }}
                      as="select"
                      value={item?.quantity}
                      onChange={(e) =>
                        handleQtyChange(
                          userInfo?._id,
                          item?.product?._id,
                          Number(e.target.value)
                        )
                      }
                    >
                      {[...Array(item?.product?.countInStock).keys()].map(
                        (x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        handleDeleteFromCart(userInfo._id, item?.product?._id)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      {/* <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item?.quantity, 0)})
                items
              </h2>
              {cartItems
                .reduce(
                  (acc, item) => acc + item?.quantity * item?.product?.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col> */}
    </Row>
  );
};
export default CartScreen;
