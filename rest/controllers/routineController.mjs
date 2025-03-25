import express from 'express'
import asyncHandler from 'express-async-handler';

import * as routines from '../models/routineModel.mjs';

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { title, segments } = req.body
    if (
        typeof title !== 'string' || 
        !Array.isArray(segments) ||
        segments.length === 0 ||
        segments.every(segment =>
            typeof segment.name !== 'string' ||
            typeof segment.time !== 'number' || !Number.isInteger(segment.time) ||
            typeof segment.desc !== 'string'
        )
    ) {
        res.status(400).json({ Error: 'Invalid request' });
    } else {
        const newRoutine = await routines.createRoutine(title, segments);
        res.status(200).json(newRoutine);
    }
}));

router.get('/', asyncHandler(async (req, res) => {
    const filter = req.body;
    const matchingRoutines = await routines.getRoutines(filter);
    res.status(200).json(matchingRoutines);
}));

router.get('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const routine = await routines.getRoutineById(_id)

    if (!routine) {
        res.status(404).json({ Error: 'Not found' });
    } else {
        res.status(200).json(routine);
    }
}));

router.put('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const updates = req.body;
    const { title, segments } = updates;
    const routine = await routines.getRoutineById(_id);

    if (!routine) {
        console.log(`not found`)
        res.status(404).json({ Error: 'Not found' });
    } else if (
        typeof title !== 'string' || 
        !Array.isArray(segments) ||
        segments.length === 0 ||
        segments.every(segment =>
            typeof segment.name !== 'string' ||
            typeof segment.time !== 'number' || !Number.isInteger(segment.time) ||
            typeof segment.desc !== 'string'
        )
    ) {
        console.log(`bad request`)
        res.status(400).json({ Error: 'Invalid request' });
    } else {
        const updatedRoutine = await routines.updateRoutine(_id, updates);
        res.status(201).json(updatedRoutine);
    }
}));

router.delete('/:_id', asyncHandler(async (req, res) => {
    const { _id } = req.params;
    const routine = await routines.getRoutineById(_id);

    if (!routine) {
        res.status(404).json({ Error: 'Not found' });
    } else {
        await routines.deleteRoutine(_id);
        res.status(204).send();
    }
}));

export default router;