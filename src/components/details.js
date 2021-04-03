import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import movieService from '../services/movies-service'
import '../style/MovieDetails.style.css';



const Details = () => {
    const [movie, setMovie] = useState({})
    const [actors, setActors] = useState([])
    const {movieID} = useParams()
    // const movieID = useParams().movieID
    console.log("moveiId", movieID)
    useEffect(() => {
        movieService.findMovieById(movieID)
            .then(movie => setMovie(movie))
        movieService.findActorsByMovieId(movieID)
            .then(actors =>  setActors(actors))

    }, [movieID])

    


    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-lg-3 col-md-4 col-sm-6 ml-5 img-content">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
                </div>

                <div className="col-lg-8 col-md-7 col-sm-5 ml-2 col-md-offset-2">
                    <div className="movie-title">
                        {movie.original_title}
                    </div>
                    <div className="movie-features">
                        Popularity: {movie.popularity}
                    </div>
                    <div className="movie-features">
                        Overview
                    </div>
                    <div>
                        {movie.overview}
                    </div>
                    <div className="mt-3">
                        <div className="row">
                            <div className="col-6">
                                <div className="movie-features">
                                    Genres
                                </div>
                                <div className='row'>
                                    {
                                        movie.genres && movie.genres.map((genre, index) => {
                                        return (
                                            <div key={index} className='col-3 ml-2 btn genre-button'>
                                                {genre.name}
                                            </div>
                                        );
                                    })
                                    }
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="movie-features">
                                    Runtime
                                </div>
                                <div>
                                    {movie.runtime} mins
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-6">
                                <div className="movie-features">
                                    Original Language
                                </div>
                                <div>
                                    {movie.original_language}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="movie-features">
                                    HomePage
                                </div>
                                <div>
                                    <a href={movie.homepage}>{movie.homepage}</a>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            <div className="movie-features col-lg-3 col-md-4 col-sm-6 ml-5">
                Cast
            </div>
            <div className='row'>
                {
                    // eslint-disable-next-line array-callback-return
                    actors.cast && actors.cast.map((actor) => {
                        if (actor.original_name && actor.profile_path)
                        return (
                            <div>
                                <div className="col-lg-3 col-md-4 col-sm-6 ml-5 img-content">
                                    <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>
                                </div>
                                <div key={actor.id} className="col-lg-3 col-md-4 col-sm-6 ml-5">
                                    {actor.original_name}
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {/* {JSON.stringify(movie)} */}
        </div>
    )
}

export default Details