"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateUserModal = ({ user, onUpdate }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
        }
    }, [user]);

    if (!user) return <p>Loading...</p>;



    const handleUpdate = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/auth/update-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, image }),
            });

            const data = await res.json();

            console.log("UPDATE RESPONSE:", data);

          
            if (!res.ok || data.success === false) {
                toast.error(data.message || "Update failed");
                return;
            }

            toast.success("Profile updated");

            // session refresh
            await authClient.useSession().refetch();

        } catch (err) {
            console.error("UPDATE ERROR:", err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="mt-4 space-y-3 w-full">

            {/* NAME */}
            <input
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />

            {/* IMAGE */}
            <input
                className="w-full border p-2 rounded"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
            />

            {/* BUTTON */}
            <button
                onClick={handleUpdate}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded"
            >
                {loading ? "Updating..." : "Update Profile"}
            </button>

        </div>
    );
};

export default UpdateUserModal;