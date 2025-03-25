import mongoose from "mongoose";

let Session = undefined;

function createModel() {
    if (!Session) {
        const sessionSchema = mongoose.Schema({
            date: {type: String, required: true},
            time: {type: Number, required: true},
            routine: {type: String, required: true},
            fun: {type: Number, required: true},
            development: {type: Number, required: true},
            notes: {type: String, required: false}
        });
        Session = mongoose.model('session', sessionSchema)
    }
}

createModel();

async function createSession (date, time, routine, fun, development, notes) {
    const session = new Session({date: date, time: time, routine: routine, fun: fun, development: development, notes: notes});
    return session.save();
}

async function getSessions (filter) {
    const query = Session.find(filter);
    return query.exec(); 
}

async function getSessionById (_id) {
    const query = Session.findById(_id);
    return query.exec();
} 

async function updateSession (_id, updates) {
    const updatedSession = await Session.findByIdAndUpdate(
        _id,
        { $set: updates },
        { new: true }
    );
    return updatedSession;
}

async function deleteSessionById (_id) {
    const result = await Session.deleteOne({ _id: _id });
    return result;
}

export { createModel, createSession, getSessions, getSessionById, updateSession, deleteSessionById }