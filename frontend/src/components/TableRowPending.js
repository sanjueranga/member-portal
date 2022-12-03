import React from 'react';

function TableRowPending() {
	return (
		<tr className="animate-pulse">
			<th></th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="rounded-[40%] bg-slate-700 h-14 w-14"></div>
				</div>
			</td>
			<td>
				<div className="h-5 w-[70%] bg-slate-700 rounded"></div>
			</td>
			<td>
				<div className="h-5 w-[70%] bg-slate-700 rounded"></div>
			</td>
			<td>
				<div className="h-5 w-[70%] bg-slate-700 rounded"></div>
			</td>
			<th>
				<div className="h-5  w-[70%] bg-slate-700 rounded"></div>
			</th>
			<th>
				<div className="h-5 w-[70%] bg-slate-700 rounded"></div>
			</th>
		</tr>
	);
}

export default TableRowPending;
