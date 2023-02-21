import React from "react";
import "./DetailCard.css";
import "./ResponsiveText.css";
import { useSelector } from "react-redux";

const DetailCard = (props) => {

  const theme = useSelector((state) => state.ui.theme);

  return (
    <div className={props.columns}>
      <div className={`topCards ${theme}`}>
        <div className="media">
          <img className="mr-3 " src={props.icon} alt="icon" />
          <div className="media-body ">

            <h5 className={`mt-0 cardtitle fontsize-14 ${theme}`}>{props.title}</h5>
            <p className="cardSubtitle fontsize-12">{props.subtitle}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;