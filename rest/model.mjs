import mongoose from 'mongoose';
import 'dotenv/config';

const SONG_DB_NAME = "guitar-companion";
const SONG_COLLECTION = "songs";
const SONG_CLASS = "song";

let connection = undefined;
let Song = undefined;

/**
 * Connect to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Song = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to Spotify API
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

async function getSpotifyToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' })
        });

        if (!response.ok) {
            throw new Error(`Spotify token request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        return null;
    }
};

/**
 * Song schema
 */
function createModel() {
    const songSchema = mongoose.Schema({
        title: {type: String, required: true},
        artist: {type: String, required: true},
        image: {type: String, required: true},
        learned: {type: String, required: true}
    });
    return mongoose.model(SONG_CLASS, songSchema);
}

/**
 * Guitar Companion API Requests
 */

async function createSong (title, artist, image, learned) {
    const song = new Song({ title: title, artist: artist, image: image, learned: learned });
    return song.save();
}

async function getSongs (filter) {
    const query = Song.find(filter);
    return query.exec();
}

async function getSongById (_id) {
    const query = Song.findById(_id);
    return query.exec();
}

async function updateSong (_id, updates) {
    const updatedSong = await Song.findByIdAndUpdate(
        _id,
        { $set: updates },
        { new: true }
    );
    return updatedSong;
}

async function deleteSongById (_id) {
    const result = await Song.deleteOne({ _id: _id });
    return result
}

/**
 * Spotify API Requests
 */
async function searchSpotify(query, type) {
    const token = await getSpotifyToken();
    if (!token) {
        throw new Error("Failed to retrieve Spotify token");
    }

    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.append("q", query);
    url.searchParams.append("type", type);

    const response  = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export { connect, getSpotifyToken, 
    createModel, createSong, getSongs, getSongById, updateSong, deleteSongById, 
    searchSpotify 
}