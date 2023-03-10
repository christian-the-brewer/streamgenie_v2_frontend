// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'


// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp/SignUp.js'
import SignIn from './components/auth/SignIn/SignIn.js'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
//Movie Components
import ShowMovie from './components/movies/ShowMovie'
import IndexMoviesByPlatform from './components/movies/IndexMoviesByPlatform'
//Show Components
import ShowShow from './components/shows/ShowShow'
import IndexShowsByPlatform from './components/shows/IndexShowsByPlatform'
import SearchIndex from './components/shared/SearchIndex'
import IndexFavorites from './components/favorites/IndexFavorites'
// need to import everytime you want to use stylingsheet
import './index.css'


//******************************************************************************** */



const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [radioValue, setRadioValue] = useState('1');
	const [searchValue, setSearchValue] = useState('')
	const [searchIndexMovieList, setSearchIndexMovieList] = useState([])

	//set in SignUp.js
	const [region, setRegion] = useState('')

	console.log('message alerts', msgAlerts)
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	return (
		<Fragment>
			<Header user={user}
				radioValue={radioValue}
				setRadioValue={setRadioValue}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				searchIndexMovieList={searchIndexMovieList}
				setSearchIndexMovieList={setSearchIndexMovieList}
			/>
			<Routes>
				{
					user
						?
						<Route path='/' element={<Home
							msgAlert={msgAlert}
							user={user}
						/>} />
						:
						<Route
							path='/'
							element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
						/>
				}
				{/* <Route path='/' element={<Home
					msgAlert={msgAlert}
					user={user}
				/>} /> */}
				<Route
					path='/sign-up'
					element={<SignUp
						msgAlert={msgAlert}
						setUser={setUser}
						region={region}
						setRegion={setRegion}
					/>}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
				<Route
					path="/movie/:id"
					element={<ShowMovie user={user} msgAlert={msgAlert} />}
				/>
				<Route
					path="/show/:id"
					element={<ShowShow user={user} msgAlert={msgAlert} />}
				/>
				<Route
					path="/movies/platform/:platId"
					element={<IndexMoviesByPlatform user={user} msgAlert={msgAlert} />}
				/>

				<Route
					path="/shows/platform/:platId"
					element={<IndexShowsByPlatform user={user} msgAlert={msgAlert} />}
				/>
				<Route
					path="/favorites"
					element={<IndexFavorites user={user} msgAlert={msgAlert} />}
				/>

				<Route
					path="/searchIndex"
					element={<SearchIndex
						user={user}
						msgAlert={msgAlert}
						radioValue={radioValue}
						setRadioValue={setRadioValue}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						searchIndexMovieList={searchIndexMovieList}
					/>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
