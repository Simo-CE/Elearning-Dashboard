import React from 'react';
import "../table/Table.css";
import "./NoRecordFound.css";

const NoRecordFound = ({ colSpan, className, msg = 'No record found' }) => {
    return (
        <>
            <tr className={className}>
                <td colSpan={colSpan} style={{ display: "revert" }}>
                    <h6 className='mb-0 text-center'>{msg}</h6>
                </td>
            </tr>
        </>
    )
}

export default NoRecordFound;