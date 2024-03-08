import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { removeUser, loggedUserDetails } from "../Slices/userSlice";
import CustomOffcanvas from "../componant/OffCanvas";
import "../scss/Header.scss";
import { useNavigate } from "react-router-dom";
import { cartlist, existedCartItem } from "../Slices/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const cartItems = useSelector((state) => state.cart.cartList.cartItems);
  const cartItemsCount = cartItems.length;
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(cartlist());
    // dispatch(existedCartItem());
    dispatch(loggedUserDetails());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="col-md-2" href="/">Proshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="col-md-10 justify-content-end">
            <Nav className="ms-auto">
              <Nav.Link href="/mainscreen">Home</Nav.Link>
              <Nav.Link href="/all-products">All Products</Nav.Link>
              <Nav.Link href="/camera">Camera</Nav.Link>
              <Nav.Link href="/airpods">AirPods</Nav.Link>
              <Nav.Link href="/smartphone">Smart Phone</Nav.Link>
              <NavDropdown
                style={{ marginRight: "0rem" }}
                title="Account"
                id="account"
                className="dropdown-button"
              >
                <div>
                  <NavDropdown.Item href="/cart"><i class="fa-solid fa-cart-shopping"></i>Cart</NavDropdown.Item>
                  <NavDropdown.Item href="/profile"><i class="fa-solid fa-user"></i>My Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/order"><i class="fa-solid fa-cube"></i>Orders</NavDropdown.Item>
                  <NavDropdown.Item href="/favouritescreen"><i class="fa-regular fa-heart"></i> Wishlist</NavDropdown.Item>
                </div>
              </NavDropdown>
              {userInfo && Object.keys(userInfo).length > 0 ? (
                <Nav>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link onClick={() => setShow(true)}>
                    <i className="fa fa-shopping-cart pe-2 position-relative">
                      <Badge
                        pill
                        bg="secondary"
                        className="position-absolute top-2 start-100 translate-middle"
                      >
                        {cartItemsCount}
                      </Badge>
                    </i>
                  </Nav.Link>
                </Nav>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomOffcanvas show={show} handleClose={() => setShow(false)} />
    </header>
  );
};

export default Header;
