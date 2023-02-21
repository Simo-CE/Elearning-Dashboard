import React from 'react';
import { useSelector } from "react-redux";
import "../../components/Subnav.css";
import { NavLink } from 'react-router-dom';
import paths from '../../routes/paths';
import langKey from "../../localization/locale.json";

const RoleAndPermissionTabs = () => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <>

            <div className="routerTabsStyling">

                <NavLink to={paths.rolepermission}>
                    {(keywordTranslation && keywordTranslation["rolesAndPermissions"]) || langKey.rolesAndPermissions}
                </NavLink>

                <NavLink to={paths.roles}>
                    {(keywordTranslation && keywordTranslation["roles"]) || langKey.roles}
                </NavLink>

            </div>

        </>
    )
}

export default RoleAndPermissionTabs;