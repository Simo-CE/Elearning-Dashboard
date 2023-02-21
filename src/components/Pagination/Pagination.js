import React from "react";
import "./Pagination.css";
import { prevArrowAsset, nextArrowAsset } from "../../assets/index";
import { Button } from "react-bootstrap";
import ToggleSlide from "../ToggleSlide/ToggleSlide";
import langKey from "../../localization/locale.json";
import { useSelector } from "react-redux";

const Pagination = ({
    clickHandler,
    pagination,
    to,
    from,
    total,
    changeHandler,
    checked,
}) => {
    const { keywordTranslation, language_direction } = useSelector(
        (state) => state.localization?.selectedLanguage
    );

    return (
        <div className="sideMargin bg-white pl-4 pr-2 mb-5">
            <div className="row">
                <div className="col-lg-12">
                    <div
                        className="d-flex align-items-center justify-content-between"
                        style={{ height: "50px" }}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <p className="fs-11 mb-0 pageCount">
                                {from ?? "0"} - {to ?? "0"} of {total ?? "0"} |{" "}
                                {(keywordTranslation && keywordTranslation["showAllRecords"]) ||
                                    langKey.showAllRecords}
                            </p>

                            <div style={{ marginTop: "-1px" }}>
                                <ToggleSlide
                                    onChangeHandler={changeHandler}
                                    checked={checked}
                                />
                            </div>
                        </div>

                        <div className="paginationDesign ml-auto">
                            {pagination?.length &&
                                pagination.map((data, index) => (
                                    <Button
                                        onClick={() => clickHandler(data.url)}
                                        className={
                                            index == 0
                                                ? `prevIcon m-1`
                                                : index == pagination?.length - 1
                                                    ? "nextIcon m-1"
                                                    : data.active
                                                        ? "pageNumbers m-1 activePage"
                                                        : "pageNumbers m-1"
                                        }
                                        key={index}
                                    >
                                        {index == 0 ? (
                                            <img src={prevArrowAsset} alt="prev" className="m-2" />
                                        ) : index == pagination?.length - 1 ? (
                                            <img src={nextArrowAsset} alt="next" className="m-2" />
                                        ) : (
                                            data.label
                                        )}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
