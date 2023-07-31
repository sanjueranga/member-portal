import { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import UserCardPending from '../components/UserCardPending';
import { getUsers } from '../features/users/userSlice';
import { API_LINK } from '../index';
function Members({ searchName }) {
	const API_URL =API_LINK+'/student/'
	
	
	const dispatch = useDispatch();

	const { allUsers, isLoading, isError, message, isSuccess } = useSelector(
		(state) => state.user
	);
	const [students, setStudents] = useState([]);
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		dispatch(getUsers());
	}, []);
	let sortedusers;
	let count = 0;
	if (isSuccess) {
		students
			.filter((user) => {
				if (searchName === '') {
					return user;
				} else if (
					user.name
						.toLowerCase()
						.includes(searchName ? searchName.toLowerCase() : '')
				) {
					return user;
				}
			})
			.map((user) => (user.userStatus ? count++ : ''));
		sortedusers = students.slice().sort(function (a, b) {
			var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1; //nameA comes first
			}
			if (nameA > nameB) {
				return 1; // nameB comes first
			}
			return 0; // names must be equal
		});
	}
	// const [image, setImage] = useState(
	// 	'https://drive.google.com/file/d/1tP3r6CEq46BiaRd_ikHWhk0xs8gVtMci/view?usp=sharing'
	// );
	// const [showImage, setShowImage] = useState();
	useEffect(() => {
		// setShowImage(image.split('/')[5]);

		setTimeout(() => {
			const config = {
				headers: {
					'Access-Control-Allow-Credentials': true,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
					'Access-Control-Allow-Headers': 'application/json',
				},
			};
			async function getUsers() {
				const response = await axios.get(API_URL, config);
				setStudents(response.data);
				setIsPending(false);
			}
			getUsers();
		}, 1000);
	}, []);

	return (
		<section className="text-gray-400 body-font ">
			<div className="max-w-[90%] py-16 mx-auto">
				{/* <img
					src={`https://drive.google.com/uc?export=view&id=${showImage}`}
					alt="drive"
				/>{' '} */}
				{searchName ? (
					<div className="alert shadow-lg mb-5 backdrop-blur-sm bg-black/60">
						<div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="stroke-info flex-shrink-0 w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<div>
								<h3 className="font-bold text-md">
									Search Result for : {searchName}
								</h3>
								<div className="text-md">You have {count} results</div>
							</div>
						</div>
					</div>
				) : (
					''
				)}
				{/* <div className="flex flex-wrap flex-row justify-center content-center"> */}
				<div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
					{!isPending ? (
						sortedusers
							.filter((user) => {
								if (searchName === '') return user;
								if (
									user.name
										.toLowerCase()
										.includes(searchName ? searchName.toLowerCase() : '')
								) {
									return user;
								}
							})
							.map((user) =>
								user.userStatus ? (
									<UserCard key={user._id} data={user} />
								) : (
									<></>
								)
							)
					) : (
						<>
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
							<UserCardPending />
						</>
					)}
				</div>
			</div>
		</section>
	);
}

export default Members;
