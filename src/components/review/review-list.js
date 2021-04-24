import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {connect} from 'react-redux'
import reviewService from '../../services/review-service'
import ReviewItem from "./review-item";
import movieService from "../../services/movies-service"
import {read_cookie} from 'sfcookies';

const ReviewList = (
    {
        reviews = [],
        createReview,
        review,
        deleteReview,
        updateReview,
        findAllReviewsForMovie,

    }
) => {



    const {movieID, userID} = useParams()
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [movie, setMovie] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false);


    useEffect(() => {

        const loggedIn = read_cookie("loginCookie")
        if (loggedIn === true) {
            setLoggedIn(loggedIn)
        }
        console.log("isLogIn is:", loggedIn)
        movieService.findMovieById(movieID).then(m => setMovie(m))
        findAllReviewsForMovie(movieID)
        console.log('revs', reviews)
    }, [movieID, isLoggedIn])

    return (

        <div>
            {
                isLoggedIn &&

                        <div className="row">
                            <div className="col-md-4">
                                <h4>Post a review</h4>
                                <label htmlFor="reviewTitle">Title</label>
                                <input className="form-control"
                                       id="reviewTitle"
                                       placeholder="Review Title here..."
                                       onChange={(event) => setTitle(event.target.value)}/>
                                <label htmlFor="reviewBody">Review</label>
                                <textarea className="form-control"
                                          placeholder="Your review here"
                                          id="reviewBody"
                                          onChange={(event) => setReviewBody(event.target.value)}/>
                                <button onClick={() => {
                                    const firstName = read_cookie("firstName")
                                    const lastName = read_cookie("lastName")
                                    const email = read_cookie("email")
                                    createReview(movieID, {
                                        userID: read_cookie("userID"),
                                        title: title,
                                        review: reviewBody,
                                        movieId: movieID,
                                        movieName: movie.original_title,
                                        reviewer: `${firstName} ${lastName}`,
                                        reviewerId: email
                                    })
                                }}
                                        className="btn btn-primary btn-block">
                                    Post
                                </button>
                            </div>
                        </div>
            }
            <div className="card-columns">
                {
                    reviews.map((rev) => {
                        return (
                            <div key={rev._id}>
                            <ReviewItem rev={rev} deleteReview={deleteReview} updateReview={updateReview}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

const stpm = (state) => {
    return {
        reviews: state.reviewReducer.reviews
    }
}

const dtpm = (dispatch) => ({

        createReview: (movieId, review) => {
            reviewService.createReview(movieId, review)
                .then(review => dispatch({
                                             type: 'CREATE_REVIEW',
                                             review: review
                                         }))
        },
        findAllReviewsForMovie: (movieId) => {
            reviewService.findAllReviewsForMovie(movieId)
                .then(theReviews => dispatch({
                                                 type: "FIND_ALL_REVIEWS_FOR_MOVIE",
                                                 reviews: theReviews
                                             }))
        },
        deleteReview: (rev) => {
            reviewService.deleteReview(rev._id)
                .then(status => dispatch({
                                             type: "DELETE_REVIEW",
                                             reviewToDelete: rev
                                         }))
        },
        updateReview: (rev) => {
            reviewService.updateReview(rev._id, rev)
                .then(status => dispatch({
                    type:"UPDATE_REVIEW",
                    review:rev
                                         }))
        }
    }
)
export default connect(stpm, dtpm)(ReviewList)