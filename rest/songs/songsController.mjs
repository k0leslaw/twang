import 'dotenv/config';
import express, { response } from 'express';
import asyncHandler from 'express-async-handler';

import * as songs from './songsModel.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

let spotify_token = null;

/**
 * Fetch Spotify API token
 */
async function refreshSpotifyToken() {
    spotify_token = await songs.getSpotifyToken();
    if (spotify_token) {
        console.log("Spotify API token retrieved");
    } else {
        console.error("Failed to fetch Spotify API token");
    }
}

/**
 * Connect to MongoDB
 */
app.listen(PORT, async () => {
    await songs.connect(false)
    await refreshSpotifyToken();
    console.log(`Server listening on port ${PORT}...`)
});

/**
 * Guitar Companion Calls
 */
app.post("/songs", asyncHandler(async (req, res) => {
    const { title, artist, image, learned } = req.body

    if (
        typeof title !== 'string' ||
        typeof artist !== 'string' ||
        typeof learned !== 'string'
    ) {
        res.status(400).json({ Error: "Invalid request" });
    } else {
        const newSong = await songs.createSong(title, artist, image, learned);
        res.status(201).json(newSong);
    }

}));

app.get("/songs", asyncHandler(async (req, res) => {
    const filter = req.query;
    const matching_songs = await songs.getSongs(filter);
    res.status(200).json(matching_songs);
}));

app.get("/songs/:_id", asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const song = await songs.getSongById(_id);
    
    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

app.put("/songs/:_id", asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;
    const { title, artist, learned } = updates;
    
    if (
        typeof title !== 'string' ||
        typeof artist !== 'string' ||
        typeof learned !== 'string'
    ) {
        res.status(400).json({ Error: "Invalid request" });
    } else {
        const song = await songs.getSongById(_id);
        if (!song) {
            res.status(404).json({ Error: "Not found" });
        } else {
            const updatedSong = await songs.updateSong(_id, updates);
            res.status(201).json(updatedSong);
        }
    }
}));

app.delete("/songs/:_id", asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const song = await songs.getSongById(_id);

    if (song) {
        await songs.deleteSongById(_id);
        res.status(204).send();
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

/**
 * Spotify API Calls
 */

app.get("/spotify/search", asyncHandler(async (req, res) => {
    const { query, type } = req.query;

    if (!query || !type) {
        return res.status(400).json({ Error: "Missing query or type parameter" });
    }

    try {
        const result = await songs.searchSpotify(query, type);
        res.status(200).json(result);
    } catch (error) {
        console.error("Spotify API Error:", error);
        res.status(500).json({ Error: "Failed to fetch data from Spotify" });
    }
}));

export default { app }