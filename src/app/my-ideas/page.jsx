"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const MyIdeaPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH IDEAS
  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/ideas");
      const data = await res.json();

      setIdeas(data.ideas || []);
    } catch (err) {
      console.error(err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // DELETE IDEA
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this idea?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/ideas/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        // remove from UI instantly
        setIdeas((prev) => prev.filter((idea) => idea._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Loading ideas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">
        My Ideas
      </h1>

      {/* EMPTY STATE */}
      {ideas.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No ideas found
        </div>
      ) : (
        <div className="space-y-4">

          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="border p-4 rounded-lg bg-white dark:bg-[#131926] flex justify-between items-start"
            >

              {/* LEFT SIDE */}
              <div>
                <h2 className="text-lg font-semibold">
                  {idea.title}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {idea.description}
                </p>

                <div className="text-xs text-gray-400 mt-2 flex gap-3">
                  <span>{idea.category}</span>
                  <span>
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  href={`/ideas/${idea._id}`}
                  className="text-sm text-indigo-600 hover:underline mt-2 inline-block"
                >
                  View Details →
                </Link>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(idea._id)}
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

export default MyIdeaPage;