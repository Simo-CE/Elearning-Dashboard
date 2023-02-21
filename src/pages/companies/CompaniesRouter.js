import React from "react";
import { Link, NavLink } from "react-router-dom";
import paths from "../../routes/paths";
import {
    COMPANY_VIEW,
    FUNCTION_VIEW,
    DEPARTMENT_VIEW,
    COMPANY,
} from "../../utils/constants";
import checkPermission from "../../utils/checkPermissions";
import checkPermission2 from "../../utils/checkPermissionss";
import langKey from "../../localization/locale.json";
import { useSelector } from "react-redux";

const company_view = checkPermission2(COMPANY);
const department_view = checkPermission(DEPARTMENT_VIEW);
const function_view = checkPermission(FUNCTION_VIEW);

const CompaniesRouter = () => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <div className="routerTabsStyling">

            {company_view && (
                <Link to={paths.companies}>
                    {(keywordTranslation && keywordTranslation["companies"]) || langKey.companies}
                </Link>
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
    )
}

export default CompaniesRouter;