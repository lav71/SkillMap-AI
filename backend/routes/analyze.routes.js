import express from "express";

import {
    analyzeResume,
    getAnalysisHistory,
    getAnalysisById
} from "../controllers/analyze.controller.js";

import upload from "../middleware/upload.middleware.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


router.post(
    "/",
    authMiddleware,
    upload.single("resume"),
    analyzeResume
);


router.get(
    "/history",
    authMiddleware,
    getAnalysisHistory
);


router.get(
    "/:id",
    authMiddleware,
    getAnalysisById
);


export default router;