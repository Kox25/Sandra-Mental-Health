import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const DeleteAcount = () => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        event.preventDefault();

        if (checked && password) {
            const userID = localStorage.getItem("user-id");
            const userType = localStorage.getItem("user-type");
            const formData = new FormData();
            formData.append("password", password);
            formData.append("userID", parseInt(userID));
            formData.append("userType", userType);
            try {
                const response = await axiosClient.post(
                    "Settings/delete",
                    formData
                );
                console.log(response);
                if (response.data.status === 200) {
                    swalWithBootstrapButtons.fire(
                        "your account has been deleted.",
                        "success"
                    );
                    localStorage.clear();
                    navigate(`/login`);
                } else {
                    swalWithBootstrapButtons.fire(
                        response.data.message,
                        "Your Acccount can not been deleted",
                        "error"
                    );
                }
            } catch (error) {
                swalWithBootstrapButtons.fire(
                    error.response.statusText,
                    "error"
                );
            }
        } else {
            swalWithBootstrapButtons.fire(" You have not checked the checkbox."," Please check the checkbox and try again", "error");
        }
    };
    return (
        <div className="j">
            <div className="title">Delete Account</div>{" "}
            <div>
                <label> Password :</label>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Password"
                    type="password"
                    name="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <div className="check">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                    I understand that this will delete my account permanently.
                </div>
                <button className="saveButton" type="submit">
                    {" "}
                    save
                </button>
            </form>
        </div>
    );
};
export default DeleteAcount;
