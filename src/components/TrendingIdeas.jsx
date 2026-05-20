"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Calendar,
} from "lucide-react";

const TrendingIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas`)
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data.ideas.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading trending ideas:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div id="ideas" className="max-w-7xl mx-auto px-6 py-20 scroll-mt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Trending Startup Ideas
        </h2>

        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
          Discover top-voted and highly discussed concepts from global innovators.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600 dark:text-amber-500" />

          <p className="text-sm text-gray-500 mt-4">
            Loading amazing ideas from database...
          </p>
        </div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-2xl border-gray-200 dark:border-gray-800">
          <p className="text-gray-500">
            No startup ideas shared yet. Be the pioneer!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="flex flex-col justify-between bg-white dark:bg-[#131926]/40 border border-gray-200 dark:border-gray-800/60 rounded-2xl p-6 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                    {idea.category || "General Tech"}
                  </span>

                  <span className="text-xs text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(idea.createdAt)}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                  {idea.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {idea.description || idea.shortDescription}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800/60">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Interactions: {idea.interactions || 0}
                </span>

                <Link
                  href={`/ideas/${idea._id}`}
                  className="text-indigo-600 font-semibold flex items-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingIdeas;