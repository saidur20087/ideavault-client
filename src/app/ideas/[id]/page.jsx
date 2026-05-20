"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Target,
  MessageSquare,
  Heart,
  Loader2,
} from "lucide-react";

const IdeaDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // FETCH IDEA
  useEffect(() => {
    if (!id) return;

    const fetchIdea = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}`);
        const data = await res.json();

        setIdea(data.idea);
        setComments(data.idea?.comments || []);
      } catch (err) {
        console.error("Error fetching idea:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  // FORMAT DATE
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // DELETE IDEA
  const handleDeleteIdea = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this idea?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Idea deleted successfully");
      router.push("/ideas");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  // ADD COMMENT
  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: comment,
            date: new Date(),
          }),
        }
      );

      const data = await res.json();

      setComments(data.comments || []);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE COMMENT
  const handleDeleteComment = async (index) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}/comment/${index}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      setComments(data.comments || []);
    } catch (err) {
      console.error(err);
    }
  };

  // START EDIT COMMENT
  const handleEditStart = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  // SAVE EDIT COMMENT
  const handleEditSave = async (index) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ideas/${id}/comment/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index,
            text: editText,
          }),
        }
      );

      const data = await res.json();

      setComments(data.comments || []);
      setEditIndex(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // NOT FOUND
  if (!idea) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-bold text-red-500">Idea Not Found</h2>
        <Link href="/ideas" className="text-indigo-600">
          ← Back to Ideas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* BACK */}
      <Link
        href="/ideas"
        className="flex items-center gap-2 text-sm mb-6 text-gray-500"
      >
        <ArrowLeft size={16} /> Back
      </Link>

      {/* CARD */}
      <div className="border rounded-2xl p-6 bg-white dark:bg-[#131926]">

        {/* CATEGORY + DATE */}
        <div className="flex gap-3 mb-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Tag size={14} /> {idea.category}
          </span>

          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(idea.createdAt)}
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>

        {/* USER + LIKES */}
        <div className="flex gap-5 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
            <User size={14} /> Anonymous
          </span>

          <span className="flex items-center gap-1 text-emerald-500">
            <Heart size={14} /> {idea.interactions || 0}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {idea.description}
        </p>

        {/* TARGET */}
        <div>
          <h3 className="flex items-center gap-2 font-semibold mb-2">
            <Target size={16} /> Target Audience
          </h3>
          <p className="text-gray-500">
            {idea.targetAudience || "Not specified"}
          </p>
        </div>

        {/* DELETE IDEA */}
        <div className="mt-6">
          <button
            onClick={handleDeleteIdea}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
          >
            Delete Idea
          </button>
        </div>

        {/* COMMENTS */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MessageSquare size={16} /> Comments
          </h3>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm"
            placeholder="Write a comment..."
          />

          <button
            onClick={handleComment}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm"
          >
            Post Comment
          </button>

          {/* COMMENT LIST */}
          <div className="mt-5 space-y-3">
            {comments.map((c, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg flex justify-between items-start"
              >
                <div className="w-full">
                  {editIndex === index ? (
                    <>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border p-2 rounded text-sm"
                      />

                      <button
                        onClick={() => handleEditSave(index)}
                        className="mt-1 text-xs text-green-600"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">{c.text}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(c.date).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>

                <div className="flex flex-col gap-1 ml-3">
                  <button
                    onClick={() => handleEditStart(index, c.text)}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteComment(index)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default IdeaDetailsPage;