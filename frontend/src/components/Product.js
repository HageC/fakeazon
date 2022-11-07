import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/product/${product.link}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.link}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Card.Text>${product.price}</Card.Text>
        <Button>Add product to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
