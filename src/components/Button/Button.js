import React from "react";
import "./button.css";
import { colorfullLoader, gifLoaderAsset } from "../../assets/index";

const SaveButton = ({
  buttonStyle,
  iconPrev,
  icon,
  imgStyle,
  alt,
  onClick,
  label,
  disabled = false,
  type = "button",
  status,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyle}
      disabled={loading || disabled}
    >
      {!loading && label}
      {loading ? (
        <>
          {status == "delete" ? (
            <img src={colorfullLoader} height="60px" width="50px" />
          ) : (
            <img src={gifLoaderAsset} height="30" width="30" />
          )}
        </>
      ) : (
        icon && <img className={imgStyle} src={icon} alt={alt} height="30" />
      )}
    </button>
  );
};

export default SaveButton;
