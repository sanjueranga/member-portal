import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


import {
	updateAll,
	getUserById,
	updateRole,
} from '../features/users/userSlice';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import male from '../img/male.png';
import female from '../img/female.png';
import { create, getProjectByUserId } from '../features/projects/projectSlice';
import ProjectTab from '../components/ProjectTab';
const API_LINK = process.env.REACT_APP_API_URL;

export default function Profile() {
	let { id } = useParams();
	const API_URL = API_LINK+'/student/get/';
	const PROJECT_API = '/student/project/';

	const user = useSelector((state) => state.auth.user);
	const [skills, setSkills] = useState([]);


	const { isError, isSuccess, isLoading, profileUser } = useSelector(
		(state) => state.user
	);

	const { allProjects } = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const [profileOwner, setProfileOwner] = useState({});

	// get data from api
	useEffect(() => {
		async function getUsers() {
			const userResponse = await axios.get(API_URL+id);
			setProfileOwner(userResponse.data);
		}

		getUsers();
		dispatch(getUserById(id));
		dispatch(getProjectByUserId(id));

		if (profileOwner.skills) {
			setSkills(profileOwner.skills.split(','));
			// console.log(profileOwner.skills);
		}
	}, [id, profileOwner.skills]);

	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	const [addProject, setAddProject] = useState(true);
	useEffect(() => {
		fetch(profileOwner.profilePic).then((res) => {
			setImageIsValid(res.status === 200);
			setImageLoading(false);
			// console.log(imageIsValid);
		});
	}, [profileOwner, imageIsValid]);

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

	const changeRole = (changedRole) => {
		const updateUser = {
			_id: id,
			role: changedRole,
			confirmDate: applyDate,
			approvedBy: user ? user.name : null,
		};
		dispatch(updateRole(updateUser));
		if (changedRole === 'Member') {
			toast.warning('Admin role changed into Member', { theme: 'dark' });
		} else {
			toast.success('Member role changed into Admin', { theme: 'dark' });
		}
	};

	// add project
	const [projectDetails, setProjectDetails] = useState({
		userId: '',
		title: '',
		desc: '',
		github: '',
		website: '',
		tags: '',
	});

	const onChange = (e) => {
		setProjectDetails((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetProject = () => {
		setProjectDetails({
			userId: '',
			title: '',
			desc: '',
			github: '',
			website: '',
			tags: '',
		});
	};
	const { _id, email, title, desc, github, website, tags } = projectDetails;
	const onAddProject = (e) => {
		e.preventDefault();
		let errorMessage = '';
		const projectData = {
			userId: profileOwner._id,
			email: profileOwner.email,
			title: projectDetails.title,
			desc: projectDetails.desc,
			github: projectDetails.github,
			website: projectDetails.website,
			tags: projectDetails.tags,
		};
		for (const key in projectData) {
			// console.log(`${key}: ${projectData[key]}`);
			if (projectData[key] === '') {
				if (key === 'title') {
					errorMessage = 'Title';
				}
				if (key === 'desc') {
					errorMessage = 'Description';
				}
				toast.error(`${errorMessage} cannot be empty !`, { theme: 'dark' });
				// console.log(projectData);

				setAddProject(false);
				break;
			}
		}
		setAddProject(true);

		if (addProject) {
			console.log(addProject);
			dispatch(create(projectData));
			dispatch(getProjectByUserId(id));
			toast.success('Project Added !', { theme: 'dark' });
			resetProject();
		}
	};
	const [image, setImage] = useState(
		'https://drive.google.com/file/d/1tP3r6CEq46BiaRd_ikHWhk0xs8gVtMci/view?usp=sharing'
	);
	const [showImage, setShowImage] = useState();
	return (
		<>
			<div className='flex flex-col w-[80%] mx-auto mt-16 lg:flex-row'>
				<div className='grid p-6 shadow flex-2 place-content-start bg-base-300 rounded-box place-items-center h-fit'>
					<div className='w-[65%] mask mask-squircle'>
						{imageIsValid ? (
							<img src={profileOwner.profilePic} alt={profileOwner.name} />
						) : // <img
						// 	src={`https://drive.google.com/uc?export=view&id=${
						// 		image.split('/')[5]
						// 	}`}
						// 	alt="drive"
						// />
						profileOwner.gender === 'Male' ? (
							<img src={male} alt={profileOwner.name} />
						) : (
							<img src={female} alt={profileOwner.name} />
						)}

						{/* <img
					src={`https://drive.google.com/uc?export=view&id=${showImage}`}
					alt="drive"
				/>{' '} */}
					</div>
					<div className='flex items-center '>
						<h2 className='pt-4 pr-4 mb-4 text-2xl font-bold text-white'>
							{profileOwner.name}{' '}
						</h2>
						{user && user._id === profileOwner._id ? (
							<Link to={`/profile/${profileOwner._id}/edit`}>
								<button
									className='btn btn-outline btn-info btn-sm tooltip tooltip-right tooltip-neutral'
									data-tip='Edit'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='icon icon-tabler icon-tabler-edit'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										strokeWidth='2'
										stroke='currentColor'
										fill='none'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
										<path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1'></path>
										<path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z'></path>
										<path d='M16 5l3 3'></path>
									</svg>
								</button>
							</Link>
						) : (
							<></>
						)}
					</div>
					<p className='mb-6 text-xl'>{profileOwner.headline}</p>
					<div>
						<div className='grid grid-flow-col gap-4 pt-4'>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.facebook}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-brand-facebook'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3'></path>
								</svg>
							</a>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.linkdin}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-brand-linkedin'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<rect x='4' y='4' width='16' height='16' rx='2'></rect>
									<line x1='8' y1='11' x2='8' y2='16'></line>
									<line x1='8' y1='8' x2='8' y2='8.01'></line>
									<line x1='12' y1='16' x2='12' y2='11'></line>
									<path d='M16 16v-3a2 2 0 0 0 -4 0'></path>
								</svg>
							</a>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.github}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-brand-github'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5'></path>
								</svg>
							</a>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.twitter}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-brand-twitter'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<path d='M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z'></path>
								</svg>
							</a>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.instagram}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-brand-instagram'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<rect x='4' y='4' width='16' height='16' rx='4'></rect>
									<circle cx='12' cy='12' r='3'></circle>
									<line x1='16.5' y1='7.5' x2='16.5' y2='7.501'></line>
								</svg>
							</a>
							<a
								target='_blank'
								rel='noopener noreferrer'
								href={profileOwner.website}
								className='p-2 rounded-full bg-base-100 hover:bg-sky-900'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='icon icon-tabler icon-tabler-link'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='2'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none' />
									<path d='M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5' />
									<path d='M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5' />
								</svg>
							</a>
						</div>
						<span className='flex justify-between pt-4 '>
							{user &&
							user.role === 'Admin' &&
							user.name !== profileOwner.name ? (
								<>
									<button
										className='btn btn-sm btn-success'
										onClick={() => {
											changeRole('Admin');
										}}
									>
										Make admin
									</button>
									<button
										className='btn btn-sm btn-error'
										onClick={() => {
											changeRole('Member');
										}}
									>
										Remove admin
									</button>
								</>
							) : (
								''
							)}
						</span>
					</div>
				</div>

				<div className='divider lg:divider-horizontal'></div>
				<div className='grid shadow flex-2 bg-base-300 rounded-box '>
					<div className='items-center px-4 py-2 mx-5 mt-5 rounded-t-lg bg-slate-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'>Name</dt>
						<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
							{profileOwner.name}{' '}
						</dd>
					</div>
					<div className='items-center px-4 py-2 mx-5 bg-slate-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'>Email</dt>
						<dd className='flex mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
							{profileOwner.email}{' '}
							<a href={`mailto: ${profileOwner.email}`}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='ml-3 icon icon-tabler icon-tabler-send'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									fill='none'
									strokeLinecap='round'
									strokeLinejoin='round'
								>
									<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
									<line x1='10' y1='14' x2='21' y2='3'></line>
									<path d='M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5'></path>
								</svg>
							</a>
						</dd>
					</div>
					<div className='items-center px-4 py-2 mx-5 bg-slate-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'>About</dt>
						<dd className='mt-1 text-base text-justify text-gray-200 sm:mt-0 sm:col-span-2'>
							{profileOwner.about}
						</dd>
					</div>
					{user && user.name === profileOwner.name ? (
						<div className='items-center px-4 py-2 mx-5 bg-slate-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-base font-medium text-gray-200'>
								Contact Number{' '}
								<span className='mt-2 text-sm text-gray-400'>
									(Only visible to you*)
								</span>
							</dt>
							<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
								+{profileOwner.contactNumber}
							</dd>
						</div>
					) : (
						<></>
					)}
					{user && user.name === profileOwner.name ? (
						<div className='items-center px-4 py-2 mx-5 bg-slate-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-base font-medium text-gray-200'>
								Registration Number{' '}
								<span className='mt-2 text-sm text-gray-400'>
									(Only visible to you*)
								</span>
							</dt>
							<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
								{profileOwner.regNo}
							</dd>
						</div>
					) : (
						<></>
					)}
					<div className='items-center px-4 py-2 mx-5 bg-slate-800 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'>Skills</dt>
						<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
							{isSuccess ? (
								skills.map((skill) => (
									<span
										className='m-1 cursor-pointer badge hover:badge-info'
										key={skill}
									>
										{skill}
									</span>
								))
							) : (
								<>No Skills Availble</>
							)}
						</dd>
					</div>
					<div className='items-center px-4 py-2 mx-5 mb-5 rounded-b-lg bg-slate-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'>Gender</dt>
						<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
							{profileOwner.gender}
						</dd>
					</div>
					<div className='items-center px-4 py-2 mx-5 mb-5 rounded-b-lg sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
						<dt className='text-base font-medium text-gray-200'></dt>
						<dd className='flex justify-end mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
							<button className='btn btn-sm btn-base-100 hover:btn-info'>
								<a href={profileOwner.cv} target='_blank' rel='noreferrer'>
									Download CV
								</a>
							</button>
						</dd>
					</div>
					{user ? (
						user.role === 'Admin' ? (
							<div className='items-center px-4 py-2 mx-5 mb-5 rounded-b-lg bg-slate-700 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
								<dt className='text-base font-medium text-gray-200'>
									Approved By
								</dt>
								<dd className='mt-1 text-base text-gray-200 sm:mt-0 sm:col-span-2'>
									{profileOwner.approvedBy}
								</dd>
							</div>
						) : (
							<></>
						)
					) : (
						<></>
					)}
				</div>
			</div>

			<div className='w-[80%] mx-auto mt-20'>
				<div className='flex items-center justify-between'>
					<h1 className='text-2xl font-bold text-white lg:text-3xl'>
						Projects - {allProjects && allProjects.length}
					</h1>
					{/*Add Project */}
					{user && user._id === profileOwner._id ? (
						<>
							<label htmlFor='my-modal' className='btn btn-outline btn-info'>
								<i className='mr-4 fa-solid fa-folder-plus'></i>
								Add Project
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
									<h3 className='flex flex-col mb-10 text-lg font-bold text-center'>
										Add New Project
									</h3>
									<form onSubmit={onAddProject}>
										<div className='col-span-6 mb-4 sm:col-span-3'>
											<label className='text-gray-300'>Project Title</label>
											<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
												<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
													<i className='text-lg md:text-base fa-solid fa-heading'></i>
												</span>{' '}
												<input
													type='text'
													name='title'
													id='title'
													value={title}
													autoComplete='title'
													placeholder='Enter Your Project Title'
													onChange={onChange}
													className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
													required
												/>
											</div>
										</div>

										<div className='mb-4'>
											<label className='text-gray-300'>
												Project Description
											</label>
											<div className='mt-1'>
												<textarea
													type='text'
													name='desc'
													id='desc'
													value={desc}
													autoComplete='desc'
													onChange={onChange}
													placeholder='Enter Brief Idea About Your Project'
													className='block w-full py-3 pl-5 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-300'
													required
												/>
											</div>
											<p className='mt-2 text-sm text-gray-400'>
												Brief description for your project.
											</p>
										</div>

										<div className='col-span-6 mb-4 sm:col-span-3'>
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
													placeholder='Github URL of project'
													className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
												/>
											</div>
										</div>

										<div className='col-span-6 mb-4 sm:col-span-3'>
											<label className='text-gray-300'>Website</label>
											<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
												<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
													<i className='text-lg md:text-base fa-solid fa-link'></i>
												</span>{' '}
												<input
													type='text'
													name='website'
													id='webisite'
													value={website}
													autoComplete='webisite'
													onChange={onChange}
													placeholder='URL of Your Website'
													className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-300 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
												/>
											</div>
										</div>
										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label className='text-gray-300'>Technology Stacks</label>
											<div className='relative flex items-center text-gray-400 focus-within:text-cyan-400'>
												<span className='absolute flex items-center h-6 pr-4 border-r border-gray-500 left-4'>
													<i className='text-lg md:text-base fa-solid fa-list-check'></i>
												</span>{' '}
												<input
													type='text'
													name='tags'
													id='tags'
													value={tags}
													autoComplete='tags'
													onChange={onChange}
													placeholder='Enter Technology Stacks'
													className='block w-full py-3 pl-16 pr-4 text-base leading-8 text-gray-100 transition-colors duration-200 ease-in-out bg-gray-600 border border-gray-600 rounded-md outline-none bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 focus:border-sky-500'
												/>
											</div>
											<p className='mt-2 text-sm text-gray-400'>
												Enter your Technology Stacks seperated by comma (' , ')
												eg - html,css,reactjs
											</p>
										</div>
										<div className='modal-action'>
											<button
												className='btn btn-outline btn-info'
												type='submit'
											>
												<i className='mr-4 fa-solid fa-folder-plus'></i>
												Add Project
											</button>
										</div>
									</form>
								</div>
							</div>
						</>
					) : (
						<></>
					)}

					{/* end of add project */}
				</div>
				{allProjects && allProjects.length !== 0 ? (
					allProjects &&
					allProjects
						.slice(0)
						.reverse()
						.map((project, index) => (
							<ProjectTab project={project} index={index} />
						))
				) : (
					<p className='pt-5 text-xs text-gray-300 lg:text-lg'>
						No Projects available Yet!
					</p>
				)}
			</div>
		</>
	);
}
