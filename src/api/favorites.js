import apiUrl from '../apiConfig'
import axios from 'axios'


// READ => SHOW
export const getFavorites = (user) => {
    return axios({
        url: apiUrl + '/favorites',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}

// CREATE
export const createFavorites = (user, newFavorites) => {

    return axios({
        url: apiUrl + '/favorites',
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { favorites: newFavorites }
    })
}

// Add to favorites
export const addToFavorites = (user, addedContent) => {

    return axios({
        url: `${apiUrl}/favorites/add`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { user: user, content: addedContent }
    })
}

//remove from favorites
export const removeFromFavorites = (user, contentId) => {
    return axios({
        url: `${apiUrl}/favorites/remove/${contentId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: {
            user: user,
            contentId: contentId
        }
    })
}