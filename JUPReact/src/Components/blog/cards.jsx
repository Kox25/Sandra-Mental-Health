import React, { useState, useContext, useEffect } from "react";
import "./blog.css";
import { Button } from "react-bootstrap";
import NoData from "../NoData/NoData";
import { ArticlesContext } from "../../Providers/Articlesprov";
import { MyContext } from "../../Providers/ArticleCategoryprov";
import Card from "./Card";
import axiosClient from "../../axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Cards = () => {
    const { Articles, setArticles } = useContext(ArticlesContext);
    const { Category } = useContext(MyContext);
    const [Visible, setVisible] = useState(6);

    useEffect(() => {
        if (Category === 0) {
            console.log(`category:${Category}`);
            const fetchData = async () => {
                const userID = localStorage.getItem("user-id");
                const userType = localStorage.getItem("user-type");
                console.log(`userID:${userID}`);
                console.log(`userType:${userType}`);
                try{

                    const response = await axiosClient.post(`Articles`, {
                        userID,
                        userType,
                    });
                    console.log(response);
                    if (response.data["status"] !== 200) {
                        Swal.fire(response.data.message);
                    } else {
                        setArticles(response.data["Articles"]);
                    }
                }
                catch(error){
                    swalWithBootstrapButtons.fire(
                        error.response.statusText,
                        "error"
                    );   
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                const userID = localStorage.getItem("user-id");
                const userType = localStorage.getItem("user-type");
                try {
                    const response = await axiosClient.post(
                        `Articles/cat/${Category}`,
                        { userID, userType }
                    );
                    console.log(response);
                    if (response.data.status === 200) {
                        setArticles(response.data["Articles"]);
                    } else {
                        Swal.fire(response.data.message);
                    }
                } catch (error) {
                    swalWithBootstrapButtons.fire(
                        error.response.statusText,
                        "error"
                    );                   }
            };
            fetchData();
        }
    }, [Category]);

    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 9);
    };

    function buttonVisible() {
        if (Visible < Articles.length) {
            return (
                <div class="ButtonContainer">
                    <Button onClick={showMoreItems} className="LoadMoreButton">
                        load More
                    </Button>
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    if (Articles.length > 0) {
        return (
            <>
                <section className="blog">
                    <div className="container grid3">
                        {Articles.slice(0, Visible).map((item) => (
                            <Card
                                id={item.id}
                                title={item.name}
                                type="all"
                                isLiked={item.isLiked}
                                name={item.category.name}
                                catid={item.category.id}
                                image={item.image}
                                doctorID={item.doctor}
                                content={item.content}
                                date={item.date}
                                likes={item.likes}
                            />
                        ))}
                    </div>
                    {buttonVisible()}
                </section>
            </>
        );
    } else {
        return (
            <section className="blog">
                <NoData content="No Articles yet :(" />
            </section>
        );
    }
};
export default Cards;
