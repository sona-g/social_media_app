import { createContext, useState, useEffect } from 'react';

const postContext = createContext();

export function PostProvider({ children }) {
	const [posts, setPosts] = useState([]);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		fetch('/api/posts')
			.then((response) => response.json())
			.then((data) => setPosts(data));
	}, [counter]);

	// const replacePost = (original) => {
	// 	const pos = posts.findIndex((post) => post._id === original._id);

	// 	setPosts([...posts.slice(0, pos), original, ...posts.slice(pos + 1)]);
	// };

	// const handleDelete = (id) => {
	// 	fetch(`api/posts/${id}`, { method: 'DELETE' })
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 		});

	// 	setCounter(counter + 1);

	// 	// setPosts(posts.filter((p) => p._id === id));
	// 	//should not use counter to re-render
	// 	//no reason to do another fetch

	// 	//should not depend
	// };
	const handleDelete = (id) => {
		fetch(`api/posts/${id}`, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => {
				const newCount = counter +1;
				setCounter(newCount);
			});
		// setPosts(posts.filter((p) => p._id === id));
		//should not use counter to re-render
		//no reason to do another fetch

		//should not depend
	};

	return (
		<postContext.Provider
			value={{ posts, setPosts, handleDelete, counter, setCounter }}
		>
			{children}
		</postContext.Provider>
	);
}

export default postContext;
