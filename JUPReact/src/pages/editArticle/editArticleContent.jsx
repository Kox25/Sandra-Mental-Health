import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editArticleContent.css";
import axiosClient from "../../axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const EditArticleForm = () => {
    const navigate = useNavigate();
    const { category, id } = useParams();
    const [content, setContent] = useState(null);
    const [Title, setTitle] = useState(null);
    const [doctorID, setdoctorID] = useState(null);
    const userType = localStorage.getItem("user-type");
    const userID = localStorage.getItem("user-id");
    useEffect(() => {
        if (userType !== "doctor") {
            navigate("/articles");
        }
    }, [userType]);
    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem("user-id");
            const userType = localStorage.getItem("user-type");
            try {
                const response = await axiosClient.post(
                    `Articles/content/${id}`,
                    { userID, userType }
                );
                if (response.data.status === 200) {
                    setContent(response.data["Article"].content);
                    setTitle(response.data["Article"].name);
                    setdoctorID(response.data["Article"].doctorID);
                    if (userID != response.data["Article"].doctorID) {
                        navigate("/articles");
                    }
                } else {
                    swalWithBootstrapButtons.fire(
                        response.data.message,
                        "error"
                    );
                }
            } catch (error) {
                swalWithBootstrapButtons.fire(
                    error.response.statusText,
                    "Your changes has not been saved",
                    "error"
                );
            }
        };
        fetchData();
    }, [id]);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const contentSave = async (event) => {
        console.log(content);

        event.preventDefault();
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "Do you want to save the changes!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, save!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const userID = localStorage.getItem("user-id");
                    const userType = localStorage.getItem("user-type");
                    const formData = new FormData();
                    formData.append("content", content ?? "");
                    formData.append("doctorID", parseInt(userID));
                    formData.append("userType", userType);

                    console.log(formData);

                    try {
                        const response = await axiosClient.post(
                            `Articles/update/content/${id}`,
                            formData
                        );
                        console.log(response);
                        if (response.data.status === 200) {
                            swalWithBootstrapButtons.fire(
                                "Changes saved.",
                                "Your changes has been saved.",
                                "success"
                            );
                            navigate(`/articles/${category}/${id}`);
                        } else {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "Your changes has not been saved",
                                "error"
                            );
                        }
                    } catch (error) {
                        console.log(error);
                        swalWithBootstrapButtons.fire(
                            error.response.statusText,
                            "Your changes has not been saved",
                            "error"
                        );
                    }
                }
            });
    };

    const cancel = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "changes will not be saved",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, discard!",
                cancelButtonText: "No, stay!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log(result);
                    navigate(`/articles/${category}/${id}`);
                }
            });
    };

    if (content !== null) {
        return (
            <div className="editArticleContent">
                <div className="contentPart">
                    <div className="title">{Title}</div>
                    <br />
                    <div>
                        <form onSubmit={contentSave}>
                            <textarea
                                type="text"
                                className="content"
                                onChange={handleContentChange}
                                value={content}
                            />
                            <div className="buttons">
                                <button type="submit">save</button>
                                <button type="button" onClick={cancel}>
                                    cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="editArticleContent">
                <div className="contentPart">there is no Article selected</div>
            </div>
        );
    }
};
export default EditArticleForm;
