import MovieSlide from './movie-slide-item'
import {MovieCard} from "./movie-card";
import React, {useEffect, useState, useRef} from "react";
import movieService from '../../services/movies-service'



export const MovieList = () => {

    const [popularMovies, setPopularMovies] = useState({})

    useEffect(() => {
        movieService.findPopularMovies()
            .then(movies => setPopularMovies(movies))
    },[])

    return(
        <div>
            {/*{JSON.stringify(popularMovies)}*/}
            {/*<MovieSlide/>*/}
        </div>

    )
}