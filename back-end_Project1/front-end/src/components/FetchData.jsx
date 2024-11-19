import React, { useEffect, useState } from "react";

function FetchData() {
    const [data, setData] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true); // To show loading state
    const [error, setError] = useState(null); // To show error message

    useEffect(() => {
        fetch("http://localhost:3000/note")
            .then((res) => res.json())
            .then((data) => {
                setData(data); // Set data from response
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading text until data is fetched
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error if any
    }

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div>{item.content}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FetchData;
