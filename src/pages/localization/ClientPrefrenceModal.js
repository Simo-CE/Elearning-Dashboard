import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { Modal } from "react-bootstrap";
import ModelComponent from "../../components/Model/Model";
import ToggleSlide from "../../components/ToggleSlide/ToggleSlide";
import langKey from "../../localization/locale.json";

import {
  langlogoAsset,
  englishAsset,
  client_iconAsset,
  notFoundAsset,
} from "../../assets";
import { useLanguageDropDownQuery } from "../../services/api";
const ClientPrefrenceModal = (props) => {
  let [languages, setPreferences] = useState([]);
  const [language_abbrivation, setShowAbbreviation] = useState(0);
  const [flag_icon_status, setShowFlag] = useState(0);
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  useEffect(() => {
    let { language_abbrivation, flag_icon_status, languages } =
      props?.preference;
    setShowAbbreviation(language_abbrivation);
    setShowFlag(flag_icon_status);
    setPreferences(languages);
  }, []);

  const { data: languageDropdown } = useLanguageDropDownQuery();

  const statusHandler = (status, id) => {
    let preferences = [...languages];
    if (isLanguageAdded(id)) {
      preferences = preferences?.map((data) =>
        data.id == id ? { ...data, status: status } : data
      );
    } else {
      let newItem = {
        default_lang: 0,
        status: status,
        id: id,
      };
      preferences.push({ ...newItem });
    }
    setPreferences([...preferences]);
  };

  const isStatusTrue = (id) => {
    return languages?.some((data) => data?.id === id && data?.status);
  };

  const isDefaultLanguage = (id) => {
    return languages?.some((data) => data?.id === id && data?.default_lang);
  };

  const isLanguageAdded = (id) => {
    return languages?.some((data) => data?.id === id);
  };

  const defaultLang = languages?.filter((data) => data?.default_lang === 1);

  const defaultHandler = (id) => {
    let preferences = languages;
    if (isLanguageAdded(id)) {
      preferences = preferences.map((data) =>
        data.id == id
          ? { ...data, default_lang: 1 }
          : { ...data, default_lang: 0 }
      );
    } else {
      let previousDefaultIndex = preferences.findIndex(
        (data) => data.default_lang == 1
      );
      preferences[previousDefaultIndex] = {
        ...preferences[previousDefaultIndex],
        default_lang: 0,
      };
      preferences.push({
        default_lang: 1,
        status: 1,
        id: id,
      });
    }
    setPreferences([...preferences]);
  };

  const handleChangeAbbreviation = (value) => {
    setShowAbbreviation(value);
  };

  const handleShowFlag = (value) => {
    setShowFlag(value);
  };

  return (
    <ModelComponent
      size="md"
      show={true}
      handleClose={props.modelHandler}
      title={
        (keywordTranslation && keywordTranslation["clientPreferences"]) ||
        langKey.clientPreferences
      }
      // icon={client_iconAsset}
      className="modalWidth"
    >
      <Modal.Body>
        <p className="modalLabel">
          {(keywordTranslation && keywordTranslation["availableLanguages"]) ||
            langKey.availableLanguages}
        </p>

        <div className="availableLang">
          {languageDropdown?.length
            ? languageDropdown.map((data, index) => (
              <div key={index} className="row align-items-baseline">
                <div className="col-6 pr-0">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <p className="languages fontsize-11 mb-0">{data.name}</p>
                    <ToggleSlide
                      Class="Medium"
                      checked={isStatusTrue(data.id)}
                      onChangeHandler={(status) =>
                        statusHandler(status, data.id)
                      }
                    />
                  </div>
                </div>

                <div className="col-6 d-flex justify-content-center">
                  {isStatusTrue(data.id) && (
                    <button
                      className={`${isDefaultLanguage(data.id)
                        ? "default_lang"
                        : "set_as_default"
                        } fontsize-10`}
                      onClick={() => defaultHandler(data.id)}
                    >
                      {isDefaultLanguage(data.id)
                        ? (keywordTranslation &&
                          keywordTranslation["defaultLanguage"]) ||
                        langKey.defaultLanguage
                        : (keywordTranslation &&
                          keywordTranslation["setAsDefault"]) ||
                        langKey.setAsDefault}
                    </button>
                  )}
                </div>
              </div>
            ))
            : null}
        </div>

        <p className="modalLabel mt-4">
          {(keywordTranslation && keywordTranslation["displaySettings"]) ||
            langKey.displaySettings}
        </p>

        <div className="row mt-2">
          <div className="col-6 pl-1 ml-2">
            <div className="d-flex mb-2">
              <p className="languages fontsize-11 mb-0">
                {(keywordTranslation &&
                  keywordTranslation["onlyAbbreviation"]) ||
                  langKey.onlyAbbreviation}
              </p>
              <div className="ml-auto" style={{ marginTop: "-5px" }}>
                <ToggleSlide
                  Class="Medium"
                  onChangeHandler={(value) => handleChangeAbbreviation(value)}
                  checked={language_abbrivation}
                />
              </div>
            </div>
            <div className="d-flex mb-2">
              <p className="languages fontsize-11 mb-0">
                {(keywordTranslation &&
                  keywordTranslation["withoutFlagIcon"]) ||
                  langKey.withoutFlagIcon}
              </p>
              <div className="ml-auto" style={{ marginTop: "-5px" }}>
                <ToggleSlide
                  Class="Medium"
                  onChangeHandler={(value) => handleShowFlag(value)}
                  checked={flag_icon_status}
                />
              </div>
            </div>
          </div>
          <div
            className="col-5 p-0 d-flex justify-content-end"
            style={{ marginTop: "-5px" }}
          >
            <div className="d-flex align-items-center lang_display_div">
              {!flag_icon_status && (
                <img
                  src={defaultLang[0]?.flag_icon || notFoundAsset}
                  alt=""
                  width="20px"
                  height="20px"
                  className="mr-1"
                />
              )}
              <p className="mb-0 fs-12 text-uppercase">
                {language_abbrivation
                  ? defaultLang[0]?.abbrevation
                  : defaultLang[0]?.name}{" "}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            src={props.preference.logo || notFoundAsset}
            width="41px"
            height="32px"
            className="objectFitImg"
          />
        </div>
        <div className="m-0 p-0">
          <Button
            label={
              (keywordTranslation && keywordTranslation["cancel"]) ||
              langKey.cancel
            }
            buttonStyle="cancel mr-2"
            onClick={props.modelHandler}
          />
          <Button
            label={
              (keywordTranslation && keywordTranslation["save"]) || langKey.save
            }
            buttonStyle="createbtn"
            loading={props.isLoading}
            onClick={() =>
              props.action({
                languages: languages,
                flag_icon_status,
                language_abbrivation,
              })
            }
          />
        </div>
      </Modal.Footer>
    </ModelComponent>
  );
};

export default ClientPrefrenceModal;
