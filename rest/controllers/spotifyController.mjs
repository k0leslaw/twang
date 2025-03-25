import express from 'express';
import asyncHandler from "express-async-handler";

import * as spotify from '../models/spotifyModel.mjs';

const router = express.Router();

router.get("/search", asyncHandler(async (req, res) => {
    const { query, type, limit } = req.query;

    if (!query || !type) {
        return res.status(400).json({ Error: "Missing query or type parameter" });
    }

    try {
        const result = await spotify.searchSpotify(query, type, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error("Spotify API Error:", error);
        res.status(500).json({ Error: "Failed to fetch data from Spotify" });
    }
}));

export default router;