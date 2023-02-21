import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { settingAsset } from '../../assets';
import "./TablesSettingDropdown.css";

const TablesSettingDropdown = (props) => {
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle className="settingDropdown">
                    <img src={settingAsset} alt="" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {props.id}
                    {props.name}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default TablesSettingDropdown;