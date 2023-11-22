import React from "react";
import vid from "./intro.mp4";
import "./Admin.css";
import { Container } from "react-bootstrap";

export default function Admin() {
    return (
        <div>
            <Container>
                <video
                    className="vid"
                    src={vid}
                    controls
                    autoPlay
                    loop
                    type="video/mp4"
                />
            </Container>
        </div>
    );
}
