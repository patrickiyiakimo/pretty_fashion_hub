"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  // ✅ Load API endpoint from environment variable
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${API_ENDPOINT}/api/auth/reset-password?token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center px-5 justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <form
        onSubmit={handleReset}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded-md mb-4 dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-500 text-white p-3 rounded-md hover:bg-purple-400 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
