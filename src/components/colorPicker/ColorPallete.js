import React, {useEffect} from 'react';
import { ColorPicker, useColor, toColor } from "react-color-palette";

const ColorPickerr = ({colour, onChange}) => {

    const [color, setColor] = useColor("hex", "#121212");
 

 useEffect(() => {
    if(colour)
    {
       let newColor =   toColor("hex", colour)
     setColor(newColor)
    
    }
 }, [colour])

    return (
       
            <ColorPicker width={456} height={228}
                color={color}
                onChange={onChange} hideHSV dark hideRGB hideHEX />
       
    )
}

export default ColorPickerr;