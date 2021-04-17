import React, {useState, useEffect} from 'react'
import {read_cookie} from "sfcookies";
import {Link, useParams} from "react-router-dom";
import userService from '../../services/user-service'

const ReviewItem = (
    {
        rev,
        noicons,
        deleteReview,
        updateReview
    }) => {
    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(rev)


    const loggedInUserName = read_cookie("email")
    const loggedInFirstName = read_cookie("firstName")
    console.log("username is:", loggedInUserName)
    const [userFname, setUserFname] = useState('')
    const [userLname, setUserLname] = useState('')

    useEffect(() => {

                 rev.userID && userService.findUserById(rev.userID)
                     .then(user => {setUserFname(user.firstName); setUserLname(user.lastName)})

             }, [])

    return (
        <>
            {
                !editing &&
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        {
                        loggedInUserName === rev.reviewerId && !noicons &&

                            <>
                            <i className="fas fa-edit float-right mt-1 ml-3" onClick={() => setEditing(true)}
                               />
                            <i onClick={() => deleteReview(rev)}
                            className="fas fa-trash float-right mt-1"/>
                            </>


                        }
                        <h5 className="card-title">{rev.title}</h5>
                        <p className="card-text">{rev.review}</p>
                    </div>
                    <div className="card-footer">
                         <small className="text-muted">
                         <Link to={`/details/${rev.movieId}`}>
                         {rev.movieName}
                          </Link>

                         </small>
                         <br/>
                        <small className="text-muted">{new Date(rev.createdAt)
                            .toLocaleDateString(
                                'en-US', {
                                    hour: 'numeric', minute: 'numeric', hour12: true
                                })}
                        </small>


                        {!rev.userID &&
                                                <small className="text-muted float-right"> {`By | `}
                                                <Link to={`/profile`}>
                                                {rev.reviewer}
                                                 </Link>
                                                 </small>
                                                 }

                        {rev.userID && loggedInUserName === rev.reviewerId &&
                        !noicons &&
                        <small className="text-muted float-right">
                        {`By | `}
                        <Link to={`/profile`}>
                        {userFname} {userLname}
                         </Link>

                         </small>
                         }



                         {rev.userID && loggedInUserName !== rev.reviewerId &&
                         !noicons &&
                         <small className="text-muted float-right">

                         {`By | `}
                         <Link
                          to={`/profile/${rev.userID}`}>

                        {userFname} {userLname}
                          </Link>
                          </small>
                          }







                    </div>
                </div>
            }
            {
                editing && loggedInUserName === rev.reviewerId &&
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