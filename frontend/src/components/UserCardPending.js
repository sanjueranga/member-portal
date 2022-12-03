import React from 'react';

function UserCardPending() {
	return (
		<div className="p-4 animate-pulse">
			<div className="h-full shadow rounded-lg outline-gray-900">
				<div className="lg:h-48 md:h-36 rounded-lg mx-auto mt-1 w-[95%] bg-slate-700 "></div>
				<div className="pl-6 pr-6">
					<h2 className="title-font font-medium text-slate-700">
						______________________
					</h2>
					<div className="h-3 my-4 bg-slate-700 rounded"></div>
					<div className="h-3 my-4 bg-slate-700 rounded"></div>
				</div>
			</div>
		</div>
	);
}

export default UserCardPending;
