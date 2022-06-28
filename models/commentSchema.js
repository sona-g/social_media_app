const mongoose = require('mongoose');
const { Schema } = mongoose;
// const User = require('./userSchema');

const commentSchema = new Schema({
	ownerOfComment: { type: String, required: true },
	commentText: String,
	usersLikedList: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}],
});

commentSchema.virtual('numOfLikes').get(function () {return this.usersLikedList.length});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {Comment,commentSchema};
