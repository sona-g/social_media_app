const express = require('express');
const userRoute = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const alphaReg = new RegExp('^[a-zA-Z0-9_-]+$');
const { StatusCodes } = require('http-status-codes');

const checkAlpha = (str) => alphaReg.test(str);
const saltRounds = 10;
const isAuthenticated = (username, req) => req.session.username === username;
//routes

//Retrieve Single user and all details.
userRoute.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (user === null) {
			throw new Error('No such ObjectID for User');
		} else res.status(StatusCodes.ACCEPTED).send(user);
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).send('User not found!');
	}
});

//Create new user
userRoute.post('/new', async (req, res) => {
	const { username, name, password } = req.body;
	try {
		if (checkAlpha(username) && checkAlpha(name) && checkAlpha(password)) {
			const hashPassword = bcrypt.hashSync(password, saltRounds);
			const newUser = await User.create({
				username: username,
				name: name,
				password: hashPassword,
			});
			res.status(StatusCodes.CREATED).send(newUser);
		} else {
			throw new Error('Validation failed');
		}
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send('Failed to create, ' + error);
	}
});

//User Login
//return entire user object
userRoute.post('/login', async (req, res) => {
	const { username, password } = req.body;
	try {
		const search = await User.find({ username: username });
		if (search.length === 0) {
			throw new Error('User not found!');
		} else if (bcrypt.compareSync(password, search[0].password)) {
			req.session.username = username;
			//no body, so will have console error.
			res.status(StatusCodes.OK).send(search);
		} else {
			throw new Error('Login fail!');
		}
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).send(`${error}`);
	}
});

//User Logout
userRoute.get('/logout/:username', (req, res) => {
	if (isAuthenticated(req.params.username, req)) {
		req.session.destroy(() => res.sendStatus(StatusCodes.OK));
	} else res.status(StatusCodes.OK).send('No session found');
});

//Very weak password reset.
userRoute.put('/reset', async (req, res) => {
	try {
		const { username, password } = req.body;
		await User.findOneAndUpdate(
			{ username: username },
			{ password: bcrypt.hashSync(password, saltRounds) }
		);
		res.status(StatusCodes.ACCEPTED);
	} catch (error) {
		console.log(error);
		res.status(StatusCodes.BAD_REQUEST).send(error);
	}
});

userRoute.delete('/delete/:username', async (req, res) => {
	//check they are logged in first.
	// only logged in users can delete their account
	try {
		if (isAuthenticated(req.params.username, req)) {
			const removed = await User.findOneAndDelete({
				username: req.params.username,
			});
			res.status(StatusCodes.ACCEPTED).send(removed);
		} else res.sendStatus(StatusCodes.UNAUTHORIZED);
	} catch (error) {
		res.status(StatusCodes.BAD_REQUEST).send(error);
	}
});

//TO BE REMOVED?
userRoute.get('/', async (req, res) => {
	try {
		const users = await User.find(
			{},
			{ username: 1, name: 1, listOfFriends: 1 }
		);
		res.status(StatusCodes.ACCEPTED).send(users);
	} catch (err) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
	}
});
module.exports = {
	user: userRoute,
	isAuthenticated: isAuthenticated,
};
