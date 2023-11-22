import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const ChangePassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [oldpassword, setoldPassword] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const handleSubmit = async (event) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        event.preventDefault();
        if (password !== "" && oldpassword !== "" && newpassword !== "") {
            if (newpassword !== password) {
                swalWithBootstrapButtons.fire(
                    "please confirm your new password correctly",
                    "error"
                );
            } else {
                const userID = localStorage.getItem("user-id");
                const userType = localStorage.getItem("user-type");
                const formData = new FormData();
                formData.append("oldPassword", oldpassword);
                formData.append("newPassword", newpassword);
                formData.append("userID", parseInt(userID));
                formData.append("userType", userType);
                try {
                    const response = await axiosClient.post(
                        "Settings/ChangePassword",
                        formData
                    );
                    console.log(response);
                    if (response.data.status === 200) {
                        swalWithBootstrapButtons.fire(
                            "your password has been updated.",
                            "success"
                        );
                    } else {
                        swalWithBootstrapButtons.fire(
                            response.data.message,
                            "Your Password can not been updated",
                            "error"
                        );
                    }
                } catch (error) {
                    swalWithBootstrapButtons.fire(
                        error.response.statusText,
                        "error"
                    );
                }
            }
        } else {
            swalWithBootstrapButtons.fire(
                "All fields are required",
                " Please fill all fields",
                "error"
            );
        }
    };
    return (
        <div className="j">
            <div className="title">Change Password</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Old password :</label>
                </div>

                <input
                    placeholder="OldPassword"
                    type="password"
                    value={oldpassword}
                    name="password"
                    required
                    onChange={(e) => setoldPassword(e.target.value)}
                    className="input"
                />
                <div>
                    <label>New password :</label>
                </div>
                <input
                    placeholder="NewPassword"
                    type="password"
                    value={password}
                    name="newpassword"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                />
                <div>
                    <label> Confirm password :</label>
                </div>
                <input
                    placeholder="NewPassword"
                    type="password"
                    value={newpassword}
                    name="checkPassword"
                    required
                    onChange={(e) => setnewPassword(e.target.value)}
                    className="input"
                />
                <button type="submit" className="saveButton">
                    {" "}
                    save
                </button>
            </form>
        </div>
    );
};
export default ChangePassword;
