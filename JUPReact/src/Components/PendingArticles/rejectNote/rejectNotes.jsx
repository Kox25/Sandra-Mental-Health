import React, { useEffect, useState } from "react";
import "./rejectNotes.css";
import axiosClient from "../../../axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

const RejectNote = ({ onClose, id }) => {
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();
    const userType = localStorage.getItem("user-type");
 
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
                    formData.append("notes", notes);
                    console.log(notes);
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
    const handleContentChange = (e) => {
        setNotes(e.target.value);
    };
    if (userType !== "admin") {
        return (
            <div className="noteOverlay">
                <div className="noteContainer">
                    <div className="titlePart">
                        <p>Write your notes here please..</p>
                        <button
                            type="button"
                            className="closeButton"
                            onClick={onClose}
                        >
                            X
                        </button>
                    </div>

                    <form className="noteForm">
                        <div className="noteArea">
                            <textarea
                                type="text"
                                className="notes"
                                onChange={handleContentChange}
                                value={notes}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="saveButton"
                                onClick={reject}
                                disabled={!notes}
                            >
                                save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else{
      return(<div></div>);
    }
};

export default RejectNote;
