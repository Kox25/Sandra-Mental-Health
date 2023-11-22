import React, { useState, useEffect } from "react";
import "sweetalert2/src/sweetalert2.scss";

const PersonalInfo = () => {
    return (
        <div className="j">
            {" "}
            <div className="title">Personal Information</div>
            <div>
                <label>Address :</label>
            </div>
            <input
                placeholder="address"
                type="text"
                value=""
                name="address"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />
            <div>
                <label>Phone :</label>
            </div>
            <input
                placeholder="phone"
                type="text"
                value=""
                name="phone"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />
            <div>
                <label>specialization :</label>
            </div>
             <input
                placeholder="specialization"
                type="text"
                value=""
                name="specialization"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />
            <div>
                <label>Certificate :</label>
            </div>
             <input
                placeholder="certificate"
                type="text"
                value=""
                name="certificate"
                required
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />
            <button className="saveButton"> save</button>
        </div>
    );
};
export default PersonalInfo;
