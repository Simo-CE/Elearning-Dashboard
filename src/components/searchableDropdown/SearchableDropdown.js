import React from 'react';
import BootstrapSelect from 'react-bootstrap-select-dropdown';
import "./SearchableDropdown.css";

const SearchableDropdown = (props) => {

    const options = [
        {
            "labelKey": "",
            "value": "Select age"
        },
        {
            "labelKey": "",
            "value": "Option item 1"
        },
        {
            "labelKey": "",
            "value": "Option item 2"
        }
    ]

    return (
        <>
            <BootstrapSelect
                options={options}
                showSearch="true"
                className="select_field cursor fontsize-12 w-100 iconSelect"
                placeholder={props.placeholder}
                isSelected="true"
            />
        </>
    )
}

export default SearchableDropdown;