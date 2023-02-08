import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row whiteColor blackBG'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5 '>
                    <h2 className= "margin-20px">Sure you want to sign out?</h2>
                    <ButtonGroup className= "margin-20px">
                        <Button variant='danger ' onClick={onSignOut}>
                            Yes
                        </Button>
                        <Button variant='warning ' onClick={onCancel}>
                            No
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
		</>
	)
}

export default SignOut
