import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import groqRoutes from "./routes/groq.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import authRoutes from "./routes/auth.routes.js";


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/groq", groqRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("SkillMap AI Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});