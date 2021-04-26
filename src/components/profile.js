import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {read_cookie, bake_cookie} from "sfcookies";
import reviewService from '../services/review-service'
import userService from '../services/user-service'
import ReviewItem from "./review/review-item";
import followerService from "../services/follower-service";

const Profile = () => {

    const [user, setUser] = useState({
                                         firstName: read_cookie("firstName"),
                                         lastName: read_cookie("lastName"),
                                         userID: read_cookie("userID"),
                                         type: read_cookie("type")
                                     })
    const [fname, setFname] = useState(read_cookie("firstName"))
    const [lname, setLname] = useState(read_cookie("lastName"))
    const [type, setType] = useState(user.type)
    const [reviews, setReviews] = useState(({reviews: []}))
    const userID = read_cookie("userID")
    const [followers, setFollowers] = useState([])

    const updateValues = () => {
        setUser({firstName: fname, lastName: lname, type: user.type, userID: userID});
        userService.updateUser(user);
        bake_cookie("firstName", fname);
        bake_cookie("lastName", lname);
        bake_cookie("type", type);
    }
    const handleFnameChange = (e) => {
        setUser({firstName: e.target.value, lastName: lname, type: type, userID: userID});
        setFname(e.target.value);

    }
    const handleLnameChange = (e) => {
        setLname(e.target.value);
        setUser({firstName: fname, lastName: e.target.value, type: type, userID: userID})
    }
    const handleTypeChange = (e) => {
        if (user.type === "Reviewer" && e.target.value === "admin") {
            alert("Cannot change from reviewer to admin");
        } else {
            setUser({firstName: fname, lastName: lname, type: e.target.value, userID: userID});
            setType(e.target.value)
        }
    }

    useEffect(() => {
        const userID = read_cookie("userID")
        userService.findUserById(userID)
            .then(user => setUser(user))
        reviewService.findAllReviewsForUser(userID).then(
            response => {
                setReviews(response)
            })
        followerService.findAllFollowers(userID)
            .then(followers => setFollowers(followers))

    }, [])

    return (
        <div className="ml-5">
            <h1>My Profile</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        First Name </label>
                    <div className="col-sm-4">
                        <input className="form-control wbdv-field wbdv-fname"
                               onChange={(e) => handleFnameChange(e)}
                               id="fname"
                               value={fname}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-2 col-form-label">
                        Last Name </label>
                    <div className="col-sm-4">
                        <input className="form-control wbdv-field wbdv-lname"
                               onChange={(e) => handleLnameChange(e)}
                               id="username"
                               value={lname}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">
                        Email </label>
                    <div className="col-sm-4">
                        <input className="form-control wbdv-field email"
                               type="email"
                               id="email"
                               readonly
                               value={read_cookie("email")}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="type" className="col-sm-2 col-form-label">
                        Type </label>
                    <div className="col-sm-4">
                        <select className="custom-select" id="type" value={user.type}
                                onChange={(e) => handleTypeChange(e)}>

                            <option value="Producer">Producer</option>
                            <option value="Reviewer">Reviewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"/>
                    <div className="col-sm-4">
                        <input type="button" className="btn btn-success btn-block"
                               onClick={() => {
                                   updateValues()
                               }} value="Update"/>
                    </div>
                </div>
            </form>
            <br/>
            <div className="row">
                <div className="col-4">
                    <h2>Your Reviews</h2>
                    {reviews.reviews && (reviews.reviews.length > 0) && reviews.reviews.map(
                        (rev) => {
                            return (
                                <div key={rev._id}>
                                    <ReviewItem rev={rev} noicons={true}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-4">
                    <h2>You Commented...</h2>
                    {reviews.reviews && (reviews.reviews.length > 0) && reviews.reviews.map(
                        (rev) => {
                            if (rev.comment.length !== 0) {
                                return (
                                    <p>
                                        <i>"{rev.comment[0].comment}"</i> ~ on <b>{rev.title}</b>
                                    </p>
                                )
                            }
                        })
                    }

                </div>
                <div className="col-4">
                    <h2>You Follow</h2>
                    <ul className="list-group mr-5">
                        {
                            followers.map((fan, index) => {
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

export default Profile;
