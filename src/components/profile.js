import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {read_cookie, bake_cookie} from "sfcookies";
//import reviewService from '../services/review-service'
import userService from '../services/user-service'

const Profile = () => {

    const [user, setUser] = useState(null)
    const [fname, setFname] = useState(read_cookie("firstName"))
    const [lname, setLname] = useState(read_cookie("lastName"))

     const handleFnameChange = (e) => {
        setFname(e.target.value)
    }

     const handleLnameChange = (e) => {
             setLname(e.target.value)}

     useEffect(() => {
            console.log("in useEffect")
            const userID = read_cookie("userID")
            console.log("userID", userID)
             userService.findUserById(userID)
                 .then(user => setUser(user))
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
                                   value={'HI'}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="username" class="col-sm-2 col-form-label">
                            Last Name </label>
                        <div class="col-sm-4">
                            <input class="form-control wbdv-field wbdv-lname"
                                   onChange={(e) => handleLnameChange(e)}
                                   id="username"
                                   value={'ASDF'}/>
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
                        <label for="role" class="col-sm-2 col-form-label">
                            Role </label>
                        <div class="col-sm-4">
                            <select class="custom-select" id="role">
                                <option value="Producer">Producer</option>
                                <option value="Reviewer">Reviewer</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"></label>
                        <div class="col-sm-6">
                        <input type="button" class="btn btn-success btn-block" onClick={() => ''} value="Update" />
                        </div>
                    </div>
                </form>
                <br/>
                <div class="row">
                        <div class="col-4">
                            <h2>Your Last Review</h2>
                            <p><i>Last review here</i></p>
                        </div>
                    </div>
        </div>
    )
}

export default Profile;

// add to the on click by actually updating the role, db
//                         then need to fetch reviews
//                         then need static profile page