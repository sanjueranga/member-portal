import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, reset } from '../features/users/userSlice';
import TableRow from '../components/TableRow';
import UserStat from '../components/UserStat';

import TableRowPending from '../components/TableRowPending';
function AdminDashboard() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isSuccess } = useSelector((state) => state.auth);
	let counter = 0;

	const { allUsers, isError, message } = useSelector((state) => state.user);

	useEffect(() => {
		if (!isError) {
			console.log(message);
		}
		if (user) {
			if (!(user.role === 'Admin')) navigate('/');
		} else {
			navigate('/');
		}
		dispatch(getUsers());
		// return () => {
		// 	dispatch(reset());
		// };
	}, [user, navigate, isError, message, dispatch, isSuccess]);

	return (
		<>
			<div className="grid justify-items-center">
				<h2 className="mb-8 text-2xl text-white font-bold pt-8 ">
					PORTAL STATISTICS
				</h2>
			</div>
			<div className="grid justify-items-center">
				<UserStat data={allUsers ? allUsers : null} />
			</div>
			<div className="overflow-x-auto w-full">
				<div className="grid justify-items-center">
					<h2 className="mb-8 text-2xl text-white font-bold p-8 ">
						USER REQUESTS
					</h2>
				</div>
				<table className="table w-[90%] mx-auto ">
					<thead>
						<tr className=" backdrop-blur-sm bg-black/70">
							<th></th>
							<th>Name</th>
							<th>Contact Information</th>
							<th>Batch</th>
							<th>Status</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{allUsers ? (
							allUsers.map((item, index) =>
								!item.userStatus ? (
									<TableRow item={item} key={index} count={++counter} />
								) : (
									<></>
								)
							)
						) : (
							<>
								<TableRowPending />
								<TableRowPending />
								<TableRowPending />
							</>
						)}
					</tbody>

					<tfoot>
						<tr>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>
							<th></th>

							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</>
	);
}

export default AdminDashboard;
