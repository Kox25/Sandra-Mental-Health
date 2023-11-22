import React, { useRef } from "react";
import "./AddArticleForm.css";

import CategoryDropdown from "../../dropDownCat/dropDownCat";
const AddArticleForm = ({
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
    removeImg,
}) => {
    const fileInputRef = useRef(null);
    console.log(image);

    const handleImageUpload = () => {
        fileInputRef.current.click();
    };
    return (
        <div className="FormCol">
            <div className="title">
                <h2>Add Article</h2>
            </div>
            <form onSubmit={submit}>
                <div className="titlePart">
                    Title :
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
                    Category :
                    <CategoryDropdown
                        selectedCategory={Category}
                        setSelectedCategory={setCategory}
                    />
                </div>
                <div className="imagePart">
                    Image :
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={imagefunction}
                        ref={fileInputRef}
                    />
                    <div className="imagebuttons">
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="imageButton"
                        >
                            {image !== null ? (
                                <div className="setimg">
                                    <img src={imageURL} alt="" />
                                    <div className="imgText">Edit</div>
                                </div>
                            ) : (
                                "+Add"
                            )}
                        </button>
                        {image!==null?
                        <div className="remove">
                            <button type="button" onClick={(e) => removeImg(e)}>
                                X
                            </button>
                        </div>:null}
                    </div>
                </div>
                {page === "edit" ? (
                    <div></div>
                ) : (
                    <div
                        className={
                            page === "edit" ? "editcontentPart" : "contentPart"
                        }
                    >
                        <label>Content :</label>

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
    );
};
export default AddArticleForm;
