/**
 * VoicemailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

 /**
   * `JobController.create()`
   */
  create: async function (req, res) {
    try {
      let { phone, content } = req.allParams()
      if (!phone) {
        return res.badRequest({err : 'phone is required field'})
      }
      if (!content) {
        return res.badRequest({err : 'content is required field'})
      }
      const user = await User.findOne({ phone : phone })

      if (!user) {
        return res.badRequest({err : 'phone not matched with any users'})
      }

      const voicemail = await Voicemail.create({content , phone , userId : user.id }).fetch()
      return res.ok(voicemail)
    }
    catch (err) {
      return res.serverError(err)
    }
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    try {
      const myIdUser = req.user
      const voicemals = await Voicemail.find({ userId : myIdUser})
      return res.ok(voicemals)
    }
    catch (err) {
      return res.serverError(err)
    }
  },

  /**
   * `VoicemailController.update()`
   */
  update: async function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }

};

