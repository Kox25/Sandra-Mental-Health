import React, { useState } from "react";
export const MyContext = React.createContext();

const ArticleCategoryProv = ({ children, value, onUpdate }) => {
    const [Category, setCategory] = useState(value);
    const [Categories, setCategories] = useState([]);
    const handleUpdate = (newValue) => {
        setCategory(newValue);
        onUpdate(newValue);
    };

    return (
        <MyContext.Provider
            value={{ Category, Categories, handleUpdate, setCategories }}
        >
            {children}
        </MyContext.Provider>
    );
};
export default ArticleCategoryProv;
