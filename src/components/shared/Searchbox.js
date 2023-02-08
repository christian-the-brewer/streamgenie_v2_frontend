// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { searchIt } from '../../api/search.js'
import React, { useState, Fragment, useEffect } from 'react';
import './searchbox.scss'
import RadioToggle from './RadioToggle'
import { getMoviesByTitle } from '../../api/movies.js'
import { getShowsByTitle } from '../../api/shows.js'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';


// all the prop values
const Searchbox =  ({
					radioValue, 
					setRadioValue,
					searchValue,
					setSearchValue,
					searchIndexMovieList,
					setSearchIndexMovieList
					}) => {

	const navigate = useNavigate()
	

	const [user, setUser] = useState('')
	const [toggleRadioValue, setToggleRadioValue]= useState('')
	const [apiResList, setApiResList] = useState([])

	let region = "US"

	useEffect(() => {
		setToggleRadioValue(setToggleRadioValue)
	},[])

	const onSearch = (event) => {
	console.log('IN Searchbox.js:onSearcH!!');
	event.preventDefault()

		// 1 movie, 2 tv  . To drill down its res.data.movies
		if(radioValue === "1"){
			console.log('IN Searchbox.js:onSearch:If === 1');		
			getMoviesByTitle(region,searchValue,user)
			.then((res) => { setSearchIndexMovieList(res.data.movies)})
			.catch((error) => {console.log(error)})
		
			
		} else if(radioValue === "2"){
			console.log('In Searchbox.js:onSearch funct: radio2');
			getShowsByTitle(region,searchValue,user)
			.then((res) => { setSearchIndexMovieList(res.data.shows)})
			.catch((error) => {console.log(error)})
		}

		navigate('/searchIndex/')
	
	}	

	// console.log('SEARCHBOX:searchIndexMovieList:',searchIndexMovieList);
	
	return (		
		<div className="searchBarContainer" >
			<Form onSubmit={onSearch}> 
				<Form.Group className="mb-3 searchBarWidth" 
							controlId="searchBox">
					{/* <Form.Label>Email address</Form.Label> */}
					<Form.Control
								type="text" 
								placeholder="search for title"
								onChange={e => setSearchValue(e.target.value)} />
					<Form.Text className="text-muted"> </Form.Text>
				</Form.Group>				
			</Form>
			<RadioToggle			
				user={user}
				onSearch={onSearch}
				radioValue={radioValue}
				setRadioValue={setRadioValue}
			/>

			{/* <Routes>
			<Route
				path='/searchIndex'
				element={<Navigate to='/searchIndex/'/>}
			/>
			</Routes> */}
		</div>	
		
	)
}


export default Searchbox