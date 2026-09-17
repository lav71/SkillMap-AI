import crypto from "crypto";

import groq from "../services/groq.service.js";
import { PDFParse } from "pdf-parse";
import Analysis from "../models/analysis.model.js";


// ======================================================
// ANALYSIS VERSION
// ======================================================

const ANALYSIS_VERSION = "v2";


// ======================================================
// NORMALIZE TEXT
// ======================================================

const normalizeText = (text = "") => {
    return text
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
};


// ======================================================
// CREATE UNIQUE ANALYSIS KEY
// ======================================================

const createAnalysisKey = (
    userId,
    resumeText,
    jobDescription
) => {

    const data = [
        ANALYSIS_VERSION,
        userId.toString(),
        normalizeText(resumeText),
        normalizeText(jobDescription)
    ].join("|");

    return crypto
        .createHash("sha256")
        .update(data)
        .digest("hex");
};


// ======================================================
// PARSE AI RESPONSE
// ======================================================

const parseAIResponse = (content) => {

    if (!content) {
        throw new Error("Empty response received from AI");
    }

    try {

        return JSON.parse(content);

    } catch (error) {

        // Try removing markdown code block
        const cleaned = content
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        try {

            return JSON.parse(cleaned);

        } catch (secondError) {

            console.log("AI RAW RESPONSE:");
            console.log(content);

            throw new Error(
                "AI returned invalid JSON response"
            );
        }
    }
};


// ======================================================
// NORMALIZE SKILLS
// ======================================================

const normalizeSkills = (skills) => {

    if (!Array.isArray(skills)) {
        return [];
    }

    return [
        ...new Set(
            skills
                .map((skill) => {

                    if (typeof skill === "string") {
                        return skill.trim();
                    }

                    if (
                        skill &&
                        typeof skill === "object"
                    ) {
                        return (
                            skill.name ||
                            skill.skill ||
                            ""
                        ).trim();
                    }

                    return "";
                })
                .filter(Boolean)
        )
    ];
};


// ======================================================
// REMOVE OVERLAPPING SKILLS
// ======================================================

const removeOverlaps = (
    matchedSkills,
    partialSkills,
    missingSkills
) => {

    const matchedSet = new Set(
        matchedSkills.map((skill) =>
            normalizeText(skill)
        )
    );

    const cleanPartial = partialSkills.filter(
        (skill) =>
            !matchedSet.has(
                normalizeText(skill)
            )
    );

    const usedSet = new Set([
        ...matchedSkills,
        ...cleanPartial
    ].map((skill) =>
        normalizeText(skill)
    ));

    const cleanMissing = missingSkills.filter(
        (skill) =>
            !usedSet.has(
                normalizeText(skill)
            )
    );

    return {
        matchedSkills,
        partialSkills: cleanPartial,
        missingSkills: cleanMissing
    };
};


// ======================================================
// FORMAT RESPONSE
// ======================================================

const formatAnalysisResponse = (analysis) => {

    return {
        _id: analysis._id,

        matchPercentage:
            analysis.matchPercentage,

        matchedSkills:
            analysis.matchedSkills || [],

        partialSkills:
            analysis.partialSkills || [],

        missingSkills:
            analysis.missingSkills || [],

        experienceAnalysis:
            analysis.experienceAnalysis || "",

        resumeImprovements:
            analysis.resumeImprovements || [],

        learningRoadmap:
            analysis.learningRoadmap || [],

        interviewQuestions:
            analysis.interviewQuestions || [],

        createdAt:
            analysis.createdAt,

        updatedAt:
            analysis.updatedAt
    };
};


// ======================================================
// ANALYZE RESUME
// ======================================================

