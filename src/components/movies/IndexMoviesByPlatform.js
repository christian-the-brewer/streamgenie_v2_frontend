import { useState, useEffect } from "react";
import '../../index.css'

import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getPopularMoviesByPlatform } from '../../api/movies.js'
import messages from '../shared/AutoDismissAlert/messages'

import './IndexMoviesByPlatform.css'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}
const region = "US"

const IndexMoviesByPlatform = (props) => {
    const { msgAlert, user } = props
    const [id, setId] = useState(null)
    const [movies, setMovies] = useState(null)
    const [error, setError] = useState(false)

    //let data = useLocation()
    const { platId } = useParams()
    console.log("platId:", platId)

    console.log("in index platform", movies)

    useEffect(() => {
        console.log("InuseEffect", movies)
        getPopularMoviesByPlatform(region, platId)
            .then(res => setMovies(res.data.movies))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Movies',
                    message: messages.getContentFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [platId])

    if (!movies) {
        return <LoadingScreen />
    }

    const movieCards = movies.map((movie, index) => (
        <Link to={`/movie/${movie.id}`} key={index}>
            <div className= "width17rem">
                <a>
                    <img className="width17rem p-20px"
                         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                         alt={movie.title}></img>
                </a>
            </div>
        </Link>
    ))

    return (
        <div className= "blackBG" style={cardContainerStyle}>
            {movieCards}
        </div>
    )
}

export default IndexMoviesByPlatform