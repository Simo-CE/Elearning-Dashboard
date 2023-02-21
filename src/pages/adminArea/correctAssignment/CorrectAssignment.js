import React, { useEffect, useState } from "react";
import "../adminArea.css";
import TableComponent from "../../../components/table/Table";
import {
  greenCircleTickAsset,
  icon,
  iconAsset,
  notFoundAsset,
  orangeTimeAsset,
  profilePageAsset,
  reassignsimpleAsset,
  securityAsset,
  settingAsset,
  settingGreyAsset,
  timeAsset,
  viewblueAsset,
} from "../../../assets";
import CorrectionAssignmentDetialModal from "./CorrectionAssignmentDetialModal";
import CorrectionReassignmentModal from "./CorrectionReassignmentModal";
import { useGetTeacherTrainingQuery } from "../../../services/api";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";
import Loader from "../../../components/loader/Loader";
import NoRecordFound from "../../../components/NoRecordFound/NoRecordFound";
import moment from "moment";
import TableSettingMenu from "../../../components/TableSetting";
import { Dropdown } from "react-bootstrap";

const CorrectAssignment = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [showCorrectAssignment, setShowCorrectAssignment] = useState(false);
  const [trainingId, setTrainingId] = useState("");
  const [status, setStatus] = useState();
  const correctAssignmentModalHandler = (data) => {
    setTrainingId(data);
    setShowCorrectAssignment((Prev) => !Prev);
  };

  const [showCorrectionReassignment, setShowCorrectionReassignment] =
    useState(false);
  const correctionReassignmentModalHandler = () => {
    setShowCorrectionReassignment((Prev) => !Prev);
  };

  const {
    data: getTeacherTraining,
    refetch: getTeacherTrainingRefetch,
    isLoading: getTeacherTrainingLoading,
  } = useGetTeacherTrainingQuery({ params: status });

  console.log(getTeacherTraining)

  useEffect(() => {
    getTeacherTrainingRefetch();
  }, [getTeacherTraining, showCorrectAssignment]);

  const [tableTitle, setTableTitle] = useState([
    {
      id: 1,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["selectionBox"]) ||
        langKey.selectionBox,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 2,
      status: true,
      name: (keywordTranslation && keywordTranslation["nº"]) || langKey.nº,
      elementStyle: "ml-1",
      icon: "",
    },

    {
      id: 3,
      status: true,
      name: (keywordTranslation && keywordTranslation["date"]) || langKey.date,
      elementStyle: "",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["training"]) ||
        langKey.training,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["category"]) ||
        langKey.category,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["topic"]) || langKey.topic,
      elementStyle: "",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["participants"]) ||
        langKey.participants,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name: (keywordTranslation && keywordTranslation["type"]) || langKey.type,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["answer"]) || langKey.answer,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 10,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 11,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon ",
    },
  ]);

  return (
    <>
      <div className="sideMargin">
        <div className="col-lg-12 mt-4 p-0">
          <p className="pageheading">
            {(keywordTranslation &&
              keywordTranslation["correctionAssignment"]) ||
              langKey.correctionAssignment}
          </p>
          <div className="mt-3">
            <select
              name=""
              id=""
              className="selectStatus pl-2 pr-2"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled="true">
                {(keywordTranslation && keywordTranslation["status"]) ||
                  langKey.status}
              </option>
              <option value="1">
                {" "}
                {(keywordTranslation && keywordTranslation["active"]) ||
                  langKey.active}
              </option>
              <option value="0">
                {" "}
                {(keywordTranslation && keywordTranslation["inActive"]) ||
                  langKey.inActive}
              </option>
            </select>
          </div>
        </div>

        <TableComponent>
          <thead>
            <tr>
              {tableTitle.map(({ id, name, status, icon, elementStyle }) => (
                <>
                  {name === langKey.selectionBox ? (
                    status && (
                      <th scope="col" key={id}>
                        <div div className="d-flex align-items-center ">
                          <input
                            type="checkbox"
                            // onChange={allCheckboxHandler}
                            // checked={
                            //   getAllTraining &&
                            //   getAllTraining?.training?.data
                            //     ?.length === trainingIds.length &&
                            //   trainingIds.length
                            // }
                          />
                        </div>
                      </th>
                    )
                  ) : name === langKey.setting ? (
                    <th scope="col" key={id}>
                      <div className="last-th">
                        <p className="fs-12">
                          {(keywordTranslation &&
                            keywordTranslation["action"]) ||
                            langKey.action}
                        </p>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant=""
                            id="setting-dropdown"
                            className="dropdownArrowRemove"
                          >
                            {icon && (
                              <img
                                src={settingGreyAsset}
                                className={elementStyle}
                              />
                            )}
                          </Dropdown.Toggle>
                          <TableSettingMenu
                            data={tableTitle}
                            setTableTitle={setTableTitle}
                          />
                        </Dropdown>
                      </div>
                    </th>
                  ) : (
                    status && (
                      <th scope="col" key={id}>
                        <div className="d-flex align-items-center justify-content-start">
                          {/* {name} */}
                          {(keywordTranslation && keywordTranslation[name]) ||
                            name}
                          {icon && <img src={icon} className={elementStyle} />}
                        </div>
                      </th>
                    )
                  )}
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {getTeacherTraining?.data?.data?.length ? (
              getTeacherTraining?.data?.data?.map((training, index) => {
                return (
                  <tr>
                    {tableTitle[0].status && (
                      <td>
                        <input type="checkbox" name="" id="" />
                      </td>
                    )}
                    {tableTitle[1].status && <td>{index + 1}</td>}

                    {tableTitle[2].status && (
                      <td>
                        {moment(training?.created_at).format("DD/MM/YYYY")}
                      </td>
                    )}

                    {tableTitle[3].status && (
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={training?.training?.image || notFoundAsset}
                            width="25px"
                            height="25px"
                            alt=""
                          />
                          <p className="mb-0">{training?.training?.name}</p>
                        </div>
                      </td>
                    )}

                    {tableTitle[4].status && (
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={
                              training?.training?.category
                                ? training?.training?.category?.image
                                : notFoundAsset
                            }
                            width="25px"
                            height="25px"
                            alt=""
                          />
                          <p className="mb-0">
                            {training?.training?.category
                              ? training?.training?.category.name
                              : "—"}
                          </p>
                        </div>
                      </td>
                    )}

                    {tableTitle[5].status && (
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={
                              training?.training?.topic
                                ? training?.training?.topic.image
                                : notFoundAsset
                            }
                            width="25px"
                            height="25px"
                            alt=""
                          />
                          <p className="mb-0">
                            {training?.training?.topic
                              ? training?.training?.topic.name
                              : "—"}
                          </p>
                        </div>
                      </td>
                    )}

                    {tableTitle[6].status && (
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={
                              training.participants
                                ? training.participants?.image
                                : notFoundAsset
                            }
                            className="rounded-circle"
                            width="25px"
                            height="25px"
                            alt=""
                          />
                          <div>
                            <p className="mb-0">
                              {training.participants
                                ? training.participants.first_name
                                : "—"}{" "}
                              &nbsp;
                              {training.participants
                                ? training.participants.first_name
                                : "—"}{" "}
                            </p>
                            <p
                              className="mb-0 fs-11"
                              style={{ color: "#ADADAD" }}
                            >
                              {training.participants &&
                              training.participants.function
                                ? training.participants.function.name
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                    )}
                    {tableTitle[7].status && (
                      <td>
                        <p className="internal">Internal</p>
                      </td>
                    )}

                    {tableTitle[8].status && (
                      <td>
                        <p className="mb-0" style={{ color: "#8C2CAE" }}>
                          3
                        </p>
                      </td>
                    )}

                    {tableTitle[9].status && (
                      <td>
                        <div className="d-flex gap-2 align-items-center">
                          <img
                            src={
                              training.status === 0
                                ? orangeTimeAsset
                                : greenCircleTickAsset
                            }
                            width="14px"
                            height="14px"
                            alt=""
                          />
                          <p
                            className="mb-0"
                            style={
                              training.status === 0
                                ? { color: "#FF7A00" }
                                : { color: "#47CA5B" }
                            }
                          >
                            {training.status === 0
                              ? "Uncorrected"
                              : "Corrected"}
                          </p>
                        </div>
                      </td>
                    )}

                    {tableTitle[10].status && (
                      <td>
                        <div className="last-td">
                          {/* <img
                          src={reassignsimpleAsset}
                          width="17px"
                          height="20px"
                          alt=""
                          onClick={() => correctionReassignmentModalHandler()}
                        /> */}
                          <img
                            src={viewblueAsset}
                            alt="view"
                            className="cursor"
                            onClick={() =>
                              correctAssignmentModalHandler(training)
                            }
                          />
                        </div>
                      </td>
                    )}
                    {showCorrectAssignment && (
                      <CorrectionAssignmentDetialModal
                        training={trainingId}
                        correctAssignmentModalClose={
                          correctAssignmentModalHandler
                        }
                      />
                    )}

                    {showCorrectionReassignment && (
                      <CorrectionReassignmentModal
                        correctionReassignmentModalHandler={
                          correctionReassignmentModalHandler
                        }
                      />
                    )}
                  </tr>
                );
              })
            ) : (
              <>
                {getTeacherTrainingLoading ? (
                  <Loader colSpan="11" />
                ) : (
                  <NoRecordFound colSpan="11" />
                )}
              </>
            )}
          </tbody>
        </TableComponent>
      </div>
    </>
  );
};

export default CorrectAssignment;
