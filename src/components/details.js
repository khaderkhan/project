import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import movieService from '../services/movies-service'
import '../style/MovieDetails.style.css';
import ReviewList from "./review/review-list";
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import { Table, Tag, Space } from 'antd';
import Trailer from "./trailer";
import reviewService from "../services/review-service";


const columns = [
    {
      title: 'adult',
      dataIndex: 'adult',
      key: 'adult',
      render: text => <a>{JSON.stringify(text)}</a>,
    },
    {
      title: 'release_date',
      dataIndex: 'release_date',
      key: 'release_date',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
    },
    {
        title: 'tagline',
        dataIndex: 'tagline',
        key: 'tagline',
      },

  ];
  



const Details = () => {
    const [movie, setMovie] = useState({})
    const [actors, setActors] = useState([])
    const [userType, setUserType] = useState("Reviewer")
    const {movieID} = useParams()
    const [producerData, setProducerData] = useState([])
    // const movieID = useParams().movieID
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setUserType(read_cookie("type"));
        movieService.findMovieById(movieID)
            .then(movie => {
                setProducerData([movie])
                return setMovie(movie)
            });
        movieService.findActorsByMovieId(movieID)
            .then(actors => setActors(actors));
        if (read_cookie("loginCookie") === true) {
            setLoggedIn(true)
        }
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
                                                <div key={index}
                                                     className='col-3 ml-2 btn genre-button'>
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
            {
                userType === "Producer" && <div>
                    <h1 style={{alignContent: "middle"}}>
                        Producers only section
                    </h1>
                    <Table columns={columns} dataSource={producerData} pagination={false}/>
                </div>
            }
            <div className="movie-features container-fluid mt-2 ml-3">
                <h3>Cast</h3>
            </div>
            <div className='row'>
                {
                    // eslint-disable-next-line array-callback-return
                    actors.cast && actors.cast.slice(0, 4).map((actor) => {
                        if (actor.original_name && actor.profile_path)
                            return (
                                <div key={actor.profile_path}>
                                    <div className="col-lg-3 col-md-4 col-sm-6 img-content">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>
                                    </div>
                                    <div key={actor.id} className="col-lg-3 col-md-4 col-sm-6">
                                        {actor.original_name}
                                    </div>
                                </div>
                            );
                    })
                }
            </div>
            {
                !isLoggedIn &&
                <div className="mt-5 mb-5">
                    <h3 style={{color: 'red'}}> Please Log In With Google to Watch Trailer </h3>
                </div>
            }
            {
                isLoggedIn &&
                <div className="mt-5 mb-5">
                    <Link to={`/trailer/${movieID}`}>
                        <h3 style={{color: 'red'}}> Trailer </h3>
                    </Link>
                </div>
            }

            <div className='container-fluid'>
                <h2> Reviews</h2>
                <ReviewList/>
            </div>
            {/*{JSON.stringify(videos)}*/}
            {/*{JSON.stringify(movie)}*/}
        </div>
    )
}

export default Details