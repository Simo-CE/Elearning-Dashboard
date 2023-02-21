import React from "react";
import { useSelector } from 'react-redux';
import checkPermission from "../../utils/checkPermissions";
import checkPermission2 from "../../utils/checkPermissionss";
import {
  COMPANY_VIEW,
  FUNCTION_VIEW,
  DEPARTMENT_VIEW,
  COMPANY,
} from "../../utils/constants";
import { NavLink } from "react-router-dom";
import paths from "../../routes/paths";
import langKey from "../../localization/locale.json";

const CompaniesTabs = () => {
  const company_view = checkPermission2(COMPANY);
  //const entity_view = checkPermission2(COMPANY);
  const department_view = checkPermission(DEPARTMENT_VIEW);
  const function_view = checkPermission(FUNCTION_VIEW);

  const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);

  return (
    <>
      <div className="routerTabsStyling">

        {company_view && (
          <NavLink to={paths.companies}>
            {(keywordTranslation && keywordTranslation["companies"]) || langKey.companies}
          </NavLink>
        )}

        {department_view && (
          <NavLink to={paths.department}>
            {(keywordTranslation && keywordTranslation["departments"]) || langKey.departments}
          </NavLink>
        )}

        {function_view && (
          <NavLink to={paths.function}>
            {(keywordTranslation && keywordTranslation["functions"]) || langKey.functions}
          </NavLink>
        )}

      </div>

    </>
  );
};

export default CompaniesTabs;
