import React from "react";
import "sweetalert2/src/sweetalert2.scss";
import "./notesPart.css";
const NotesPart = ({Article}) => {
    return (
        <div className="notes">
            <div className="notesTitle">Notes :</div>
            {Article.reviews.map((item, index) => (
                <div className="note">
                    <div className="reviewNumber">
                        {index === 0
                            ? "first review :"
                            : index === 1
                            ? "second review :"
                            : "third review :"}
                    </div>
                    <div className="noteInfo">
                        {" "}
                        <div className="title">status :</div>
                        <div
                            className={
                                item.status === "accept" ? "accept" : "reject"
                            }
                        >
                            {item.status}
                        </div>
                    </div>
                    <div className="noteInfo">
                        <div className="title">notes :</div>
                        <div>
                            {item.status === "accept" ? "none" : item.notes}
                        </div>
                    </div>
                    <div className="noteInfo">
                        <div className="title">Date :</div>{" "}
                        {new Date(item.created_at).getDate()} /{" "}
                        {new Date(item.created_at).getMonth() + 1} /{" "}
                        {new Date(item.created_at).getFullYear()}{" "}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default NotesPart;
