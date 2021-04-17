import {GoogleLogin} from 'react-google-login';
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import userService from '../services/user-service'
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {Button, Form, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const LogIn = (
    {
        users = [],
        createUser,
        findUserByEmail,

    }
) => {
    const cookie_key = 'loginCookie';
    const [newUser, setNewUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false);
    const responseGoogleSuccess = async (response) => {
        console.log('responseGoogleSuccess')
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
        console.log("from responseGoogleSucces new user is:", newUser)
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
        console.log("here======>>>")
        const userId = await userService.createUser(newUser);
        console.log("userrrrr====>>>>", user)
        console.log("userId in google login", userId)
        bake_cookie("userID", userId);
        // setLoggedIn(true)
        // to do: Insert the user into the users table in database.
    }
    const responseGoogleFailure = (response) => {
        delete_cookie(cookie_key);
    }

    useEffect(() => {

        const loggedIn = read_cookie("loginCookie")
        if (loggedIn === true) {
            setLoggedIn(loggedIn)
        }
        console.log("loggedIn is:", isLoggedIn)

    }, [isLoggedIn])


    const deleteCookies = () => {
        console.log("deleteCookies has been called")
        delete_cookie("firstName")
        delete_cookie("lastName")
        delete_cookie("email")
        delete_cookie("loginCookie")
        // setLoggedIn(false)

    }
    return (
        <div>
            {
                !isLoggedIn &&
                <GoogleLogin
                    clientId="1039352677511-g79k2dj640dlsr9dehkgaa1j7ujmi4hi.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                />
            }
            {
                isLoggedIn &&
                <Form inline>
                    <Link to="/profile">
                        <Button className="mr-2 ml-2"
                                variant="outline-primary">
                            Profile
                        </Button>
                    </Link>
                    <Button className="mr-2 ml-2"
                            variant="outline-primary" onClick={deleteCookies}>
                        Sign Out
                    </Button>
                </Form>
            }
        </div>
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