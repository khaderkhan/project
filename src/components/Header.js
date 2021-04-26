import {Navbar, Nav, FormControl, Form, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import LogIn from "./google-login"


const Header = () => {

    return (
        <>
            <Navbar expand="lg" bg="light" variant="light">
                <Navbar.Brand href="/">
                    <h2>Movie Reviewer App</h2>
                </Navbar.Brand>
                {/*<Navbar.Toggle aria-controls="responsive-navbar-nav"/>*/}
                <Navbar id="responsive-navbar-nav">
                    <Nav className="mr-auto float-left">
                        <Nav.Link href="/search">
                            Search
                        </Nav.Link>
                    </Nav>
                    <Nav.Item >
                        <LogIn/>
                    </Nav.Item>

                </Navbar>
            </Navbar>

        </>
    )
}

export default Header;