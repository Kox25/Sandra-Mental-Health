import React, { useState} from "react";
import "./profileInfo.css";
import CircularLoading from "../../Components/loadingprogress/loadingProgress";
import "sweetalert2/src/sweetalert2.scss";
import ContactUs from "../../Components/SettingsCompononts/ContactUs";
import DeleteAcount from "../../Components/SettingsCompononts/DeleteAccount";
import AccountInfo from "../../Components/SettingsCompononts/AccountInfo";
import PersonalInfo from "../../Components/SettingsCompononts/PersonalInfo";
import ChangePassword from "../../Components/SettingsCompononts/ChangePassowrd";

const Settings = () => {
    const [part, setpart] = useState("Personal");
    const [isLoaded, setIsLoaded] = useState(false);

    function onUpdate(value) {
        setpart(value);
        setIsLoaded(true);
        setIsLoaded(false);
    }

    return (
        <div className="profileInfo">
            <div className="bodyContainer">
                <div className="partsPart">
                    <div className="partTitle">Settings :</div>
                    <button
                        className={`part f ${
                            part === "Personal" ? "chossen" : ""
                        }`}
                        onClick={() => onUpdate("Personal")}
                    >
                        Personal Information
                    </button>
                    <button
                        className={`part ${
                            part === "Account" ? "chossen" : ""
                        }`}
                        onClick={() => onUpdate("Account")}
                    >
                        Account Information{" "}
                    </button>
                    <button
                        className={`part ${
                            part === "Password" ? "chossen" : ""
                        }`}
                        onClick={() => onUpdate("Password")}
                    >
                        Change Password
                    </button>
                    <button
                        className={`part ${part === "Delete" ? "chossen" : ""}`}
                        onClick={() => onUpdate("Delete")}
                    >
                        Delete Account
                    </button>
                    <button
                        className={`part ${
                            part === "Contact" ? "chossen" : ""
                        }`}
                        onClick={() => onUpdate("Contact")}
                    >
                        Contact us
                    </button>
                </div>
                <div className="div"></div>
                <div className="fieldsPart">
                    {isLoaded ? (
                        <CircularLoading/>
                    ) : part === "Personal" ? (
                       <PersonalInfo/>
                    ) : part === "Account" ? (
                        <AccountInfo/>
                    ) : part === "Password" ? (
                       <ChangePassword/>
                    ) : part === "Delete" ? (
                        <DeleteAcount/>
                    ) : (
                        <ContactUs/>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Settings;
