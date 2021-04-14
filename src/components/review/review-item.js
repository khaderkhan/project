import React from 'react'

const ReviewItem = (
    {
        review
    }) => {

    return(
        <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
                <h4>{review.title}</h4>
                <p>{review.createdAt} | By {review.reviewer.firstName}</p>
                <h6>{review.review}</h6>
            </div>
        </div>
    )
}
export default ReviewItem;