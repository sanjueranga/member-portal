import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/logo.png';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import male from '../img/male.png';
import female from '../img/female.png';
import { getMe, logoutUser } from '../features/users/userSlice';
function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

function Header({ setSearchName }) {
	const navigation = [
		{ name: 'Members', to: '/members', current: true },
		{ name: 'Register', to: '/register', current: false },
	];
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { CurrentUser } = useSelector((state) => state.user);
	const location = window.location.pathname;
	// console.log(user);
	for (let i = 0; i < navigation.length; i++) {
		if (navigation[i].to === location) {
			navigation[i].current = true;
		} else {
			navigation[i].current = false;
		}
	}
	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	useEffect(() => {
		if (user) {
			dispatch(getMe());
			if (user) {
				fetch(user.profilePic).then((res) => {
					setImageIsValid(res.status === 200);
					setImageLoading(false);
					// console.log(imageIsValid);
				});
			}
		}
	}, [user]);
	const onLogout = () => {
		dispatch(logout());
		dispatch(logoutUser());

		dispatch(reset());
	};

	return (
		<div className="fixed navbar shadow-lg backdrop-blur-md bg-slate-900/80 z-50 px-10 md:px-20">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex="0" className="btn btn-ghost md:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex="0"
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.to}
								className={
									'text-gray-300 hover:bg-info/30 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								}
								aria-current={item.current ? 'page' : undefined}
							>
								{item.name}
							</Link>
						))}
					</ul>
				</div>
				<div className="flex-shrink-0 flex items-center">
					<Link to="/">
						<img className="block h-8 w-auto" src={logo} alt="CSUP" />
					</Link>
					<Link
						to="/"
						className={classNames(
							'text-white  hover:text-sky-300',
							'px-3 py-2 rounded-md text-sm font-medium hidden lg:block'
						)}
					>
						CSUP Member Portal
					</Link>
				</div>
				<div className="hidden md:block sm:ml-6">
					<div className="flex space-x-4">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.to}
								className={classNames(
									item.current
										? 'bg-gray-600 text-white'
										: 'text-gray-300 hover:bg-info/30 hover:text-white',
									'px-3 py-2 rounded-md text-sm font-medium'
								)}
								aria-current={item.current ? 'page' : undefined}
							>
								{item.name}
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className="navbar-end">
				{/* search */}
				{window.location.pathname === '/members' ? (
					<>
						<div hidden className="block">
							<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
								<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
									<svg
										xmlns="http://ww50w3.org/2000/svg"
										className="w-4 fill-current"
										viewBox="0 0 35.997 36.004"
									>
										<path
											id="Icon_awesome-search"
											data-name="search"
											d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
										></path>
									</svg>
								</span>
								<input
									type="text"
									name="leadingIcon"
									id="leadingIcon"
									placeholder="Search here"
									className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-white outline-none border border-gray-500 focus:border-cyan-300 transition bg-base-100"
									onChange={(e) => {
										setSearchName(e.target.value);
									}}
								/>
							</div>
						</div>

						{/* <button
							aria-label="search"
							className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
						>
							<svg
								xmlns="http://ww50w3.org/2000/svg"
								className="w-4 mx-auto fill-current text-gray-600"
								viewBox="0 0 35.997 36.004"
							>
								<path
									id="Icon_awesome-search"
									data-name="search"
									d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
								></path>
							</svg>
						</button> */}
					</>
				) : (
					<></>
				)}
				<div
					className={classNames(
						'text-white',
						'px-3 py-2 rounded-md text-sm font-medium hidden lg:block'
					)}
				>
					{CurrentUser && CurrentUser.name}
				</div>

				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle avatar">
						<div className="w-10 rounded-full">
							{/* <img src="https://api.lorem.space/image/face?hash=33791" /> */}

							{CurrentUser ? (
								// <img
								// 	className="h-10 w-10 rounded-full"
								// 	src={user.profilePic}
								// 	alt={user.name}
								// />

								imageIsValid ? (
									<img
										src={CurrentUser.profilePic}
										alt={CurrentUser.name}
										className="h-10 w-10 rounded-full"
									/>
								) : CurrentUser.gender === 'Male' ? (
									<img
										src={male}
										alt={CurrentUser.name}
										className="h-10 w-10 rounded-full"
									/>
								) : (
									<img
										src={female}
										alt={CurrentUser.name}
										className="h-10 w-10 rounded-full"
									/>
								)
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-user text-gray-300 w-8 mx-auto focus-within:text-cyan-400"
									viewBox="0 0 24 24"
									strokeWidth="2"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<circle cx="12" cy="7" r="4"></circle>
									<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
								</svg>
							)}
						</div>
					</label>
					<ul
						tabIndex="0"
						className="menu menu-compact dropdown-content mt-3 p-2 shadow backdrop-blur-sm bg-neutral/95 rounded-box w-52"
					>
						<li>
							{user ? (
								<Link
									to={`/profile/${user._id}`}
									className={classNames(
										'px-4 py-2 cursor-pointer flex flex-row'
									)}
								>
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
									</svg>
									<span>Profile</span>
								</Link>
							) : (
								<Link
									to={'/login'}
									className={classNames(
										'px-4 py-2 cursor-pointer flex flex-row'
									)}
								>
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
									</svg>
									<span>Profile</span>
								</Link>
							)}
						</li>
						<li>
							{user &&
								(user.role === 'Admin' ? (
									<Link
										to={`/admindashboard/${user._id}`}
										className={classNames(
											'flex flex-row px-4 py-2 cursor-pointer'
										)}
									>
										<svg
											className="w-4 h-4"
											aria-hidden="true"
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
											<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										<span>Admin Dashboard</span>
									</Link>
								) : (
									<></>
								))}
						</li>
						<li>
							{user ? (
								<span
									className={classNames(
										'flex flex-row px-4 py-2 cursor-pointer'
									)}
									onClick={onLogout}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									<span>Logout</span>
								</span>
							) : (
								<Link
									to="/login"
									className={classNames(
										'flex flex-row px-4 py-2 cursor-pointer'
									)}
								>
									<svg
										className="w-4 h-4"
										aria-hidden="true"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
									</svg>
									<span>Login</span>
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
export default Header;
