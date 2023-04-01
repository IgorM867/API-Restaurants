require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
let port = process.env.port || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const restaurantsRouter = require("./routes/restaurants.js");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://restaurant-im.netlify.app");
  //res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/restaurants", restaurantsRouter);
app.listen(port, () => {
  console.log(`Server listenig on port: ${port}`);
});
