export const findMovieByTitle = (title) =>
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=eea1a7fc0d5c72b36736e248dc5e2693&language=en-US&query=${title}&include_adult=false`)
        .then(response => response.json())

export const findMovieById = (imdbID) =>
    fetch(`https://api.themoviedb.org/3/movie/${imdbID}?api_key=eea1a7fc0d5c72b36736e248dc5e2693&language=en-US`)
        .then(response => response.json())

export const findActorsByMovieId = (movieId) =>
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=eea1a7fc0d5c72b36736e248dc5e2693&language=en-US`)
        .then(response => response.json())

export default {
    findMovieByTitle,
    findMovieById,
    findActorsByMovieId
}

