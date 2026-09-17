import { useState } from "react";

const Dashboard = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resume) {
      setError("Please upload your resume PDF.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Analysis failed");
      }

      setAnalysis(data.analysis);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">

        <div className="mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between gap-2 px-3 py-4 sm:gap-4 sm:px-6 lg:px-8">

          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="shrink-0 text-lg font-bold text-blue-500 sm:text-2xl"
          >
            SkillMap AI
          </button>

          <div className="flex shrink-0 items-center gap-2">

            <button
              onClick={() => (window.location.href = "/history")}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium transition hover:border-blue-500 hover:bg-slate-800 sm:px-4 sm:text-sm"
            >
              History
            </button>

            <button
              onClick={logout}
              className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium transition hover:bg-red-600 sm:px-4 sm:text-sm"
            >
              Logout
            </button>

          </div>

        </div>

      </nav>


      {/* ================= MAIN ================= */}
      <main className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* ================= HEADING ================= */}
        <div className="mx-auto mb-10 w-full max-w-3xl text-center">

          <div className="mb-4 inline-flex max-w-full rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:text-sm">
            AI-Powered Career Analysis
          </div>

          <h2 className="break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Resume Skill Gap Analyzer
          </h2>

          <p className="mx-auto mt-4 w-full max-w-2xl break-words text-sm leading-6 text-slate-400 sm:text-base">
            Compare your resume with any job description and discover
            your strengths, skill gaps and personalized learning path.
          </p>

        </div>


        {/* ================= INPUT SECTION ================= */}
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">

          {/* ================= RESUME ================= */}
          <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                📄
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-semibold sm:text-xl">
                  Upload Resume
                </h3>

                <p className="text-sm text-slate-500">
                  Upload your latest resume
                </p>
              </div>

            </div>


            <label
              htmlFor="resume"
              className="group flex min-h-56 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 px-4 py-8 text-center transition hover:border-blue-500 hover:bg-blue-500/5 sm:px-5"
            >

              <div className="mb-4 text-5xl transition group-hover:scale-110">
                📄
              </div>

              <p className="break-words font-medium">
                Click to upload your resume
              </p>

              <p className="mt-2 text-sm text-slate-500">
                PDF only • Maximum 5MB
              </p>

              <input
                id="resume"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  setResume(e.target.files[0]);
                  setError("");
                }}
              />

            </label>


            {resume && (
              <div className="mt-4 flex min-w-0 items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">

                <span className="shrink-0 text-xl">
                  📎
                </span>

                <div className="min-w-0">
                  <p className="text-xs text-slate-400">
                    Selected file
                  </p>

                  <p className="truncate text-sm font-medium text-blue-400">
                    {resume.name}
                  </p>
                </div>

              </div>
            )}

          </div>


          {/* ================= JOB DESCRIPTION ================= */}
          <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                💼
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-semibold sm:text-xl">
                  Job Description
                </h3>

                <p className="text-sm text-slate-500">
                  Paste the job requirements
                </p>
              </div>

            </div>


            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                setError("");
              }}
              placeholder="Paste the complete job description here..."
              className="min-h-56 min-w-0 w-full resize-none rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-base"
            />

            <p className="mt-2 text-right text-xs text-slate-600">
              {jobDescription.length} characters
            </p>

          </div>

        </div>


        {/* ================= ERROR ================= */}
        {error && (
          <div className="mx-auto mt-6 w-full max-w-3xl break-words rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
            ⚠️ {error}
          </div>
        )}


        {/* ================= ANALYZE BUTTON ================= */}
        <div className="mt-8 flex w-full justify-center">

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-56"
          >

            {loading ? (
              <span className="flex items-center justify-center gap-2">

                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                Analyzing...

              </span>
            ) : (
              "✨ Analyze Resume"
            )}

          </button>

        </div>


        {/* ================= RESULTS ================= */}
        {analysis && (
          <div className="mt-12 min-w-0 space-y-6">

            {/* ================= RESULT HEADING ================= */}
            <div className="text-center">

              <p className="text-sm font-medium uppercase tracking-wider text-blue-500">
                Analysis Complete
              </p>

              <h3 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                Your Resume Analysis
              </h3>

            </div>


            {/* ================= MATCH SCORE ================= */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center shadow-xl sm:p-8">

              <p className="text-sm text-slate-400">
                Resume Match Score
              </p>

              <div className="mt-3 text-5xl font-bold text-blue-500 sm:text-7xl">
                {analysis.matchPercentage}%
              </div>

              <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
                Based on your resume compared with the job description
              </p>

            </div>


            {/* ================= SKILLS ================= */}
            <div className="grid min-w-0 gap-6 md:grid-cols-3">

              {/* Matched Skills */}
              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

                <div className="mb-5 flex items-center justify-between gap-3">

                  <h3 className="min-w-0 text-lg font-semibold text-green-400">
                    Matched Skills
                  </h3>

                  <span className="shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                    {analysis.matchedSkills?.length || 0}
                  </span>

                </div>

                <div className="flex flex-wrap gap-2">

                  {analysis.matchedSkills?.length > 0 ? (
                    analysis.matchedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="max-w-full break-words rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-sm text-green-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No matched skills found.
                    </p>
                  )}

                </div>

              </div>


              {/* Partial Skills */}
              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

                <div className="mb-5 flex items-center justify-between gap-3">

                  <h3 className="min-w-0 text-lg font-semibold text-yellow-400">
                    Partial Skills
                  </h3>

                  <span className="shrink-0 rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                    {analysis.partialSkills?.length || 0}
                  </span>

                </div>

                <div className="flex flex-wrap gap-2">

                  {analysis.partialSkills?.length > 0 ? (
                    analysis.partialSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="max-w-full break-words rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-sm text-yellow-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No partial skills found.
                    </p>
                  )}

                </div>

              </div>


              {/* Missing Skills */}
              <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

                <div className="mb-5 flex items-center justify-between gap-3">

                  <h3 className="min-w-0 text-lg font-semibold text-red-400">
                    Missing Skills
                  </h3>

                  <span className="shrink-0 rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400">
                    {analysis.missingSkills?.length || 0}
                  </span>

                </div>

                <div className="flex flex-wrap gap-2">

                  {analysis.missingSkills?.length > 0 ? (
                    analysis.missingSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="max-w-full break-words rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm text-red-400"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No missing skills found.
                    </p>
                  )}

                </div>

              </div>

            </div>


            {/* ================= EXPERIENCE ================= */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

              <h3 className="mb-4 text-xl font-semibold">
                Experience Analysis
              </h3>

              <p className="break-words text-sm leading-7 text-slate-300 sm:text-base">
                {analysis.experienceAnalysis}
              </p>

            </div>


            {/* ================= RESUME IMPROVEMENTS ================= */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Resume Improvements
              </h3>

              <ul className="space-y-4">

                {analysis.resumeImprovements?.map((item, index) => (
                  <li
                    key={index}
                    className="flex min-w-0 gap-3 rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-300 sm:text-base"
                  >

                    <span className="shrink-0 text-blue-500">
                      ✓
                    </span>

                    <span className="min-w-0 break-words">
                      {item}
                    </span>

                  </li>
                ))}

              </ul>

            </div>


            {/* ================= LEARNING ROADMAP ================= */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Learning Roadmap
              </h3>

              <div className="space-y-4">

                {analysis.learningRoadmap?.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-0 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
                  >

                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                      <div className="min-w-0">

                        <p className="mb-1 text-xs text-slate-500">
                          Step {index + 1}
                        </p>

                        <h4 className="break-words font-semibold text-blue-400">
                          {item.skill}
                        </h4>

                      </div>

                      <span className="w-fit shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        {item.priority}
                      </span>

                    </div>

                    <p className="mt-3 break-words text-sm text-slate-500">
                      Estimated time:{" "}
                      <span className="text-slate-400">
                        {item.estimatedTime}
                      </span>
                    </p>

                  </div>
                ))}

              </div>

            </div>


            {/* ================= INTERVIEW QUESTIONS ================= */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-6">

              <h3 className="mb-5 text-xl font-semibold">
                Interview Questions
              </h3>

              <div className="space-y-3">

                {analysis.interviewQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="flex min-w-0 gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300 sm:text-base"
                  >

                    <span className="shrink-0 font-semibold text-blue-500">
                      {index + 1}.
                    </span>

                    <span className="min-w-0 break-words">
                      {question}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default Dashboard;