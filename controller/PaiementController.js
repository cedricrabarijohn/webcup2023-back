const paiementService = require("../services/PaiementService");

const pay = async (req, res, next) => {
  const user_id = req.user.id;
  const { amount, msisdn, reference } = req.body;
  try {
    const result = await paiementService.pay({
      amount,
      msisdn,
      reference,
      user_id
    });
    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const getPaiementDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const paiementStatus = await paiementService.getPaiementDetails({
      paiementId: id,
    });
    return res.json(paiementStatus);
  } catch (err) {
    return res.status(400).json(JSON.parse(err.message));
  }
};
module.exports = {
  pay,
  getPaiementDetails,
};
