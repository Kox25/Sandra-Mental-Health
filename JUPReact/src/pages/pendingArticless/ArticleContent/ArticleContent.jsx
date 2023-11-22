import React, { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { BsBookmark } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios";
import { Button } from "react-bootstrap";
import RejectNote from "../../../Components/PendingArticles/rejectNote/rejectNotes";
import "./ArticleContent.css";
import NotesPart from "../../../Components/PendingArticles/notesPart/notesPart";
const PArticleContent = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [Article, setArticle] = useState([]);
    const [date, setdate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userID = localStorage.getItem("user-id");
    const userType = localStorage.getItem("user-type");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.post(
                    `Articles/pending/${id}`,
                    { userID, userType }
                );
                if (response.data.status === 200) {
                    setArticle(response.data["Article"]);
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
    }, [id]);

    useEffect(() => {
        if (Article.length !== 0) {
            const date2 = new Date(Article.created_at);
            setdate(date2);

            console.log(Article);
        }

        console.log("Article:", Article);
    }, [Article]);

    const reject = async () => {
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
                text: "Do you want to reject this article!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, reject!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const userID = localStorage.getItem("user-id");
                    const formData = new FormData();
                    formData.append("doctorID", parseInt(userID));
                    formData.append("userType", userType);
                    try {
                        const response = await axiosClient.post(
                            `Articles/pending/${id}/reject`,
                            formData
                        );
                        console.log(response.data);
                        if (response.data.status === 200) {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "success"
                            );
                            navigate(`/articles/pending`);
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
                            error.response.data,
                            "error"
                        );
                    }
                }
            });
    };
    const accept = async () => {
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
                text: "Do you want to accept this article!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, accept!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const userID = localStorage.getItem("user-id");
                    const userType = localStorage.getItem("user-type");
                    const formData = new FormData();
                    formData.append("doctorID", parseInt(userID));
                    formData.append("userType", userType);

                    try {
                        const response = await axiosClient.post(
                            `Articles/pending/${id}/accept`,
                            formData
                        );
                        console.log(response);
                        if (response.data.status === 200) {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "success"
                            );
                            navigate(`/articles/pending`);
                        } else {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "Your changes has not been saved",
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
            });
    };
    const handleRejectClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div className="pendingContent">
            {Article.length === 0 || date === null ? (
                <p>loading</p>
            ) : (
                <>
                    <div className="image">
                        <img
                            src={"http://localhost:8000/" + Article.image}
                            alt={Article.image}
                        />
                    </div>

                    <div className="contentPart">
                        <div className="info">
                            <div className="title">
                                <div className="Artname">{Article.name}</div>
                            </div>
                            <div className="catLikes">
                                <div className="cat">
                                    <BsBookmark
                                        className="icon"
                                        size="2.5vmin"
                                    />

                                    {Article.category.name}
                                </div>
                            </div>
                            <div className="content">{Article.content}</div>
                            <div className="date">
                                Date : {date.getDate()} / {date.getMonth() + 1}{" "}
                                / {date.getFullYear()}
                            </div>
                        </div>
                        {userType === "admin" ? (
                            <NotesPart Article={Article} />
                        ) : null}
                    </div>
                    
                    <div className="buttons">
                        <Button className="button" onClick={accept}>
                            accept
                        </Button>
                        <Button
                            className="button"
                            onClick={
                                userType === "admin"
                                    ? reject
                                    : handleRejectClick
                            }
                        >
                            reject
                        </Button>
                        {showModal && (
                            <RejectNote onClose={handleCloseModal} id={id} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
export default PArticleContent;
