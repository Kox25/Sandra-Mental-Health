import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axios";
import "sweetalert2/src/sweetalert2.scss";
import SignUpLoginForm from "../../../Components/Forms/SignUpLoginForm/SignUpLoginForm";

const SSignUp = () => {
    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            navigate("/login");
        }
    }, []);

    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({ __html: "" });
    const [moveright, setMoveRight] = useState(null);

    const navigate = useNavigate();

    const onsubmit = async (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
        if (moveright !== null && moveright === true) {
            //first parameter for the url of the api second for databases
            axiosClient
                .post("/signup/doctor", {
                    email,
                    user_name,
                    password,
                    password_confirmation: confirmpassword,
                })
                .then((response) => {
                    JSON.stringify(response);
                    localStorage.setItem("user-info", response.data);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user-type", response.data.user_type);
                    console.log("data added successfully");
                    navigate("/login"); // Navigate to the login page
                })
                .catch((error) => {
                    if (error.response) {
                        const finalErrors =
                            error.response.data.errors &&
                            Object.values(error.response.data.errors).reduce(
                                (accum, next) => [...accum, ...next],
                                []
                            );
                        const joinedErrors =
                            finalErrors && finalErrors.join("<br>");
                        setError({ __html: joinedErrors });
                    }
                    console.error(error);
                });
        } else {
            //first parameter for the url of the api second for databases
            await axiosClient
                .post("/signup/user", {
                    user_name,
                    email,
                    password,
                    password_confirmation: confirmpassword,
                })
                .then((response) => {
                    //this values comes from the AuthController
                    JSON.stringify(response);
                    localStorage.setItem("user-info", response.data);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user-type", response.data.user_type);
                    console.log("data added successfully");
                    navigate("/login"); // Navigate to the login page
                })
                .catch((error) => {
                    if (error.response) {
                        const finalErrors =
                            error.response.data.errors &&
                            Object.values(error.response.data.errors).reduce(
                                (accum, next) => [...accum, ...next],
                                []
                            );
                        const joinedErrors =
                            finalErrors && finalErrors.join("<br>");
                        setError({ __html: joinedErrors });
                    }
                    console.error(error);
                });
        }
    };

    const swap = () => {
        setMoveRight(moveright == null ? true : !moveright);
    };
    return (
        <div className="bod">
            <div className="SignUp">
                <div
                    className={`pic ${
                        moveright != null && moveright
                            ? "move-right"
                            : moveright != null
                            ? "move-left"
                            : ""
                    }`}
                >
                    <div className="swapPart">
                        <button type="button" className="swap" onClick={swap}>
                            {moveright !== null && moveright
                                ? "User Sign Up"
                                : "Doctor Sign Up"}
                        </button>
                    </div>
                </div>
                <div className="left1">
                    <div className="title">Doctor Sign Up</div>
                    {error.__html && (
                        <div
                            className="error"
                            dangerouslySetInnerHTML={error}
                        ></div>
                    )}{" "}
                    <SignUpLoginForm
                        onsubmit={onsubmit}
                        setUser_name={setUser_name}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        user_name={user_name}
                        email={email}
                        password={password}
                        confirmpassword={confirmpassword}
                        Type="SignUp"
                    />
                </div>

                <div className="right">
                    <div className="title">Patient Sign Up</div>
                    {error.__html && (
                        <div
                            className="error"
                            dangerouslySetInnerHTML={error}
                        ></div>
                    )}

                    <SignUpLoginForm
                        onsubmit={onsubmit}
                        setUser_name={setUser_name}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        user_name={user_name}
                        email={email}
                        password={password}
                        confirmpassword={confirmpassword}
                        Type="SignUp"
                    />
                </div>
            </div>
        </div>
    );
};
export default SSignUp;
