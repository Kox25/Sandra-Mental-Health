// LikeDislikePost.js (React component)
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./likeButton.css";

const LikeButton = ({ handleLike, handleDislike, isLiked, likes, button }) => {
    console.log(isLiked);

    if (button === "no") {
        return (
            <div className="likebutton">
                {!isLiked ? (
                    <div className="dislike">
                        <AiOutlineHeart className="dislikeicon" />{" "}
                        <label htmlFor="">{likes}</label>
                    </div>
                ) : (
                    <div className="like">
                        <AiFillHeart className="likeicon" />{" "}
                        <label htmlFor="">{likes}</label>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="likebutton">
                {!isLiked ? (
                    <button
                        className="dislike"
                        onClick={handleLike}
                        disabled={isLiked}
                    >
                        <AiOutlineHeart className="dislikeicon" />{" "}
                        <label htmlFor="">{likes}</label>
                    </button>
                ) : (
                    <button
                        className="like"
                        onClick={handleDislike}
                        disabled={!isLiked}
                    >
                        <AiFillHeart className="likeicon" />{" "}
                        <label htmlFor="">{likes}</label>
                    </button>
                )}
            </div>
        );
    }
};

export default LikeButton;
