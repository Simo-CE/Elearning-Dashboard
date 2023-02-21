import { useState } from 'react';
import InputMask from 'react-input-mask';
import "./InputMask.css"

const InputMasks = (props) => {
    return (
        <InputMask
            disableUnderline
            Placeholder="+32 0 000 00 00"
            className='inputMask ps-2'
            mask='+324 999 99 99'
            value={props.value}
            onChange={props.onChange}
            alwaysShowMask='true'
            disabled={props?.disabled}
        >
        </InputMask>
    )
}

export default InputMasks

