import mongoose from 'mongoose';

let Song = undefined;

function createModel() {
    if (!Song) {
        const songSchema = mongoose.Schema({
            title: {type: String, required: true},
            artist: {type: String, required: true},
            image: {type: String, required: true},
            learned: {type: String, required: true}
        });
        Song = mongoose.model('song', songSchema);
    }
    return Song;
}

createModel();


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

export { createModel, createSong, getSongs, getSongById, updateSong, deleteSongById }