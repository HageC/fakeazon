import express from "express";
import data from "./data.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.status(200).json(data);
});

app.listen(port, console.log(`Server is listening on port ${port}`));
