import MovieSlideItem from "./movie-slide-item";
import { Carousel } from 'react-responsive-carousel';
import {useEffect, useState} from "react";
import movieService from "../../services/movies-service";
import "react-responsive-carousel/lib/styles/carousel.min.css";
 const MovieSlide = () => {

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        movieService.findPopularMovies()
            .then(movies => setPopularMovies(movies))
    },[])

    const renderMovieCarouselItems = (movies) => {
        let moviesToRender = null;

        if (movies.length !== 0) {

            let movieArray = [];
            let posterArray = [];
            let movieArrayX;
            let posterArrayX;
            let movie2DArray = [];
            let poster2DArray = [];

            movies.results.map((movie, index) => {
                let poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                movieArray.push(movie);
                posterArray.push(poster);
            });
            movieArrayX = movieArray.splice(0, Math.floor(movieArray.length / 3) * 3);
            posterArrayX = posterArray.splice(0, Math.floor(posterArray.length / 3) * 3);

            let movieArrayChunk, posterArrayChunk;

            while (movieArrayX.length > 0) {
                movieArrayChunk = movieArrayX.splice(0, 3);
                posterArrayChunk = posterArrayX.splice(0, 3);

                movie2DArray.push(movieArrayChunk);
                poster2DArray.push(posterArrayChunk);
            }
            moviesToRender = movie2DArray.map((moviesChunk, index) => {
                    return <MovieSlideItem
                        key={index}
                        movies={moviesChunk}
                        images={poster2DArray[index]}/>
                })
        }
        return moviesToRender;
    }
    return(
        <div>
            <h3 className="ml-2">Popular Movies</h3>
            <Carousel className="ml-2 mr-2"
                      showArrows={true} showStatus={false}
                      autoPlay={true} useKeyboardArrows={true}
                      dynamicHeight={true} infiniteLoop={true}
                      showThumbs={false}>
                {renderMovieCarouselItems(popularMovies)}
            </Carousel>
        </div>
    )
}
export default MovieSlide;