import apiUrl from '../apiConfig'
import axios from 'axios'

//READ => INDEX OF MOST POPULAR SHOWS ACROSS ALL PLATFORMS IN USER'S REGION
export const getPopularShows = (region) => {
    return axios({
        url: `${apiUrl}/shows/${region}`,
        method: 'GET'
    })
}

//READ => INDEX OF MOST POPULAR ON SPECIFIED PLATFORM IN USER'S REGION
export const getPopularShowsByPlatform = (region, platformId) => {
    return axios({
        url: `${apiUrl}/shows/${region}/${platformId}`,
        method: 'GET'
    })
}

//READ => INDEX SEARCH BY TITLE IN USER'S REGION
export const getShowsByTitle = (region, title) => {
    return axios({
        url: `${apiUrl}/search/tv/${region}/${title}`,
        method: 'GET'
    })
}

// READ => SHOW SPECIFIC SHOW BY ID. ALSO RETURNS PLATFORMS IT IS AVAILABLE ON
export const getOneShow = (id) => {
    let urlToBackend= (`${apiUrl}/show/${id}`)
    console.log('in Shows.js:getOneshow:url:',urlToBackend);

    return axios(`${apiUrl}/show/${id}`)
}

