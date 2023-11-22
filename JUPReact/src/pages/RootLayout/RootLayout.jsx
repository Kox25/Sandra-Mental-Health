import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbars from "../../Components/Header/Navbars";
import Footer2 from "../../Components/Footer/Footer2";
import { useNavigate } from "react-router-dom";
import Navbarr from "../../Components/Header/Navbar2";

const RootLayout = () => {
    const excludedPaths = ["/login", "/signup", "/AddArticle"];

    const location = useLocation();
    const boole =
        (location.pathname.includes("/update") &&
            location.pathname.includes("/articles")) ||
        excludedPaths.some((path) => location.pathname.includes(path));

    const navigate = useNavigate();

    console.log(localStorage.getItem("user-info"));
    useEffect(() => {
        if (
            !localStorage.getItem("user-info") &&
            !location.pathname.includes("/login") &&
            !location.pathname.includes("/signup")
        ) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="bd">
            <header>
                <Navbarr />
            </header>
            <main>
                
                <Outlet />
            </main>

            {!boole ? (
                <footer>
                    <Footer2 />
                </footer>
            ) : null}
        </div>
    );
};
export default RootLayout;
