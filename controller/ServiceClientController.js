const serviceClientModel = require("../models/ServiceClientModel");
const mongoose = require("mongoose");

const getServiceClients = async (req, res, next) => {
  try {
    const serviceClients = await serviceClientModel.find();
    res.json(serviceClients);
  } catch (err) {
    throw err.message;
  }
};


const addServiceClients = async (req, res, next) => {
    try {
      const { utilisateur, message } = req.body;
      
      if (!utilisateur || !utilisateur._id || !utilisateur.nom || !utilisateur.prenom || !utilisateur.profile || !message) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      const newServiceClient = new serviceClientModel({ utilisateur, message });
      const savedServiceClient = await newServiceClient.save();
      res.status(201).json(savedServiceClient);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { getServiceClients, addServiceClients };
 
