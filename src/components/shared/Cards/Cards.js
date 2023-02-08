import React, { Fragment, useState, useEffect} from 'react'
import { Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Cards.css'
import { v4 as uuid } from 'uuid'
import Card from 'react-bootstrap/Card';

// radioValue of 1 = Movies, 2 = TV

const Cards = ({topTitlesList,radioValue}) => {

    console.log('Cards.js:Prop:topTitlesList:',topTitlesList);

    const id = uuid()

    const addFavorite = () => {
        console.log('in addFavorite:cards.js');
    }

    const [userName, setUserName] = useState('')
    const [region, setRegion] = useState('')
    const [topTitles,setTopTitles] = useState([])

    const backDropUrl = "https://image.tmdb.org/t/p/w500/"

    let titleCards

    // 1 movies, 2 tv
    if(radioValue === '1'){
        titleCards = topTitlesList.map((aTitle) => (
 
            <Link to={`/movie/${aTitle.id}`}>
                <div className= "width17rem" key={aTitle.id}>
                        <a>
                        <img className= "width17rem p-20px" src={backDropUrl + aTitle.poster_path} />
                        </a> 
                </div>   
            </Link>
        ))
    } else if(radioValue === '2'){
        titleCards = topTitlesList.map((aTitle) => (
 
            <Link to={`/show/${aTitle.id}`}>
            <div className= "width17rem" key={aTitle.id}>
                    <a>
                     <img className= "width17rem p-20px" src={backDropUrl + aTitle.poster_path} />
                    </a> 
            </div>   
            </Link>
        ))

            // tv cards
    } else {
        titleCards = topTitlesList.map((aTitle) => (
 
            <Link to={`/movie/${aTitle.id}`}>
            <div className= "width17rem" key={aTitle.id}>
                    <a>
                        <img className= "width17rem p-20px" src={backDropUrl + aTitle.poster_path} />
                    </a> 
            </div>   
            </Link>
        ))
    }

    

    // working version for movies
    // titleCards = topTitlesList.map((aTitle) => ( 
    //     <Link to={`/movie/${aTitle.id}`}>
    //     <div className= "width16" key={aTitle.id}>
    //             <a>
    //              <img className= "width16 p-20px" src={backDropUrl + aTitle.poster_path} />
    //             </a> 
    //     </div> 
    //     </Link>
    // ))
      




    // console.log('titleCards',titleCards);

    return (
        <>
        <div className= "BG-black">
           <div className= "card-container">{titleCards}</div>
        </div>
        </>
    )
}

export default Cards