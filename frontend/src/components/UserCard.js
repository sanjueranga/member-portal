import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import male from '../img/male.png';
import female from '../img/female.png';

function UserCard({ data }) {
	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	useEffect(() => {
		if (data) {
			fetch(data.profilePic).then((res) => {
				setImageIsValid(res.status === 200);
				setImageLoading(false);
			});
		}
	}, [data, imageIsValid]);
	return (
		<div>
			<div className="p-4">
				<div className="h-full shadow border-2 border-gray-800 bg-gray-900 rounded-lg overflow-hidden">
					{imageIsValid ? (
						<img
							className="lg:h-48 md:h-36 w-full lg:object-cover object-center sm:object-scale-down hover:-translate-y-1 hover:rotate-2 hover:scale-110 duration-300"
							src={data.profilePic}
							alt={data.name}
						/>
					) : data.gender === 'Male' ? (
						<img
							className="lg:h-48 md:h-36 w-[120%] scale-110 lg:object-cover mx-auto object-center sm:object-scale-down hover:-translate-y-1 hover:rotate-2 hover:scale-125 duration-300"
							src={male}
							alt={data.name}
						/>
					) : (
						<img
							className="lg:h-48 md:h-36 w-[120%] lg:object-cover scale-110 mx-auto object-center sm:object-scale-down hover:-translate-y-1 hover:rotate-2 hover:scale-125 duration-300"
							src={female}
							alt={data.name}
						/>
					)}

					<div className="p-6">
						<h2 className="title-font font-medium text-gray-500 mb-1">
							{/* {data.headline} */}
						</h2>
						<h1 className="title-font text-lg font-medium text-white mb-3">
							{data.name}
						</h1>

						<div className="flex items-center flex-wrap ">
							<Link
								to={`/profile/${data._id}`}
								className="text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 tracking-wde"
							>
								View Profile
								<svg
									className="w-4 h-4 ml-2 hover:translate-x-1 duration-300"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M5 12h14"></path>
									<path d="M12 5l7 7-7 7"></path>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserCard;
