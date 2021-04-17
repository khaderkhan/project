import {useGoogleLogin} from "react-google-login";

const BASE_URL = "http://localhost:4000/api/reviews"



const createReview = (movieId, review) =>
    fetch(`${BASE_URL}`,{
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => res.json());

const findAllReviewsForMovie = (movieId) =>
    fetch(`${BASE_URL}/${movieId}`)
        .then(res => res.json())

const deleteReview = (reviewId) =>
    fetch(`${BASE_URL}/${reviewId}`,{
        method: 'DELETE'
    })
        .then(res => res.json())
const updateReview = (reviewId, review) =>
    fetch(`${BASE_URL}`,{
        method: 'PUT',
        body: JSON.stringify(review),
        headers:{
            'content-type': 'application/json'
        }
    })
        .then(res => res.json())

const findAllReviewsForUser = (userId) =>
    fetch(`${BASE_URL}/${userId}`)
        .then(res => res.json())


export default {
    createReview, findAllReviewsForMovie,
    deleteReview, updateReview, findAllReviewsForUser
}