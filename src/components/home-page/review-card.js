import {Link} from "react-router-dom";
import React from "react";

const ReviewCard = (review) => {
    return (

        <div className="card text-center">
            <div className="card-header">
                Review by
                <Link to={`/profile/${review.review.userID}`}>{" " + review.review.reviewer} </Link>
            </div>
            <div className="card-body">
                <h5 className="card-title">{review.review.title}</h5>
                <p className="card-text">{review.review.review}</p>
            </div>
            <div className="card-footer text-muted">
               {new Date(review.review.createdAt)
                    .toLocaleDateString(
                        'en-US', {
                            hour: 'numeric', minute: 'numeric', hour12: true
                        })}

            </div>
        </div>
    )
}
export default ReviewCard;