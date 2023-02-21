import { useState } from 'react';
import InputMask from 'react-input-mask';
import "./InputMask.css"
const TvaMask = (props) => {
    return (
        <InputMask
            disableUnderline
            Placeholder="BE 0999999999"
            className='inputMask ps-2'
            mask='BE 9999999999'
            value={props.value}
            onChange={props.onChange}
            alwaysShowMask='true'
        >
        </InputMask>
    )
}

export default TvaMask