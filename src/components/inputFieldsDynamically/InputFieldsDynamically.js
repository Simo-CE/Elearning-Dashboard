import react, { useState } from "react";
import "../Model/Modal.css";
import "./InputFieldsDynamically.css";

function InputFieldsDynamically() {
    const [inputFields, setInputFields] = useState([{
        fullName: '',
    }]);

    const addInputField = () => {
        setInputFields([...inputFields, {
            fullName: '',
        }])

    }

    const removeInputFields = (index) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        const list = [...inputFields];
        list[index][name] = value;
        setInputFields(list);
    }
    return (
        <div className="col-12">
            {
                inputFields.map((data, index) => {
                    const { fullName, emailAddress, salary } = data;
                    return (
                        <div className="row" key={index}>
                            <div className="col-12">
                                <div className="form-group mb-0">
                                    <input type="text" onChange={(evnt) => handleChange(index, evnt)} value={fullName} name="fullName" className="typetext pl-2" placeholder="Electrical" />
                                </div>
                            </div>

                            <div className="col-12">
                                {(inputFields.length !== 1) ? <button className="addMoreButton" onClick={removeInputFields}>Remove</button> : ''}
                            </div>
                        </div>
                    )
                })
            }

            <div className="row">
                <div className="col-sm-12">
                    <button className="addMoreButton" onClick={addInputField}>+ Add more</button>
                </div>
            </div>
        </div>

    )
}
export default InputFieldsDynamically;