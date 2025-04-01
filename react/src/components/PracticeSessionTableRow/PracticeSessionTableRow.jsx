import { HiPencilAlt } from "react-icons/hi";

function PracticeSessionTableRow ({ row }) {
    return (
        <tr>
            <td>{ row.date }</td>
            <td>{ row.time }</td>
            <td>{ row.routine }</td>
            <td>{ row.fun }/10</td>
            <td>{ row.development }/10</td>
            <td>{ row.notes }</td>
            <td><HiPencilAlt /></td>
        </tr>
    )
}

export default PracticeSessionTableRow;