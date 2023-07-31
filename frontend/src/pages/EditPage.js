import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
	updateAll,
	deleteUser,
	getMe,
	getUsers,
} from '../features/users/userSlice';
import { logout, reset, login } from '../features/auth/authSlice';

function EditPage() {
	let { id } = useParams();
	const { allUsers, CurrentUser } = useSelector((state) => state.user);
	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	const [showMessage, setShowMessage] = useState(false);
	const { user, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const [formData, setFormData] = useState({});

	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const API_URL = '/student/get/';
	useEffect(() => {
		if (!isError) {
			console.log(message);
		}
		if (!user) {
			navigate('/');
		}
		dispatch(getUsers());
	}, [dispatch, isError, message, navigate, user]);

	const [profileOwner, setProfileOwner] = useState({});
	useEffect(() => {
		// const config = {
		// 	headers: {
		// 		'Access-Control-Allow-Credentials': true,
		// 		'Access-Control-Allow-Origin': '*',
		// 		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		// 		'Access-Control-Allow-Headers': 'application/json',
		// 	},
		// };
		// async function getStudents() {
		// 	const response = await axios.get(API_URL + id, config);
		// 	setProfileOwner(response.data);
		// }
		if (user) {

			// console.log(CurrentUser);
			setProfileOwner(CurrentUser);
			setFormData({
				_id: CurrentUser && CurrentUser._id,
				name: CurrentUser && CurrentUser.name,
				email: CurrentUser && CurrentUser.email,
				password: CurrentUser && CurrentUser.password,
				regNo: CurrentUser && CurrentUser.regNo,
				profilePic: CurrentUser && CurrentUser.profilePic,
				contactNumber: CurrentUser && CurrentUser.contactNumber,
				about: CurrentUser && CurrentUser.about,
				birthDate: CurrentUser && CurrentUser.birthDate,
				facebook: CurrentUser && CurrentUser.facebook,
				twitter: CurrentUser && CurrentUser.twitter,
				linkdin: CurrentUser && CurrentUser.linkdin,
				instagram: CurrentUser && CurrentUser.instagram,
				github: CurrentUser && CurrentUser.github,
				headline: CurrentUser && CurrentUser.headline,
				cv: CurrentUser && CurrentUser.cv,
				gender: CurrentUser && CurrentUser.gender,
				website: CurrentUser && CurrentUser.website,
				skills: CurrentUser && CurrentUser.skills,
			});
		}
		// allUsers &&
		// 	allUsers.map((u) => {
		// 		if (user._id === u._id) {
		// 			setProfileOwner(u);
		// 		}
		// 	});

		// dispatch(getMe(user.token));

		// getStudents();
	}, [id, user, allUsers, dispatch]);

	useEffect(() => {
		if (!isError) {
			console.log(message);
		}
		return () => {
			dispatch(reset());
		};
	}, [id, user, allUsers, navigate, dispatch, isError, message]);

	const {
		_id,
		name,
		email,
		password,
		regNo,
		profilePic,
		contactNumber,
		about,
		birthDate,
		facebook,
		twitter,
		linkdin,
		instagram,
		github,
		headline,
		cv,
		gender,
		website,
		skills,
	} = formData;
	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	useEffect(() => {
		fetch(profilePic).then((res) => {
			setImageIsValid(res.status === 200);
			setImageLoading(false);
		});
		// function checkImage(url) {
		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', url, true);
		// 	request.send();
		// 	request.onload = function () {
		// 		if (request.status == 200) {
		// 			//if(statusText == OK)
		// 			console.log('image exists');
		// 		} else {
		// 			console.log("image doesn't exist");
		// 		}
		// 	};
		// }
		// checkImage(profilePic);
	}, [profilePic, id, user, imageIsValid]);

	const [deleteUserName, setDeleteUser] = useState(null);

	const onDelete = (e) => {
		setDeleteUser(e.target.value);
	};
	const onDeleteRequest = (e) => {
		e.preventDefault();
		if (deleteUserName === user.name) {
			dispatch(logout());
			dispatch(reset());
			dispatch(deleteUser(user._id));
			navigate('/');
		} else {
			if (deleteUserName !== null) {
				toast.error('Validation failed : ' + deleteUserName, { theme: 'dark' });
			} else {
				toast.error('Please enter given text to confirm your request.', {
					theme: 'dark',
				});
			}
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		toast.error(e.target);

		if (!email.match(/^[a-zA-Z0-9._%+-]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!live.com)(?!outlook.com)[a-zA-Z0-9_-]+.[a-zA-Z0-9-.]{2,61}$/)) {
			toast.error('Please enter a valid university email', { theme: 'dark' });
		} else if (!regNo.match(/^(S\/[A-Z\d]{2}\/\d{3}|S\d{5})$/i)) {
			toast.error('Please enter a valid registration number (ex: S/XX/XXX or SXXXXX)', { theme: 'dark' });
		}
		else if (!contactNumber.match(/^\94\d{9}$/)) {
			toast.error('Please enter a valid contact number (ex: +94 XXXXXXXX)', { theme: 'dark' });
		} else {
			const userData = {
				_id,
				name,
				email,
				password,
				regNo,
				profilePic,
				contactNumber,
				about,
				birthDate,
				facebook,
				twitter,
				linkdin,
				instagram,
				github,
				headline,
				cv,
				gender,
				website,
				skills,
			};
			const loginInfo = {
				email,
				password,
			};

			dispatch(updateAll(userData));
			dispatch(getMe(user.token));
			if (isSuccess) {
				toast.error('Request is not completed. Try again later!', {
					theme: 'dark',
				});
			} else {
				setShowMessage(true);
				toast.success('Your account details have been saved.', {
					theme: 'dark',
				});
			}
		}
	};


	return (
		<>
			<div className='relative flex justify-center py-8'>
				<div className='w-[70%]'>
					<h2 className='flex flex-row mb-8 text-2xl font-bold text-gray-300'>
						Edit your account
					</h2>

					<div className='mt-5 md:mt-0 md:col-span-2 '>
						{showMessage ? (
							<div className='shadow-lg alert alert-info'>
								<div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										className='flex-shrink-0 w-6 h-6 stroke-current'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										></path>
									</svg>
									<span>If your data is not updated, please login again.</span>
								</div>
								<div className='flex-none'>
									<button
										onClick={() => {
											setShowMessage(false);
										}}
										className='btn btn-sm'
									>
										X
									</button>
								</div>
							</div>
						) : (
							<></>
						)}
						{profileOwner ? (
							<>
								<form onSubmit={onSubmit} autoComplete='on'>
									<div className='shadow sm:rounded-md sm:overflow-hidden '>
										<div className='px-4 py-5 space-y-6 bg-neutral sm:p-6 '>
											<h2 className='flex flex-row mb-4 text-xl font-bold text-gray-300'>
												Personal Information
											</h2>
											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Name</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-user'></i>
														</span>{' '}
														<input
															type='text'
															name='name'
															id='name'
															value={name}
															autoComplete='name'
															placeholder='Enter Your Name'
															onChange={onChange}
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
															required
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>
														Email{' '}
														<span className='text-gray-400'>
															(University email is preferred)
														</span>
													</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-envelope'></i>
														</span>{' '}
														<input
															disabled
															type='email'
															name='email'
															id='email'
															value={email}
															autoComplete='email'
															placeholder='Enter Your Email'
															onChange={onChange}
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
															required
														/>
													</div>
												</div>
											</div>
											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>BirthDate</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-calendar'></i>
														</span>{' '}
														<input
															type='date'
															name='birthDate'
															id='birthDate'
															value={birthDate}
															autoComplete='birthDate'
															onChange={onChange}
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>
														Headline{' '}
														<span className='text-gray-400'>
															(Brief about you)
														</span>
													</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-heading'></i>
														</span>{' '}
														<input
															type='text'
															name='headline'
															id='headline'
															value={headline}
															autoComplete='headline'
															onChange={onChange}
															placeholder='Enter Headline'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
														/>
													</div>
												</div>
											</div>
											<div>
												<label className='text-gray-300'>About</label>
												<div className='mt-1'>
													<textarea
														type='text'
														name='about'
														id='about'
														value={about}
														autoComplete='about'
														onChange={onChange}
														placeholder='Enter Brief About You'
														className='block w-full py-3 pl-5 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
													/>
												</div>
												<p className='mt-2 text-sm text-gray-400'>
													Brief description for your profile.
												</p>
											</div>

											<div>
												<label className='text-gray-300'>Profile Picture</label>
												<div className='flex items-center'>
													<span className='inline-block w-20 h-auto overflow-hidden bg-gray-100 mask mask-squircle'>
														{/* <svg
													className="w-full h-full text-gray-300"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
												</svg> */}
														{imageLoading || !imageIsValid ? (
															<svg
																xmlns='http://www.w3.org/2000/svg'
																className='w-full h-full text-gray-400 icon icon-tabler icon-tabler-photo'
																viewBox='0 0 24 24'
																strokeWidth='2'
																stroke='currentColor'
																fill='none'
																strokeLinecap='round'
																strokeLinejoin='round'
															>
																<path
																	stroke='none'
																	d='M0 0h24v24H0z'
																	fill='none'
																></path>
																<line x1='15' y1='8' x2='15.01' y2='8'></line>
																<rect
																	x='4'
																	y='4'
																	width='16'
																	height='16'
																	rx='3'
																></rect>
																<path d='M4 15l4 -4a3 5 0 0 1 3 0l5 5'></path>
																<path d='M14 14l1 -1a3 5 0 0 1 3 0l2 2'></path>
															</svg>
														) : (
															<img
																src={profilePic}
																alt={name}
																className='mx-auto overflow-hidden'
															/>
														)}
													</span>

													<input
														type='text'
														name='profilePic'
														id='profilePic'
														value={profilePic}
														autoComplete='profilePic'
														onChange={onChange}
														placeholder='URL of Your Profile Picture'
														className='block w-full px-4 py-3 ml-5 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'

													/>
												</div>
											</div>

											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
													<label className='text-gray-300'>
														Registration Number{' '}
													</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-id-card'></i>
														</span>{' '}
														<input
															disabled
															type='text'
															name='regNo'
															id='regNo'
															value={regNo}
															autoComplete='regNo'
															onChange={onChange}
															placeholder='Enter Registration Number'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
															required
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
													<label className='text-gray-300'>
														Contact Number
													</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-phone'></i>
														</span>{' '}
														<input
															type='text'
															name='contactNumber'
															id='contactNumber'
															value={contactNumber}
															autoComplete='phone'
															onChange={onChange}
															placeholder='Enter Contact Number'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'

														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
													<label className='text-gray-300'>Gender</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-mars-and-venus'></i>
														</span>{' '}
														<select
															onChange={onChange}
															name='gender'
															className='w-full pl-16 pr-4 text-base leading-8 transition-colors duration-200 ease-in-out rounded-md  select select-bordered focus:border-sky-500'
														>
															{(user && gender === 'Male') ||
																(user && gender === 'Female') ? (
																<option
																	defaultValue={gender}
																	disabled
																	selected
																	hidden
																>
																	{user.gender}
																</option>
															) : (
																<option value='none' disabled selected hidden>
																	Select Gender
																</option>
															)}
															<option value='Male'>Male</option>
															<option value='Female'>Female</option>
														</select>
													</div>
												</div>
											</div>

											<h2 className='flex flex-row pt-3 mb-4 text-xl font-bold text-gray-300 border-t '>
												Social Media Information
											</h2>
											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Facebook</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-brands fa-facebook-f'></i>
														</span>{' '}
														<input
															type='text'
															name='facebook'
															id='facebook'
															value={facebook}
															autoComplete='facebook'
															onChange={onChange}
															placeholder='URL of Facebook Account'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Linkdin</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-brands fa-linkedin-in'></i>
														</span>{' '}
														<input
															type='text'
															name='linkdin'
															id='linkdin'
															value={linkdin}
															autoComplete='linkdin'
															onChange={onChange}
															placeholder='URL of Linkdin Account'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
														/>
													</div>
												</div>
											</div>
											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Twitter</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-brands fa-twitter'></i>
														</span>{' '}
														<input
															type='text'
															name='twitter'
															id='twitter'
															value={twitter}
															autoComplete='twitter'
															onChange={onChange}
															placeholder='URL of Twitter Account'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Github</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-brands fa-github'></i>
														</span>{' '}
														<input
															type='text'
															name='github'
															id='github'
															value={github}
															autoComplete='github'
															onChange={onChange}
															placeholder='URL of Github Account'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
														/>
													</div>
												</div>
											</div>
											<div className='grid grid-cols-6 gap-6'>
												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Instagram</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-brands fa-instagram'></i>
														</span>{' '}
														<input
															type='text'
															name='instagram'
															id='instagram'
															value={instagram}
															autoComplete='instagram'
															placeholder='URL of Instagram Account'
															onChange={onChange}
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
														/>
													</div>
												</div>

												<div className='col-span-6 sm:col-span-3'>
													<label className='text-gray-300'>Website</label>
													<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
														<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
															<i className='text-lg md:text-base fa-solid fa-link'></i>
														</span>{' '}
														<input
															type='text'
															name='website'
															id='website'
															value={website}
															autoComplete='website'
															onChange={onChange}
															placeholder='URL of Your Website'
															className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
														/>
													</div>
												</div>
											</div>
											<h2 className='flex flex-row pt-3 mb-4 text-xl font-bold text-gray-300 border-t '>
												Qualifications
											</h2>
											<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
												<label className='text-gray-300'>Skills</label>
												<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
													<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
														<i className='text-lg md:text-base fa-solid fa-list-check'></i>
													</span>{' '}
													<input
														type='text'
														name='skills'
														id='skills'
														value={skills}
														autoComplete='skills'
														onChange={onChange}
														placeholder='Enter Your Skills'
														className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
													/>
												</div>
												<p className='mt-2 text-sm text-gray-400'>
													Enter your Skills seperated by comma (' , ') eg -
													html,css,reactjs
												</p>
											</div>

											<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
												<label className='text-gray-300'>
													Upload Your CV <span className='text-gray-400'></span>
												</label>

												<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
													<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
														<i className='text-lg md:text-base fa-solid fa-file'></i>
													</span>{' '}
													<input
														type='text'
														name='cv'
														id='cv'
														value={cv}
														autoComplete='cv'
														placeholder='Enter Your CV'
														onChange={onChange}
														className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
													/>
												</div>
												<p className='mt-2 text-sm text-gray-400'>
													First Upload your CV into google drive, make sure the
													link is not restricted. Then paste the link here.
												</p>
											</div>
											<div className='px-4 py-3 text-right bg-neutral sm:px-6'>
												<button
													type='submit'
													className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
												>
													Confirm
												</button>
											</div>
										</div>
									</div>
								</form>
								<h2 className='flex flex-row pt-3 mt-6 mb-2 text-xl font-bold border-t text-error'>
									Delete account
								</h2>
								<p className='py-2 text-base'>
									Once you delete your account, there is no going back. Please
									be certain.
								</p>
								<label htmlFor='my-modal' className='btn btn-outline btn-error'>
									Delete your account
								</label>

								<input type='checkbox' id='my-modal' className='modal-toggle' />
								<div className='modal backdrop-blur-md bg-black/10 '>
									<div className='modal-box '>
										<label
											htmlFor='my-modal'
											className='absolute btn btn-sm btn-circle right-2 top-2'
										>
											✕
										</label>
										<h3 className='flex flex-col text-lg font-bold text-center'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-48 mx-auto icon icon-tabler icon-tabler-alert-circle stroke-error'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path
													stroke='none'
													d='M0 0h24v24H0z'
													fill='none'
												></path>
												<circle cx='12' cy='12' r='9'></circle>
												<line x1='12' y1='8' x2='12' y2='12'></line>
												<line x1='12' y1='16' x2='12.01' y2='16'></line>
											</svg>
											Are you sure?
										</h3>
										<p className='py-4 text-base'>
											Do you really want to delete this account? Once you delete
											your account your data is no longer saved in our database.
											To confirm your account deletion, please type{' '}
											<code className='badge'>
												[{name && name ? name : <></>}]
											</code>
										</p>

										{/* <div className="modal-action">
											<label htmlFor="my-modal" className="btn">
												Confirm
											</label>
										</div> */}
										<form onSubmit={onDeleteRequest}>
											<input
												type='text'
												placeholder='Type here'
												name='deleteMessage'
												onChange={onDelete}
												className='w-full max-w-xs input input-bordered'
											/>
											<div className='modal-action'>
												<button
													className='btn btn-outline btn-error'
													type='submit'
												>
													Confirm
												</button>
											</div>
										</form>
									</div>
								</div>
							</>
						) : (
							<div className='shadow-lg alert alert-info'>
								<div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										className='flex-shrink-0 w-6 h-6 stroke-current'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
										></path>
									</svg>
									<span>User cannot find, Please refresh and continue.</span>
								</div>
								<div className='flex-none'>
									<button
										onClick={() => {
											setShowMessage(false);
											window.location.reload();
										}}
										className='btn btn-sm'
									>
										X
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default EditPage;
