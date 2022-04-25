const User = require('../models/user')

exports.loginUser = async (req, res) => {
    try{
		const user = await User.findByCredentials(req.body.username, req.body.password);

		if (user) {
			res.status(404).json({
				message: 'User not found!'
			});
			return;
		}
		
		const token = user.generateAuthToken();
		res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 86400});
		res.status(200).json({
			message: 'Successfully logged in!',
			user
		});
    } catch(error){
      	res.status(400).json({
        	message: error.message
		});
    }
}

exports.logoutUser = async (req,res) => {
	try {
		res.cookie('token', '', { maxAge: 1 })
  		res.status(200).json({
    		message: 'Successfully logged out!',
  		});
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
}