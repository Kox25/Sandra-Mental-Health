import React, { useState } from "react";
export const MyContext = React.createContext();

const MyArticlesProv = ({ children, value, onUpdate }) => {
    const [Type, setType] = useState(value);
    const handleUpdate = (newValue) => {
        setType(newValue);
        onUpdate(newValue);
    };

    return (
        <MyContext.Provider
            value={{ Type, handleUpdate }}
        >
            {children}
        </MyContext.Provider>
    );
};
export default MyArticlesProv;
