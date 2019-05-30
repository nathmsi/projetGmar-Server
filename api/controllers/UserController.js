/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require('joi')

module.exports = {
  

  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        phone : Joi.string().required(),
        password : Joi.string().required()
      })



      const {phone , password} = await Joi.validate(req.allParams(), schema)
      const encryptPassword = await UtilService.hashPassword(password)

      const results = await User.create({ phone , password : encryptPassword})
      return res.ok(results)
    }
    catch (err) {
      if(err.name === 'ValidationError'){
        return res.badRequest({err : 'ValidationError'})
      }
      return res.badRequest({err : 'user exist '})
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        phone : Joi.string().required(),
        password : Joi.string().required()
      })

      monkeylearnAPI.languageClassifier(['salut !'])
      monkeylearnAPI.urgencyDetection(['urgent'])
      
      const {phone , password} = await Joi.validate(req.allParams(), schema)
      const user = await User.findOne({phone})
      if(!user){
        return res.badRequest({err : 'user does not exist'})
      }
      const matchedPassword = await UtilService.comparePassword(password, user.password)
      if(!matchedPassword){
        return res.badRequest({err : 'passord incorrect'})
      }
      const token = JWTService.issuer({user : user.id}, '1 day')
      console.log('login phone number : ' + user.phone)
      return res.ok({token})
    }
    catch (err) {
      if(err.name === 'ValidationError'){
        return res.badRequest({err})
      }
      return res.serverError(err)
    }
  }

};

