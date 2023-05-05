const cagnotteModel = require("../models/CagnotteModel");
const mongoose = require("mongoose");

const getCagnotte = async (req, res, next) => {
  try {
    const cagnotte = await cagnotteModel.find();
    res.json(cagnotte);
  } catch (err) {
    throw err.message;
  }
};

const addCagnotte = async (req, res, next) => {
    try {
      const { utilisateur, montant, titre, description, image, estValide } = req.body;
      if (!utilisateur || !utilisateur._id || !utilisateur.nom || !utilisateur.prenom || !utilisateur.profile || !montant || !titre || !description) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const newCagnotte = new cagnotteModel({ utilisateur, montant, titre, description, image, estValide, });
      const savedCagnotte = await newCagnotte.save();
      res.status(201).json(savedCagnotte);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

module.exports = { getCagnotte, addCagnotte };
 