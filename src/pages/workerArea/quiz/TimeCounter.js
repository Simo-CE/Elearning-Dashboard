import React from "react";
import { useState, useEffect } from "react";

const TimeCounter = (props) => {
  const [customSeconds, setCustomSeconds] = useState(60);
    const [customMinuts, setCustomMinuts] = useState(60);
   
    useEffect(() => {
      
        let hms = props.getSingleTrainingList?.training.time_per_q;
        if (hms != undefined) {
            let a = hms?.split(":");
            console.log("a1", a[1]);
            setCustomMinuts(a[1] - 1);
        }
      
  }, [props]);
  useEffect(() => {
      if (customSeconds == 0) {
          if (customMinuts != 0) {
            setCustomSeconds(60);
            setCustomMinuts(customMinuts - 1);
          }
          
    }

    if (customSeconds > 0 )
      setTimeout(() => setCustomSeconds(customSeconds - 1), 1000);
  }, [customSeconds]);
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={
        customSeconds < 10 && customMinuts == 0
          ? {
              background: "#EF3C3C",
              borderRadius: "5px",
              height: "22px",
            }
          : {
              background: "#47CA5B",
              borderRadius: "5px",
              height: "22px",
            }
      }
    >
      <p className="fs-14 fw-500 text-white p-2">
        00 : {customMinuts < 10 && "0"}
        {customMinuts} : {customSeconds < 10 && "0"}
        {customSeconds}
      </p>
    </div>
  );
};

export default TimeCounter;
