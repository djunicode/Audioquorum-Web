const User = require('../models/user')

exports.loginUser = async (req, res) => {
    try{
      const user = await User.findByCredentials(req.body.username, req.body.password)
  
      const token = user.generateAuthToken()

      res.cookie('token', token, { httpOnly: true, maxAge: 1000*86400})
  
      res.json({
        success: true,
        user
      })
  
    } catch(e){
      console.log(e)
      res.status(400).json({
        success: false
      })
    }
  }

exports.logoutUser = async (req,res) => {
  res.cookie('token', '', { maxAge: 1 })
  res.json({
    success: true,
  
  })
  
  }