import React from "react";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillCheckCircle,AiFillCloseCircle } from "react-icons/ai";
import './pendingBlog.css';
import { AiOutlineCalendar } from "react-icons/ai";


const PendingBlog = ({
    id,
    title,
    image,
    category,
    content,
    date,
    accept,
    reject,
}) => {
    return (
        <Link to={`/articles/pending/${id}`} className="boxItemsPending" key={id}>
            <div className="img">
                <img src={"http://localhost:8000/" + image} alt="" />
            </div>
            <div className="details">
                <div className="titlePart">{title}</div>

                <div className="tag">
                    <BsBookmark className="icon" size="2.5vmin" />
                    {category}
                </div>

                <p className="content">{content.slice(0, 180)}...</p>

                <div className="date">
                    <AiOutlineCalendar className="icon" />{" "}
                    <label htmlFor="">{date}</label>
                    {accept!==null? <AiFillCheckCircle className="icon" />:null}
                    {accept!==null? <label htmlFor="">{accept}</label>:null}
                    {reject!==null ?<AiFillCloseCircle className="icon" />:null}
                    {reject!==null? <label htmlFor="">{reject}</label>:null}
                    
                    
                </div>
            </div>
        </Link>
    );
};
export default PendingBlog;
