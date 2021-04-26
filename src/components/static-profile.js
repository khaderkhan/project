import React, {useState, useEffect} from "react";
import reviewService from '../services/review-service'
import userService from '../services/user-service'
import followerService from '../services/follower-service'
import {Link, useParams} from "react-router-dom";
import ReviewItem from "./review/review-item";
import {read_cookie} from "sfcookies";

const StaticProfile = () => {

    const [user, setUser] = useState({firstName: "none", lastName: "none", type: "none"})
    const [reviews, setReviews] = useState(({reviews: []}))
    const {userID} = useParams()

    const loggedInUserId = read_cookie("userID")
    const [loggedInUser, setLoggedInUser] = useState(
        {firstName: "none", lastName: "none", type: "none"})
    const [followedFans, setFollowedFans] = useState([])
    const [follow, setFollow] = useState([])

    useEffect(() => {
        userService.findUserById(userID)
            .then(user => setUser(user))
        reviewService.findAllReviewsForUser(userID).then(
            response => {
                setReviews(response)
            })

        userService.findUserById(loggedInUserId)
            .then(user => setLoggedInUser(user))

        // Here we need to page's userID not the loggedInUserId
        followerService.findAllFollowers(userID)
            .then(followedFans => setFollowedFans(followedFans))

        followerService.findAllFollowers(loggedInUserId)
            .then(follow => setFollow(follow))

    }, [])

    const addFollower = () => {
        followerService.followFan(userID, loggedInUser)
            .then(response => console.log('response of create fan is:', response))
    }

    const unFollow = () => {
        followerService.unFollow(userID, loggedInUser)
            .then(res => console.log(res))
    }

    const isAlreadyFollowed = (fanId) => {
        const returnValue = follow.find(fan => fan._id === fanId)
        console.log('returnValue is::::', returnValue !== undefined)
        return returnValue !== undefined;

    }
    return (

        <div className="ml-5">

            <h1 className="float-left">{user.firstName} {user.lastName}'s Profile</h1>
            {
                isAlreadyFollowed(userID) &&
                <button className="btn btn-danger mr-2 ml-2 mb-2 mt-2 float-right"
                        onClick={unFollow}>
                    Unfollow {user.firstName} -
                </button>
            }
            {
                !isAlreadyFollowed(userID) &&
                <button className="btn btn-primary mr-2 ml-2 mb-2 mt-2 float-right"
                        onClick={addFollower}>
                    Follow {user.firstName} +
                </button>
            }
            <br/>

            <br/>
            <br/>
            <div className="row">
                <div className="col-6 ant-card-contain-tabs">
                    <h2>Reviews by {user.firstName}</h2>
                    {
                        reviews.reviews.map((rev) => {
                            return (
                                <div key={rev._id}>
                                    <ReviewItem rev={rev} noicons={true}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-6">
                    <h2>{user.firstName} Follows</h2>
                    <ul className="list-group">
                        {
                            followedFans.map((fan, index) => {
                                return (
                                    <li className="list-group-item" key={index}>
                                        <Link to={`/profile/${fan._id}`}>
                                            {fan.firstName} {fan.lastName}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default StaticProfile;