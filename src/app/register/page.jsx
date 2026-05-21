"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Link2, Lock, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!/[A-Z]/.test(formData.password)) {
      setError("Password must include at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(formData.password)) {
      setError("Password must include at least one lowercase letter.");
      return;
    }

    try {
      setLoading(true);

      const { error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.photoUrl,
      });

      setLoading(false);

      if (authError) {
        setError(authError.message || "Something went wrong");
        toast.error(authError.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
      toast.error("Signup failed");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      toast.error("Google sign-up failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] mt-4 flex items-center justify-center bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 px-4 sm:px-6 md:px-10 py-8 transition-colors duration-300 relative overflow-hidden">

      <Toaster position="top-center" />

      {/* background blur */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* card */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-gray-50 dark:bg-[#131926]/40 border border-gray-200 dark:border-gray-800/60 p-6 sm:p-8 rounded-2xl shadow-xl relative z-10">

        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            Join IdeaVault and start sharing ideas
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 dark:border-gray-800 rounded-xl bg-white dark:bg-[#0b0f19] hover:bg-gray-100 dark:hover:bg-[#161f30] text-sm font-medium"
        >
      <FaGoogle size={20} className="text-red-600" />
          Sign up with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
          <span className="px-3 text-xs text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-800"></div>
        </div>

        {/* form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* name */}
          <InputField
            icon={<User size={18} />}
            label="Full Name"
            type="text"
            placeholder="John Doe"
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          {/* email */}
          <InputField
            icon={<Mail size={18} />}
            label="Email"
            type="email"
            placeholder="name@example.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* photo */}
          <InputField
            icon={<Link2 size={18} />}
            label="Photo URL"
            type="url"
            placeholder="https://example.com/photo.jpg"
            onChange={(e) =>
              setFormData({ ...formData, photoUrl: e.target.value })
            }
          />

          {/* password */}
          <InputField
            icon={<Lock size={18} />}
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
            <ArrowRight size={16} />
          </button>

        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5">
          Already have account?{" "}
          <Link href="/login" className="text-amber-500 font-bold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;

/* reusable input */
function InputField({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>

        <input
          {...props}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0b0f19] focus:outline-none focus:border-amber-500 text-sm"
        />
      </div>
    </div>
  );
}