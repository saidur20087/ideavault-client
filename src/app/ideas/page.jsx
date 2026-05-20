"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, ArrowRight, Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const IdeasPage = () => {
  const router = useRouter();

  const [ideas, setIdeas] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas`);
        const data = await res.json();

        console.log("RAW API DATA:", data);

        const list = Array.isArray(data)
          ? data
          : data?.ideas || [];

        setIdeas(list);
        setFilteredIdeas(list);
      } catch (err) {
        console.error("Error loading ideas:", err);
        setIdeas([]);
        setFilteredIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // =========================
  // FILTER LOGIC
  // =========================
  useEffect(() => {
    let result = [...ideas];

    if (category !== "All") {
      result = result.filter(
        (idea) => idea.category === category
      );
    }

    if (search.trim()) {
      result = result.filter((idea) =>
        idea.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredIdeas(result);
  }, [search, category, ideas]);

  // =========================
  // AUTH + NAVIGATION
  // =========================
  const handleViewDetails =  (id) => {

    router.push(`/ideas/${id}`);
          
  };

  // =========================
  // DATE FORMAT
  // =========================
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories = [
    "All",
    "AI & Automation",
    "HealthTech",
    "EdTech",
    "FinTech",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">
        All Startup Ideas
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">

        {/* SEARCH */}
        <div className="relative w-full">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl dark:bg-[#131926]"
          />
        </div>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-60 px-4 py-2 border rounded-xl dark:bg-[#131926]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>

      ) : filteredIdeas.length === 0 ? (
        <p className="text-center text-gray-500">
          No ideas found
        </p>

      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredIdeas.map((idea) => (
            <div
              key={idea._id}
              className="border rounded-xl p-5 bg-white dark:bg-[#131926]"
            >

              {/* TITLE */}
              <h2 className="text-xl font-bold mb-2">
                {idea.title}
              </h2>

              {/* CATEGORY */}
              <p className="text-sm text-gray-500 mb-3">
                {idea.category}
              </p>

              {/* DESCRIPTION */}
              <p className="text-sm mb-4 line-clamp-3">
                {idea.description}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center text-xs text-gray-400">

                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(idea.createdAt)}
                </span>

                {/* VIEW BUTTON */}
                <button
                  onClick={() => handleViewDetails(idea._id)}
                  className="text-indigo-600 font-semibold flex items-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default IdeasPage;