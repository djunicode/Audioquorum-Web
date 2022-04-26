require('dotenv').config()
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

let auth = {
	verifyjwt:  async (req, res, next) => {
		try{
			const token = req.cookies.token;
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			const user = await User.findById(decoded._id);

			if (!user) {
				throw new Error();
			}

			req.user = user;
			next();
		} catch (e) {
			res.status(401).send({error: 'Please authenticate'});
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
			}
		} catch (e) {
			res.status(401).send({error: e.message});
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
			}
		} catch (e) {
			res.status(401).send({error: e.message});
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
			}
		} catch (e) {
			res.status(401).send({error: e.message});
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
			}
		} catch (e) {
			res.status(401).send({error: e.message});
		}
	}
}

module.exports = auth;