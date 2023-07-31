import logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import axios from 'axios';
const API_LINK = process.env.REACT_APP_API_URL;

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const API_URL = API_LINK+'/student/';
	
	const [students, setStudents] = useState([]);
	useEffect(() => {
		async function getUsers() {
			const response = await axios.get(API_URL);
			setStudents(response.data);
		}
		getUsers();
	}, []);

	

	const { email, password } = formData;

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	
	useEffect(() => {
		if (isError) {
			toast.error(message, { theme: 'dark' });
		}
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	let loginUser = true;
	const [loginStatus, setLoginStatus] = useState(true);
	const onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};
		
		students.map((item) => {
			if (item.email === userData.email) {
				loginUser = item.userStatus;
				// console.log('check user : ', item.userStatus);
			}
		});

		// console.log('login user : ', loginUser);

		if (loginUser) {
			dispatch(login(userData));
			// console.log('user logged');
		} else {
			setLoginStatus(false);
		}
	};
	if (isLoading) {
		// return <Spinner />;
		return (
			<div className="flex justify-center pt-48">
				<Spinner />
			</div>
		);
	}
	// console.log('login status : ', loginStatus);
	if (!loginStatus) {
		return (
			<div className="alert alert-warning shadow-lg w-[90%] m-auto mt-6 ">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<span>Sorry! Your account is not verified yet.</span>
				</div>
				<div className="flex-none">
					<button className="btn btn-sm btn-base-100 hover:btn-info">
						<Link to="/">X</Link>
					</button>
				</div>
			</div>
		);
	}
	return (
		<>
			<div className="relative py-8">
				<div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
					<div className="m-auto space-y-5 md:w-8/12 lg:">
						<img
							src={logo}
							loading="lazy"
							className="w-36 m-auto"
							alt="CSUP logo"
						/>
						<div className="rounded-xl  bg-neutral shadow-xl  backdrop-blur-sm bg-black/70">
							<div className="p-6 sm:p-16">
								<h2 className="mb-8 text-2xl text-gray-300 font-bold flex flex-row">
									Login to your account
								</h2>
								<form className="space-y-2" onSubmit={onSubmit}>
									<div className="space-y-2">
										{/* <label className="text-gray-300">Email</label> */}

										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-500">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="feather feather-mail"
												>
													<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
													<polyline points="22,6 12,13 2,6"></polyline>
												</svg>
											</span>{' '}
											<input
												type="email"
												name="email"
												id="email"
												autoComplete="email"
												value={email}
												onChange={onChange}
												placeholder="Enter Email"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											{/* <label className="text-gray-300">Password</label> */}
										</div>
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-lock"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													strokeWidth="2"
													stroke="currentColor"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path
														stroke="none"
														d="M0 0h24v24H0z"
														fill="none"
													></path>
													<rect
														x="5"
														y="11"
														width="14"
														height="10"
														rx="2"
													></rect>
													<circle cx="12" cy="16" r="1"></circle>
													<path d="M8 11v-4a4 4 0 0 1 8 0v4"></path>
												</svg>
											</span>
											<input
												type="password"
												name="password"
												id="pwd"
												autoComplete="current-password"
												value={password}
												onChange={onChange}
												placeholder="Enter Password"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-300 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>

									<button
										type="submit"
										className="w-full py-3 px-6 rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500 hover:bg-green-500"
									>
										<span className="text-white">Login</span>
									</button>
									<p className="border-t pt-6 text-sm text-gray-300">
										Don't have an account ?
										<Link to="/register" className="text-sky-500 pl-2">
											Register
										</Link>
									</p>
								</form>
							</div>
						</div>
						{/* <div className="text-center space-x-4">
							<span>&copy; CSUP</span>
							<a href="#" className="text-sm hover:text-sky-900">
								Contact
							</a>
							<a href="#" className="text-sm hover:text-sky-900">
								Privacy & Terms
							</a>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
