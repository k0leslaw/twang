import mongoose from "mongoose";

let Routine = undefined;

function createModel () {
    if (!Routine) {
        const routineSchema = mongoose.Schema({
            title: {type: String, required: true, unique: true},
            segments: [{
                name: {type: String, required: true},
                time: {type: Number, required: true},
                desc: {type: String, required: true}
            }]
        });
        Routine = mongoose.model('routine', routineSchema)
    }
    return Routine;
}

createModel(); 


async function createRoutine (title, segments) {
    const routine = new Routine({title: title, segments: segments});
    return routine.save();
}

async function getRoutines (filter) {
    const query = Routine.find(filter);
    return query.exec();
}

async function getRoutineById (_id) {
    const query = Routine.findById(_id);
    return query.exec();
}

async function updateRoutine (_id, updates) {
    const updatedRoutine = await Routine.findByIdAndUpdate(
        _id, 
        { $set: updates },
        { new: true }
    );
    return updatedRoutine;
}

async function deleteRoutine (_id) {
    const result = await Routine.deleteOne({ _id: _id });
    return result;
}

export { createModel, createRoutine, getRoutines, getRoutineById, updateRoutine, deleteRoutine }