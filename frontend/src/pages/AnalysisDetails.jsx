import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnalysisDetails = () => {
    const { id } = useParams();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalysis();
    }, []);

    const fetchAnalysis = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/analyze/${id}`,
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
                    data.message || "Failed to fetch analysis"
                );
            }

            setAnalysis(data.analysis);

        } catch (error) {
            console.log("Analysis Details Error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* ================= LOADING ================= */

    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-[#020617] px-4 text-white">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-500"></div>

                    <h2 className="text-lg font-semibold sm:text-2xl">
                        Loading analysis...
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Preparing your career insights
                    </p>
                </div>
            </div>
        );
    }

    /* ================= ERROR ================= */

    if (error) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-[#020617] px-4 text-white">
                <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0f172a] p-6 text-center shadow-xl sm:p-8">

                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-2xl">
                        ⚠️
                    </div>

                    <h2 className="mb-3 break-words text-xl font-semibold text-red-400 sm:text-2xl">
                        {error}
                    </h2>

                    <button
                        onClick={() => (window.location.href = "/history")}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
                    >
                        ← Back to History
                    </button>

                </div>
            </div>
        );
    }

    if (!analysis) {
        return null;
    }

    const matchPercentage = Math.min(
        Math.max(Number(analysis.matchPercentage) || 0, 0),
        100
    );

    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#020617] text-white">

            {/* ================= NAVBAR ================= */}

            <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur">

                <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-3 px-3 py-4 sm:px-6 sm:py-5 lg:px-8">

                    <button
                        onClick={() =>
                            (window.location.href = "/dashboard")
                        }
                        className="min-w-0 shrink truncate text-left text-lg font-bold text-blue-500 transition hover:text-blue-400 sm:text-2xl"
                    >
                        SkillMap AI
                    </button>

                    <button
                        onClick={() =>
                            (window.location.href = "/history")
                        }
                        className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold transition hover:bg-blue-700 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                        ← History
                    </button>

                </div>
            </nav>

            {/* ================= MAIN ================= */}

            <main className="mx-auto w-full max-w-6xl min-w-0 px-3 py-7 sm:px-6 sm:py-12 lg:px-8">

                {/* ================= HEADING ================= */}

                <div className="mx-auto mb-8 w-full max-w-3xl min-w-0 text-center sm:mb-10">

                    <div className="mb-4 inline-flex max-w-full rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:text-sm">
                        AI Career Analysis
                    </div>

                    <h2 className="break-words text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Resume Analysis
                    </h2>

                    <p className="mx-auto mt-3 w-full max-w-2xl break-words text-sm leading-6 text-slate-400 sm:text-base">
                        Detailed analysis of your resume against the selected
                        job description
                    </p>

                </div>

                {/* ================= MATCH SCORE ================= */}

                <div className="mb-6 w-full min-w-0 overflow-hidden rounded-2xl border border-blue-500/20 bg-[#0f172a] p-5 text-center shadow-xl sm:p-8">

                    <p className="text-sm text-slate-400 sm:text-base">
                        Resume Match Score
                    </p>

                    <div className="mt-3 text-5xl font-bold text-blue-500 sm:text-6xl lg:text-7xl">
                        {matchPercentage}%
                    </div>

                    {/* Progress */}

                    <div className="mx-auto mt-5 h-2 w-full max-w-xl overflow-hidden rounded-full bg-slate-800">

                        <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-700"
                            style={{
                                width: `${matchPercentage}%`,
                            }}
                        />

                    </div>

                    <p className="mt-3 break-words text-xs text-slate-500 sm:text-sm">
                        Based on skills, experience and job requirements
                    </p>

                </div>

                {/* ================= SKILLS ================= */}

                <div className="mb-6 grid w-full min-w-0 grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">

                    {/* MATCHED */}

                    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-green-500/20 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                        <div className="mb-4 flex min-w-0 items-center justify-between gap-3">

                            <h3 className="min-w-0 break-words text-lg font-semibold text-green-400 sm:text-xl">
                                Matched Skills
                            </h3>

                            <span className="shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                                {analysis.matchedSkills?.length || 0}
                            </span>

                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2">

                            {analysis.matchedSkills?.length > 0 ? (
                                analysis.matchedSkills.map(
                                    (skill, index) => (
                                        <span
                                            key={index}
                                            className="max-w-full break-words rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-xs text-green-400 sm:text-sm"
                                        >
                                            ✓ {skill}
                                        </span>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No matched skills
                                </p>
                            )}

                        </div>

                    </div>

                    {/* PARTIAL */}

                    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-yellow-500/20 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                        <div className="mb-4 flex min-w-0 items-center justify-between gap-3">

                            <h3 className="min-w-0 break-words text-lg font-semibold text-yellow-400 sm:text-xl">
                                Partial Skills
                            </h3>

                            <span className="shrink-0 rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                                {analysis.partialSkills?.length || 0}
                            </span>

                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2">

                            {analysis.partialSkills?.length > 0 ? (
                                analysis.partialSkills.map(
                                    (skill, index) => (
                                        <span
                                            key={index}
                                            className="max-w-full break-words rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs text-yellow-400 sm:text-sm"
                                        >
                                            ~ {skill}
                                        </span>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No partial skills
                                </p>
                            )}

                        </div>

                    </div>

                    {/* MISSING */}

                    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-red-500/20 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                        <div className="mb-4 flex min-w-0 items-center justify-between gap-3">

                            <h3 className="min-w-0 break-words text-lg font-semibold text-red-400 sm:text-xl">
                                Missing Skills
                            </h3>

                            <span className="shrink-0 rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                                {analysis.missingSkills?.length || 0}
                            </span>

                        </div>

                        <div className="flex min-w-0 flex-wrap gap-2">

                            {analysis.missingSkills?.length > 0 ? (
                                analysis.missingSkills.map(
                                    (skill, index) => (
                                        <span
                                            key={index}
                                            className="max-w-full break-words rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 sm:text-sm"
                                        >
                                            ✕ {skill}
                                        </span>
                                    )
                                )
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No missing skills
                                </p>
                            )}

                        </div>

                    </div>

                </div>

                {/* ================= EXPERIENCE ================= */}

                <div className="mb-6 w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                    <div className="mb-4 flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                            💼
                        </div>

                        <h3 className="min-w-0 break-words text-xl font-semibold sm:text-2xl">
                            Experience Analysis
                        </h3>

                    </div>

                    <p className="break-words text-sm leading-7 text-slate-400 sm:text-base">
                        {analysis.experienceAnalysis ||
                            "No experience analysis available."}
                    </p>

                </div>

                {/* ================= RESUME IMPROVEMENTS ================= */}

                <div className="mb-6 w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                    <div className="mb-5 flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                            📝
                        </div>

                        <h3 className="min-w-0 break-words text-xl font-semibold sm:text-2xl">
                            Resume Improvements
                        </h3>

                    </div>

                    <div className="space-y-3">

                        {analysis.resumeImprovements?.length > 0 ? (
                            analysis.resumeImprovements.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="flex min-w-0 gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
                                    >
                                        <span className="mt-0.5 shrink-0 text-blue-500">
                                            ✓
                                        </span>

                                        <p className="min-w-0 break-words text-sm leading-6 text-slate-300 sm:text-base">
                                            {item}
                                        </p>
                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-sm text-slate-500">
                                No resume improvements available.
                            </p>
                        )}

                    </div>

                </div>

                {/* ================= LEARNING ROADMAP ================= */}

                <div className="mb-6 w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                    <div className="mb-5 flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                            🗺️
                        </div>

                        <div className="min-w-0">

                            <h3 className="break-words text-xl font-semibold sm:text-2xl">
                                Learning Roadmap
                            </h3>

                            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                Skills you should focus on next
                            </p>

                        </div>

                    </div>

                    <div className="space-y-4">

                        {analysis.learningRoadmap?.length > 0 ? (
                            analysis.learningRoadmap.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="w-full min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
                                    >

                                        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                            <div className="min-w-0">

                                                <div className="flex min-w-0 items-start gap-3">

                                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                                                        {index + 1}
                                                    </span>

                                                    <h4 className="min-w-0 break-words text-base font-semibold text-blue-400 sm:text-lg">
                                                        {item.skill}
                                                    </h4>

                                                </div>

                                            </div>

                                            <span className="w-fit max-w-full shrink-0 break-words rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 sm:text-sm">
                                                {item.priority}
                                            </span>

                                        </div>

                                        <div className="mt-4 flex min-w-0 flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">

                                            <span className="shrink-0">
                                                ⏱️ Estimated Time:
                                            </span>

                                            <span className="break-words text-slate-400">
                                                {item.estimatedTime}
                                            </span>

                                        </div>

                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-sm text-slate-500">
                                No learning roadmap available.
                            </p>
                        )}

                    </div>

                </div>

                {/* ================= INTERVIEW QUESTIONS ================= */}

                <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] p-5 shadow-xl sm:p-6">

                    <div className="mb-5 flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-lg">
                            🎯
                        </div>

                        <div className="min-w-0">

                            <h3 className="break-words text-xl font-semibold sm:text-2xl">
                                Interview Questions
                            </h3>

                            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                Questions based on your resume and target role
                            </p>

                        </div>

                    </div>

                    <div className="space-y-3">

                        {analysis.interviewQuestions?.length > 0 ? (
                            analysis.interviewQuestions.map(
                                (question, index) => (
                                    <div
                                        key={index}
                                        className="flex min-w-0 gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
                                    >

                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400">
                                            {index + 1}
                                        </span>

                                        <p className="min-w-0 break-words text-sm leading-6 text-slate-300 sm:text-base">
                                            {question}
                                        </p>

                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-sm text-slate-500">
                                No interview questions available.
                            </p>
                        )}

                    </div>

                </div>

                {/* ================= BACK BUTTON ================= */}

                <div className="mt-8 flex justify-center">

                    <button
                        onClick={() =>
                            (window.location.href = "/history")
                        }
                        className="w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-400 sm:w-auto"
                    >
                        ← Back to Analysis History
                    </button>

                </div>

            </main>

        </div>
    );
};

export default AnalysisDetails;