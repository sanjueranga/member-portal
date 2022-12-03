import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, approveUser } from '../features/users/userSlice';
import male from '../img/male.png';
import female from '../img/female.png';

function TableRow({ item, count }) {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);
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

	const [updateData, setUpdateData] = useState({
		_id: item._id,
		email: item.email,
		name: item.name,
		userStatus: true,
		confirmDate: applyDate,
		approvedBy: user ? user.name : null,
	});
	const [imageLoading, setImageLoading] = useState(true);
	const [imageIsValid, setImageIsValid] = useState(null);
	useEffect(() => {
		fetch(item.profilePic).then((res) => {
			setImageIsValid(res.status === 200);
			setImageLoading(false);
			// console.log(imageIsValid);
		});
	}, [item, imageIsValid]);
	const updateDetails = () => {
		dispatch(approveUser(updateData));
		toast.success('Request from ' + item.name + ' is Approved', {
			theme: 'dark',
		});
	};

	return (
		<tr>
			<th>{count}</th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							{imageIsValid ? (
								<img src={item.profilePic} alt={item.name} />
							) : item.gender === 'Male' ? (
								<img src={male} alt={item.name} />
							) : (
								<img src={female} alt={item.name} />
							)}
						</div>
					</div>
					<div>
						<div className="font-bold">{item.name}</div>
						<div className="text-sm opacity-50">{item.regNo}</div>
					</div>
				</div>
			</td>
			<td>
				{item.email}
				<br />
				<span
					className="badge badge-ghost badge-sm"
					href={'+' + item.contactNumber}
				>
					+{item.contactNumber}
				</span>
			</td>
			<td>
				{item.regNo.split('/')[1]}
				<br />
				<span className="badge badge-ghost badge-sm">{item.role}</span>
			</td>
			<td>
				{!item.userStatus ? 'Not Approved' : 'Approved'}
				<br />
				<span className="badge badge-ghost badge-sm">{item.applyDate}</span>
			</td>
			<th>
				<button
					onClick={() => {
						updateDetails();
					}}
					className="btn btn-success btn-sm hover:text-white"
				>
					Verify
				</button>
			</th>
			<th>
				<button
					onClick={() => {
						dispatch(deleteUser(item._id));
						toast.warning('Request from ' + item.name + ' is Decline', {
							theme: 'dark',
						});
					}}
					className="btn btn-error btn-sm hover:text-white "
				>
					Delete
				</button>
			</th>
		</tr>
	);
}

export default TableRow;
