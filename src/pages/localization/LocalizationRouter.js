import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "../../components/Subnav.css";
import paths from "../../routes/paths";
import langKey from "../../localization/locale.json";

const LocalizationRouter = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  return (
    <>
      <div className="routerTabsStyling">
        <Link to={paths.localization}>
          {(keywordTranslation && keywordTranslation["languages"]) ||
            langKey.languages}
        </Link>

        <NavLink to={paths.clientPreferences}>
          {(keywordTranslation && keywordTranslation["clientPreferences"]) ||
            langKey.clientPreferences}
        </NavLink>
      </div>
    </>
  );
};

export default LocalizationRouter;
