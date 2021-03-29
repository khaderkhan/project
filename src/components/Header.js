import {Navbar, Nav, FormControl, Form, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import React from "react";
import { GoogleLogin } from 'react-google-login';


const Header = () => {

    const responseGoogleSuccess = (response) => {
        console.log(response);
      }
    
    const responseGoogleFailure = (response) => {
        console.log(response);
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
                        <Link to="/login">
                        <Button className="mr-2"
                                variant="outline-primary">
                            Log In
                        </Button>
                        </Link>
                        <Link to="/register">
                        <Button variant="outline-primary">
                            Register
                        </Button>
                        </Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            Hello world
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