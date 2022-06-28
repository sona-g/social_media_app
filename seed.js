//Master function to seed DB.

const User = require("./models/userSchema");
const bcrypt = require("bcrypt");
const Post = require("./models/postSchema");
const { Comment } = require("./models/commentSchema");
const saltRounds = 10;

/* PseudoCode
Create users
Collect their username, names and _ids into a map
Populate friends list
Create posts
Populate user _Ids
Create comments
random user and push into random posts.

*/

module.exports = async function seed() {
    console.log("Starting Seed...");
    try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    
    const seedUsers = await User.create([{
			username: "admin",
			name: "admin",
			password: bcrypt.hashSync(
				"123",
				bcrypt.genSaltSync(saltRounds)
			)
		},{
			username: "user_03",
			name: "Brandon",
			password: bcrypt.hashSync(
				"098",
				bcrypt.genSaltSync(saltRounds)
			),
		}, {
			username: "user_02",
			name: "QY",
			password: bcrypt.hashSync(
				"456",
				bcrypt.genSaltSync(saltRounds)
			),
		}, {
			username: "user_01",
			name: "Sonakshi",
			password: bcrypt.hashSync(
				"789",
				bcrypt.genSaltSync(saltRounds)
			),
		}]);
    Promise.all([User.findOneAndUpdate({username: "user_03"}, {listOfFriends: seedUsers.filter(ele => ele.username === 'user_01')}),
    User.findOneAndUpdate({username: "user_02"}, {listOfFriends: seedUsers.filter(ele => ele.username === 'user_01')}),
    User.findOneAndUpdate({username: "user_01"}, {listOfFriends: seedUsers.filter(ele => ele.username === 'user_02' || ele.username === "user_01")})]);

    console.log("Users and friends list populated");

    const seedPosts = await Post.create([
        {
            title: 'Hello Copenhagen',
            description: 'Boats, Life, Serenity, Hygge',
            image: "https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg",
            ownerOfPost: seedUsers[2]._id,
            usersLikedList: [seedUsers[3]._id],
        },
        {
            title: 'The first animal closeup',
            description: 'The cow said moo to me in Switzerland!',
            image: "https://images.pexels.com/photos/205001/pexels-photo-205001.jpeg",
            ownerOfPost: seedUsers[3]._id,
            usersLikedList: [seedUsers[2]._id,seedUsers[1]._id],
        },
        {
            title: 'I love Italy',
            description: 'Italy is my life. I love Italy more than my wife. Fuyoh',
            image:"https://nehraconsultancy.com/wp-content/uploads/2020/12/amalfi-italy-shutterstock_759048709_bdda191300.jpg",
            ownerOfPost: seedUsers[1]._id,
            usersLikedList: [seedUsers[3]._id],
        },
        {
            title: 'FIRST BIRTHDAY!',
            description: 'Happy Birthday to my dearest baby!',
            image: "https://images.pexels.com/photos/1857157/pexels-photo-1857157.jpeg",
            ownerOfPost: seedUsers[3]._id
        }
    ])
    console.log("Posts created");

    const seedComments = await Comment.create([
        {
            ownerOfComment: seedUsers[3].name,
            commentText: "OH WOWWOWOWOWOW!!!"
        },
        {
            ownerOfComment: seedUsers[2].name,
            commentText: "coolio milio!"
        },
        {
            ownerOfComment:seedUsers[1].name,
            commentText: "awesome shit!"
        },
        {
            ownerOfComment: seedUsers[3].name,
            commentText: "i Lurve this!"
        },
        {
            ownerOfComment: seedUsers[1].name,
            commentText: "HAHAHAHA"
        }
    ])
   Promise.all([Post.findByIdAndUpdate(seedPosts[0]._id, {$push: {commentsArray: seedComments[0]}}),
   Post.findByIdAndUpdate(seedPosts[1]._id, {$push: {commentsArray: [seedComments[1], seedComments[2]]}}),
   Post.findByIdAndUpdate(seedPosts[2]._id, {$push: {commentsArray: seedComments[3]}})
   ]); 
    
   console.log("Comments added");

    } catch (err){
        console.log("error in seed!",err);
    }
    console.log("Completed!");
}