import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryDropdown({ selectedCategory, setSelectedCategory }) {
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/Categories"
                );
                setCategories(response.data["Category"]);
                console.log(Categories[0]["name"]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <select
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
        >
            <option
                value=""
                disabled={selectedCategory !== "" && selectedCategory !== null}
            >
                Select a category
            </option>
            {Categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}

export default CategoryDropdown;
