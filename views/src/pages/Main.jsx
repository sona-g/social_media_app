import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite} from 'react-icons/md';
import postContext from '../components/PostContext';
import { useContext } from 'react';
import Header from '../components/Header';
import loginContext from '../components/LoginContext';


const Main = () => {
	const { posts, setPosts} = useContext(postContext);
	const {user} = useContext(loginContext);

	const isPostLikedByUser = post => {
		// post.usersLikedList.forEach(ele => console.log("list", ele._id));
		// console.log("user", user[0]._id); 
		if(user?.[0]._id === undefined) {return false}
		else return post.usersLikedList.some(ele => ele._id === user[0]._id);
	}

	const replacePost = (post,index) =>{
		posts.splice(index,1,post);
		setPosts([...posts]);
		fetch(`/api/posts/${post._id}`, {
			method: "PUT",
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				usersLikedList: post.usersLikedList,
			})
		}).then((response, error) => {
			if(error) console.log("replace post", error);
		})
	};

	const handleLike = (post) => {
    const postIndex = posts.findIndex(ele => ele._id === post._id);
    if (isPostLikedByUser(post)) {
      const index = post.usersLikedList.findIndex((ele) => ele._id === user[0]._id);
      post.usersLikedList.splice(index,1);
    } else {
		post.usersLikedList.push({name: user?.[0]?.name, _id: user?.[0]?._id});
	} 
	replacePost(post,postIndex);
  };

console.log(user?.[0]?.name);
console.log(posts?.ownerOfPost?.name);
	return (
		<>
			<Header />
			<div className="row row-cols-1 row-cols-md-2" style={{ display: 'flex' }}>
				{posts?.map((post) => {
					return (
						<div className="card" style={{ width: '18rem', margin: '2%' }} key={post?._id}>
							<div className="card-body">
								<h5 className="card-title" style={{ textAlign: 'left' }}>
									{post?.ownerOfPost?.name}
								</h5>
								<Link
									to={`/posts/${post?._id}`}
									style={{ color: 'inherit', textDecoration: 'inherit' }}
								>
									<img
										id={post?._id}
										src={post?.image}
										className="card-img-top"
										alt={post?.title}
									/>
								</Link>
								<div
									className="card-text"
									style={{ justifyContent: 'space-between' }}
								>
									<p
										style={{
											textAlign: 'left',
											fontWeight: 'bold',
											marginBottom: '2%',
										}}
									>
										{post?.usersLikedList?.length} Likes
									</p>
									<p style={{ textAlign: 'left' }}>
										<span style={{ fontWeight: 'bold' }}>
											{post?.ownerOfPost?.name}
										</span>
										: {post?.title}
									</p>
									<p className="d-flex justify-content-between">
										<span style={{ fontSize: '70%' }}>Date/Time</span>
										<button
											type="button"
											className="btn btn-light"
											onClick={() => handleLike(post)}>
											{isPostLikedByUser(post) ? <MdFavorite/> : <MdFavoriteBorder />}
										</button>
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Main;
