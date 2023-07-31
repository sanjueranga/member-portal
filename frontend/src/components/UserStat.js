import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CountUp from 'react-countup';
const API_LINK = process.env.REACT_APP_API_URL;
function UserStat() {
	const { allUsers } = useSelector((state) => state.user);

	const API_URL = API_LINK+'/student/';

	const [students, setStudents] = useState([]);
	useEffect(() => {
		async function getUsers() {
			const response = await axios.get(API_URL);
			setStudents(response.data);
		}
		getUsers();
	}, [allUsers]);

	let approve = 0;
	let newUsers = 0;
	if (students) {
		for (let i = 0; i < students.length; i++) {
			if (students[i].userStatus) {
				approve++;
			} else {
				newUsers++;
			}
		}
	}
	return (
		<div className="stats shadow bg-neutral  backdrop-blur-sm bg-black/70">
			<div className="stat">
				<div className="stat-figure text-secondary ">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-users  w-8 h-8 stroke-info"
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
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						<path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
					</svg>
				</div>
				<div className="stat-title">Total Users</div>
				<div className="stat-value flex flex-row-reverse">
					<CountUp
						end={students ? Object.keys(students).length : <></>}
						duration={2}
					/>
				</div>
				{/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
			</div>

			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-user-check w-8 h-8 stroke-success"
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
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						<path d="M16 11l2 2l4 -4"></path>
					</svg>
				</div>
				<div className="stat-title">Approved</div>
				<div className="stat-value flex flex-row-reverse">
					<CountUp end={students ? approve : <></>} duration={2} />
				</div>
				{/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
			</div>

			<div className="stat backdrop-blur-sm">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-user-plus w-8 h-8 stroke-error"
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
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
						<path d="M16 11h6m-3 -3v6"></path>
					</svg>
				</div>
				<div className="stat-title">New Registers</div>
				<div className="stat-value flex flex-row-reverse">
					<CountUp end={students ? newUsers : <></>} duration={2} />
				</div>
				{/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
			</div>
		</div>
	);
}

export default UserStat;
