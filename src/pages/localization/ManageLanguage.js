import React, { useEffect, useLayoutEffect } from "react";
import "../../components/Model/Modal.css";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Button from "../../components/Button/Button";

import {
  addlangAsset,
  warningAsset,
  faranceAsset,
  tickAsset,
  notFoundAsset
} from "../../assets";
export default function ManageLanguage({ modelHandler, data, action }) {


  const methods = useForm({
    mode: 'all',
  });

  const onSubmit = (values) => {

    action(data.id, values);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setValue,
    watch,
    reset,
  } = methods;

  useLayoutEffect(() => {
    if (data?.keywordTranslation) {
      reset({ ...data.keywordTranslation })
    }
  }, [data]);


  let translations = watch();
  let keywords = Object.keys(translations)
  useEffect(() => {
    if (keywords && keywords.length) {
      keywords.forEach(keyword => register(keyword, { required: true }))
    }
  }, [keywords])
  return (
    <Modal show={true} onHide={modelHandler} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex">
          <img src={addlangAsset} alt="icon" />
          <h5 className="title">Manage Language</h5>
        </Modal.Title>
        <>
        </>
      </Modal.Header>

      <Modal.Body className="overflow">

        {/* <div className="row">
          <p className="lang_title fontsize-13 mb-1">UPLOAD KEYWORDS</p>
          <div className="col-12">
            <div className="csvfile_div">
              <center>
                <img src={uploadAsset} alt="" className="upload_csv" />
                <input type="file" name="profile_photo" accept=".xlsx" onInput={(e) => uploadKeywordsHandler(e.target.files[0])} className="csvfile" />
                <p className="csvtext">
                  Drag and drop your file here <br />
                  Or <span className="browse_file"> browse files</span>
                </p>
              </center>
            </div>
          </div>
        </div> */}

        <div className="row add-lang-body">
          <div className="col-md-12">
            {keywords && keywords.length ? keywords.map((keyword) => (
              <div className="d-flex" key={keyword}>
                <p className="mange-lan-text fontsize-11">{keyword}</p>
                <div className="d-flex ml-auto">
                  <input
                    type="text"
                    className="form-control input-field fontsize-12"
                    placeholder="Type here.."
                    value={translations[keyword]}
                    onChange={e => setValue(keyword, e.target.value)}
                  />
                  <img
                    src={errors[keyword] ? warningAsset : tickAsset}
                    alt="icon"
                    width="14px"
                    height="14px"
                    className="mt-2 warning"
                  />
                </div>
              </div>
            )) : null}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={data?.flag_icon || notFoundAsset}
            width="20px"
            height="20px"
            alt=""
          />
          <p className="ml-2 mange-lan-footer-text fontsize-11 mb-0">
            {data.name}
          </p>
        </div>
        <div className="m-0 p-0">
          <Button label="Close" buttonStyle="cancel mr-2" onClick={modelHandler} />
          <Button
            label="Save"
            buttonStyle="createbtn"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
