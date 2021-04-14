import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {connect} from 'react-redux'
import reviewService from '../../services/review-service'
import ReviewItem from "./review-item";
import movieService from "../../services/movies-service"



const ReviewList = (
    {
        reviews = [
            {
                title: "title",
                review: "reviewBody",
                movieId: "movieID",
                movieName: "movie.original_title",
                reviewer: 'place holder',
                reviewerId: 'place holder'
            }
        ],
        createReview,
        review,
        deleteReview,
        updateReview,
        findAllReviewsForMovie,

    }
) => {
    const { movieID, userID} = useParams()
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [movie, setMovie] = useState({})

    useEffect(()=>{
        movieService.findMovieById(movieID).then(m => setMovie(m))
        findAllReviewsForMovie(movieID)
    },[movieID])


    return(

        <div >
            <div className="row">
                <div className="col-md-4" >
                    <h4>Post a review</h4>
                <label htmlFor="reviewTitle">Title</label>
                <input className="form-control"
                id="reviewTitle"
                placeholder="Review Title here..."
                onChange={(event)=> setTitle(event.target.value)}/>
                <label htmlFor="reviewBody">Review</label>
                <textarea className="form-control"
                          placeholder="Your review here"
                          id="reviewBody"
                          onChange={(event)=> setReviewBody(event.target.value)}/>
                          <button onClick={() => {
                              createReview(movieID, {
                                  title: title,
                                  review: reviewBody,
                                  movieId: movieID,
                                  movieName: movie.original_title,
                                  reviewer: 'place holder',
                                  reviewerId: 'place holder'
                              })
                          }}
                          className="btn btn-primary btn-block">
                              Post
                          </button>
            </div>
            </div>
            <div className="card-columns">
                {
                     reviews.map((rev) => {
                        return (
                            <div className="card shadow p-3 mb-5 bg-white rounded">
                                    <div className="card-body">
                                        <i className="fas fa-edit float-right mt-1 ml-3"/>
                                        <i onClick={() => deleteReview(rev)} className="fas fa-trash float-right mt-1"/>
                                        <h5 className="card-title">{rev.title}</h5>
                                        <p className="card-text">{rev.review}</p>
                                    </div>
                                    <div className="card-footer">
                                        <small className="text-muted">{new Date(rev.createdAt)
                                            .toLocaleDateString(
                                            'en-US', {
                                                hour: 'numeric', minute: 'numeric', hour12: true
                                            })}
                                        </small>
                                    </div>
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
            console.log("reviewId is:", rev._id)
            reviewService.deleteReview(rev._id)
                .then(status => dispatch({
                    type:"DELETE_REVIEW",
                    reviewToDelete: rev
                                         }))
        }
    }
)
export default connect(stpm, dtpm)(ReviewList)