import 'dotenv/config';
import express, { response } from 'express';
import asyncHandler from 'express-async-handler';

import * as songs from './model.mjs';
import router from './spotify_controller.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await songs.connect(false)
    console.log(`Server listening on port ${PORT}...`)
});

/**
 * Guitar Companion Requests
 */

app.post("/songs", asyncHandler(async (req, res) => {
    const { title, artist, learned } = req.body

    if (
        typeof title !== 'string' ||
        typeof artist !== 'string' ||
        typeof learned !== 'string'
    ) {
        res.status(400).json({ Error: "Invalid request" });
    } else {
        const newSong = await songs.createSong(title, artist, learned);
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

export default { app }