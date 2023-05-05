const utilisateurModel = require("../models/UserModel");
const mongoose = require("mongoose");

const getUtilisateurs = async (req, res, next) => {
  try {
    const utilisateurs = await utilisateurModel.find();
    res.json(utilisateurs);
  } catch (err) {
    throw err.message;
  }
};

module.exports = {
  getUtilisateurs,
};
