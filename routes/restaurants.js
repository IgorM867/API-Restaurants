const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.js");

//Getting all
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.send(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Getting one
router.get("/:id", getRestaurant, (req, res) => {
  res.json(res.restaurant);
});
//Creating one
router.post("/", async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    location: req.body.location,
    stars: req.body.stars,
    description: req.body.description,
    price: req.body.price,
  });
  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Update one
router.patch("/:id", getRestaurant, async (req, res) => {
  if (req.body.name != null) {
    res.restaurant.name = req.body.name;
  }
  if (req.body.location != null) {
    res.restaurant.location = req.body.location;
  }
  if (req.body.stars != null) {
    res.restaurant.stars = req.body.stars;
  }
  if (req.body.description != null) {
    res.restaurant.description = req.body.description;
  }
  if (req.body.price != null) {
    res.restaurant.price = req.body.price;
  }
  try {
    const updatedRestaurant = await res.restaurant.save();
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Deleteing one
router.delete("/:id", getRestaurant, async (req, res) => {
  try {
    await res.restaurant.deleteOne(res.restaurant);
    res.json({ message: "Deleted Restaurant" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: "Cannot find restaurant" });
    }
  } catch (error) {
    res.status(590).json({ message: error.message });
  }
  res.restaurant = restaurant;
  next();
}

module.exports = router;
