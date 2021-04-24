import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {read_cookie, bake_cookie} from "sfcookies";
import reviewService from '../services/review-service'
import userService from '../services/user-service'
import ReviewItem from "./review/review-item";

const Profile = () => {

    const [user, setUser] = useState({firstName: read_cookie("firstName"), lastName: read_cookie("lastName"),
                                        userID: read_cookie("userID")})
    const [fname, setFname] = useState(read_cookie("firstName"))
    const [lname, setLname] = useState(read_cookie("lastName"))
    const [type, setType] = useState(user.type)
    const [origType, setOrigType] = useState(user.type)
    const [reviews, setReviews] = useState(({ reviews: [] }))
    const userID = read_cookie("userID")

    const handleInvalidChange = () => {

        if (origType == "Reviewer" && user.type == "admin") {
            alert("Cannot change from reviewer to admin");
        }
        else {

            !(origType == "Reviewer" && user.type == "admin") &&
            setUser({firstName: fname, lastName: lname, type: user.type, userID: userID});
            userService.updateUser(user);
            bake_cookie("firstName", fname);
            bake_cookie("lastName", lname);
            bake_cookie("type", type);
            setOrigType(user.type);

            console.log("updated user", user, type)
            }
            console.log("orig", origType)
            console.log("type", user.type)
            console.log("type2", type)
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

                 setUser({firstName: fname, lastName: lname, type: e.target.value, userID: userID});
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
            <h1>My Profile</h1>
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
                            <select class="custom-select" id="type" value={origType} onChange={(e) => handleTypeChange(e)}>

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
                        onClick={() => {handleInvalidChange()}} value="Update" />
                        </div>
                    </div>
                </form>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Your Reviews</h2>
                            {reviews.reviews && (reviews.reviews.length > 0) && reviews.reviews.map((rev) => {
                                   return (
                                       <div key={rev._id}>
                                       <ReviewItem rev={rev} noicons={true}/>
                                       </div>
                                   )
                               })
                           }
                        </div>
                        <div class="col-4">
                            <h2>Your Comments</h2>

                        </div>
                    </div>
        </div>
    )
}

export default Profile;

//"607a6ad05af58d4cdc14ec94", userID: "607a490b69b67747257d38c1", title: "Review Eshwari 23334", …}
//1: {createdAt: "2021-04-17T05:00:12.532Z", comment: Array(0), _id: "607a6b73077bc64cf5866739", userID: "607a490b69b67747257d38c1", title: "asdfasdf", …}
//2: {createdAt: "2021-04-17T05:00:12.532Z", comment: Array(0), _id: "607a6b81077bc64cf586673a", userID: "607a490b69b67747257d38c1", title: "asdfasdf", …}
//3: {createdAt: "2021-04-17T06:29:11.223Z", comment: Array(0), _id: "607a8070748ff5521ba28698", userID: "607a490b69b67747257d38c1", title: "eshwari review asdfasd", …}
//4: {createdAt: "2021-04-17T19:34:59.120Z", comment: Array(0), _id: "607b3b4a38fa145e56934e3d"