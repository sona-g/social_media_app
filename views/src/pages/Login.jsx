import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import loginContext from '../components/LoginContext';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';

const Login = () => {
	const { user, setUser } = useContext(loginContext);
	const [loginFail, setLoginFail] = useState(false);
	let navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const userInfo = {
			username: event.target.elements.formGroupEmail.value,
			password: event.target.elements.formGroupPassword.value,
		};
		// console.log(userInfo)

		fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo),
		}).then(async (response) => {
			if (response.status === StatusCodes.OK) {
				const data = await response.json();
				setUser(data);
				setLoginFail(false);
				navigate('/posts', { replace: true });
			} else {
				setLoginFail(true);
			}
		});
	};

	return (
		<div style={{ marginLeft: '25%', marginTop: '2%', width: '50%' }}>
			<Form onSubmit={handleSubmit} style={{ margin: '7%' }}>
				<img
					style={{ maxWidth: '40%' }}
					src={require('../assets/logo_transparent.png')}
					alt="canvas"
				/>
				<p></p>
				<h3>LOG IN</h3>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Control
						type="text"
						placeholder="Enter email or username"
						required={true}
						className={loginFail ? 'is-invalid' : ''}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Control
						type="password"
						placeholder="Password"
						required={true}
						className={loginFail ? 'is-invalid' : ''}
					/>
				</Form.Group>
				<Button
					className="d-grid gap-2 col-12 mx-auto"
					variant="warning"
					size="lg"
					type="submit"
				>
					{loginFail ? 'LOGIN FAILED, PLEASE RETRY' : 'LOGIN'}
				</Button>
				<p></p>
				<Button
					className="d-grid gap-2 col-12 mx-auto"
					variant="warning"
					size="lg"
					type="submit"
				>
					CREATE ACCOUNT
				</Button>
			</Form>
		</div>
	);
};

export default Login;
