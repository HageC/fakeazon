import React, { useEffect, useReducer } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const defaultState = { loading: true, error: "", products: [] };
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_DATA" });
      try {
        const result = await axios.get("/api/products");

        dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Popular products</h1>
      <div className="products">
        {state.loading ? (
          <LoadingSpinner />
        ) : state.error ? (
          <h1>{state.error}</h1>
        ) : (
          <Row>
            {state.products.map((product) => (
              <Col key={product.link} sm={6} md={4} lg={3} className="mt-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
