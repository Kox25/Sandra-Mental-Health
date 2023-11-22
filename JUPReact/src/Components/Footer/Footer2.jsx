import React from "react";
import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
} from "mdb-react-ui-kit";
import "./Footer.css";
import logo from "./sandrapic/anotherlogo.png";

function Footer2() {
    return (
        <footer>
            <div className="footer">
                <MDBFooter
                    className="text-center text-lg-start text-muted"
                    id="footer"
                >
                    <MDBContainer className="text-center text-md-start mt-5">
                        <MDBRow className="mt-3">
                            <MDBCol
                                md="3"
                                lg="4"
                                xl="3"
                                className="mx-auto mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <MDBIcon icon="gem" className="me-3" />
                                    Sandra
                                </h6>
                                <p>
                                    if you care about your mental health and you
                                    want contorl on your nerve just be quiet
                                </p>
                                <p>
                                    <img
                                        className="footerlogo"
                                        src={logo}
                                        alt="logo"
                                    />
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="2"
                                lg="2"
                                xl="2"
                                className="mx-auto mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Quick Links
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Home
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Login
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Sign Up
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="3"
                                lg="2"
                                xl="2"
                                className="mx-auto mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Services
                                </h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Make a resarvation
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Give us rate
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Talk to sandra
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Read More About Us
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Feedback
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Contact Us
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="4"
                                lg="3"
                                xl="3"
                                className="mx-auto mb-md-0 mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                <p>
                                    <MDBIcon icon="home" />
                                    Syria , Damascus
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" />
                                    Sandra@gmail.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" />
                                    +963980547937
                                </p>

                                <p>
                                    <i className="fa-brands fa-facebook iconn"></i>

                                    <i className="fa-brands fa-twitter iconn"></i>

                                    <i className="fa-brands fa-linkedin iconn"></i>

                                    <i className="fa-brands fa-youtube iconn"></i>
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <div
                        className="text-center p-4"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                    >
                        © 2021 Copyright:
                        <a
                            className="text-reset fw-bold"
                            href="https://mdbootstrap.com/"
                        >
                            SandraGroup
                        </a>
                    </div>
                </MDBFooter>
            </div>
        </footer>
    );
}
export default Footer2;
