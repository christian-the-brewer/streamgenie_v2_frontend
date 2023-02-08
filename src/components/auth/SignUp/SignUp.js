// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../../api/auth'
import messages from '../../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './SignUp.css'

import regionList from '../../../regionList'

import { createFavorites } from '../../../api/favorites'


const SignUp = ({msgAlert,setUser,region,setRegion}) => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [userName, setUserName] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		// const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation, userName, region }

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}

    const regions = regionList.map((region,index) => (
         <option key={index}>{region.english_name}</option>
    ))

    // console.log('regions************',regions)

    return (
        <div className = "signUpContainer">
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3 className="whiteColor blackBG margin-10px">Sign Up</h3>
                    <Form onSubmit={onSignUp}>
                        <Form.Group controlId='username'>
                            {/* <Form.Label>Username</Form.Label> */}
                            <Form.Control
                                className="margin-10px"
                                required
                                name='user'
                                value={userName}
                                type='text'
                                placeholder='UserName'
                                onChange={e => setUserName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            {/* <Form.Label>Email address</Form.Label> */}
                            <Form.Control
                                className="margin-10px"
                                required
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter email'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control
                                className="margin-10px"
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='passwordConfirmation'>
                            {/* <Form.Label>Password Confirmation</Form.Label> */}
                            <Form.Control
                                className="margin-10px"
                                required
                                name='passwordConfirmation'
                                value={passwordConfirmation}
                                type='password'
                                placeholder='Confirm Password'
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                        </Form.Group>

                        {/* <Form.Group controlId='region'>
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                required
                                name='region'
                                value={region}
                                type='text'
                                placeholder='Region'
                                onChange={e => setRegion(e.target.value)}
                            />
                            <div className='search_select_box'>
                                <select name="region" id="region">
                                    {regions}                            
                                </select>                           

                            </div>
                        </Form.Group> */}
                        <Button variant='secondary' type='submit' className="margin-10px grayBlueColorBG">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )

}

export default SignUp