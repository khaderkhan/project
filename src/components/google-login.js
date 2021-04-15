import {GoogleLogin} from 'react-google-login';
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import userService from '../services/user-service'
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'

const LogIn = (
    {
        users = [],
        createUser,
        findUserByEmail
    }
) => {
    const cookie_key = 'loginCookie';
    const [newUser, setNewUser] = useState({})
    const responseGoogleSuccess = (response) => {

        console.log("response google login", response);
        console.log("response type", response.type)
        const firstName = response.profileObj.givenName
        const lastName = response.profileObj.familyName
        const email = response.profileObj.email
        const newUser = {
            firstName,
            lastName,
            // email,
            userName: email,
            type: 'admin'
        }
        setNewUser(newUser)

        // userService.createUser(newUser)

        // Note: Since we're using Google login and not relying on the traditional logging system,
        // we will not have the admin access in the normal way. So, for the regular user, we will
        // have another column called type in the database. And, in the profile page, we will
        // provide another button. => If the user requests admin access, then we can grant him the
        // admin privileges.

        //const cookie_userType =
        bake_cookie("firstName", firstName);
        bake_cookie("lastName", lastName);
        bake_cookie("email", email);
        bake_cookie(cookie_key, true);

        // to do: Insert the user into the users table in database.
    }
    const responseGoogleFailure = (response) => {
        console.log(response);
        delete_cookie(cookie_key);

    }

    useEffect(() => {

        if (!findUserByEmail(newUser.email)) {
            createUser(newUser);
        }
    })
    return (
        <GoogleLogin
            clientId="1039352677511-g79k2dj640dlsr9dehkgaa1j7ujmi4hi.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
        />
    )
}

const stpm = (state) => {
    return {
        users: state.userReducer.users
    }
}

const dtpm = (dispatch) => ({
        createUser: (user) => {
            userService.createUser(user)
                .then(theUser => dispatch({
                                              type: "CREATE_USER",
                                              user: theUser
                                          }))
        },
    findUserByEmail: (email) => {
            userService.findUserByEmail(email)
                .then(theUser => dispatch({
                                              type: "FIND_USER_BY_EMAIL",
                                              user: theUser
                                          }))
        },


})


export default connect(stpm, dtpm)(LogIn)