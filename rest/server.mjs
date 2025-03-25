import express from 'express';
import mongoose from 'mongoose';
import { refreshSpotifyToken } from './models/spotifyModel.mjs';

import songController from './controllers/songController.mjs';
import spotifyController from './controllers/spotifyController.mjs';
import sessionController from './controllers/sessionController.mjs';
import routineController from './controllers/routineController.mjs';

const app = express();
app.use(express.json());

// Routes
app.use('/songs', songController);
app.use('/spotify', spotifyController);
app.use('/session', sessionController);
app.use('/routine', routineController);

/**
 * Start server
 */
const PORT = process.env.PORT;
app.listen(PORT, async () => {
    await connect(false)
    await refreshSpotifyToken();
    console.log(`Server listening on port ${PORT}...`)
});

/**
 * Connect to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}