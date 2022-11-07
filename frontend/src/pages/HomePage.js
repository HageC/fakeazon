import React, { useEffect, useReducer } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import axios from "axios";

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
          state.products.map((product) => (
            <div className="product" key={product.link}>
              <Link to={`/product/${product.link}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.link}`}>
                  <p>{product.name}</p>
                </Link>
                <p className="product-price">${product.price}</p>
                <button>Add product to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
