
const MOVIE_URL = "https://api.themoviedb.org/3"
const API_KEY = "api_key=eea1a7fc0d5c72b36736e248dc5e2693&language=en-US"

export const findMovieByTitle = (title) =>
    fetch(`${MOVIE_URL}/search/movie?${API_KEY}&query=${title}&include_adult=false`)
        .then(response => response.json())

export const findMovieById = (imdbID) =>
    fetch(`${MOVIE_URL}/movie/${imdbID}?${API_KEY}`)
        .then(response => response.json())

export const findActorsByMovieId = (movieId) =>
    fetch(`${MOVIE_URL}/movie/${movieId}/credits?${API_KEY}`)
        .then(response => response.json())

export default {
    findMovieByTitle,
    findMovieById,
    findActorsByMovieId
}

