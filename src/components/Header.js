import {Navbar, Nav, FormControl, Form, Button, NavDropdown, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import React from "react";
const Header = () => {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home" className="pl-2 pt-2 h1">The MovieBook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/search">Search</Nav.Link>
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


        </>

    )
}

export default Header;