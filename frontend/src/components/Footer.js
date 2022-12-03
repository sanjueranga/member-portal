import React from 'react';
import logo from '../img/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function Footer() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	return (
		<footer className="footer footer-center p-8 text-base-content rounded absolute ">
			<div className="h-0.5 rounded-lg mx-auto mt-1 w-[95%] bg-slate-700 "></div>
			{/* <div className="grid grid-flow-col gap-4">
				<Link className="text-sm font-medium" to="/members">
					Members
				</Link>
				<Link className="text-sm font-medium" to="/register">
					Register
				</Link>
				{user ? (
					<Link className="text-sm font-medium" to={`/profile/${user._id}`}>
						<span>Profile</span>
					</Link>
				) : (
					<Link className="text-sm font-medium" to={'/login'}>
						<span>Profile</span>
					</Link>
				)}
			</div> */}
			<img src={logo} alt="logo" className="w-36" />
			<div className="-mt-10">
				<div className="grid grid-flow-col gap-4">
					<div className="grid grid-flow-col gap-4 pt-4">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.facebook.com/CsupFB/"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-brand-facebook"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.linkedin.com/company/computer-society-university-of-peradeniya-csup/"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-brand-linkedin"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<rect x="4" y="4" width="16" height="16" rx="2"></rect>
								<line x1="8" y1="11" x2="8" y2="16"></line>
								<line x1="8" y1="8" x2="8" y2="8.01"></line>
								<line x1="12" y1="16" x2="12" y2="11"></line>
								<path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/csup-dev"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-brand-github"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
							</svg>
						</a>

						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.instagram.com/csup_insta/"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-brand-instagram"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<rect x="4" y="4" width="16" height="16" rx="4"></rect>
								<circle cx="12" cy="12" r="3"></circle>
								<line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.youtube.com/c/CSUPComputerSocietyUniversityofPeradeniya"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-brand-youtube"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<rect x="3" y="5" width="18" height="14" rx="4"></rect>
								<path d="M10 9l5 3l-5 3z"></path>
							</svg>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://csup.soc.pdn.ac.lk/"
							className="bg-base-100 p-2 rounded-full hover:bg-sky-900"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="icon icon-tabler icon-tabler-link"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
								<path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
							</svg>
						</a>
					</div>
				</div>
			</div>
			<div>
				<p>
					Copyright © {new Date().getFullYear()} - All right reserved{' '}
					<span className="underline decoration-sky-500 decoration-2 tracking-widest font-semibold ">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://csup.soc.pdn.ac.lk/"
						>
							CSUP
						</a>
					</span>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
