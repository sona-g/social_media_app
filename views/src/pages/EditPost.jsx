import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import { useContext } from 'react';
import loginContext from '../components/LoginContext';
import { useNavigate } from 'react-router-dom';
import postContext from '../components/PostContext';
import { useParams } from 'react-router-dom';

const EditPost = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const { user, setUser } = useContext(loginContext);
	const { counter, setCounter } = useContext(postContext);
	const [imageSrc, setImageSrc] = useState(null);
	const [title, setTitle] = useState(null);
	const [desc, setDesc] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		//pass down data collected in front-end to the back-end

		fetch(`/api/posts/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title,
				description: desc,
				image: imageSrc,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});

		//need to re-render with REACT
		setCounter(counter + 1);
		navigate('/posts', { replace: true });

		//will eventually fail if continue doing
		//useContext fundamentally wrong
		//race condition
	};

	return (
		<>
			<Header />

			<div>
				<form method="post" onSubmit={handleSubmit}>
					<h2>Edit Post</h2>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="image">Image Source:</label>
								</td>
								<td>
									<input
										onChange={(event) => setImageSrc(event.target.value)}
										type="text"
										name="image"
										placeholder="set new image source"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="title">Title:</label>
								</td>
								<td>
									<input
										onChange={(event) => setTitle(event.target.value)}
										type="text"
										name="title"
										placeholder="set new title"
									></input>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="description">Description:</label>
								</td>
								<td>
									<textarea
										onChange={(event) => setDesc(event.target.value)}
										name="description"
										placeholder="set new description"
										rows="4"
										cols="30"
									></textarea>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<button>Submit</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</>
	);
};

export default EditPost;
