import { useState, useEffect } from "react";
import '../../index.css'

import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneMovie } from '../../api/movies.js'
import messages from '../shared/AutoDismissAlert/messages'
import { getFavorites, addToFavorites, removeFromFavorites } from "../../api/favorites";

//the movie's id comes from the 3rd party API
//Hide show movie and favorites behind auth
//fill out show movie with deetz

const ShowMovie = (props) => {
    const [movie, setMovie] = useState(null)
    const [providers, setProviders] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [areLoggedIn, setareLoggedIn] = useState(true)
    const [updatedFavorites, setUpdatedFavorites] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    const { user, msgAlert } = props
    // let areLoggedIn = false
    if (!user) {
        setareLoggedIn(false)
    }

    console.log('in SHOWMOVIE.js');


    //we need a boolean variable to flip whenever we add or remove a show. CHECK
    // this variable will go inside the useeffect dependency array CHECK
    //Need to import favorites list in use effect CHECK
    //We need to check if the current content being shown is already in favorites list. 
    //Write function to check 
    //conditionally render button based on if content is in the list or not. Compare id?

    //getFavorites(user)

    // useEffect(() => {
    //     getOneMovie(id)
    //         .then(res => setMovie(res.data.movie))
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting movie',
    //                 message: messages.getContentFailure,
    //                 variant: 'danger'
    //             })
    //             navigate('/')
    //             //navigate back to the home page if there's an error fetching
    //         })
    // }, [updatedFavorites])

    useEffect(() => {

        getOneMovie(id)
            .then(res => {
                const theMovie = res.data
                console.log("1 movie after getOnemovie:", theMovie)
                getFavorites(user)
                    .then(res => {
                        console.log("2 theMovie after getFavorites:", theMovie)
                        console.log("3 favorites after getFavorites:", res.data.favorites)
                        setFavorites(res.data.favorites)
                        setMovie(theMovie.movie)
                        setProviders(theMovie.providers)
                        console.log("4 movie after setting Movie:", movie)
                        console.log("5 providers after setting providers:", providers)
                    })
                    .catch(err => {
                        msgAlert({
                            heading: 'Error getting favorites',
                            message: messages.getContentFailure,
                            variant: 'danger'
                        })
                        // navigate('/')
                        //navigate back to the home page if there's an error fetching
                    })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting favorites',
                    message: messages.getContentFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })

    }, [updatedFavorites])




    //Function to check if movie is in favorites
    //first we map favorites to create an array of IDs in favorites CHECK
    //then we compare movie.contentId to [favorites.contentID]
    //return true is there is a match, false if not
    console.log("This is favorites:", favorites)
    let favoritesIdArray = []
    if (favorites !== [7777777]) {
        favoritesIdArray = favorites.map((favorites) => {
            return favorites.contentId
        })
        console.log("This is favoritesIdArray:", favoritesIdArray)
        // console.log("this is movie.contentId:", movie.contentId)

    }

    //UNCOMMENT
    const checkFavorites = () => {
        if (favoritesIdArray.includes(movie.contentId)) {
            return true
        } else {
            return false
        }
    }


    //Function to split year from movie.release_date
    //UNCOMMENT
    const year = () => {
        const split_date = movie.release_date.split('-')
        return split_date[0]
    }

    // console.log("this is movie!!!", movie)
    // const year = movie.release_date.split('-')
    // console.log("this is year!!!", year[0])

    //function to show the average
    // UNCOMMENT
    const rating = () => {
        const roundedRating = Math.round(movie.vote_average * 10) / 10
        return `${roundedRating}/10`
    }

    //Function to map over genres and create an array of strings
    // UNCOMMENT
    // console.log("movie:", movie)
    // console.log("movie.genres:", movie.genres)
    const genresList = () => {
        const list = movie && movie.genres.map((genre, index) => (
            <li key={index}>
                {genre.name}
            </li>
        ))
    }

    // const genresList = movie && movie.genres.map((genre, index) => (
    //     <li key={index}>
    //         {genre.name}
    //     </li>
    // ))





    //function to remove movie from the favorites list
    const removeMovieFromFavorites = () => {
        console.log("remove function")
        console.log("movie:", movie)
        console.log("movie._id:", movie.contentId)
        removeFromFavorites(user, movie.contentId)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeContentSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {
                setUpdatedFavorites((prevFavorites) => (
                    !prevFavorites))
            })
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing movie',
                    message: messages.removeContentFailure,
                    variant: 'danger'
                })
            })
    }



    //Function for where is it streaming
    // UNCOMMENT
    const whereStreaming = (term) => {

        if (term == 'name') {
            if (providers.length == 0) {
                return <li>No available streaming data</li>
            }
            else {
                const providerName = providers.map((provider, index) => {
                    return <li key={index}>{provider.provider_name}</li>
                })

                if (!providerName) {
                    return "Looks like this title is not streaming on any subscriptions at the moment."
                } else {
                    return providerName
                }
            }
        }
        else {
            const providerLogo = providers.map((provider, index) => {
                return provider.logo_path
            })
        }

    }

    //function to add movie to favorites
    const addMovieToFavorites = () => {
        addToFavorites(user, movie)
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.addContentSuccess,
                    variant: 'success'
                })
            })

            .then(() => {
                setUpdatedFavorites((prevFavorites) => (
                    !prevFavorites))
            })

            .catch(err => {
                msgAlert({
                    heading: 'Error adding movie to favorites',
                    message: messages.removeContentFailure,
                    variant: 'danger'
                })
            })
    }



    if (!movie || !providers || !favorites) {
        return <LoadingScreen />
    }

    return (
        <div className="blackBG showMovieContainer">

            <div className="poster">
                <img className="width18-5rem pl-25px" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
            </div>

            <div className="whiteColorOnly showCol2 pl-25px">
                <h2 className="whiteColorOnly ">{movie.title}</h2>
                <h5 className="whiteColorOnly pb-20px"> ({year()})</h5>
                <h5 className="whiteColorOnly pb-20px" >{rating()}</h5>
                <ul className="whiteColorOnly pb-20px"> {genresList()} </ul>
                <h6 className="whiteColorOnly pb-20px pr-25px">{movie.overview}</h6>
                <h5 className="whiteColorOnly pb-20px">{movie.runtime} minutes</h5>
                <h3 className="whiteColorOnly">Available for streaming on: {whereStreaming('name')}</h3>
            </div>

            <div className="pl-25px" >
                {(checkFavorites())
                    ?
                    <Button onClick={() => { removeMovieFromFavorites() }}
                        className="m-2 grayBlueColorBG">
                        Remove From Favorites
                    </Button>
                    :
                    <Button onClick={() => { addMovieToFavorites() }}
                        className="m-2 grayBlueColorBG">
                        Add To Favorites
                    </Button>}
            </div>
        </div>


        //  // PRIOR CARD
        // <Container className="fluid blackBG">
        //     <Card>
        //         <Card.Header></Card.Header>
        //         <Card.Body>
        //             <div className="poster">
        //                 <img className="width18-5rem" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
        //             </div>
        //             <div className="infoGrid">
        //                 <h2>{movie.title}</h2> <p>{year()}</p>
        //                 {/* <img src={`https://image.tmdb.org/t/p/w500${whereStreaming()}`}></img> */}
        //                 <h4>Available for streaming on: {whereStreaming('name')}</h4>
        //                 <p>{movie.overview}</p>
        //                 <p>{rating()}</p>
        //                 <ul>
        //                     {genresList()}
        //                 </ul>
        //                 <p>{movie.runtime} minutes</p>
        //             </div>

        //         </Card.Body>
        //         <Card.Footer>


        //             {(checkFavorites())
        //                 ?
        //                 <Button onClick={() => { removeMovieFromFavorites() }}
        //                     className="m-2">
        //                     Remove From Favorites
        //                 </Button>
        //                 :
        //                 <Button onClick={() => { addMovieToFavorites() }}
        //                     className="m-2">
        //                     Add To Favorites
        //                 </Button>}
        //         </Card.Footer>
        //     </Card>
        // </Container>
    )
}

export default ShowMovie