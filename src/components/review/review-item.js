import React, {useState, useEffect} from 'react'
import {read_cookie} from "sfcookies";
import {Link, useParams} from "react-router-dom";
import userService from '../../services/user-service'
import { Form, Input, InputNumber, Button } from 'antd';
import commentService from "../../services/comment-service"
import { Divider } from 'antd';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!',
  };


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
    const [comment, setComment] = useState('')
    const [commentToggle, setCommentToggle] = useState(true)
    const [tempComment, setTempComment] = useState('')

    useEffect(() => {

                 rev.userID && userService.findUserById(rev.userID)
                     .then(user => {setUserFname(user.firstName); setUserLname(user.lastName)})

             }, [commentToggle, tempComment])
    
    const onFinish = (values) => {
        const commentObj = {
            reviewId: rev._id,
            comment: values.comment,
            userId: rev.userID,
            movieId: rev.movieId
        }
        console.log("inside the onfinish thing", values)
        commentService.createComment(commentObj).then( res => {
            setComment(values.comment)
        })
        console.log("here==>> tempComment", tempComment.length, values.comment)
        setTempComment(values.comment)
        console.log("tempComment.length=====>>", tempComment)
        setCommentToggle(false)
        
        
        // Invoke the comment service code that will send the comment to the backend. 
        // Save the comment in a state variable. 
        // Hide the form and display the comment. 
    };

    return (
        <>
            {
                !editing &&
                <div className="card shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                        {
                         ((loggedInUserName === rev.reviewerId && !noicons) || type == "admin") &&

                            <>
                            <i className="fas fa-edit float-right mt-1 ml-3" onClick={() => setEditing(true)}
                               />
                            <i onClick={() => deleteReview(rev)}
                            className="fas fa-trash float-right mt-1"/>
                            </>


                        }
                        <h5 className="card-title">{rev.title}</h5>
                        <p className="card-text">{rev.review}</p>
                        <Divider />
                        {
                        
                        rev.comment.length === 0 && commentToggle &&
                        <>
                        
                            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                                <Form.Item name='comment' label="comment" rules={[{ required: true }]}>
                                    <Input.TextArea />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                    Comment
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                        }
                        {
                            rev.comment.length !== 0 &&
                            <>
                                <h4>Comment</h4>
                                <p>
                                 {tempComment.length == 0? rev.comment[0].comment: tempComment}
                                </p>
                            </>
                        }
                        {
                            tempComment.length !== 0 &&
                            <>
                                <h4>Comment</h4>
                                <p>
                                 {tempComment}
                                </p>
                            </>
                        }
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