export const analyzeResume = async (req, res) => {

    try {

        // --------------------------------------------------
        // CHECK USER
        // --------------------------------------------------

        const userId = req.user_id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }


        // --------------------------------------------------
        // CHECK RESUME
        // --------------------------------------------------

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "Please upload a PDF resume"
            });
        }


        // --------------------------------------------------
        // CHECK JOB DESCRIPTION
        // --------------------------------------------------

        const jobDescription =
            req.body.jobDescription?.trim();


        if (!jobDescription) {

            return res.status(400).json({
                success: false,
                message: "Job description is required"
            });
        }


        // --------------------------------------------------
        // EXTRACT PDF TEXT
        // --------------------------------------------------

        let resumeText = "";

        try {

            const parser = new PDFParse({
                data: req.file.buffer
            });

            const result = await parser.getText();

            resumeText =
                result.text?.trim() || "";

            await parser.destroy();

        } catch (pdfError) {

            console.log(
                "PDF Extraction Error:",
                pdfError.message
            );

            return res.status(400).json({
                success: false,
                message:
                    "Could not read the PDF resume"
            });
        }


        // --------------------------------------------------
        // CHECK RESUME TEXT
        // --------------------------------------------------

        if (!resumeText) {

            return res.status(400).json({
                success: false,
                message:
                    "Could not extract text from the resume PDF"
            });
        }


        // --------------------------------------------------
        // CREATE ANALYSIS KEY
        // --------------------------------------------------

        const analysisKey =
            createAnalysisKey(
                userId,
                resumeText,
                jobDescription
            );


        console.log(
            "Analysis Key:",
            analysisKey
        );


        // ==================================================
        // CHECK MONGODB FIRST
        // ==================================================

        const existingAnalysis =
            await Analysis.findOne({
                user: userId,
                analysisKey: analysisKey
            });


        if (existingAnalysis) {

            console.log(
                "===================================="
            );

            console.log(
                "EXISTING ANALYSIS FOUND"
            );

            console.log(
                "Returning saved result..."
            );

            console.log(
                "===================================="
            );


            return res.status(200).json({

                success: true,

                message:
                    "Existing analysis returned",

                analysis:
                    formatAnalysisResponse(
                        existingAnalysis
                    ),

                analysisId:
                    existingAnalysis._id
            });
        }


        // ==================================================
        // AI PROMPT
        // ==================================================

        const prompt = `

You are an expert resume and job-description analyzer.

Analyze the following resume against the job description.

Your job is to identify the skills and requirements from the JOB DESCRIPTION and classify them based on evidence in the RESUME.

IMPORTANT RULES:

1. Do NOT calculate match percentage.
2. The backend will calculate the percentage.
3. Do NOT invent skills.
4. Only consider skills and requirements that are actually relevant to the job description.
5. If the resume clearly demonstrates a skill, put it in matchedSkills.
6. If the resume shows some related knowledge or partial evidence, put it in partialSkills.
7. If the job requires a skill and the resume provides no meaningful evidence, put it in missingSkills.
8. Do not put the same skill in multiple categories.
9. Be consistent.
10. Do not treat related technologies as exact matches unless the resume provides strong evidence.
11. Do not add generic requirements unless they are actually relevant to the technical role.
12. Keep skill names concise.
13. Return ONLY valid JSON.
14. Do not use markdown.
15. Do not include any explanation outside JSON.

Return exactly this structure:

{
    "matchedSkills": [],
    "partialSkills": [],
    "missingSkills": [],
    "experienceAnalysis": "",
    "resumeImprovements": [],
    "learningRoadmap": [
        {
            "skill": "",
            "priority": "",
            "estimatedTime": ""
        }
    ],
    "interviewQuestions": []
}

========================
RESUME
========================

${resumeText}

========================
JOB DESCRIPTION
========================

${jobDescription}

========================
END INPUT
========================

`;


        // ==================================================
        // GROQ AI CALL
        // ==================================================

        console.log(
            "Sending new analysis to Groq..."
        );


        const response =
            await groq.chat.completions.create({

                model:
                    "openai/gpt-oss-120b",

                messages: [
                    {
                        role: "system",

                        content:
                            "You are a precise resume analysis engine. Return only valid JSON."
                    },

                    {
                        role: "user",

                        content: prompt
                    }
                ],

                temperature: 0,

                seed: 42,

                response_format: {
                    type: "json_object"
                }
            });


        // ==================================================
        // GET AI CONTENT
        // ==================================================

        const aiContent =
            response
                ?.choices?.[0]
                ?.message
                ?.content;


        if (!aiContent) {

            throw new Error(
                "No response received from Groq"
            );
        }


        console.log(
            "Groq response received"
        );


        // ==================================================
        // PARSE RESPONSE
        // ==================================================

        const aiResult =
            parseAIResponse(aiContent);


        // ==================================================
        // NORMALIZE SKILLS
        // ==================================================

        let matchedSkills =
            normalizeSkills(
                aiResult.matchedSkills
            );


        let partialSkills =
            normalizeSkills(
                aiResult.partialSkills
            );


        let missingSkills =
            normalizeSkills(
                aiResult.missingSkills
            );


        // ==================================================
        // REMOVE DUPLICATES / OVERLAPS
        // ==================================================

        const cleaned =
            removeOverlaps(
                matchedSkills,
                partialSkills,
                missingSkills
            );


        matchedSkills =
            cleaned.matchedSkills;

        partialSkills =
            cleaned.partialSkills;

        missingSkills =
            cleaned.missingSkills;


        // ==================================================
        // CALCULATE MATCH PERCENTAGE
        // ==================================================

        const totalSkills =
            matchedSkills.length +
            partialSkills.length +
            missingSkills.length;


        let matchPercentage = 0;


        if (totalSkills > 0) {

            matchPercentage =
                Math.round(
                    (
                        (
                            matchedSkills.length +
                            partialSkills.length * 0.5
                        ) /
                        totalSkills
                    ) * 100
                );
        }


        // ==================================================
        // EXPERIENCE ANALYSIS
        // ==================================================

        const experienceAnalysis =
            typeof aiResult.experienceAnalysis ===
            "string"

                ? aiResult.experienceAnalysis.trim()

                : "";


        // ==================================================
        // RESUME IMPROVEMENTS
        // ==================================================

        const resumeImprovements =
            Array.isArray(
                aiResult.resumeImprovements
            )

                ? aiResult.resumeImprovements
                    .filter(
                        (item) =>
                            typeof item === "string"
                    )
                    .map(
                        (item) =>
                            item.trim()
                    )
                    .filter(Boolean)

                : [];


        // ==================================================
        // LEARNING ROADMAP
        // ==================================================

        const learningRoadmap =
            Array.isArray(
                aiResult.learningRoadmap
            )

                ? aiResult.learningRoadmap
                    .filter(
                        (item) =>
                            item &&
                            typeof item ===
                                "object"
                    )
                    .map((item) => ({

                        skill:
                            typeof item.skill ===
                            "string"

                                ? item.skill.trim()

                                : "",

                        priority:
                            typeof item.priority ===
                            "string"

                                ? item.priority.trim()

                                : "",

                        estimatedTime:
                            typeof item.estimatedTime ===
                            "string"

                                ? item.estimatedTime.trim()

                                : ""
                    }))
                    .filter(
                        (item) =>
                            item.skill
                    )

                : [];


        // ==================================================
        // INTERVIEW QUESTIONS
        // ==================================================

        const interviewQuestions =
            Array.isArray(
                aiResult.interviewQuestions
            )

                ? aiResult.interviewQuestions
                    .filter(
                        (item) =>
                            typeof item === "string"
                    )
                    .map(
                        (item) =>
                            item.trim()
                    )
                    .filter(Boolean)

                : [];


        // ==================================================
        // FINAL ANALYSIS OBJECT
        // ==================================================

        const analysisData = {

            user: userId,

            analysisKey: analysisKey,

            jobDescription:
                jobDescription,

            resumeText:
                resumeText,

            matchPercentage:
                matchPercentage,

            matchedSkills:
                matchedSkills,

            partialSkills:
                partialSkills,

            missingSkills:
                missingSkills,

            experienceAnalysis:
                experienceAnalysis,

            resumeImprovements:
                resumeImprovements,

            learningRoadmap:
                learningRoadmap,

            interviewQuestions:
                interviewQuestions
        };


        // ==================================================
        // SAVE TO MONGODB
        // ==================================================

        try {

            const newAnalysis =
                new Analysis(
                    analysisData
                );


            await newAnalysis.save();


            console.log(
                "===================================="
            );

            console.log(
                "NEW ANALYSIS SAVED"
            );

            console.log(
                "Match:",
                matchPercentage + "%"
            );

            console.log(
                "===================================="
            );


            return res.status(200).json({

                success: true,

                message:
                    "Resume analysis completed successfully",

                analysis:
                    formatAnalysisResponse(
                        newAnalysis
                    ),

                analysisId:
                    newAnalysis._id
            });


        } catch (saveError) {

            // ----------------------------------------------
            // DUPLICATE KEY
            // ----------------------------------------------

            if (
                saveError.code === 11000
            ) {

                console.log(
                    "Duplicate analysis detected."
                );

                const existing =
                    await Analysis.findOne({

                        user: userId,

                        analysisKey:
                            analysisKey
                    });


                if (existing) {

                    return res.status(200).json({

                        success: true,

                        message:
                            "Existing analysis returned",

                        analysis:
                            formatAnalysisResponse(
                                existing
                            ),

                        analysisId:
                            existing._id
                    });
                }
            }


            throw saveError;
        }


    } catch (error) {

        console.log(
            "===================================="
        );

        console.log(
            "ANALYSIS ERROR:"
        );

        console.log(
            error
        );

        console.log(
            "===================================="
        );


        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Resume analysis failed"
        });
    }
};


