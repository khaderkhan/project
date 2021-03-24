import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import movieService from '../services/movies-service'

const Details = () => {
    const [movie, setMovie] = useState({})
    const {imdbID} = useParams()
    useEffect(() => {
        movieService.findMovieById(imdbID)
            .then(movie => setMovie(movie))
    })
    return(
        <div>
            <h1>{movie.Title}</h1>
            <img src={movie.Poster}/>
            <h2>Plot</h2>
            <p>
                {movie.Plot}
            </p>
            <h2>Cast</h2>
            <ul className="list-group">
                {
                    movie.Actors && movie.Actors.split(",").map(actor =>
                    <li className="list-group-item">
                        {actor}
                    </li>)
                }
            </ul>
            {JSON.stringify(movie)}
        </div>
    )
}

export default Details