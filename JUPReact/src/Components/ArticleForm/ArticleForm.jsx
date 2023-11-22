import React, { useRef } from "react";
import "./ArticleForm.css";

import CategoryDropdown from "../dropDownCat/dropDownCat";
const ArticleForm = ({
    page,
    image,
    imageURL,
    imagefunction,
    contentfunction,
    submit,
    Category,
    setCategory,
    title,
    setTitle,
    cancel,
}) => {
    const fileInputRef = useRef(null);
    console.log(image);
    
    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="FormCol">
            <div className="articleForm">
                <div className="title">
                    {page === "edit" ? (
                        <h2>edit Article</h2>
                    ) : (
                        <h2>Add Article</h2>
                    )}
                </div>
                <form onSubmit={submit}>
                    <div className="titlePart">
                        <input
                            placeholder="Title"
                            type="text"
                            value={title}
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="catPart">
                        <CategoryDropdown
                            selectedCategory={Category}
                            setSelectedCategory={setCategory}
                        />
                    </div>
                    <div className="imagePart">
                        Image:
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={imagefunction}
                            ref={fileInputRef}
                        />
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="imageButton"
                        >
                            {image !== null ? (
                                <img src={imageURL} alt="" />
                            ) : (
                                "+Add"
                            )}
                        </button>
                    </div>
                    {page === "edit" ? (
                        <div></div>
                    ) : (
                        <div
                            className={
                                page === "edit"
                                    ? "editcontentPart"
                                    : "contentPart"
                            }
                        >
                            <label>Content:</label>

                            <input
                                type="file"
                                name="textFile"
                                accept=".txt"
                                onChange={contentfunction}
                                required
                                className="contentbutton"
                            />
                        </div>
                    )}
                    <div className="submitPart">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={cancel}>
                            cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default ArticleForm;
