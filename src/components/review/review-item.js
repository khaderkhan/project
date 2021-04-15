import React, {useState} from 'react'
import {read_cookie} from "sfcookies";

const ReviewItem = (
    {
        rev,
        deleteReview,
        updateReview
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(rev)

    return (
        <>
            {
                !editing &&
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <i onClick={() => setEditing(true)}
                               className="fas fa-edit float-right mt-1 ml-3"/>
                            <i onClick={() => deleteReview(rev)}
                               className="fas fa-trash float-right mt-1"/>
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
            }
            {
                editing &&
                <>
                    <label htmlFor="reviewTitle">Title</label>
                    <input className="form-control"
                           id="reviewTitle"
                           onChange={(e) =>
                               setCachedItem({
                                                 ...cachedItem,
                                                 title: e.target.value
                                             })}
                           value={cachedItem.title}/>
                    <label htmlFor="reviewBody">Review</label>
                    <textarea className="form-control"
                              id="reviewBody"
                              onChange={(e) =>
                                  setCachedItem({
                                                    ...cachedItem,
                                                    review: e.target.value
                                                })}
                              value={cachedItem.review}/>
                    <button onClick={() => {
                        setEditing(false)
                        updateReview(cachedItem)
                    }}
                            className="btn btn-primary btn-block">
                        Update
                    </button>
                </>
            }
        </>
    )
}
export default ReviewItem;