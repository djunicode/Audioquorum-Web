// Importing modules
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

let auth = {
	verifyjwt:  async (req, res, next) => {
		try{
			const token = req.header('Authorization').replace('Bearer ', '');
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

			if (!user) {
				res.status(401).json({
					message: 'Please Authenticate'
				});
				return;
			}

			req.user = user;
			req.token = token;
			next();
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	},

	userTypeAdmin: async (req, res, next) => {
		try{
			if (req.user.type === 'ADMIN') {
				next();
			} else {
				res.status(403).json({
					message: 'Access Denied'
				});
				return;
			}
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	},

	userTypeTeacher: async (req, res, next) => {
		try{
			if (req.user.type === 'ADMIN' || req.user.type === 'TEACHER')  {
				next();
			} else {
				res.status(403).json({
					message: 'Access Denied'
				});
				return;
			}
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	},

	userTypeTeacherStudent: async (req, res, next) => {
		try{
			if (req.user.type === 'ADMIN' || req.user.type === 'TEACHER' || req.user.type === 'STUDENT') {
				next();
			} else {
				res.status(403).json({
					message: 'Access Denied'
				});
				return;
			}
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	},

	userTypeStudent: async (req, res, next) => {
		try{
			if (req.user.type === 'STUDENT') {
				next();
			} else {
				res.status(403).json({
					message: 'Access Denied'
				});
				return;
			}
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	}
}

module.exports = auth;