import { useState, useEffect } from "react";
import '../../index.css'

import { useParams, useNavigate, Link } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getPopularShowsByPlatform } from '../../api/shows.js'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const IndexShowsByPlatform = (props) => {
    const { msgAlert, user, platformId } = props
    const [shows, setShows] = useState(null)
    const [error, setError] = useState(false)



    useEffect(() => {
        getPopularShowsByPlatform(user.region, platformId)
            .then(res => setShows(res.data.shows))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Shows',
                    message: messages.getContentFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

    if (!shows) {
        return <LoadingScreen />
    }

    const showCards = shows.map((show, index) => (
        <Link to={`/show/${show.id}`} key={index}>
            <Card>
                <Card.Body>
                    <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name}></img>
                </Card.Body>
            </Card>
        </Link>
    ))

    return (
        <div style={cardContainerStyle}>
            {showCards}
        </div>
    )
}
export default IndexShowsByPlatform