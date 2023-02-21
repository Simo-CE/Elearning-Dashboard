import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import paths from '../../routes/paths';
import langKey from "../../localization/locale.json";

const CompetenceRouter = () => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <>
            <div className="routerTabsStyling justify-content-end pr-3">
                <Link to={paths.adminDashboard}>
                    {(keywordTranslation && keywordTranslation["dashboard"]) || langKey.dashboard}
                </Link>
                <Link to={paths.competence}>
                    {(keywordTranslation && keywordTranslation["competencyMatrix"]) || langKey.competencyMatrix}
                </Link>

                <NavLink to={paths.workerDocuments}>
                    {(keywordTranslation && keywordTranslation["workerDocuments"]) || langKey.workerDocuments}
                </NavLink>

            </div>
        </>
    )
}

export default CompetenceRouter;
