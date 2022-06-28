import React from 'react';
// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	MdFavoriteBorder,
	MdFavorite,
	MdDeleteOutline,
	MdEdit,
} from 'react-icons/md';
import postContext from '../components/PostContext';
import { useContext } from 'react';
import Header from '../components/Header';
import loginContext from '../components/LoginContext';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
	const navigate = useNavigate();
	const { posts, handleDelete, counter, setCounter } = useContext(postContext);
	const { user, setUser } = useContext(loginContext);

	// if (user[0]?._id === posts?.ownerOfPost) {
	// 	//display all posts by user
	// }
	// console.log(user);
	// console.log(posts);

	return (
		<>
			<Header />
			<div className="postContainer" style={{ display: 'flex' }}>
				{posts.map(
					(post) =>
						user?.[0]?._id === post?.ownerOfPost?._id && (
							<div className="card" style={{ width: '18rem' }} key={post?._id}>
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
											<button type="button" className="btn btn-light">
												<MdEdit
													onClick={() => {
														console.log(post?._id);
														navigate(`/myposts/${post?._id}`, {
															replace: true,
														});
													}}
												/>
											</button>
											<button type="button" className="btn btn-light">
												<MdDeleteOutline
													onClick={() => {
														handleDelete(post?._id);
													}}
												/>
											</button>
										</p>
									</div>
								</div>
							</div>
						)
				)}

				{/* {posts.map((post) => {
					return (
						<div className="card" style={{ width: '18rem' }} key={post?._id}>
							<div className="card-body">
								<h5 className="card-title" style={{ textAlign: 'left' }}>
									{post?.ownerOfPost?.name}
								</h5>
								<Link
									to={`/posts/${post._id}`}
									style={{ color: 'inherit', textDecoration: 'inherit' }}
								>
									<img
										id={post._id}
										src={post.image}
										className="card-img-top"
										alt={post.title}
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
										{post.usersLikedList.length} Likes
									</p>
									<p style={{ textAlign: 'left' }}>
										<span style={{ fontWeight: 'bold' }}>
											{post?.ownerOfPost?.name}
										</span>
										: {post.title}
									</p>
									<p className="d-flex justify-content-between">
										<span style={{ fontSize: '70%' }}>Date/Time</span>
										<button
											type="button"
											className="btn btn-light"
											onClick={() => handleLike(post._id)}
										>
											<MdDeleteOutline
												onClick={() => {
													handleDelete(post._id);
												}}
											/>
											<MdFavoriteBorder />
										</button>
									</p>
								</div>
							</div>
						</div>
					);
				})} */}
			</div>
		</>
	);
};

export default MyPosts;
