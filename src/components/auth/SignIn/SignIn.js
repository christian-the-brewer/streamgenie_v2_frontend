import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import { signIn } from '../../../api/auth'
import messages from '../../shared/AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignIn.css'

const SignIn = (props) => {
    // constructor(props) {
    // 	super(props)

    // 	this.state = {
    // 		email: '',
    // 		password: '',
    // 	}
    // }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // handleChange = (event) =>
    // 	this.setState({
    // 		[event.target.name]: event.target.value,
    // 	})

    const onSignIn = (event) => {
        event.preventDefault()
        console.log('the props', props)
        const { msgAlert, setUser } = props

        const credentials = { email, password }

        signIn(credentials)
            .then((res) => setUser(res.data.user))
            .then(() =>
                msgAlert({
                    heading: 'Sign In Success',
                    message: messages.signInSuccess,
                    variant: 'success',
                })
            )
            .then(() => navigate('/'))
            .catch((error) => {
                setEmail('')
                setPassword('')
                msgAlert({
                    heading: 'Sign In Failed with error: ' + error.message,
                    message: messages.signInFailure,
                    variant: 'danger',
                })
            })
    }

    return (
        <div className="signInContainer">
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                    <h3 className="whiteColor blackBG margin-10px">Sign In</h3>
                    <Form onSubmit={onSignIn}>
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
                        <Button className="margin-10px grayBlueColorBG" variant='secondary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            {/* <Link to='/sign-up'>Don't have an account? Create one!</Link> */}
            <Nav.Item>
                <Link className="margin-10px whiteColorOnly linkStyling" to='/sign-up'>
                    Don't have an account? Create one!
                </Link>
            </Nav.Item>
        </div>
    )
}

export default SignIn
