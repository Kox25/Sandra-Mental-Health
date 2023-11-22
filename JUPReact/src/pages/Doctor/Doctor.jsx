import React from "react";
import vid from "./intro.mp4";
import "./Doctor.css";
import { Container } from "react-bootstrap";

export default function Doctor() {
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
