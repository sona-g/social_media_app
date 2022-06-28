import React, { useState } from 'react';
import postContext from '../components/PostContext';
import loginContext from '../components/LoginContext';
import { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const Post = () => {
	//const { posts, setPosts } = useContext(postContext);
	const { user } = useContext(loginContext);
	const [posts, setPosts] = useState({});
	const [comment, setComment] = useState('')
	const { id } = useParams();

	useEffect(() => {
		fetch(`/api/posts/${id}`)
			.then((response) => response.json())
			.then((data) => setPosts(data.data));
	}, []);

	const handleComment = () => {
		fetch('/api/comment/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ownerOfComment: user?.[0]?.name,
				commentText: comment
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		// posts?.commentsArray?.push({ownerOfComment: user?.[0]?._id,
		//                             commentText: comment})

	};
	//setPosts(...posts)
	console.log(user?.[0]?.name)
	console.log(comment);
	console.log(posts?.commentsArray);
	return (
		<div>
			<Header />
			<div className="d-inline-flex p-2 bd-highlight">
				<div
					className="card"
					style={{ width: '50%' }}
					key={posts?._id}
				>
					<div className="card-body">
						<h5 className="card-title" style={{ textAlign: 'left' }}>
							{posts?.ownerOfPost?.name}
						</h5>
						<img
							id={posts?._id}
							src={posts.image}
							className="card-img-top"
							alt={posts.title}
						/>
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
								Liked by {posts?.usersLikedList?.[0]?.name} and{' '}
								{posts?.usersLikedList?.length - 1} more
							</p>
							<p style={{ textAlign: 'left' }}>
								<span style={{ fontWeight: 'bold' }}>
									{posts?.ownerOfPost?.name}
								</span>
								: {posts.description}
							</p>
						</div>
					</div>
				</div>

				<div className="container mt-5">
					<div className="d-flex justify-content-left row">
						<div className="col-md-6">
							<h5 className="card-title" style={{ textAlign: 'right', width: '50%' }}>COMMENTS</h5>
							<div className="d-flex flex-column comment-section">
								{posts?.commentsArray?.map((post) => {
									return (
										<>
											<div className="bg-white p-2" key={post?.ownerOfComment}>
												{/* <div className="d-flex flex-row user-info">
												<img
													className="rounded-circle"
													src="https://i.imgur.com/RpzrMR2.jpg"
													alt=""
													width="40"
												/>
												<div className="d-flex flex-column justify-content-start ml-2">
													<span className="d-block font-weight-bold name">
														{post?.ownerOfPost}
													</span>
													<span className="date text-black-50">Date/ Time</span>
												</div>
											</div> */}
												<div className="mt-2">
													<p className="comment-text">{post?.ownerOfComment} : {post?.commentText}</p>
												</div>
											</div>
											{/* <div className="bg-white">
											<div className="d-flex flex-row fs-12">
												<div className="like p-2 cursor">
													<i className="fa fa-thumbs-o-up"></i>
													<span className="ml-1">Like</span>
												</div>
												<div className="like p-2 cursor">
													<i className="fa fa-commenting-o"></i>
													<span className="ml-1">Comment</span>
												</div>
												<div className="like p-2 cursor">
													<i className="fa fa-share"></i>
													<span className="ml-1">Share</span>
												</div>
											</div>
										</div> */}
										</>
									);
								})}
								<div className="bg-light p-2">
									<div className="d-flex flex-row align-items-start">
										<img
											className="rounded-circle"
											src="https://i.imgur.com/RpzrMR2.jpg"
											alt=""
											width="40"
										/>
										<textarea className="form-control ml-1 shadow-none textarea" label="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
									</div>
									<div className="mt-2 text-right">
										<button
											className="btn btn-primary btn-sm shadow-none"
											type="button"
											onClick={handleComment}
										>
											Post comment
										</button>
										<button
											className="btn btn-outline-primary btn-sm ml-1 shadow-none"
											type="button"
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		
	);
};

export default Post;
