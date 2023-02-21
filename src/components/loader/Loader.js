import React from 'react';
import { loaderAsset } from '../../assets';
import "./Loader.css";

const Loader = ({ colSpan, className }) => {
    return (
        <>
            <tr className={className}>
                <td colSpan={colSpan}>
                    <div className='d-flex justify-content-center'>
                        <img src={loaderAsset} alt="" className='loader' />
                    </div>
                </td>
            </tr>
        </>
    )
}

export default Loader;