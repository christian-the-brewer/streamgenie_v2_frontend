import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX OF MOST POPULAR MOVIES ACROSS ALL PLATFORMS IN USER'S REGION
export const getPopularMovies = (region) => {
    return axios({
        url: `${apiUrl}/movies/${region}`,
        method: 'GET'
    })
}

//READ => INDEX OF MOST POPULAR ON SPECIFIED PLATFORM IN USER'S REGION
export const getPopularMoviesByPlatform = (region, platformId) => {
    return axios({
        url: `${apiUrl}/movies/${region}/${platformId}`,
        method: 'GET'
    })
}

//READ => INDEX SEARCH BY TITLE IN USER'S REGION
export const getMoviesByTitle = (region, title) => {
    return axios({
        url: `${apiUrl}/search/movies/${region}/${title}`,
        method: 'GET'
    })
}

// READ => SHOW SPECIFIC MOVIE BY ID. ALSO RETURNS PLATFORMS IT IS AVAILABLE ON
export const getOneMovie = (id) => {
    return axios(`${apiUrl}/movie/${id}`)
}

