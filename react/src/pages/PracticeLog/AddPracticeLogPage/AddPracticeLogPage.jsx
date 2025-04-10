import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../../components/Footer/Footer";
import './AddPracticeLogPage.css';

function AddPracticeLogPage () {
    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState(0);
    const [routine, setRoutine] = useState('');
    const [fun, setFun] = useState(0);
    const [development, setDevelopment] = useState(0);
    const [notes, setNotes] = useState('');

    const [routines, setRoutines] = useState([]);

    const addLog = async () => {
        const newLog = {
            date: date,
            time: time,
            routine: routine,
            fun: fun,
            development: development,
            notes: notes
        }

        const response = await fetch('/session', {
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

    const getRoutines = async () => {
        const res = await fetch('/routine');
        const data = await res.json();

        setRoutines(data);
    }

    useEffect ( () => {
        getRoutines();
    }, []);

    const cancel = () => {
        navigate('/practice-log');
    }
    
    return (
        <div id='add-practice-log-page'>
            <h2>Log Practice Session</h2>

            <div id='add-options-container'>
                <div id='date-time-container'>
                    <input 
                        id='date'
                        type='text'
                        placeholder='mm-dd-yy'
                        value={date}
                        onChange={ e => setDate(e.target.value) }/>
                    <div>
                        <input 
                            id='time'
                            type='number'
                            placeholder='0'
                            value={time}
                            onChange={ e => setTime(e.target.valueAsNumber) }/>
                        <p>minutes</p>
                    </div>
                </div>
                <div id='routine-ratings-container'>
                    <div>
                        <p>Routine</p>
                        <select id='routine' onChange={ e => setRoutine(e.target.value) }>
                            <option>Freestyle</option>
                            {routines.map((routine, i) => (<option key={i}>{routine.title}</option>))}
                            <option>Create Routine</option>
                        </select>   
                    </div>
                    <div>
                        <p>Fun</p>
                        <input 
                            id='fun'
                            type='number'
                            placeholder='Fun'
                            value={fun}
                            onChange={ e => setFun(e.target.valueAsNumber) }/>
                    </div>
                    <div>
                        <p>Development</p>
                        <input 
                            id='development'
                            type='number'
                            placeholder='Development'
                            value={development}
                            onChange={ e => setDevelopment(e.target.valueAsNumber) }/>
                    </div>
                </div>
                <input 
                    id='notes'
                    type='text'
                    placeholder='...'
                    value={notes}
                    onChange={ e => setNotes(e.target.value) }/>
            </div>

            <div id='pl-buttons-container'>
                <button onClick={cancel}>Cancel</button>
                <button onClick={addLog}>Add</button>
            </div>
        </div>
    )
}

export default AddPracticeLogPage;