import {Navbar, Nav, FormControl, Form, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import React from "react";
import { GoogleLogin } from 'react-google-login';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';



const Header = () => {

    const cookie_key = 'loginCookie';
    const responseGoogleSuccess = (response) => {
        console.log(response);
        // Note: Since we're using Google login and not relying on the traditional logging system, we will not have the admin access in the normal way. 
        // So, for the regular user, we will have another column called type in the database. 
        // And, in the profile page, we will provide another button. => If the user requests admin access, then we can grant him the admin privileges.

        //const cookie_userType = 
        bake_cookie(cookie_key, true);

        // to do: Insert the user into the users table in database. 
      }
    
    const responseGoogleFailure = (response) => {
        console.log(response);
        delete_cookie(cookie_key);

        // To do: nothing. 
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home" className="pl-2 pt-2 h1">
                    Movie Reviewer App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/search">
                            Search
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <Link to="/profile">
                        <Button className="mr-2"
                                variant="outline-primary">
                            Profile
                        </Button>
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <GoogleLogin
    clientId="1039352677511-g79k2dj640dlsr9dehkgaa1j7ujmi4hi.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />

        </>

    )
}

export default Header;