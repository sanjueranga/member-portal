import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Members from './pages/Members';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import EditPage from './pages/EditPage';
import Backdrop from './img/backdrop.avif';
import Footer from './components/Footer';
import { getMe } from './features/users/userSlice';
import { setInitialUserData } from './features/auth/authSlice';
import { setInitialCUserData } from './features/users/userSlice';

function App() {
	const [searchName, setSearchName] = useState();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const {currentUser} = useSelector((state)=>state.user);
	useEffect(() => {
		// Fetch the user data from the backend
		fetch('/user')
			.then((response) => response.json())
			.then((data) => {
				
				dispatch(setInitialUserData(data));
				dispatch(setInitialCUserData(data))

			})
			.catch((error) => {
				console.error('Error fetching user data:', error);
			});
	}, [dispatch]);


	return (
		<>
			<Router>
				{/* <img
					src="https://drive.google.com/uc?export=view&id=1tP3r6CEq46BiaRd_ikHWhk0xs8gVtMci"
					alt="drive"
				/>{' '} */}
				<picture className="absolute z-20 top-0 inset-x-0 flex  justify-center overflow-hidden pointer-events-none">
					<source srcSet={Backdrop} type="image/avif" />
					<img src={Backdrop} alt="" className="w-[90%] " />
				</picture>
				{/* <Header setSearchName={setSearchName} /> */}
				<Header setSearchName={setSearchName} />
				<div className="pt-16 min-h-screen">
					<Routes>
						<Route path="/" exact element={<Home />} />
						<Route path="/profile/:id/edit" exact element={<EditPage />} />
						<Route
							path="/members"
							exact
							element={<Members searchName={searchName} />}
						/>
						<Route path="/login" exact element={<Login />} />
						<Route path="/register" exact element={<Register />} />
						<Route path="/profile/:id" exact element={<Profile />} />
						<Route
							path="/admindashboard/:id"
							exact
							element={<AdminDashboard />}
						/>
					</Routes>
				</div>

				<Footer />
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
