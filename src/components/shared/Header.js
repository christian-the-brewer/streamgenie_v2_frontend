import React, { useState, Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Dropdown } from 'react-bootstrap'
import NavLink from 'react-bootstrap/NavLink'
import { NavItem } from 'react-bootstrap/'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Searchbox from './Searchbox'
import { NavDropdown } from 'react-bootstrap'
import IndexMoviesByPlatform from '../movies/IndexMoviesByPlatform'

// import "../../../styles/generalStyle.css"
const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}

// PAY ATTENTION TO CALLBACK FUNCTION and whether it is a () or {} -----> implicit vs explicit return
// Don't use Nav.Link - it breaks them...
const Header =
	({
		user,
		radioValue,
		setRadioValue,
		setSearchValue,
		searchValue,
		searchIndexMovieList,
		setSearchIndexMovieList
	}) => {

		const authenticatedOptions = (
			<>
				<Nav.Item className="nav-item ms-auto">
					<Link className="margin-10px nav-link " to='change-password' style={linkStyle}>
						Change Password
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className="margin-10px nav-link" to='sign-out' style={linkStyle}>
						Sign Out
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className="margin-10px nav-link" to='/favorites' style={linkStyle}>
						Favorites
					</Link>
				</Nav.Item>
				<NavDropdown className="nav-link" title="Platforms">
					<NavDropdown.Item>
						<Link to={{ pathname: '/movies/platform/8' }} >
							Netflix
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item >
						<Link to={{ pathname: '/movies/platform/384' }} >
							Hbo Max
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item >
						<Link to={{ pathname: '/movies/platform/9' }} >
							Amazon Prime
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item >
						<Link to={{ pathname: '/movies/platform/15' }} >
							Hulu
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item >
						<Link to={{ pathname: '/movies/platform/337' }} >
							Disney+
						</Link>
					</NavDropdown.Item>
				</NavDropdown>
				<Nav.Item>
					<Searchbox
						radioValue={radioValue}
						setRadioValue={setRadioValue}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
						searchIndexMovieList={searchIndexMovieList}
						setSearchIndexMovieList={setSearchIndexMovieList}
					/>
				</Nav.Item>
			</>
		)

		const unauthenticatedOptions = (
			<>
				<Nav.Item>
					<Link to='sign-up' style={linkStyle}>Sign Up</Link>
				</Nav.Item>
				<Nav.Item>
					<Link to='sign-in' style={linkStyle}>Sign In</Link>
				</Nav.Item>

			</>
		)

		const alwaysOptions = (
			<>


			</>
		)

		return (
			<Navbar variant='dark' expand='md' className="nearBlackColor">
				<Nav className="container-fluid">
					<Navbar.Brand>
						<Link className="margin-10px" to='/' style={linkStyle}>
							StreamGenie
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='container-fluid ml-auto'>
							{user && (
								<span className='navbar-text mr-2'>{user.userName}</span>
							)}
							{alwaysOptions}
							{user ? authenticatedOptions : unauthenticatedOptions}
						</Nav>
					</Navbar.Collapse>
				</Nav>
			</Navbar>
		)

	}

export default Header
