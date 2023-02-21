import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import paths from "../../routes/paths";
import checkPermission2 from "../../utils/checkPermissionss";
import {
  COMPETENCE_SETTING_CATEGORY,
  COMPETENCE_SETTING_TOPICS,
  COMPETENCE_SETTING_CERTIFICATION,
  COMPETENCE_SETTING_DOCUMENT,
} from "../../utils/constants";
import langKey from "../../localization/locale.json";

const CompetenceSettingTabs = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const cs_category_permission = checkPermission2(COMPETENCE_SETTING_CATEGORY);
  const cs_topic_permission = checkPermission2(COMPETENCE_SETTING_TOPICS);
  const cs_certificate_permission = checkPermission2(
    COMPETENCE_SETTING_CERTIFICATION
  );
  const cs_document_permission = checkPermission2(COMPETENCE_SETTING_DOCUMENT);
  return (
    <>
      <div className="routerTabsStyling">
        {!cs_category_permission && (
          <NavLink to={paths.competencesettings}>
            {(keywordTranslation && keywordTranslation["categories"]) ||
              langKey.categories}
          </NavLink>
        )}

        {!cs_topic_permission && (
          <NavLink to={paths.competenceSettingsTopics}>
            {(keywordTranslation && keywordTranslation["topics"]) ||
              langKey.topics}
          </NavLink>
        )}

        {!cs_certificate_permission && (
          <NavLink to={paths.competenceSettingsCerts}>
            {(keywordTranslation && keywordTranslation["requiredCertificat"]) ||
              langKey.requiredCertificat}
          </NavLink>
        )}

        {!cs_document_permission && (
          <NavLink to={paths.competenceSettingsDocs}>
            {(keywordTranslation && keywordTranslation["requiredDocuments"]) ||
              langKey.requiredDocuments}
          </NavLink>
        )}
      </div>
    </>
  );
};

export default CompetenceSettingTabs;
