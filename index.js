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
app.use("/restaurants", restaurantsRouter);
app.listen(port, () => {
  console.log(`Server listenig on port: ${port}`);
});
