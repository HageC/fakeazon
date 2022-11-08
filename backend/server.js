import express from "express";
import data from "./data.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.status(200).json(data);
});

app.get("/api/products/:link", (req, res) => {
  const { link } = req.params;
  const product = data.products.find((x) => x.link === link);
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  } else {
    res.status(200).send(product);
  }
});
app.listen(port, console.log(`Server is listening on port ${port}`));
