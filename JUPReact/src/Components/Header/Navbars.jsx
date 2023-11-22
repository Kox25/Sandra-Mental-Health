import React, { Component } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./sandralogo.png";
import "./Navbar.css";
import { Search } from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";

import { useNavigate } from "react-router-dom";
function Navbars() {
    const navigate = useNavigate();

    function Logout() {
        localStorage.clear();
        navigate("/login");
    }

    let user =localStorage.getItem("user-name");
    console.log(user);
        return (
            <div className="nav">
                <Navbar expand="lg" fixed="top">
                    <Container>
                        <Navbar.Brand>
                            <img
                                title="logo"
                                className="logosandra"
                                src={logo}
                                alt=""
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle
                            aria-controls="basic-navbar-nav"
                            className="linka"
                        />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mo-auto tomargin">
                                <LinkContainer to="/">
                                    <Nav.Link className="active linka">
                                        Home
                                    </Nav.Link>
                                </LinkContainer>

                                <Nav.Link className="linka" href="#Signin">
                                    Sign In
                                </Nav.Link>
                                <NavDropdown
                                    title="Services"
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#singin"
                                    >
                                        SignUp
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#contactus"
                                    >
                                        Contact Us
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#feedback"
                                    >
                                        Feedback
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="Pages"
                                    id="basic-nav-dropdown"
                                    className="linka"
                                >
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#chatboot"
                                    >
                                        Talk To Sandra
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#reservation"
                                    >
                                        Book an Appointment
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        className="decor"
                                        href="#shareus"
                                    >
                                        Put comment To Sahre
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link className="linka" href="#Signin">
                                    <Search className="Search" />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
}

export default Navbars;
