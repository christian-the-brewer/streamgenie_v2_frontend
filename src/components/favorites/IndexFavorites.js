import { useState, useEffect } from "react";
import '../../index.css'

import { useParams, Link, } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getFavorites } from '../../api/favorites'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'    
}
const region = "US"

const IndexFavorites = (props) => {
    const { msgAlert, user } = props
    const [id, setId] = useState(null)
    const [favorites, setFavorites] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {

        getFavorites(user)
            .then(res => setFavorites(res.data.favorites))
            .catch(err => {
                msgAlert({
                    heading: 'Error GettingFavorites',
                    message: messages.getContentFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

    if (!favorites) {
        return <LoadingScreen />
    }
    console.log("favorites:", favorites)
    const favoriteCards = favorites.map((favorite, index) => (
        <Link  to={`/${favorite.type}/${favorite.contentId}`} key={index}>
            
            <div className= "BG-black">
                <a>
                    <img className= "width17rem p-20px" src={`https://image.tmdb.org/t/p/w500${favorite.poster_path}`} alt={favorite.title}></img>
                </a>
            </div>
            
        </Link>
    ))

    return (
        <div className="blackBG">
            <div style={cardContainerStyle}>
                {favoriteCards}
            </div>
        </div>
    )
}

export default IndexFavorites