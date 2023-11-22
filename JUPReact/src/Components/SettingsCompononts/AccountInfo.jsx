import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import CircularLoading from "../loadingprogress/loadingProgress";
const AccountInfo = () => {
    const [userName, setUsername] = useState(null);
    const [Email, setEmail] = useState(null);

    const [olduserName, setoldUsername] = useState(null);
    const [oldEmail, setoldEmail] = useState(null);

    const userID = localStorage.getItem("user-id");
    const userType = localStorage.getItem("user-type");
    useEffect(() => {
        const fetchData = async () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });
            const formData = new FormData();
            formData.append("userID", parseInt(userID));
            formData.append("userType", userType);
            try {
                const response = await axiosClient.post(
                    `Settings/info`,
                    formData
                );
                if (response.data.status === 200) {
                    console.log(response.data.user);
                    setEmail(response.data.user.email);
                    setUsername(response.data.user.user_name);
                    setoldEmail(response.data.user.email);
                    setoldUsername(response.data.user.user_name);
                } else {
                    swalWithBootstrapButtons.fire(
                        response.data.message,
                        "error"
                    );
                }
            } catch (error) {
                swalWithBootstrapButtons.fire(
                    error.response.statusText,
                    "error"
                );
            }
        };
        fetchData();
    }, [userID]);

    const handleSubmit = async (event) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        event.preventDefault();
        if (
            Email &&
            userName
        ) {
            const userID = localStorage.getItem("user-id");
            const userType = localStorage.getItem("user-type");
            const formData = new FormData();
            formData.append("userName", userName);
            formData.append("email", Email);
            formData.append("userID", parseInt(userID));
            formData.append("userType", userType);
            try {
                const response = await axiosClient.post(
                    "Settings/AccountInfo",
                    formData
                );
                console.log(response);
                if (response.data.status === 200) {
                    swalWithBootstrapButtons.fire(
                        "your info have been updated.",
                        "success"
                    );
                } else {
                    swalWithBootstrapButtons.fire(
                        response.data.message,
                        "Your info can not been updated",
                        "error"
                    );
                }
            } catch (error) {
                console.log(error);
                swalWithBootstrapButtons.fire(
                    error.response.data.message,
                    "error"
                );
            }
        } else {
            console.log(Email);
            console.log(userName);
            console.log(oldEmail);
            console.log(olduserName)
            swalWithBootstrapButtons.fire(
                "All fields are required",
                " Please fill all fields",
                "error"
            );
        }
    };
    if (userName !== null && Email !== null) {
        return (
            <div className="j">
                <div className="title">Account Information</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>User-Name :</label>
                    </div>
                    <input
                        placeholder="User Name"
                        type="text"
                        value={userName ?? ""}
                        name="userName"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                    />
                    <div>
                        <label>Email :</label>
                    </div>
                    <input
                        placeholder="Email@gmail.com"
                        type="email"
                        value={Email ?? ""}
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                    <button
                        type="submit"
                        className="saveButton"
                        disabled={
                            oldEmail === Email && olduserName === userName
                        }
                    >
                        {" "}
                        save
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="j">
                <div className="title">Account Information</div>
                <div className="loading">
                    <CircularLoading />
                </div>
            </div>
        );
    }
};
export default AccountInfo;
