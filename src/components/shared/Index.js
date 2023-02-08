import { useState, useEffect } from "react";
import '../../index.css'

import { useParams, useNavigate, Link } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getPopularMoviesByPlatform } from '../../api/movies.js'
import messages from '../shared/AutoDismissAlert/messages'

//card container style
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}
const region = "US"

const Index = (props) => {
    useEffect(() => {

        getAllItems()
            .then(res => setItems(res.data.items))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Items',
                    message: messages.getItemsFailure,
                    variant: 'danger',
                })
                console.log(err)
                setError(true)
            })
    }, [])

    // If items haven't loaded yet
    if (!items) {
        return <LoadingScreen />
    }


}