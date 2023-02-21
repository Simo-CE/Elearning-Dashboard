import "../../components/ResponsiveText.css";
import React from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import ChangePinCode from "./ChangePinCode";
import Certificates from "./Certificates";
import Personalinfo from "./Personalinfo";
import Documents from "./Documents";
import langKey from "../../localization/locale.json";
import { useGetSingleUserDetailQuery } from "../../services/api";
import { useLocation } from "react-router-dom";

const ProfilTabs = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const location = useLocation();

  const { data: getSingleUserDetail } = useGetSingleUserDetailQuery({
    params: { user_id: location?.state?.user_id },
  });

  const currentUserById = getSingleUserDetail?.data;

  return (
    <Tabs
      defaultActiveKey="Personal Information"
      id="tabs-example"
      className="profiletabsStyling ml-3 mr-3 pl-0 pt-1"
    >
      <Tab
        eventKey="Personal Information"
        title={
          (keywordTranslation && keywordTranslation["personalInfo"]) ||
          langKey.personalInfo
        }
      >
        <Personalinfo />
      </Tab>

      {/* <Tab
        eventKey="Change PIN Code"
        title={
          (keywordTranslation && keywordTranslation["changePinCode"]) ||
          langKey.changePinCode
        }
      >
        <ChangePinCode />
      </Tab> */}

      {currentUserById && (
        <Tab
          eventKey="Legal documents"
          title={
            (keywordTranslation && keywordTranslation["legalDocuments"]) ||
            langKey.legalDocuments
          }
        >
          <Documents />
        </Tab>
      )}

      {currentUserById && (
        <Tab
          eventKey="Training Certificates"
          title={
            (keywordTranslation && keywordTranslation["trainingCert"]) ||
            langKey.trainingCert
          }
        >
          <Certificates />
        </Tab>
      )}
    </Tabs>
  );
};

export default ProfilTabs;
