import React from "react";
import { useParams } from "react-router-dom";
const ProductPage = () => {
  const { link } = useParams();
  return <div>{link}</div>;
};

export default ProductPage;
