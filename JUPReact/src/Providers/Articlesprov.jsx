import React, { useState } from "react";
export const ArticlesContext = React.createContext();

const ArticlesProv = ({ children }) => {
    const [Articles, setArticles] = useState([]);
    console.log(Articles);
    return (
        <ArticlesContext.Provider value={{ Articles, setArticles }}>
            {children}
        </ArticlesContext.Provider>
    );
};
export default ArticlesProv;
