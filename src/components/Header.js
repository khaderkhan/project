import {Navbar, Nav, FormControl, Form, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import LogIn from "./google-login"
import {read_cookie, delete_cookie} from "sfcookies";



const Header = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const loggedIn = read_cookie("loginCookie")
        if (loggedIn === true) {
            setLoggedIn(loggedIn)
        }
    },[isLoggedIn])
    const deleteCookies = () => {
        delete_cookie("firstName")
        delete_cookie("lastName")
        delete_cookie("email")
        delete_cookie("loginCookie")
        setLoggedIn(false)

    }



    return (
        <>
            <Navbar expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/" >
                    <h3 >Movie Reviewer App</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/search">
                            Search
                        </Nav.Link>
                    </Nav>
                    {
                        !isLoggedIn &&
                        <LogIn/>
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
                                    variant="outline-primary" onClick = {deleteCookies}>
                                Sign Out
                            </Button>
                        </Form>
                    }
                </Navbar.Collapse>
            </Navbar>
        </>

    )
}

export default Header;