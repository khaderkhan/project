import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import MovieSlide from "./movie-slide";
import userService from "../../services/user-service";
import reviewService from "../../services/review-service";
import ReviewItem from "../review/review-item";
import ReviewCard from "./review-card";
import {read_cookie} from "sfcookies";

const Home = () => {

    const [recentReviews, setRecentReviews] = useState([])
    const [reviewsByUser, setReviewsByUser] = useState(({reviewsByUser: []}))
    const [isLoggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const userID = read_cookie("userID")
        reviewService.findAllRecentReviews()
            .then(reviews => setRecentReviews(reviews));
        reviewService.findAllReviewsForUser(userID).then(
        response => {
            setReviewsByUser(response)
        })
        if (read_cookie("loginCookie") === true) {
            setLoggedIn(true)
        }
    }, []);

    return (
        <div>
            <MovieSlide/>
            {
                !isLoggedIn &&

                <div className="row">
                    <div className="col-6 mt-5 ml-2 mb-1 mr-3">
                        <h3>Most Recent Reviews by Reviewers</h3>
                        {
                            recentReviews.map((rev) => {
                                return (
                                    <div key={rev._id} className="mb-1">
                                        <ReviewCard review={rev}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            }

            {
                isLoggedIn &&

                <div className="row">
                    <div className="col-6 mt-5 ml-2 mb-1 mr-3">
                        <h3>Your Most Recent Reviews</h3>
                        {
                            reviewsByUser.reviews && reviewsByUser.reviews.map((rev) => {
                                return (
                                    <div key={rev._id} className="mb-1">
                                        <ReviewCard review={rev}/>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            }
        </div>

    )
}

export default Home