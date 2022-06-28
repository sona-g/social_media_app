import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Post from './pages/Post';
import './App.css';
import { PostProvider } from './components/PostContext';
import { LoginProvider } from './components/LoginContext';
import NewPost from './pages/NewPost';
import MyPosts from './pages/MyPosts';
import EditPost from './pages/EditPost';

function App() {
	return (
		<div className="App">
			<LoginProvider>
				<PostProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/posts" element={<Main />} />
							<Route path="/posts/new" element={<NewPost />} />
							<Route path="/posts/:id" element={<Post />} />
							<Route path="/myposts" element={<MyPosts />} />
							<Route path="/myposts/:id" element={<EditPost />} />
						</Routes>
					</BrowserRouter>
				</PostProvider>
			</LoginProvider>
		</div>
	);
}

export default App;
