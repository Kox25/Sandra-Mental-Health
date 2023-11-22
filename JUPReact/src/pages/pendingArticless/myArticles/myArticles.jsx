import React, { useState, useEffect } from "react";
import "./myArticles.css";
import axiosClient from "../../../axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import MyArticleCard from "../../../Components/PendingArticles/myArticle/myArticle";
import MyArticlesProv from "../../../Providers/myArticlesProv";
import ArticleTypes from "../../../Components/PendingArticles/articleTypes/articleTypes";
import NoData from "../../../Components/NoData/NoData";
import CircularLoading from "../../../Components/loadingprogress/loadingProgress";
const MyArticles = () => {
    const userType = localStorage.getItem("user-type");
    const [Articles, setArticles] = useState([]);
    const [Type, setType] = useState(0);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        console.log(Type);
        setloading(true)
        const fetchData = async () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });
            const userID = localStorage.getItem("user-id");
            console.log(`userID:${userID}`);
            console.log(`userType:${userType}`);
            try {
                const response = await axiosClient.post(`Articles/myPending`, {
                    userID,
                    userType,
                    Type,
                });
                console.log(response);
                if (response.data["status"] !== 200) {
                    Swal.fire(response.data.message);
                } else {
                    setArticles(response.data["Articles"]);
                    setloading(false)
                }
            } catch (error) {
                swalWithBootstrapButtons.fire(
                    error.response.statusText,
                    "error"
                );
            }
        };
        fetchData();
    }, [Type]);
    return (
        <div className="MyArticlesContainer">
            <MyArticlesProv value={Type} onUpdate={setType}>
                <div className="TypesPart">
                    <ArticleTypes />
                </div>
                <div className="ArticlesPart">
                    {loading? <CircularLoading/>:
                    Articles.length === 0 ? (
                        <div className="noArticles"> There is no Articles </div>
                    ) : (
                        Articles.map((item, index) => (
                            <MyArticleCard
                                item={item}
                                last={index === Articles.length - 1}
                            />
                        ))
                    )}
                </div>
            </MyArticlesProv>
        </div>
    );
};
export default MyArticles;
