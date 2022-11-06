import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

const HomePage = () => {
  return (
    <div>
      <h1>Popular products</h1>
      <div className="products">
        {data.products.map((product) => (
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
        ))}
      </div>
    </div>
  );
};

export default HomePage;
