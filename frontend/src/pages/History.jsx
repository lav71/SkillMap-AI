import { useEffect, useState } from "react";

const History = () => {
    const [analyses, setAnalyses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // FETCH HISTORY
    // =====================================================

    const fetchHistory = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/analyze/history",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load history"
                );
            }

            setAnalyses(data.analyses || []);

        } catch (error) {
            console.log("History error:", error);

            setError(
                error.message ||
                "Unable to load analysis history"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);


    // =====================================================
    // SCORE COLOR
    // =====================================================

    const getScoreColor = (score) => {
        if (score >= 75) {
            return "text-emerald-400";
        }

        if (score >= 50) {
            return "text-cyan-400";
        }

        if (score >= 30) {
            return "text-yellow-400";
        }

        return "text-red-400";
    };


    // =====================================================
    // SCORE BORDER
    // =====================================================

    const getScoreBorder = (score) => {
        if (score >= 75) {
            return "border-emerald-500/30 bg-emerald-500/5";
        }

        if (score >= 50) {
            return "border-cyan-500/30 bg-cyan-500/5";
        }

        if (score >= 30) {
            return "border-yellow-500/30 bg-yellow-500/5";
        }

        return "border-red-500/30 bg-red-500/5";
    };


    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {
        if (!date) {
            return "Date unavailable";
        }

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };


    // =====================================================
    // OPEN ANALYSIS
    // =====================================================

    const openAnalysis = (id) => {
        window.location.href = `/history/${id}`;
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };


    // =====================================================
    // DASHBOARD
    // =====================================================

    const goDashboard = () => {
        window.location.href = "/dashboard";
    };


    return (
        <div className="min-h-screen overflow-x-hidden bg-[#020617] text-white">


            {/* =================================================
                BACKGROUND GRID
            ================================================= */}

            <div
                className="pointer-events-none fixed inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            />


            {/* BLUE GLOW */}

            <div className="pointer-events-none fixed left-[-250px] top-[200px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />


            {/* PURPLE GLOW */}

            <div className="pointer-events-none fixed right-[-250px] top-[400px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />


            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="relative z-50 border-b border-slate-800/80 bg-[#020617]/95 backdrop-blur-xl">

                <div className="mx-auto flex h-[105px] max-w-[1550px] items-center justify-between px-5 sm:px-8 lg:px-12">


                    {/* LOGO */}

                    <div
                        onClick={goDashboard}
                        className="flex cursor-pointer items-center gap-3"
                    >

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-3xl">
                            💡
                        </div>

                        <h1 className="text-2xl font-extrabold sm:text-3xl">
                            SkillMap{" "}
                            <span className="text-cyan-400">
                                AI
                            </span>
                        </h1>

                    </div>


                    {/* NAV */}

                    <div className="flex items-center gap-3">


                        {/* DASHBOARD */}

                        <button
                            onClick={goDashboard}
                            className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500/40 hover:bg-slate-800 sm:px-6 sm:text-base"
                        >

                            <span>
                                ←
                            </span>

                            <span className="hidden sm:inline">
                                Dashboard
                            </span>

                        </button>


                        {/* LOGOUT */}

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-2xl bg-[#ff1f5a] px-4 py-3 text-sm font-bold shadow-lg shadow-pink-500/20 transition hover:bg-[#ef174f] sm:px-7 sm:text-base"
                        >

                            <span className="text-xl">
                                ⇥
                            </span>

                            <span className="hidden sm:inline">
                                Logout
                            </span>

                        </button>

                    </div>

                </div>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 sm:px-8 lg:px-12">


                {/* =================================================
                    HERO
                ================================================= */}

                <section className="pt-14 text-center sm:pt-20">


                    {/* BADGE */}

                    <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-500/40 bg-blue-500/10 px-6 py-2.5 text-sm font-semibold text-blue-400">

                        📊

                        Your Career Analytics

                    </div>


                    {/* TITLE */}

                    <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">

                        Analysis{" "}

                        <span className="bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                            History
                        </span>

                    </h2>


                    {/* DESCRIPTION */}

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">

                        View your previous resume skill gap analyses,
                        match scores and personalized career insights.

                    </p>


                    {/* STATS */}

                    <div className="mt-8 flex flex-wrap justify-center gap-3">

                        <div className="rounded-full border border-slate-800 bg-[#080f22] px-5 py-3 text-sm font-semibold text-slate-300">

                            📄 {analyses.length}{" "}
                            {analyses.length === 1
                                ? "Analysis"
                                : "Analyses"}

                        </div>


                        <div className="rounded-full border border-slate-800 bg-[#080f22] px-5 py-3 text-sm font-semibold text-slate-300">

                            🎯 Skill Gap Tracking

                        </div>


                        <div className="rounded-full border border-slate-800 bg-[#080f22] px-5 py-3 text-sm font-semibold text-slate-300">

                            💡 Career Insights

                        </div>

                    </div>

                </section>


                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="flex min-h-[350px] items-center justify-center">

                        <div className="text-center">

                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500" />

                            <p className="mt-5 text-sm font-semibold text-slate-400">
                                Loading your analysis history...
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================================
                    ERROR
                ================================================= */}

                {!loading && error && (

                    <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">

                        <div className="text-4xl">
                            ⚠️
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-red-400">
                            Unable to load history
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                            {error}
                        </p>

                        <button
                            onClick={fetchHistory}
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold transition hover:bg-blue-700"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {!loading &&
                    !error &&
                    analyses.length === 0 && (

                        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-slate-800 bg-[#080f22] p-12 text-center shadow-2xl">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 text-4xl">
                                📄
                            </div>

                            <h3 className="mt-6 text-2xl font-bold">
                                No analyses yet
                            </h3>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                Upload your resume and compare it with
                                a job description to create your first
                                SkillMap AI analysis.
                            </p>

                            <button
                                onClick={goDashboard}
                                className="mt-7 rounded-2xl bg-blue-600 px-7 py-3 font-bold shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                Start New Analysis →
                            </button>

                        </div>

                    )}


                {/* =================================================
                    HISTORY LIST
                ================================================= */}

                {!loading &&
                    !error &&
                    analyses.length > 0 && (

                        <section className="mt-14 space-y-6">


                            {analyses.map((analysis, index) => {

                                const score =
                                    Number(
                                        analysis.matchPercentage
                                    ) || 0;

                                const matched =
                                    analysis.matchedSkills?.length ||
                                    0;

                                const partial =
                                    analysis.partialSkills?.length ||
                                    0;

                                const missing =
                                    analysis.missingSkills?.length ||
                                    0;


                                return (

                                    <article
                                        key={
                                            analysis._id ||
                                            index
                                        }
                                        onClick={() =>
                                            openAnalysis(
                                                analysis._id
                                            )
                                        }
                                        className="group cursor-pointer rounded-3xl border border-slate-800 bg-[#080f22] p-5 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-blue-500/5 sm:p-7"
                                    >


                                        {/* TOP */}

                                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                                            {/* LEFT */}

                                            <div className="flex min-w-0 gap-5">


                                                {/* ICON */}

                                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl">
                                                    📄
                                                </div>


                                                {/* INFO */}

                                                <div className="min-w-0">

                                                    <div className="flex flex-wrap items-center gap-3">

                                                        <h3 className="text-xl font-extrabold sm:text-2xl">
                                                            Resume Analysis
                                                        </h3>

                                                        {index === 0 && (

                                                            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                                                                Latest
                                                            </span>

                                                        )}

                                                    </div>


                                                    <p className="mt-2 text-sm text-slate-500">
                                                        {formatDate(
                                                            analysis.createdAt
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            {/* SCORE */}

                                            <div
                                                className={`shrink-0 rounded-2xl border px-6 py-4 text-center ${getScoreBorder(
                                                    score
                                                )}`}
                                            >

                                                <p className="text-xs font-semibold text-slate-500">
                                                    Match Score
                                                </p>

                                                <p
                                                    className={`mt-1 text-3xl font-black ${getScoreColor(
                                                        score
                                                    )}`}
                                                >
                                                    {score}%
                                                </p>

                                            </div>

                                        </div>


                                        {/* DIVIDER */}

                                        <div className="my-6 border-t border-slate-800" />


                                        {/* JOB DESCRIPTION */}

                                        <div>

                                            <p className="text-sm font-bold text-slate-300">
                                                Job Description
                                            </p>

                                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 sm:text-base">
                                                {analysis.jobDescription ||
                                                    "No job description available."}
                                            </p>

                                        </div>


                                        {/* SKILL COUNTS */}

                                        <div className="mt-6 flex flex-wrap gap-3">


                                            {/* MATCHED */}

                                            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">

                                                ✓ Matched: {matched}

                                            </span>


                                            {/* PARTIAL */}

                                            <span className="rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">

                                                ~ Partial: {partial}

                                            </span>


                                            {/* MISSING */}

                                            <span className="rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-400">

                                                × Missing: {missing}

                                            </span>

                                        </div>


                                        {/* BOTTOM */}

                                        <div className="mt-6 flex flex-col gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">


                                            <p className="text-sm text-slate-600 transition group-hover:text-slate-400">
                                                Click to view detailed analysis
                                            </p>


                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    openAnalysis(
                                                        analysis._id
                                                    );
                                                }}
                                                className="self-start font-bold text-blue-400 transition hover:text-cyan-400 sm:self-auto"
                                            >
                                                View Analysis →
                                            </button>

                                        </div>

                                    </article>

                                );

                            })}

                        </section>

                    )}


            </main>

        </div>
    );
};

export default History;