const tokenService = require('../services/TokenService')

const getToken = async(req,res,next) => {
  try{
    const token = await tokenService.getToken()
    res.json(token)
  }catch(err){
    res.status(401).json({
      err: err.message
    })
  }
}
module.exports = {
  getToken
}