import apiUrl from '../apiConfig'
import axios from 'axios'


// Used for Homepage top list 
export const searchIt = (user,searchValue) => {
    console.log('%$%$% in search.js $%%$%',user,searchValue);
	return axios({
		method: 'GET',
		url: apiUrl + '/movies/(:user)/:searchValue'
			
		
	})
}