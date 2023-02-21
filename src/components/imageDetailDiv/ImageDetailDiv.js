import React from "react";
import { folderImgAsset, tickImgAsset } from "../../assets";
import "./ImageDetailDiv.css";

const ImageDetailDiv = ({ name, size, onClick }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div className="d-flex align-items-center">
          <img
            src={folderImgAsset}
            alt=""
            className="mr-2"
            width="20px"
            height="25px"
          />
          <div>
            <p className="imgName mb-0">{name}</p>
            <p className="imgSize mb-0">{size}Kb</p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={tickImgAsset}
            alt=""
            width="13px"
            height="10px"
            className="mr-3 cursor"
          />
          <div className="crossSign" onClick={onClick}>
            X
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageDetailDiv;
