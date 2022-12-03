import logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../features/users/userSlice';
import axios from 'axios';

function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
		regNo: '',
		userStatus: false,
		profilePic: '',
		contactNumber: '',
		gender: '',
	});
	let regex =
		'^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$';

	const API_URL = '/student';
	const [users, setUsers] = useState({});

	useEffect(() => {
		async function getUsers() {
			const response = await axios.get(API_URL);
			setUsers(response.data);
		}
		getUsers();
	}, []);

	const {
		name,
		email,
		password,
		password2,
		regNo,
		profilePic,
		contactNumber,
		gender,
	} = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	// console.log(email, regex.test(email));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [userExists, setUserExists] = useState(false);
	function checkUser() {
		users.map((user) => {
			if (user.email === email) {
				setUserExists(true);
			}
		});
	}
	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	useEffect(() => {
		fetch(profilePic).then((res) => {
			setImageIsValid(res.status === 200);
			setImageLoading(false);
		});
	}, [profilePic, imageIsValid]);
	const [registered, setRegistered] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		checkUser();
		if (password !== password2) {
			toast.error('Password do not match', { theme: 'dark' });
		} else if (userExists) {
			toast.error('User Already exists', { theme: 'dark' });
		} else if (!email.match(regex)) {
			toast.error('Please enter valid university email', { theme: 'dark' });
		} else {
			let role = 'Member';
			let userStatus = false;
			var currentdate = new Date();
			var applyDate =
				currentdate.getDate() +
				'/' +
				(currentdate.getMonth() + 1) +
				'/' +
				currentdate.getFullYear() +
				' | ' +
				currentdate.getHours() +
				':' +
				currentdate.getMinutes() +
				':' +
				currentdate.getSeconds();

			const userData = {
				name,
				email,
				role,
				password,
				regNo,
				userStatus,
				profilePic,
				applyDate,
				contactNumber,
				gender,
			};

			dispatch(register(userData));
			setRegistered(true);
		}
	};
	if (registered) {
		return (
			<div className="alert alert-success shadow-lg w-[90%] m-auto mt-6 ">
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>
						Thank you for joining with CSUP Member Portal. You will be notified
						once your account is verified.
					</span>
				</div>
				<div className="flex-none">
					<Link to="/">
						<button className="btn btn-sm btn-base-100 hover:btn-neutral">
							X
						</button>
					</Link>
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
						<div className="rounded-xl bg-neutral shadow-xl  backdrop-blur-sm bg-black/70  ">
							<div className="p-6 sm:p-16">
								<h2 className="mb-8 text-2xl text-gray-300 font-bold flex flex-row">
									Register your account
								</h2>
								<form className="space-y-2" onSubmit={onSubmit}>
									<div className="space-y-2">
										{/* <label className="text-gray-300">Name</label> */}
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-user"
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
													<circle cx="12" cy="7" r="4"></circle>
													<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
												</svg>
											</span>
											<input
												required
												type="name"
												name="name"
												id="name"
												value={name}
												autoComplete="name"
												onChange={onChange}
												placeholder="Enter Your Name"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-300 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>
									<div className="space-y-2">
										{/* <label className="text-gray-300">Email </label> */}
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-mail"
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
														x="3"
														y="5"
														width="18"
														height="14"
														rx="2"
													></rect>
													<polyline points="3 7 12 13 21 7"></polyline>
												</svg>
											</span>
											<input
												required
												type="email"
												name="email"
												id="email"
												value={email}
												autoComplete="email"
												onChange={onChange}
												placeholder="Enter Your Email"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
										<p className="mt-2 text-sm text-gray-400">
											(University email is preferred)
										</p>
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between">
											{/* <label className="text-gray-300">
												Registration Number{' '}
											</label> */}
										</div>
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-id"
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
														x="3"
														y="4"
														width="18"
														height="16"
														rx="3"
													></rect>
													<circle cx="9" cy="10" r="2"></circle>
													<line x1="15" y1="8" x2="17" y2="8"></line>
													<line x1="15" y1="12" x2="17" y2="12"></line>
													<line x1="7" y1="16" x2="17" y2="16"></line>
												</svg>
											</span>
											<input
												required
												type="text"
												name="regNo"
												id="regNo"
												value={regNo}
												autoComplete="RegNo"
												onChange={onChange}
												placeholder="Enter Registration Number"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
										<p className="mt-2 text-sm text-gray-400">
											(ex : S/XX/XXX)
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											{/* <label className="text-gray-300">Contact Number </label> */}
										</div>
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-phone"
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
													<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
												</svg>
											</span>
											<input
												required
												type="tel"
												name="contactNumber"
												id="contactNumber"
												value={contactNumber}
												autoComplete="phone"
												onChange={onChange}
												placeholder="Enter Contact Number"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
										<p className="mt-2 text-sm text-gray-400">
											(ex : +94 XXXXXXXX)
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex items-center">
											<span className="inline-block mask mask-squircle w-14 h-auto overflow-hidden bg-gray-100">
												{/* <svg
													className="h-full w-full text-gray-300"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
												</svg> */}
												{imageLoading || !imageIsValid ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="icon icon-tabler icon-tabler-photo h-full w-full text-gray-400"
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
														<line x1="15" y1="8" x2="15.01" y2="8"></line>
														<rect
															x="4"
															y="4"
															width="16"
															height="16"
															rx="3"
														></rect>
														<path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5"></path>
														<path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2"></path>
													</svg>
												) : (
													<img
														src={profilePic}
														alt={name}
														className="mx-auto overflow-hidden"
													/>
												)}
											</span>

											<input
												type="text"
												name="profilePic"
												id="profilePic"
												value={profilePic}
												autoComplete="profilePic"
												onChange={onChange}
												placeholder="URL of Your Profile Picture"
												className="block w-full ml-5 px-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
												required
											/>
										</div>
										<p className="mt-2 text-sm text-gray-400">
											(ex: URL of your social media profile picture)
										</p>
									</div>

									<div className="space-y-2">
										<div className="flex items-center justify-between">
											{/* <label className="text-gray-300">Profile Picture </label> */}
										</div>
										<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
											<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="icon icon-tabler icon-tabler-gender-bigender"
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
													<circle cx="11" cy="11" r="4"></circle>
													<path d="M19 3l-5 5"></path>
													<path d="M15 3h4v4"></path>
													<path d="M11 16v6"></path>
													<path d="M8 19h6"></path>
												</svg>
											</span>
											<select
												onChange={onChange}
												name="gender"
												className="pl-16 pr-4 select select-bordered w-full rounded-md text-base bg-gray-600 bg-opacity-20 focus:bg-gray-800 focus:border-sky-500  leading-8 transition-colors duration-200 ease-in-out"
											>
												<option value="none" disabled selected hidden>
													Select Gender
												</option>

												<option value="Male">Male</option>
												<option value="Female">Female</option>
											</select>
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
												required
												type="password"
												name="password"
												id="pwd"
												autoComplete="current-password"
												value={password}
												onChange={onChange}
												placeholder="Enter a Password"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											{/* <label className="text-gray-300">Confirm Password</label> */}
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
												required
												type="password"
												name="password2"
												id="pwd2"
												autoComplete="confirm-password"
												value={password2}
												onChange={onChange}
												placeholder="Confirm Password"
												className="block w-full pl-16 pr-4 py-3 rounded-md border bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900  border-gray-600 focus:border-sky-500 text-base outline-none text-gray-100 leading-8 transition-colors duration-200 ease-in-out"
											/>
										</div>
									</div>
									<button
										type="submit"
										className="w-full py-3 px-6  rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500 hover:bg-green-500 "
									>
										<span className="text-white">Register</span>
									</button>

									<p className="border-t pt-6 text-sm">
										Already have an account ?
										<Link to="/login" className="text-sky-500 pl-2">
											Login
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

export default Register;
