const PanierModel = require("../models/PanierModel");
const mongoose = require("mongoose");
const Produit = require("../models/ProduitModel");

const getPanier = async (req, res, next) => {
  try {
    const produits = await PanierModel.find();
    res.json(produits);
  } catch (err) {
    throw err.message;
  }
};
const getUserPanier = async (req, res, next) => {
  try {
    const panierUser = await PanierModel.findOne({
      id_user: req.user.id,
    });
    if (panierUser === null) {
      return res.status(404).json({
        error: "Product not found",
      });
    }
    return res.json(panierUser);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
const ajouterAuPanier = async (panierId, produit, quantite = 1) => {
  const panier = await PanierModel.findById(panierId);
  const produitExistant = panier.panierProduit.find(
    (item) => item.produit._id.toString() === produit._id.toString()
  );
  if (produitExistant) {
    produitExistant.quantite += quantite;
  } else {
    panier.panierProduit.push({ produit, quantite });
  }
  await panier.save();
};

const addPanier = async (req, res, next) => {
  try {
    const { panierId, produit, quantite } = req.body;
    const produit_obj = await Produit.findById(produit);
    await ajouterAuPanier(panierId, produit_obj, quantite);
    const updatedPanier = await PanierModel.findById(panierId);
    res.status(201).json(updatedPanier);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Impossible d'ajouter au panier",
    });
  }
};
const validateUserPanier = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const panier_user = await PanierModel.findOne({
      id_user: user_id,
    });
    if (panier_user) {
      panier_user.panierProduit = [];
      panier_user.save();
      return res.json({
        message: `Panier confirmé avec succès`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Impossible de confirmer le panier",
    });
  }
};
module.exports = { getPanier, getUserPanier, addPanier, validateUserPanier };
