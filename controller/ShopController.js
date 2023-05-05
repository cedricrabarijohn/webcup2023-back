const shopModel = require("../models/ShopModel");
const mongoose = require("mongoose");

const getShops = async (req, res, next) => {
  try {
    const shops = await shopModel.find();
    res.json(shops);
  } catch (err) {
    throw err.message;
  }
};

const addShops = async (req, res, next) => {
  try {
    const { nom, longitude, latitude } = req.body;
    if (!nom || !longitude || !latitude) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }
    const newShop = new shopModel({ nom, longitude, latitude });

    const savedShop = await newShop.save();
    res.status(201).json(savedShop);
  } catch (err) {
    throw err.message;
  }
};

module.exports = { getShops, addShops };
 