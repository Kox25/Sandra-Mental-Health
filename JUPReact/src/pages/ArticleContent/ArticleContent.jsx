import React, { useEffect, useState } from "react";
import "./ArticleContent.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { BsBookmark } from "react-icons/bs";
import { Button, Col, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../axios";
import Card from "../../Components/blog/Card";
import LikeButton from "../../Components/likeButton/likeButton";
import CircularLoading from "../../Components/loadingprogress/loadingProgress";
import { AiOutlineWarning } from "react-icons/ai";

const ArticleContent = () => {
    const navigate = useNavigate();
    const userType = localStorage.getItem("user-type");
    const userID = localStorage.getItem("user-id");
    const { category, id } = useParams();
    const [Article, setArticle] = useState([]);
    const [Articles, setArticles] = useState([]);
    const [date, setdate] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [change, setchange] = useState(false);
    const [likes, setLikes] = useState(0);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });
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
                    setArticle(response.data["Article"]);
                    setIsLiked(response.data["Article"].isLiked);
                    setLikes(response.data["Article"].likes);
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
        const fetchData = async () => {
            const userID = localStorage.getItem("user-id");
            const userType = localStorage.getItem("user-type");
            try {
                const response = await axiosClient.post(
                    `Articles/cat/${category}`,
                    { userID, userType }
                );
                console.log("cat");

                console.log(response);

                if (response.data.status === 200) {
                    setArticles(response.data["Articles"]);
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
    }, [category]);

    useEffect(() => {
        if (Article.length !== 0) {
            const date2 = new Date(Article.created_at);

            setdate(date2);
        }
        console.log("Articles:", Articles);
        console.log("Article:", Article);
    }, [Articles, Article]);

    async function deleteHandle() {
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
                text: "You won't be able to see this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const userID = localStorage.getItem("user-id");
                    const userType = localStorage.getItem("user-type");
                    console.log(userType);
                    try {
                        const response = await axiosClient.post(
                            `Articles/delete/${id}`,
                            { userID, userType }
                        );
                        console.log("delete");

                        console.log(response);
                        if (response.data.status === 200) {
                            swalWithBootstrapButtons.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            );
                            navigate("/Articles");
                        } else {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "Your Article has not been deleted",
                                "error"
                            );
                        }
                    } catch (error) {
                        swalWithBootstrapButtons.fire(
                            error.response.statusText,
                            "error"
                        );
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your article is safe :)",
                        "error"
                    );
                }
            });
    }

    async function editHandle() {
        if (
            localStorage.getItem("user-type") == "doctor" &&
            localStorage.getItem("user-id") == Article.doctor.id
        ) {
            navigate(`/articles/${category}/${id}/update`);
        } else {
            Swal.fire("you don't have the Permissions to edit this article");
        }
    }

    async function ReportHandle() {
      

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to see this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, report it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const userID = localStorage.getItem("user-id");
                    const userType = localStorage.getItem("user-type");
                    console.log(userType);
                    try {
                        const response = await axiosClient.post(
                            `Articles/cat/${id}/report`,
                            {
                                userID,
                            }
                        );
                        console.log("report");

                        console.log(response);
                        if (response.data.status === 200) {
                            swalWithBootstrapButtons.fire(
                                "reported!",
                                "this article has been reported.",
                                "success"
                            );
                            navigate(`/articles`);
                        } else {
                            swalWithBootstrapButtons.fire(
                                response.data.message,
                                "this Article has not been reported",
                                "error"
                            );
                        }
                    } catch (error) {
                        swalWithBootstrapButtons.fire(
                            error.response.statusText,
                            "error"
                        );
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your article is safe :)",
                        "error"
                    );
                }
            });
    }

    const handleLike = async () => {
        const userID = localStorage.getItem("user-id");
        const userType = localStorage.getItem("user-type");
        console.log("liks");
        try {
            const response = await axiosClient.post(`/Articles/${id}/like`, {
                userID,
                userType,
            });
            console.log(response.data.message);

            if (response.data.status == 200) {
                setIsLiked(true);
                setchange(true);
                setLikes(response.data.likes);
                console.log("Likes after like:", likes);
            } else {
                console.log(response)
                swalWithBootstrapButtons.fire(response.data.message, "error");
            }
        } catch (error) {
            console.log(error)
            swalWithBootstrapButtons.fire(error.response.statusText, "error");
        }
    };

    const handleDislike = async () => {
        const userID = localStorage.getItem("user-id");
        const userType = localStorage.getItem("user-type");
        try {
            const response = await axiosClient.post(`/Articles/${id}/dislike`, {
                userID,
                userType,
            });
            if (response.data.status == 200) {
                console.log(response.data.message);
                setIsLiked(false);
                setchange(false);
                setLikes(response.data.likes);
                console.log("Likes after dislike:", likes);
            } else {
                console.log(response);
                swalWithBootstrapButtons.fire(response.data.message, "error");
            }
        } catch (error) {
            console.log(error);
            swalWithBootstrapButtons.fire(
                error.response.data.errors,
                "Your changes has not been saved",
                "error"
            );
        }
    };

    async function editContentHandle() {
        if (
            localStorage.getItem("user-type") == "doctor" &&
            localStorage.getItem("user-id") == Article.doctor.id
        ) {
            navigate(`/articles/${category}/${id}/update/content`);
        } else {
            Swal.fire("you don't have the Permissions to edit this article");
        }
    }
    return (
        <div className="ArticleContent">
            <Row>
                <Col md={8} className="ContentSide">
                    {Article.length === 0 || date === null ? (
                        <CircularLoading/>
                    ) : (
                        <div className="contentContainer">
                            <div className="image">
                                <img
                                    src={
                                        "http://localhost:8000/" + Article.image
                                    }
                                    alt={Article.image}
                                />
                            </div>
                            <div className="info">
                                <div className="title">
                                    <div className="Artname">
                                        {Article.name}
                                    </div>
                                    <div class="dropdown">
                                        <button
                                            class="dropdown-toggle"
                                            type="button"
                                        ></button>
                                        {userType === "doctor" &&
                                        userID == Article.doctor.id ? (
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <Button
                                                        className="listChoice"
                                                        onClick={deleteHandle}
                                                    >
                                                        Delete
                                                    </Button>
                                                </li>
                                            </ul>
                                        ) : userType === "patient" ? (
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <Button
                                                        className="listChoice"
                                                        onClick={ReportHandle}
                                                    >
                                                        Report
                                                    </Button>
                                                </li>
                                            </ul>
                                        ) : userType === "doctor" &&
                                          userID != Article.doctor.id ? null : (
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <Button
                                                        className="listChoice"
                                                        onClick={deleteHandle}
                                                    >
                                                        Delete
                                                    </Button>
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="catLikes">
                                    <div className="cat">
                                        <BsBookmark
                                            className="icon"
                                            size="2.5vmin"
                                        />

                                        {Article.category.name}
                                    </div>
                                    {userType === "admin" ||
                                    userType === "doctor" ? (
                                        <div className="reports">
                                            <AiOutlineWarning
                                                className="icon"
                                                size="3vmin"
                                            />
                                            {Article.reports}
                                        </div>
                                    ) : null}
                                    {userType === "patient" ? (
                                        <div className="likes">
                                            <LikeButton
                                                handleDislike={handleDislike}
                                                handleLike={handleLike}
                                                likes={likes}
                                                isLiked={isLiked}
                                                button="yes"
                                            />
                                        </div>
                                    ) : (
                                        <div className="likes">
                                            <LikeButton
                                                handleDislike={handleDislike}
                                                handleLike={handleLike}
                                                likes={likes}
                                                isLiked={isLiked}
                                                button="no"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="content">{Article.content}</div>
                                <div className="publisher">
                                    Published by : {Article.doctor.user_name}
                                </div>
                                <div className="date">
                                    Date : {date.getDate()} /{" "}
                                    {date.getMonth() + 1} / {date.getFullYear()}
                                </div>
                            </div>
                        </div>
                    )}
                    <div></div>
                </Col>
                <Col md={3} className="ArticlesSide">
                    {Articles.length === 0 ? (
                        <CircularLoading/>
                        ) : (
                        <div className="related">
                            <div className="relatedTitle">
                                Related Articles :
                            </div>
                            {Articles.slice(0, 3).map((item) =>
                                item.id != id ? (
                                    <div className="cards">
                                        <Card
                                            id={item.id}
                                            title={item.name}
                                            catid={category}
                                            type="content"
                                            name={item.category.name}
                                            image={item.image}
                                            doctorID={item.doctor}
                                            content={item.content}
                                            date={item.date}
                                            likes={item.likes}
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default ArticleContent;
