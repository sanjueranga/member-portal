import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../img/hero image.png';
const API_LINK = process.env.REACT_APP_API_URL +"ladfa";
function Home() {
	return (
		<div>
			<section className="text-gray-400 body-font h-max">
				<div className="container mx-auto  w-[80%] flex px-5 py-24 md:flex-row flex-col items-center">
					<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
							Find your Associate |
							<br className="hidden lg:inline-block" />
							{API_LINK} Make your dream job comes true
						</h1>
						{/* <p className="mb-8 leading-relaxed ">
							
						</p> */}
						<div className="mt-10 flex justify-center">
							<Link to="/members">
								<button className="inline-flex btn btn-info">Members</button>
							</Link>
							<Link to="/register">
								<button className="ml-4 inline-flex btn btn-outline btn-info">
									Register
								</button>
							</Link>
						</div>
					</div>
					<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 backdrop-blur-sm p-8 scale-110 ">
						<img
							className="object-cover object-center rounded w-full"
							alt="hero"
							src="https://images.ctfassets.net/ooa29xqb8tix/17JgXkgJJGQrFZRunvAEfI/a51135a8723f786c0c47c2dd0bdc234a/React_for_Designers800x600_cover_new.svg"
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Home;
