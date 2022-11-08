import React from "react";
import { useParams } from "react-router-dom";
import { useReducer, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import Rating from "../components/Rating";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const defaultState = { loading: true, error: "", product: null };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { link } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_DATA" });
      try {
        const result = await axios.get(`/api/products/${link}`);

        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, [link]);

  return state.loading ? (
    <LoadingSpinner />
  ) : state.error ? (
    <h1> {state.error}</h1>
  ) : (
    <Row>
      <Col md={6}>
        <img
          src={state.product.image}
          alt={state.product.link}
          className="full-image"
        />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h1>{state.product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating
              rating={state.product.rating}
              numReviews={state.product.numReviews}
            />
          </ListGroup.Item>
          <ListGroup.Item>${state.product.price}</ListGroup.Item>
          <ListGroup.Item>
            <p>{state.product.description}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>${state.product.price}</Card.Title>
            <div className="product-status">
              Status:
              {state.product.stock > 0 ? (
                <Badge bg="warning">In stock</Badge>
              ) : (
                <Badge bg="danger">Out of Stock</Badge>
              )}
            </div>
            <hr />
            <Button className="product-button" variant="warning">
              Add to cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductPage;
