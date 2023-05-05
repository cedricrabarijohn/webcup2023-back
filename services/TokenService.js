var axios = require("axios");

const getToken = async () => {
  const { CLIENT_ID, CLIENT_SECRET, AIRTEL_API_URL } = require("../config");
  var data = JSON.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
  });

  var config = {
    method: "post",
    url: `${AIRTEL_API_URL}/auth/oauth2/token`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try{
    const res = await axios(config)
    return res.data
  }catch(err){
    throw err
  }
};

module.exports = {
    getToken
}