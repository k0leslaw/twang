import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPracticeLogPage () {
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState(0);
    const [routine, setRoutine] = useState('');
    const [fun, setFun] = useState(0);
    const [development, setDevelopment] = useState(0);
    const [notes, setNotes] = useState('');

    const addLog = async () => {
        const newLog = {
            date: date,
            time: time,
            routine: routine,
            fun: fun,
            development: development,
            notes: notes
        }

        const response = await fetch('/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLog)
        });

        if (response.status === 201) {
            alert(`${newLog.routine} on ${newLog.date} has been logged.`)
        } else {
            alert(`Failed to log session. Status code ${response.status}`)
        }

        navigate('/practice-log');
    }
    
    return (
        <div>
            <h2>Log Practice Session</h2>

            <div id='add-options-container'>
                <input 
                    type='text'
                    placeholder='Date mm-dd-yy'
                    value={date}
                    onChange={ e => setDate(e.target.value) }/>
                <input 
                    type='number'
                    placeholder='Time (minutes)'
                    value={time}
                    onChange={ e => setTime(e.target.valueAsNumber) }/>
                <input 
                    type='text'
                    placeholder='Routine'
                    value={routine}
                    onChange={ e => setRoutine(e.target.value) }/>
                <input 
                    type='number'
                    placeholder='Fun'
                    value={fun}
                    onChange={ e => setFun(e.target.valueAsNumber) }/>
                <input 
                    type='number'
                    placeholder='Development'
                    value={development}
                    onChange={ e => setDevelopment(e.target.valueAsNumber) }/>
                <input 
                    type='text'
                    placeholder='Notes'
                    value={notes}
                    onChange={ e => setNotes(e.target.value) }/>
            </div>

            <div id='buttons-container'>
                <button>Cancel</button>
                <button onClick={addLog}>Add</button>
            </div>
        </div>
    )
}

export default AddPracticeLogPage;