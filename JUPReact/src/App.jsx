import React from "react";
import "./App.css";
import ShowArticles from "./pages/ShowArticles/ShowArticles";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ArticleContent from "./pages/ArticleContent/ArticleContent";
import RootLayout from "./pages/RootLayout/RootLayout";
import AddArticle from "./pages/AddArticle/AddArticle";
import Login from "./pages/login/Login";
import EditArticle from "./pages/editArticle/editArticle";
import EditArticleContent from "./pages/editArticle/editArticleContent";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import Doctor from "./pages/Doctor/Doctor";
import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/SignUp/SignUp";
import Settings from "./pages/profileInfo/profileInfo";
import PendingArticles from "./pages/pendingArticless/PendingArticles/pendingArticles";
import PArticleContent from "./pages/pendingArticless/ArticleContent/ArticleContent";
import MyArticles from "./pages/pendingArticless/myArticles/myArticles";
import MyArticleContent from "./pages/pendingArticless/myArticleContent/myArticleContent";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="articles" element={<ShowArticles />} />
            <Route path="articles/pending" element={<PendingArticles />} />
            <Route path="articles/pending/:id" element={<PArticleContent/>} />
            <Route path="articles/AddArticle" element={<AddArticle />} />
            <Route path="articles/:category/:id" element={<ArticleContent />} />
            <Route
                path="articles/:category/:id/update"
                element={<EditArticle />}
            />
            <Route
                path="articles/:category/:id/update/content"
                element={<EditArticleContent />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/user" element={<User />} />
            <Route path="Settings" element={<Settings />} />
            <Route path="articles/pending/myPendings" element={<MyArticles/>} />
            <Route path="articles/pending/myPendings/:id" element={<MyArticleContent/>} />


        </Route>
    )
);
const App = () => {
    return (
        <div className="body">
            <RouterProvider router={router} />
        </div>
    );
};
export default App;