// ======================================================
// GET ANALYSIS HISTORY
// ======================================================

export const getAnalysisHistory =
    async (req, res) => {

        try {

            const userId =
                req.user_id;


            if (!userId) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Unauthorized"
                });
            }


            const analyses =
                await Analysis.find({
                    user: userId
                })
                    .sort({
                        createdAt: -1
                    })
                    .select(
                        "-resumeText"
                    );


            return res.status(200).json({

                success: true,

                analyses: analyses
            });


        } catch (error) {

            console.log(
                "History Error:",
                error.message
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch analysis history"
            });
        }
    };


// ======================================================
// GET ANALYSIS BY ID
// ======================================================

export const getAnalysisById =
    async (req, res) => {

        try {

            const userId =
                req.user_id;

            const analysisId =
                req.params.id;


            if (!userId) {

                return res.status(401).json({

                    success: false,

                    message:
                        "Unauthorized"
                });
            }


            const analysis =
                await Analysis.findOne({

                    _id: analysisId,

                    user: userId
                });


            if (!analysis) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Analysis not found"
                });
            }


            return res.status(200).json({

                success: true,

                analysis:
                    formatAnalysisResponse(
                        analysis
                    )
            });


        } catch (error) {

            console.log(
                "Get Analysis Error:",
                error.message
            );


            return res.status(500).json({

                success: false,

                message:
                    "Failed to fetch analysis"
            });
        }
    };