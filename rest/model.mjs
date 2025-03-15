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
 * Song schema
 */
function createModel() {
    const songSchema = mongoose.Schema({
        title: {type: String, required: true},
        artist: {type: String, required: true},
        learned: {type: Boolean, required: true},
    });
    return mongoose.model(SONG_CLASS, songSchema);
}

async function createSong (title, artist, learned) {
    const song = new Song({ title: title, artist: artist, learned: learned });
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

export { connect, createModel, createSong, getSongs, getSongById, updateSong, deleteSongById }