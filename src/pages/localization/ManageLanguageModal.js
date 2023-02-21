import React, { useEffect, useLayoutEffect } from "react";
import "../../components/Model/Modal.css";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import Button from "../../components/Button/Button";

import {
  addlangAsset,
  warningAsset,
  tickAsset,
  notFoundAsset,
} from "../../assets";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import langKey from "../../localization/locale.json";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function ManageLanguage({
  modelHandler,
  data,
  action,
  loading,
}) {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const methods = useForm({
    mode: "all",
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
      reset({ ...data.keywordTranslation });
    }
  }, [data]);

  let translations = watch();
  let keywords = Object.keys(translations);
  useEffect(() => {
    if (keywords && keywords.length) {
      keywords.forEach((keyword) => register(keyword, { required: true }));
    }
  }, [keywords]);

  // function localSearchTableFunction() {
  //   var input = document.getElementById("localSearchInput");
  //   var filter = input.value.toLowerCase();
  //   var nodes = document.getElementsByClassName("mainGroup");

  //   for (let i = 0; i < nodes.length; i++) {
  //     if (nodes[i].innerText.toLowerCase().includes(filter)) {
  //       nodes[i].style.display = "flex";
  //     } else {
  //       nodes[i].style.display = "none";
  //     }
  //   }
  // }

  function localSearchTableFunction() {
    const input = document.getElementById("localSearchInput");
    const filter = input.value.toUpperCase();
    var length = document.getElementsByClassName("mainGroup").length;

    for (var i = 0; i < length; i++) {
      if (
        document
          .getElementsByClassName("mainGroup")
          [i].innerHTML.toUpperCase()
          .indexOf(filter) > -1
      ) {
        document.getElementsByClassName("mainGroup")[i].style.display = "block";
      } else {
        document.getElementsByClassName("mainGroup")[i].style.display = "none";
      }
    }
  }

  return (
    <Modal show={true} onHide={modelHandler} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex">
          {/* <img src={addlangAsset} alt="icon" className="mr-2" /> */}
          <h5 className="title">
            {(keywordTranslation && keywordTranslation["manageLanguage"]) ||
              langKey.manageLanguage}
          </h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overflow">
        <div className="col-md-12 p-0 mb-3">
          <div className="w-50x">
            <SearchBar
              placeholder={
                (keywordTranslation && keywordTranslation["searchKeywords"]) ||
                langKey.searchKeywords
              }
              searchClass="languageSearchBar"
              searchId="localSearchInput"
              onChange={localSearchTableFunction}
            />
          </div>
        </div>
        <div className="row add-lang-body">
          <div className="col-md-12">
            {keywords && keywords.length ? (
              keywords.map((keyword) => (
                <div className="mainGroup" key={keyword}>
                  <div className="d-flex align-items-baseline">
                    <p className="mange-lan-text fontsize-11 mt-2">{keyword}</p>
                    <div className="d-flex ml-auto">
                      <input
                        type="text"
                        className="form-control input-field fontsize-12"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["typeHere"]) ||
                          langKey.typeHere
                        }
                        value={translations[keyword]}
                        onChange={(e) => setValue(keyword, e.target.value)}
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
                </div>
              ))
            ) : (
              <>
                <NoRecordFound className="d-flex justify-content-center" />
              </>
            )}
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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = notFoundAsset;
            }}
          />
          <p className="ml-2 mange-lan-footer-text fontsize-11 mb-0">
            {data.name}
          </p>
        </div>
        <div className="m-0 p-0">
          <Button
            label={
              (keywordTranslation && keywordTranslation["cancel"]) ||
              langKey.cancel
            }
            buttonStyle="cancel mr-2"
            onClick={modelHandler}
          />
          <Button
            label={
              (keywordTranslation && keywordTranslation["save"]) || langKey.save
            }
            buttonStyle="createbtn"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}
