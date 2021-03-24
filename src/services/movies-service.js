export const findMovieByTitle = (title) =>
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=eea1a7fc0d5c72b36736e248dc5e2693&language=en-US&query=avengers&include_adult=false`)
        .then(response => response.json())

export const findMovieById = (imdbID) =>
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=4a249f8d`)
        .then(response => response.json())

export default {
    findMovieByTitle,
    findMovieById
}

