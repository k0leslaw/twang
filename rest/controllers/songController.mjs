import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';

import * as songs from '../models/songModel.mjs';

const router = express.Router();
const PORT = process.env.PORT;

/**
 * Guitar Companion Calls
 */
router.post("/", asyncHandler(async (req, res) => {
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

router.get("/", asyncHandler(async (req, res) => {
    const filter = req.query;
    const matching_songs = await songs.getSongs(filter);
    res.status(200).json(matching_songs);
}));

router.get("/:_id", asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const song = await songs.getSongById(_id);
    
    if (song) {
        res.status(200).json(song);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

router.put("/:_id", asyncHandler(async (req, res) => {
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

router.delete("/:_id", asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const song = await songs.getSongById(_id);

    if (song) {
        await songs.deleteSongById(_id);
        res.status(204).send();
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}));

export default router;