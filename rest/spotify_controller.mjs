import express from 'express';
import asyncHandler from 'express-async-handler';
import * as spotify from './spotify_model.mjs';

import controller from "./controller.mjs";

const router = express.Router()

/**
 * Spotify API Requests
 */

router.get('/spotify/search', asyncHandler(async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ Error: "Missing query parameter" });
    }

    try {
        const results = await spotify.searchSpotify(query);
        res.json(results);
    } catch (error) {
        console.error("Spotify API Error:", error);
        res.status(500).json({ Error: "Failed to fetch data from Spotify" })
    }
}));

export default router;