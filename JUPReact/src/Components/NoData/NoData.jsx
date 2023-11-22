import React from "react";
import "./NoData.css";

const NoData = ({ content }) => {
    return (
        <>
            <div className="NoDataContainer">
                <p>{content} </p>
            </div>
        </>
    );
};
export default NoData;
