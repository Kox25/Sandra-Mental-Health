import React, { useState, useEffect } from "react";
import "sweetalert2/src/sweetalert2.scss";
import "./myArticleContent.css";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotesPart from "../../../Components/PendingArticles/notesPart/notesPart";
import axiosClient from "../../../axios";
import "./myArticleContent.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import CircularLoading from "../../../Components/loadingprogress/loadingProgress";

const MyArticleContent = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [Article, setArticle] = useState([]);
    const [date, setdate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userID = localStorage.getItem("user-id");
    const userType = localStorage.getItem("user-type");

    useEffect(() => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        const fetchData = async () => {
            try {
                const response = await axiosClient.post(
                    `Articles/pending/${id}`,
                    { userID, userType }
                );
                console.log(response);
                if (response.data.status === 200) {
                    setArticle(response.data["Article"]);
                } else {
                    swalWithBootstrapButtons.fire(
                        response.data.message,
                        "error"
                    );
                }
            } catch (error) {
                console.log(error);
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

    return (
        <div className="myPendingArticleContent">
            {Article.length === 0 || date === null ? (
                <p><CircularLoading/></p>
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
                            <div className="statusPart">

                            <div

                                className={`docStatus ${
                                    Article.status === "published"
                                        ? "accept"
                                        : Article.status === "rejected"
                                        ? "reject"
                                        : "pending"
                                }`}
                            >
                                {Article.status === "adminChoice"
                                    ? "Pending"
                                    : Article.status}
                            </div>
                            </div>
                        </div>
                        {Article.status === "rejected" ? (
                            <NotesPart Article={Article} />
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
};
export default MyArticleContent;
