import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlusCircle } from "react-icons/hi";

import Footer from "../../../components/Footer/Footer.jsx";
import PracticeSessionTableRow from '../../../components/PracticeSessionTableRow/PracticeSessionTableRow.jsx';

import './PracticeLogPage.css';

function PracticeLogPage () {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    useEffect ( () => {
        loadRows();
    }, []);

    const loadRows = async () => {
        const res = await fetch('/session');
        const data = await res.json();

        setRows(data);
    }

    return (
        <div id='practice-log-page'>
            <h2>Practice Log</h2>
            
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Routine</th>
                        <th>Fun</th>
                        <th>Development</th>
                        <th>Notes</th>
                        <th onClick={() => navigate('/practice-log/add-log')}><HiPlusCircle /></th>
                    </tr>
                </thead>
                <tbody>
                    { rows.map((row, i) => (<PracticeSessionTableRow row={row} key={i} onClick={() => navigate('/practice-log/edit-log')}/>)) }
                </tbody>
            </table>
        <Footer />
        </div>
    )
}

export default PracticeLogPage;