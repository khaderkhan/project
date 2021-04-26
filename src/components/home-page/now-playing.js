import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import movieServie from '../../services/movies-service'
const NowPlayingListItem = ({movie}) => {

    const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    useEffect(() => {
        movieServie.findNowPlayingMovies()
            .then(movies => setNowPlayingMovies(movies))
    },[])

    return(
    <Link to={`/details/${movie.id}`}>
        <div className='list-group-item list-group-item-action row'>
            <p>{movie.title}</p>
        </div>
    </Link>
    )
}

export default NowPlayingListItem;