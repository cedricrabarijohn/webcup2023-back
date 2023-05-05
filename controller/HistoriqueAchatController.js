const HistoriqueAchatModel = require("../models/HistoriqueAchat");
const mongoose = require("mongoose");

const getHistorique = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const historique = await HistoriqueAchatModel.find({
      id_user: user_id,
    });
    res.json(historique);
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};
module.exports = {
  getHistorique,
};
