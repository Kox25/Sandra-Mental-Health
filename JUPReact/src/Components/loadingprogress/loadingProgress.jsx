import React from "react";
import { ClipLoader } from "react-spinners";
import "./loadingProgress.css";

function CircularLoading() {
    return (
        <div className="loading-overlay">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
    );
}

export default CircularLoading;
