"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";


const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // EMAIL LOGIN
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectPath,
      });

      if (res?.error) {
        setError(res.error.message || "Login failed");
        toast.error(res.error.message || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push(redirectPath);

    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectPath,
      });

    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] mt-4 flex items-center justify-center bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 px-4 sm:px-6 md:px-10 py-8 relative overflow-hidden">
      <Toaster position="top-center" />

      {/* BACKGROUND */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* CARD */}
      <div className="w-full max-w-md bg-gray-50 dark:bg-[#131926]/40 border border-gray-200 dark:border-gray-800/60 p-6 sm:p-8 rounded-2xl shadow-xl z-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">Login to continue</p>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl bg-white dark:bg-[#0b0f19] text-sm font-medium disabled:opacity-50"
        >
          <FaGoogle size={20} className="text-red-600" />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-xs text-gray-400">or email</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* FORM */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* EMAIL */}
          <InputField
            icon={<Mail size={18} />}
            label="Email"
            type="email"
            value={email}
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <InputField
            icon={<Lock size={18} />}
            label="Password"
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ERROR */}
          {error && <p className="text-red-500 text-xs">{error}</p>}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-black font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Sign In"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don’t have an account?{" "}
          <Link href="/register" className="text-amber-500 font-bold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};


export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0f19]">
        <p className="text-gray-500 text-sm">Loading login form...</p>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

/* INPUT COMPONENT */
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
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white dark:bg-[#0b0f19] text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}