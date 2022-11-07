import React from "react";
import { useParams } from "react-router-dom";
const ProductPage = () => {
  const { link } = useParams();
  return <h1>{link}</h1>;
};

export default ProductPage;
