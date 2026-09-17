import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            const data = response.data;

            login(data.user, data.token);

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-8 text-white flex items-center justify-center">

            <div className="w-full max-w-md">

                {/* Logo / Heading */}
                <div className="mb-8 text-center">

                    <h1 className="text-4xl font-bold text-blue-500">
                        SkillMap AI
                    </h1>

                    <p className="mt-2 text-slate-400">
                        AI-powered Resume Skill Gap Analyzer
                    </p>

                </div>


                {/* Login Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Welcome Back
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Login to continue to your dashboard
                        </p>

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}


                    {/* Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />

                        </div>


                        {/* Password */}
                        <div>

                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />

                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                    </form>


                    {/* Register */}
                    <p className="mt-6 text-center text-sm text-slate-400">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-medium text-blue-400 transition hover:text-blue-300"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;