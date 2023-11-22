import React from "react";
import "./pendingArticlesHeader.css";
import { Link } from "react-router-dom";
const PendingArticlesHeader = () => {
    const userType = localStorage.getItem("user-type");
    return (
        <div className="PendingHeader">
            <div className="titleAdd">
                <h2>Pending articles await: </h2>
                {userType === "doctor" ? (
              
                        <Link to="myPendings" id="MyArticles" className="link">
                            My Articles
                        </Link>
                ) : null}
            </div>


            <br />
            <h6>
                Your expertise is essential to our mission of publishing
                high-quality articles.
            </h6>
        </div>
    );
};
export default PendingArticlesHeader;
