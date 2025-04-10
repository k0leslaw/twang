import express from 'express';
import asyncHandler from 'express-async-handler';

import * as sessions from '../models/sessionModel.mjs';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { date, time, routine, fun, development, notes } = req.body;
    if (
        !sessions.isDateValid(date) ||
        !Number.isInteger(time) || time < 5 ||
        typeof routine !== 'string' ||
        !Number.isInteger(fun) || !(fun >= 0 ) || !(fun <= 10) ||
        !Number.isInteger(development) || !(development >= 0 ) || !(development <= 10) ||
        typeof notes !== 'string'
    ) {
        res.status(400).json({ Error: 'Invalid request' });
    } else {
        const newSession = await sessions.createSession(date, time, routine, fun, development, notes);
        res.status(201).json(newSession);
    }
}));

router.get('/', asyncHandler(async (req, res) => {
    const filter = req.query;
    const matchingSessions = await sessions.getSessions(filter);
    res.status(200).json(matchingSessions);
}));

router.get('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const session = await sessions.getSessionById(_id);

    if (!session) {
        res.status(404).json({ Error: "Not found" });
    } else {
        res.status(200).json(session);
    }
}));

router.put('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;
    const { date, time, routine, fun, development, notes } = updates
    const session = await sessions.getSessionById(_id);

    if (!session) {
        res.status(404).json({ Error: 'Not found' })
    } else if (
        !sessions.isDateValid(date) ||
        !Number.isInteger(time) || time < 5 ||
        typeof routine !== 'string' ||
        !Number.isInteger(fun) || !(fun >= 0 ) || !(fun <= 10) ||
        !Number.isInteger(development) || !(development >= 0 ) || !(development <= 10) ||
        typeof notes !== 'string'
    ) {
        res.status(400).json({ Error: 'Invalid request' })
    } else {
        const updatedSession = await sessions.updateSession(_id, updates);
        res.status(201).json(updatedSession);
    }
}));

router.delete('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const session = await sessions.getSessionById(_id);

    if (!session) {
        res.status(404).json({ Error: 'Not found' });
    } else {
        await sessions.deleteSessionById(_id);
        res.status(204).send();
    }
}));

export default router;