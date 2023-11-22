import React, { useContext, useEffect, useState } from "react";
import "./articleTypes.css";
import { MyContext } from "../../../Providers/MyArticlesProv";

const ArticleTypes = () => {
    const { Type, handleUpdate } = useContext(MyContext);
    const [Types, setTypes] = useState([
        { name: "All", id: 0 },
        { name: "Pending", id: 1 },
        { name: "Published", id: 2 },
        { name: "Rejected", id: 3 },
    ]);

    function onUpdate(value) {
        console.log(value);
        handleUpdate(value);
    }

    return (
        <div className="Types">
            Types :
            <div className="Type">
                {Types.map((item) => (
                    <div>
                    <button
                        onClick={() => onUpdate(item.id)}
                        id={item.id}
                        className={Type === item.id ? "selected" : "none"}
                    >
                        {item.name}
                    </button>
                    </div>
                ))}
                </div>
            </div>
    );
};
export default ArticleTypes;
