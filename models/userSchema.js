const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true, index: true, unique: true},
	name: { type: String, required: true },
	password: { type: String, required: true },
	listOfFriends: [{ type: Schema.Types.ObjectId, ref: 'User' , default: []}]
});

const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;
