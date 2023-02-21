import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { pinkcrossAsset } from "../assets";
import "../App.css";
import langKey from "../localization/locale.json";

const TableSetting = (props) => {
  let { data, setTableTitle } = props;
  const { keywordTranslation } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const handleChange = (e, id) => {
    setTableTitle((pre) =>
      pre.map((item) => {
        return item.id === id ? { ...item, status: e.target.checked } : item;
      })
    );
  };
  return (
    <Dropdown.Menu className="setting-dropdown customScroll">
      <div className="d-flex align-items-start justify-content-between">
        {" "}
        <p className="action ml-1 py-0">
          {(keywordTranslation && keywordTranslation["setting"]) ||
            langKey.setting}
        </p>
        {/* <Dropdown.Item
          className="dropdown_items setting-action d-flex align-items-center justify-content-center mt-2 mr-1"
        >
          <img src={pinkcrossAsset} alt="" className=" " />
        </Dropdown.Item> */}
      </div>
      {data?.map((item) =>
        item.name === langKey.setting ? (
          <></>
        ) : (
          <div className="d-flex align-items-start justify-content-start m-1 mb-3">
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, item.id)}
              checked={item.status}
            />
            <p className="m-0 setting-menue">&nbsp;{item.name}</p>
          </div>
        )
      )}
    </Dropdown.Menu>
  );
};

export default TableSetting;
