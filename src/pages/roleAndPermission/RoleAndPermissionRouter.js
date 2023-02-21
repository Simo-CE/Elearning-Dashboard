import React from 'react';
import { useSelector } from "react-redux";
import "../../components/Subnav.css";
import { Link, NavLink } from 'react-router-dom';
import paths from '../../routes/paths';
import langKey from "../../localization/locale.json";

const RoleAndPermissionRouter = () => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <>

            <div className="routerTabsStyling">

                <Link to={paths.rolepermission}>
                    {(keywordTranslation && keywordTranslation["rolesAndPermissions"]) || langKey.rolesAndPermissions}
                </Link>

                <NavLink to={paths.roles}>
                    {(keywordTranslation && keywordTranslation["roles"]) || langKey.roles}
                </NavLink>

            </div>

        </>
    )
}

export default RoleAndPermissionRouter;