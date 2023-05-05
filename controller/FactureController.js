const factureModel = require("../models/FactureModel");
const mongoose = require("mongoose");

const getFacture = async (req, res, next) => {
  try {
    const facture = await factureModel.find();
    res.json(facture);
  } catch (err) {
    throw err.message;
  }
};

const addFacture = async (req, res, next) => {
    try {
      const { partenaire, raison, montant } = req.body;
      if (!partenaire || !partenaire._id || !partenaire.emplacement || !partenaire.nom || !partenaire.numero || !partenaire.email || !raison || !montant) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const newFacture = new factureModel({ partenaire, raison, montant });
      const savedFacture = await newFacture.save();
      res.status(201).json(savedFacture);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { getFacture, addFacture };
 