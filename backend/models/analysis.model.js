import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        analysisKey: {
            type: String,
            required: true
        },

        jobDescription: {
            type: String,
            required: true
        },

        resumeText: {
            type: String,
            required: true
        },

        matchPercentage: {
            type: Number,
            required: true
        },

        matchedSkills: {
            type: [String],
            default: []
        },

        partialSkills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        experienceAnalysis: {
            type: String,
            default: ""
        },

        resumeImprovements: {
            type: [String],
            default: []
        },

        learningRoadmap: {
            type: [
                {
                    skill: {
                        type: String,
                        default: ""
                    },

                    priority: {
                        type: String,
                        default: ""
                    },

                    estimatedTime: {
                        type: String,
                        default: ""
                    }
                }
            ],

            default: []
        },

        interviewQuestions: {
            type: [String],
            default: []
        }
    },

    {
        timestamps: true
    }
);


// Same user + same resume + same JD
// should have only one analysis
analysisSchema.index(
    {
        user: 1,
        analysisKey: 1
    },
    {
        unique: true
    }
);


const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;