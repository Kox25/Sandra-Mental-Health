import React, { useContext, useEffect } from "react";
import "./Categories.css";
import { Col, Row } from "react-bootstrap";
import { MyContext } from "../../Providers/ArticleCategoryprov";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Categories = () => {
    const { Category, Categories, handleUpdate, setCategories } =
        useContext(MyContext);
    const userType = localStorage.getItem("user-type");

    function onUpdate(value) {
        console.log(value);
        handleUpdate(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });
            try {
                const response = await axiosClient.get("/Categories");
                if (response.data.status === 200) {
                    setCategories(response.data["Category"]);
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
    }, []);

    return (
        <div className="Categories">
            <div className="titleAdd">
                <h2>Discover Nice Articles here</h2>
                {userType === "doctor" ? (
                    <>
                        <Link to="pending" id="addArticle" className="link">
                            Pending Articles
                        </Link>
                        <Link to="AddArticle" id="addArticle" className="link">
                            Add new Article
                        </Link>
                    </>
                ) :userType === "admin" ? (<Link to="pending" id="addArticle" className="link">
                Pending Articles
            </Link>): null}
            </div>

            <br />
            <h6>
                There is hope. With the right support, you can overcome your
                challenges and live a happy and fulfilling life.
            </h6>
            <Row>
                <Col>
                    <div className="cat">
                        Embark on an Article Category Journey to Uncover a
                        Universe of Relevant Knowledge :<br />
                        <button
                            onClick={() => onUpdate(0)}
                            id={0}
                            className={Category === 0 ? "selected" : "none"}
                        >
                            {" "}
                            All
                        </button>
                        {Categories.length > 0
                            ? Categories.map((item) => (
                                  <button
                                      onClick={() => onUpdate(item.id)}
                                      id={item.id}
                                      className={
                                          Category === item.id
                                              ? "selected"
                                              : "none"
                                      }
                                  >
                                      {item.name}
                                  </button>
                              ))
                            : null}
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default Categories;
