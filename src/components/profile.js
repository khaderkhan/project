import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {read_cookie, bake_cookie} from "sfcookies";
import reviewService from '../services/review-service'
import userService from '../services/user-service'
import ReviewItem from "./review/review-item";

const Profile = () => {

    const [user, setUser] = useState({firstName: read_cookie("firstName"), lastName: read_cookie("lastName"), type:"Reviewer"})
    const [fname, setFname] = useState(read_cookie("firstName"))
    const [lname, setLname] = useState(read_cookie("lastName"))
    const [type, setType] = useState("Reviewer")
    const [reviews, setReviews] = useState(({ reviews: [] }))
    const userID = read_cookie("userID")

     const handleFnameChange = (e) => {
        setUser({firstName: e.target.value, lastName: lname, type: type});
        setFname(e.target.value);

         }


     const handleLnameChange = (e) => {
             setLname(e.target.value);
              setUser({firstName: fname, lastName: e.target.value, type: type})
             }

    const handleTypeChange = (e) => {

                 setUser({firstName: fname, lastName: lname, type: e.target.value});
                 setType(e.target.value)
                 }

     useEffect(() => {
            console.log("in useEffect")
            const userID = read_cookie("userID")
            console.log("userID", userID)
             userService.findUserById(userID)
                 .then(user => setUser(user))
             reviewService.findAllReviewsForUser(userID).then(
             response => {console.log('fr', response); setReviews(response)})

         }, [])


    return(
        <div class="container">
            <h1>Profile</h1>
                <form>
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">
                            First Name </label>
                        <div class="col-sm-4">
                            <input class="form-control wbdv-field wbdv-fname"
                                   onChange={(e) => handleFnameChange(e)}
                                   id="fname"
                                   value={fname}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">
                            Last Name </label>
                        <div class="col-sm-4">
                            <input class="form-control wbdv-field wbdv-lname"
                                   onChange={(e) => handleLnameChange(e)}
                                   id="username"
                                   value={lname}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-2 col-form-label">
                            Email </label>
                        <div class="col-sm-4">
                            <input class="form-control wbdv-field email"
                                   type="email"
                                   id="email"
                                   readonly
                                   value={read_cookie("email")}/>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label for="type" class="col-sm-2 col-form-label">
                            Type </label>
                        <div class="col-sm-4">
                            <select class="custom-select" id="type" value={type} onChange={(e) => handleTypeChange(e)}>

                                <option value="Producer">Producer</option>
                                <option value="Reviewer">Reviewer</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-6">
                        <input type="button" class="btn btn-success btn-block"
                        onClick={() => {
                         setUser({firstName: fname, lastName: lname, type: user.type});
                        userService.updateUser(userID, user);
                        bake_cookie("type", type);

                        console.log("updated user", user, type)}} value="Update" />
                        </div>
                    </div>
                </form>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Your Reviews</h2>
                            {(reviews.reviews.length > 0) && reviews.reviews.map((rev) => {
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

export default Profile;

// add to the on click by actually updating the role, db
//                         then need to fetch reviews
//                         then need static profile page