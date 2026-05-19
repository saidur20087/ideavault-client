"use client";

import { useEffect, useState } from "react";

const MyInteractions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // FETCH INTERACTIONS
    const fetchInteractions = async () => {
        try {
            setLoading(true);

            const res = await fetch("http://localhost:5000/api/interactions");
            const result = await res.json();

            // ⚠️ FIX: backend might return array directly OR {success, data}
            setData(Array.isArray(result) ? result : result.data || []);
        } catch (err) {
            console.error("Error fetching interactions:", err);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInteractions();
    }, []);

    // FORMAT DATE
    const formatDate = (dateString) => {
        if (!dateString) return "No date";
        return new Date(dateString).toLocaleString();
    };

    // DELETE INTERACTION
    const handleDelete = async (index) => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/interactions/delete",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ index }),
                }
            );

            const result = await res.json();

            setData(result.updatedInteractions || []);
        } catch (err) {
            console.error(err);
        }
    };

    // LOADING
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-500">Loading interactions...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">

            {/* TITLE */}
            <h1 className="text-2xl font-bold mb-6">
                My Interactions
            </h1>

            {/* EMPTY STATE */}
            {data.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No interactions found
                </div>
            ) : (
                <div className="space-y-4">

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-lg bg-white dark:bg-[#131926] flex justify-between items-start"
                        >

                            {/* LEFT SIDE */}
                            <div>
                                <p className="font-semibold text-lg">
                                    {item.ideaTitle}
                                </p>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                    {item.comment}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {formatDate(item.date)}
                                </p>
                            </div>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Delete
                            </button>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default MyInteractions;