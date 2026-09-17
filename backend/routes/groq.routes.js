import express from "express";
import groq from "../services/groq.service.js";

const router = express.Router();

router.get("/test", async (req, res) => {
    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "user",
                    content: "Say hello to SkillMap AI in one sentence."
                }
            ],
        });

        res.json({
            success: true,
            message: response.choices[0].message.content,
        });

    } catch (error) {
        console.log("Groq Error:", error.message);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

export default router;