import react, { useState } from "react";
import { useForm } from "react-hook-form";
import { notFoundAsset, uploadAsset } from "../../assets";
import ImageViewer from "../ImageViewer";
import "../Model/Modal.css";

function InputFieldsCompSettings() {

  const { setValue, watch } = useForm();

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

  const topicImageUploadHandler = (e) => {
    let { name, files } = e.target;
    setValue(name, files[0]);
  }

  let { image } = watch();

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
                  <div className='categoryfileDiv' style={{ top: "2px" }}>
                    <ImageViewer src={image || notFoundAsset} alt="" className="mr-2" width="22px" height="22px" />
                    <img src={uploadAsset} alt="" width="24px" height="17px" />
                    <input type="file" name='image' className='categoryfile' onInput={topicImageUploadHandler} />
                  </div>
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
export default InputFieldsCompSettings;