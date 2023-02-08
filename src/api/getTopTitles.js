import apiUrl from '../apiConfig'
import axios from 'axios'

let region = "/US" 

// for getting netflix top 30 for homepage
export const getTopTitles = () => {
	return axios({
		method: 'GET',
		url: apiUrl + '/movies'+ region,		
	})
}

// ALT - local API get for testing
// export const getTopTitles = () => {
// 	console.log('in getTopTitles.js: getTopTitles:');
// 	return axios({
// 		method: 'GET',
// 		url: `https://api.themoviedb.org/3/discover/movie?api_key=58a92a2a4d225c25e73bb7fe5bfb8183&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&watch_region=US`,		
// 	})
// }