const produitModel = require("../models/ProduitModel");
const mongoose = require("mongoose");

const getProduits = async (req, res, next) => {
  try {
    const produits = await produitModel.find();
    res.json(produits);
  } catch (err) {
    throw err.message;
  }
};
const getProduitById = async (req, res, next) => {
  try {
    const produit = await produitModel.findById(req.params.id);
    res.json(produit);
  } catch (err) {
    throw err.message;
  }
};
const addProduits = async (req, res, next) => {
  try {
    const { nom, description, prix, type, image, duree, longitude, latitude } =
      req.body;
    if (
      !nom ||
      !description ||
      !prix ||
      !type ||
      !image ||
      !duree ||
      !longitude ||
      !latitude
    ) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newProduit = new produitModel({
      nom,
      description,
      prix,
      type,
      image,
      duree,
      longitude,
      latitude,
    });

    const savedProduit = await newProduit.save();
    res.status(201).json(savedProduit);
  } catch (err) {
    throw err.message;
  }
};

module.exports = { getProduits, getProduitById, addProduits };
