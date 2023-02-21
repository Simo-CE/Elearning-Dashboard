import React, { forwardRef } from "react";

import "./ToggleSwitch.css";

// const ToggleSwitch = ({ Class = 'Small', onChangeHandler, ...others }) => {
//     return (
//         <label className={`switch${Class}`}>
//             <input type="checkbox" onChange={(e) => onChangeHandler(Number(e.target.checked))} {...others}/>
//             <span className={`slider${Class} round${Class}`}></span>
//         </label>
//     )
// }

// const ToggleSwitch = forwardRef(({ Class = 'Small', onChangeHandler, ...others }, ref) => (//(({ Class = 'Small', onChangeHandler, ...others ,ref}) => {
//     <label className={`switch${Class}`}>
//         <input key="" ref={ref} type="checkbox" onChange={(e) => onChangeHandler(Number(e.target.checked))} {...others} />
//         <span className={`slider${Class} round${Class}`}></span>
//     </label>

// ));

const ToggleSwitch = forwardRef(
  (
    { Class = "Small", itemid, onChangeHandler, ...others },
    ref //(({ Class = 'Small', onChangeHandler, ...others ,ref}) => {
  ) => (
    <label className={`switch${Class}`}>
      <input
        ref={ref}
        item_id={itemid}
        type="checkbox"
        onChange={(e) => onChangeHandler(e)}
        {...others}
      />
      <span className={`slider${Class} round${Class}`}></span>
    </label>
  )
);

export default ToggleSwitch;
