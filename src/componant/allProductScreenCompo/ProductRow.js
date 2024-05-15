import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductRow = ({ product }) => {
  console.log("rendring", product);

  return (
    <Row className="align-items-center">
      <Col sm={3} md={2} lg={1} className="col-3">
        <Image src={product.image} alt={product.name} fluid rounded />
      </Col>
      <Col sm={7} md={8} lg={9} className=" col-6" >
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </Col>
      <Col sm={1} md={1} lg={2} className=" col-2" >
        ${product.price}
      </Col>
    </Row>
  );
};

export default React.memo(ProductRow);
