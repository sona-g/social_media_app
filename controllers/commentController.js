const express = require('express');
const { StatusCodes } = require('http-status-codes');
const comment = express.Router();
const {Comment} = require('../models/commentSchema');

//routes

//index - get (display a list of all the comments)
comment.get('/', async (req, res) => {
	try {
		const allComments = await Comment.find({});
		res
			.status(StatusCodes.ACCEPTED)
			.send({ status: 'success', data: allComments });
	} catch (error) {
		res.send(error);
	}
});

// Will add in later - for AUTH
// Request + Cookie -> Session -> req.session
// router.get('/:id', async (req, res) => {
// 	if (!req.session.user) {
// 		res.status(StatusCodes.UNAUTHORIZED).send({ status: 'failed' });
// 	} else {
// 		try catch blah blah
// 	}
// });

//create - post (add new comment to database, then redirect)
comment.post('/', async (req, res) => {
	// if (req.body.numOfLikes < 0) {
	// 	res.status(StatusCodes.FORBIDDEN).send("Likes can't be negative");
	// }
	try {
		await Comment.create(req.body);
		res
		.status(StatusCodes.CREATED)
		.send({ status: 'success', data: newComment });
		console.log(newComment)
		//res.send("success")
	} catch (error) {
		res.send(error);
	}
});

//show - get (show info about 1 particular comment)
comment.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		selectedComment = await Comment.findById(id);
		if (selectedComment === null) {
			res
				.status(StatusCodes.NOT_FOUND)
				.send({ status: 'fail', data: 'Comment not found' });
		} else {
			res
				.status(StatusCodes.ACCEPTED)
				.send({ status: 'success', data: selectedComment });
		}
	} catch (error) {
		res.send(error);
	}
});

//update - put (update a particular comment, then redirect)
comment.put('/:id', async (req, res) => {
	const { id } = req.params;
	if (req.body.numOfLikes < 0) {
		res.status(StatusCodes.FORBIDDEN).send("Likes can't be negative");
	} else {
		try {
			const updateComment = await Comment.findByIdAndUpdate(id, req.body);
			if (updateComment === null) {
				res
					.status(StatusCodes.NOT_FOUND)
					.send({ status: 'fail', data: 'Comment not found' });
			} else {
				res
					.status(StatusCodes.OK)
					.send({ status: 'success', data: updateComment });
			}
		} catch (error) {
			res.send(error);
		}
	}
});

//destroy - delete (delete a comment then redirect)
comment.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const deleteComment = await Comment.findByIdAndDelete(req.params.id);
		if (deleteComment === null) {
			res
				.status(StatusCodes.NOT_FOUND)
				.send({ status: 'fail', data: 'Comment not found' });
		} else {
			res
				.status(StatusCodes.OK)
				.send({ status: 'success', data: deleteComment });
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = comment;
