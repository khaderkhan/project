import React, {useState, useEffect} from "react";
import reviewService from '../services/review-service'
import userService from '../services/user-service'
import {Link, useParams} from "react-router-dom";
import ReviewItem from "./review/review-item";

const StaticProfile = () => {
     const [user, setUser] = useState({firstName: "none", lastName: "none", type:"none"})
    const [reviews, setReviews] = useState(({ reviews: [] }))
    const {userID} = useParams()
    useEffect(() => {
                        console.log("in useEffect")


                         userService.findUserById(userID)
                             .then(user => setUser(user))
                         reviewService.findAllReviewsForUser(userID).then(
                         response => {console.log('fr', response); setReviews(response)})

                     }, [])
    return(

        <div class="container">
            <h1>{user.firstName} {user.lastName}'s Profile</h1>
            <br/>

                <br/>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Reviews by {user.firstName}</h2>
                            {reviews.reviews.map((rev) => {
                                   return (
                                       <div key={rev._id}>
                                       <ReviewItem rev={rev} noicons={true}/>
                                       </div>
                                   )
                               })
                           }
                        </div>
                </div>
        </div>
    )
}

export default StaticProfile;