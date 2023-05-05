const { v4: uuidv4 } = require("uuid");
const { PHONE_NUMBER, AIRTEL_API_URL } = require("../config");
const tokenService = require("./TokenService");
var axios = require("axios");
const HistoriqueAchat = require("../models/HistoriqueAchat");

const pay = async ({ amount, recipient_number, reference, user_id }) => {
  reference = reference || "AirtelXPerience";
  recipient_number = recipient_number || `${PHONE_NUMBER}`;
  if (!amount) {
    // console.log("amount should be provided")
    throw Error("Amount should be provided");
  }
  // console.log(`Reference : ${reference}, UUID : ${uuidv4()}, montant : ${amount}`)
  const tokenObj = await tokenService.getToken();
  if (!tokenObj) {
    throw Error("Invalid token");
  }
  const accessToken = tokenObj?.access_token;
  const uniqueId = uuidv4();
  var data = JSON.stringify({
    reference: reference,
    subscriber: {
      currency: "MGA",
      msisdn: recipient_number,
    },
    transaction: {
      amount: amount,
      id: uniqueId,
    },
  });

  var config = {
    method: "post",
    url: `${AIRTEL_API_URL}/merchant/v1/payments/`,
    headers: {
      "X-Country": "MG",
      "X-Currency": "MGA",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const paiementResult = await axios(config);
  const paiementResultData = paiementResult.data;
  const statusCode = paiementResultData.status.code;
  const resultCode = paiementResultData.status.result_code;

  if (statusCode === "200") {
    try {
      const historique = new HistoriqueAchat({
        id_user: user_id,
        montant: amount,
        is_success: true,
      });
      await historique.save();
    } catch (err) {
      const historique = new HistoriqueAchat({
        id_user: user_id,
        montant: amount,
        is_success: false,
      });
      await historique.save();
    }
    return {
      amount: amount,
      transaction_id: uniqueId,
      result_code: resultCode,
    };
  } else {
    const historique = new HistoriqueAchat({
      id_user: user_id,
      montant: amount,
      is_success: false,
    });
    await historique.save();
    throw Error(`Paiement has failed.`);
  }
};

const getPaiementDetails = async ({ paiementId }) => {
  const url = `${AIRTEL_API_URL}/standard/v1/payments/${paiementId}`;
  const tokenObj = await tokenService.getToken();
  if (!tokenObj) {
    throw Error("Invalid token");
  }
  const accessToken = tokenObj?.access_token;
  if (!paiementId) {
    throw Error("Please provide a valid paiement id in params");
  }
  var config = {
    method: "get",
    url: url,
    headers: {
      "X-Country": "MG",
      "X-Currency": "MGA",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const paiementDetailsResult = await axios(config);
  const paiementDetailsResultData = paiementDetailsResult.data;
  const paiementStatus = paiementDetailsResultData.data.transaction.status;
  const PAIEMENT_STATUS = {
    EN_COURS: "TIP",
    SUCCESS: "TS",
    FAILED: "TF",
  };
  if (paiementStatus === PAIEMENT_STATUS.EN_COURS) {
    return {
      id: paiementId,
      status: "En cours",
      status_code: PAIEMENT_STATUS.EN_COURS,
    };
  } else if (paiementStatus === PAIEMENT_STATUS.SUCCESS) {
    return {
      id: paiementId,
      status: "Succes",
      status_code: PAIEMENT_STATUS.SUCCESS,
    };
  } else if (paiementStatus === PAIEMENT_STATUS.FAILED) {
    throw Error(
      JSON.stringify({
        id: paiementId,
        status: "Failed",
        status_code: PAIEMENT_STATUS.FAILED,
      })
    );
  } else {
    throw Error(
      JSON.stringify({
        id: paiementId,
        status: "Failed",
        status_code: PAIEMENT_STATUS.FAILED,
      })
    );
  }
};
module.exports = {
  pay,
  getPaiementDetails,
};
