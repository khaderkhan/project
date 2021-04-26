import {useGoogleLogin} from "react-google-login";

// const BASE_URL = "http://localhost:4000/api"

const BASE_URL ="https://movie-reviewer-node-server.herokuapp.com/api"



const createReview = (movieId, review) =>
    fetch(`${BASE_URL}/reviews`,{
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

const findAllReviewsForMovie = (movieId) =>
    fetch(`${BASE_URL}/reviews/${movieId}`)
        .then(res => res.json())

const deleteReview = (reviewId) =>
    fetch(`${BASE_URL}/reviews/${reviewId}`,{
        method: 'DELETE'
    })
        .then(res => res.json())
const updateReview = (reviewId, review) =>
    fetch(`${BASE_URL}/reviews`,{
        method: 'PUT',
        body: JSON.stringify(review),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())

const findAllReviewsForUser = (userId) =>
    fetch(`${BASE_URL}/reviews/user/${userId}`)
        .then(res => res.json())

const findAllRecentReviews = () =>
    fetch(`${BASE_URL}/reviews`)
        .then(res => res.json())




export default {
    createReview, findAllReviewsForMovie,
    deleteReview, updateReview, findAllReviewsForUser, findAllRecentReviews
}