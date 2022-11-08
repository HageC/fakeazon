import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card>
      <Link to={`/products/${product.link}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.link}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />$
        {product.price}
        <div>
          {product.stock > 0 ? (
            <Badge bg="warning">In stock</Badge>
          ) : (
            <Badge bg="danger">Out of Stock</Badge>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
