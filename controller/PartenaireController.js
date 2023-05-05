const partenaireModel = require("../models/PartenaireModel");
const mongoose = require("mongoose");

const getPartenaire = async (req, res, next) => {
  try {
    const partenaire = await partenaireModel.find();
    res.json(partenaire);
  } catch (err) {
    throw err.message;
  }
};


const addPartenaire = async (req, res, next) => {
    try {
      const { nom, emplacement, numero, email, longitude, latitude } = req.body;
      if (!nom || !emplacement || !numero || !email || !longitude || !latitude) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const newPartenaire = new partenaireModel({ nom, emplacement, numero, email, longitude, latitude });
      const savedPartenaire = await newPartenaire.save();
      res.status(201).json(savedPartenaire);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { getPartenaire, addPartenaire };
 
