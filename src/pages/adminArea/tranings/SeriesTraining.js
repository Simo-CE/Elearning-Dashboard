import React, { useState, useEffect } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../adminArea.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TableComponent from "../../../components/table/Table";
import TableSettingMenu from "../../../components/TableSetting";

import {
  securityAsset,
  tableFilterAsset,
  cardsFilterAsset,
  profileAsset,
  settingGreyAsset,
  editAsset,
  downloadgreenAsset,
  viewblueAsset,
  deleteBlankAsset,
  statuspassedAsset,
  statusfailedAsset,
  statusunderreviewAsset,
  tableFilterActiveAsset,
  cardsFilterActiveAsset,
  loaderAsset,
  settingAsset,
  notFoundAsset,
} from "../../../assets";
import Button from "../../../components/Button/Button";
import paths from "../../../routes/paths";
import "../../workerArea/WorkerArea.css";
import {
  useDeleteSeriesTrainingMutation,
  useGetCategoryQuery,
  useGetSeriesTrainingQuery,
} from "../../../services/api";
import moment from "moment";
import DeleteModal from "../../../components/Model/DeleteModal";
import DeleteTrainingModal from "./DeleteTrainingModal";
import { toast } from "react-toastify";
import SaveButton from "../../../components/Button/Button";
import { removeFromCart } from "../../../redux/AddToCart";
import { useDispatch } from "react-redux";
import langKey from "../../../localization/locale.json";
import successMsg from "../../../localization/successMsgLocale.json";
import { useSelector } from "react-redux";
import Loader from "../../../components/loader/Loader";
import NoRecordFound from "../../../components/NoRecordFound/NoRecordFound";

const Tranings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState();
  const [showMore, setShowMore] = useState(false);
  const [trainingIds, setTrainingIds] = useState([]);
  const [deletedData, setDeletedData] = useState();
  const [delClient, setDelClient] = useState(false);
  const [sorting, setSorting] = useState("");
  const [loading, setLoading] = useState("");
  const [more, setMore] = useState(20);

  // <th>PURCHASED</th>

  const {
    data: getSeriesTraining,
    refetch: getSeriesTrainingRefetch,
    isLoading: getSeriesTrainingLoading,
  } = useGetSeriesTrainingQuery(sorting);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

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
      name: (keywordTranslation && keywordTranslation["id"]) || langKey.id,
      elementStyle: "ml-1",
      icon: "",
    },

    {
      id: 3,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["category"]) ||
        langKey.category,
      elementStyle: "",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["series"]) || langKey.series,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["description"]) ||
        langKey.description,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["price"]) || langKey.price,
      elementStyle: "",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["discount"]) ||
        langKey.discount,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["validity"]) ||
        langKey.validity,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["purchased"]) ||
        langKey.purchased,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 10,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon ",
    },
  ]);

  const showLessOrMore = (toggle, index) => {
    setShowMore(toggle);
    setSelected(index);
  };

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());

    return Days + 1;
  };

  const [
    deleteSeriesTraining,
    {
      isSuccess: deleteSeriesTrainingSuccess,
      isLoading: deleteSeriesTrainingLoading,
      isFetching: deleteSeriesTrainingFetching,
      error: deleteSeriesTrainingError,
      reset: deleteSeriesTrainingReset,
    },
  ] = useDeleteSeriesTrainingMutation();

  const {
    data: getCategory,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch,
  } = useGetCategoryQuery();

  const checkBoxHandler = (e) => {
    let id = JSON.parse(e.target.value);
    let stateIds = trainingIds;

    if (isIdAdded(id)) {
      stateIds = stateIds.filter((ids) => ids !== id);
    } else {
      stateIds.push(id);
    }
    setTrainingIds([...stateIds]);
  };
  const allCheckboxHandler = (e) => {
    if (e.target.checked) {
      let ids = getSeriesTraining?.training?.data?.map((data) => data.id);
      setTrainingIds([...ids]);
    } else {
      setTrainingIds([]);
    }
  };

  const isIdAdded = (id) => {
    return trainingIds.includes(JSON.parse(id));
  };

  const delTrainingModalHandler = (data) => {
    setDelClient((prev) => !prev);
    setDeletedData(data);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setMore(more + 10);
    setSorting(`per_page=${more}`);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const handleDeleteTraining = (data) => {
    const formData = new FormData();
    if (data) {
      formData.append("_method", "delete");
      formData.append("training_data", 1);
      formData.append(`ids[]`, data.id);
    } else {
      formData.append("_method", "delete");
      formData.append("training_data", 1);
      trainingIds &&
        trainingIds?.map((data, index) => {
          formData.append(`ids[${index}]`, data);
        });
    }

    deleteSeriesTraining(formData)
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "deleted" &&
            keywordTranslation &&
            keywordTranslation["seriesDeletedSuccess"]) ||
          successMsg.seriesDeletedSuccess;
        toast.success(msg);
        dispatch(removeFromCart(data.id));
      });
  };

  const parentOptions = [
    { id: "order_by=ASC", label: "Recent" },
    { id: "order_by=DESC", label: "Oldest" },
    { id: "participants_by=ASC", label: "High Participation" },
    { id: "participants_by=DESC", label: "Low Participation" },
  ];

  useEffect(() => {
    if (deleteSeriesTrainingSuccess) {
      getSeriesTrainingRefetch();
      setTrainingIds([]);
    }
  }, [deleteSeriesTrainingSuccess]);

  return (
    <>
      {delClient && (
        <DeleteTrainingModal
          loading={deleteSeriesTrainingLoading}
          handleCloseDeleteModal={delTrainingModalHandler}
          action={() => handleDeleteTraining(deletedData)}
          deleteButtonText={
            (keywordTranslation && keywordTranslation["deleteButtonText"]) ||
            langKey.deleteButtonText
          }
          confirmationTextOne={
            (keywordTranslation && keywordTranslation["confirmationTextOne"]) ||
            langKey.confirmationTextOne
          }
          firstCheckBoxText={
            (keywordTranslation && keywordTranslation["firstCheckBoxText"]) ||
            langKey.firstCheckBoxText
          }
          secondCheckBoxText={
            (keywordTranslation && keywordTranslation["secondCheckBoxText"]) ||
            langKey.secondCheckBoxText
          }
        />
      )}
      <div className="sideMargin">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={12} className="mt-5">
              {/* <div className="col-lg-12 mt-5"> */}
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="pageHeading">
                  {(keywordTranslation && keywordTranslation["mySeries"]) ||
                    langKey.mySeries}
                  {/* <span style={{ color: "#2C8EFF" }}>“All Categories”</span> */}
                </h3>

                <div className="d-flex align-items-center gap-3">
                  {trainingIds.length ? (
                    <>
                      <img
                        src={deleteBlankAsset}
                        alt=""
                        className="mr-3 cursorOnIcons"
                        onClick={
                          trainingIds.length
                            ? () => delTrainingModalHandler()
                            : null
                        }
                      />
                    </>
                  ) : null}
                  <p className="fs-14 fw-600" style={{ color: "#7C7C7C" }}>
                    Sort by
                  </p>

                  {/* <Select
                    className="border fs-14 fw-600 sortbyDropdown addnew_btn"
                    placeholder="Recent"
                    options={parentOptions}
                    onChange={handleSelector}
                    value={selectedOption?.label}
                    // style={{ color: "#7C7C7C" }}
                  /> */}
                  {/* <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      id="dropdown-basic"
                      className="bg-white border fs-14 fw-600 sortbyDropdown addnew_btn"
                      style={{ color: "#7C7C7C" }}
                    >
                      Recent
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Item eventKey="interactive">
                        Recent
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="interactive">
                        Oldest
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="interactive">
                        High participation
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="interactive">
                        Low participation
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}

                  <select
                    className="bg-white form-select fs-14 fw-600 sortbyDropdown addnew_btn"
                    style={{ color: "#7C7C7C" }}
                    onChange={(event) => setSorting(event.target.value)}
                  >
                    <option value="order_by=ASC">
                      {" "}
                      {(keywordTranslation && keywordTranslation["recent"]) ||
                        langKey.recent}
                    </option>
                    <option value="order_by=DESC">
                      {" "}
                      {(keywordTranslation && keywordTranslation["oldest"]) ||
                        langKey.oldest}
                    </option>
                    <option value="participants_by=ASC">
                      {(keywordTranslation &&
                        keywordTranslation["highParticipents"]) ||
                        langKey.highParticipation}
                    </option>
                    <option value="participants_by=DESC">
                      {(keywordTranslation &&
                        keywordTranslation["lowParticipation"]) ||
                        langKey.lowParticipation}
                    </option>
                  </select>

                  <Nav variant="pills" className="filters">
                    <Nav.Item>
                      <Nav.Link eventKey="first" className="pr-0">
                        {" "}
                        <img
                          src={tableFilterAsset}
                          alt=""
                          className="activeImg"
                        />
                        <img
                          src={tableFilterActiveAsset}
                          alt=""
                          className="nonActiveImg d-none"
                        />
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                        {" "}
                        <img
                          src={cardsFilterAsset}
                          alt=""
                          className="activeImg"
                        />
                        <img
                          src={cardsFilterActiveAsset}
                          alt=""
                          className="nonActiveImg d-none"
                        />
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <NavLink to={paths.multipleAddNewTraning}>
                    <SaveButton
                      buttonStyle="text-white addnew_btn pl-3 pr-3"
                      label={
                        (keywordTranslation &&
                          keywordTranslation["addNewSeries"]) ||
                        langKey.addNewSeries
                      }
                    />
                  </NavLink>
                </div>
                {/* </div> */}
              </div>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <TableComponent>
                    <thead className="seriesTraningTableHead">
                      <tr>
                        {tableTitle.map(
                          ({ id, name, status, icon, elementStyle }) => (
                            <>
                              {name === langKey.selectionBox ? (
                                status && (
                                  <th scope="col" key={id}>
                                    <div
                                      div
                                      className="d-flex align-items-center "
                                    >
                                      <input
                                        type="checkbox"
                                        onChange={allCheckboxHandler}
                                        checked={
                                          getSeriesTraining?.training?.data
                                            ?.length === trainingIds.length &&
                                          trainingIds.length
                                        }
                                      />
                                    </div>
                                  </th>
                                )
                              ) : name === langKey.setting ? (
                                <th scope="col" key={id}>
                                  <div className="last-th">
                                    <p
                                      className="fs-12"
                                      style={{ marginRight: "15px" }}
                                    >
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
                                      {(keywordTranslation &&
                                        keywordTranslation[name]) ||
                                        name}
                                      {icon && (
                                        <img
                                          src={icon}
                                          className={elementStyle}
                                        />
                                      )}
                                    </div>
                                  </th>
                                )
                              )}
                            </>
                          )
                        )}
                        {/* <th>
                          <input
                            type="checkbox"
                            onChange={allCheckboxHandler}
                            checked={
                              getSeriesTraining?.training?.data?.length ===
                              trainingIds.length
                            }
                          />
                        </th>
                        <th>ID</th>
                        <th>COMPANY</th>
                        <th>SERIES</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>DISCOUNT</th>
                        <th>VALIDITY</th>
                        <th>PURCHASED</th>
                        <th>
                          ACTION{" "}
                          <img
                            src={settingGreyAsset}
                            alt=""
                            className="mr-3"
                            style={{ float: "right" }}
                          />
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {getSeriesTraining?.training?.data?.length ? (
                        <>
                          {getSeriesTraining?.training?.data?.map(
                            (trainings, index) => {
                              const trainingAdded = isIdAdded(trainings?.id);
                              return (
                                <tr>
                                  {tableTitle[0].status && (
                                    <td>
                                      <input
                                        type="checkbox"
                                        id={index}
                                        value={trainings?.id}
                                        onChange={checkBoxHandler}
                                        checked={trainingAdded}
                                      />
                                    </td>
                                  )}
                                  {tableTitle[1].status && <td>{index + 1}</td>}

                                  {tableTitle[2].status && (
                                    <td>
                                      <div className="d-flex align-items-center gap-2">
                                        <img src={securityAsset} alt="" />
                                        <p className="mb-0">
                                          {trainings?.company?.name}
                                        </p>
                                      </div>
                                    </td>
                                  )}

                                  {tableTitle[3].status && (
                                    <td>
                                      <div className="d-flex align-items-center gap-2">
                                        <img
                                          src={trainings?.image || profileAsset}
                                          alt=""
                                          className="training_image"
                                        />
                                        <p className="mb-0">
                                          {trainings?.name}
                                        </p>
                                      </div>
                                    </td>
                                  )}

                                  {tableTitle[4].status && (
                                    <td>
                                      {trainings?.desc === null ? (
                                        "—"
                                      ) : (
                                        <>
                                          {showMore && selected === index
                                            ? trainings?.desc
                                            : `${trainings?.desc?.substring(
                                                0,
                                                50
                                              )}`}
                                          {trainings?.desc?.length >= 50 && (
                                            <p
                                              onClick={() =>
                                                showLessOrMore(!showMore, index)
                                              }
                                              className="showLessOrMore"
                                            >
                                              {showMore && selected === index
                                                ? (keywordTranslation &&
                                                    keywordTranslation[
                                                      "showless"
                                                    ]) ||
                                                  langKey.showless
                                                : (keywordTranslation &&
                                                    keywordTranslation[
                                                      "showmore"
                                                    ]) ||
                                                  langKey.showmore}
                                            </p>
                                          )}
                                        </>
                                      )}
                                    </td>
                                  )}

                                  {tableTitle[5].status && (
                                    <td>
                                      <div className="d-flex align-items-center gap-2">
                                        <p
                                          className="mb-0"
                                          style={{
                                            color: "#EB7421",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {trainings?.price}
                                        </p>
                                      </div>
                                    </td>
                                  )}
                                  {tableTitle[6].status && (
                                    <td>{trainings?.discount}</td>
                                  )}

                                  {tableTitle[7].status && (
                                    <td>
                                      {trainings?.valid_for
                                        ? trainings?.valid_for
                                        : "--"}
                                    </td>
                                  )}

                                  {tableTitle[8].status && (
                                    <td>
                                      {trainings?.purchased
                                        ? trainings?.purchased
                                        : "--"}
                                    </td>
                                  )}

                                  <td>
                                    <div className="last-td">
                                      <img
                                        src={deleteBlankAsset}
                                        width="15px"
                                        height="15px"
                                        alt=""
                                        className="cursorOnIcons"
                                        onClick={() => {
                                          delTrainingModalHandler(trainings);
                                        }}
                                      />
                                      <NavLink
                                        to={paths.singleAddNewTraning}
                                        state={{ training: trainings }}
                                      >
                                        <img
                                          src={editAsset}
                                          width="14.26px"
                                          height="14.26px"
                                          alt=""
                                          className="cursorOnIcons"
                                        />
                                      </NavLink>
                                      {/* <img
                                        src={downloadgreenAsset}
                                        width="13px"
                                        height="15.26px"
                                        alt=""
                                        className="cursorOnIcons"
                                      /> */}
                                     
                                      <img
                                        src={viewblueAsset}
                                        width="15px"
                                        height="15.26px"
                                        alt=""
                                        className="cursorOnIcons"
                                        onClick={() => {
                                          navigate(paths.safetyCertificate, {
                                            state: { trainings },
                                          });
                                        }}
                                      />
                                      {/* </NavLink> */}
                                    </div>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </>
                      ) : (
                        <>
                          {getSeriesTrainingLoading ? (
                            <Loader colSpan="10" />
                          ) : (
                            <NoRecordFound colSpan="10" />
                          )}
                        </>
                      )}
                    </tbody>
                  </TableComponent>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="col-lg-12 mt-3">
                    {getSeriesTraining?.training?.data?.length ? (
                      <div className="row">
                        {getSeriesTraining?.training?.data?.map(
                          (trainings, index) => {
                            return (
                              <div className="col-lg-3 col-md-4">
                                <Card className="p-0 mb-3">
                                  <Card.Body className="p-2">
                                    <img
                                      src={trainings?.image || notFoundAsset}
                                      width="100%"
                                      height="150px"
                                      alt=""
                                      className="cover rounded"
                                    />
                                    <div className="d-flex mt-3 align-items-center">
                                      <Card.Subtitle
                                        className=" fs-10 fw-600"
                                        style={{ color: "#D9D9D9" }}
                                      >
                                        {trainings?.company?.name}
                                      </Card.Subtitle>

                                      {getDays(trainings?.deadline) < 0 ? (
                                        <img
                                          src={statusfailedAsset}
                                          width="20px"
                                          height="20px"
                                          alt=""
                                          className="ms-auto"
                                        />
                                      ) : getDays(trainings?.deadline) >= 0 &&
                                        getDays(trainings?.deadline) <= 30 ? (
                                        <img
                                          src={statusunderreviewAsset}
                                          width="20px"
                                          height="20px"
                                          alt=""
                                          className="ms-auto"
                                        />
                                      ) : (
                                        getDays(trainings?.deadline) > 30 && (
                                          <img
                                            src={statuspassedAsset}
                                            width="20px"
                                            height="20px"
                                            alt=""
                                            className="ms-auto"
                                          />
                                        )
                                      )}
                                    </div>
                                    <Card.Title
                                      className="para14"
                                      style={{ color: "#6B6B6B" }}
                                    >
                                      {trainings?.name}
                                    </Card.Title>
                                    <p className="blueborder"></p>
                                    <Card.Text
                                      className="fs-12 fw-400"
                                      style={{ color: "#A0A0A0" }}
                                    >
                                      {showMore && selected === index
                                        ? trainings?.desc
                                        : `${trainings?.desc?.substring(
                                            0,
                                            95
                                          )}`}
                                      {trainings?.desc?.length >= 95 && (
                                        <p
                                          onClick={() =>
                                            showLessOrMore(!showMore, index)
                                          }
                                          className="showLessOrMore"
                                        >
                                          {showMore && selected === index
                                            ? (keywordTranslation &&
                                                keywordTranslation[
                                                  "showless"
                                                ]) ||
                                              langKey.showless
                                            : (keywordTranslation &&
                                                keywordTranslation[
                                                  "showmore"
                                                ]) ||
                                              langKey.showmore}
                                        </p>
                                      )}
                                    </Card.Text>
                                    {/* <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p
                                      className="fs-12 fw-500"
                                      style={{ color: "#2C8EFF" }}
                                    >
                                      Participants
                                    </p>
                                  </div> */}
                                  </Card.Body>
                                </Card>
                              </div>
                            );
                          }
                        )}
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center mt-3 mb-5">
                        <div className="d-flex align-items-center">
                          <p className="fs-18">
                            {(keywordTranslation &&
                              keywordTranslation["noRecordFound"]) ||
                              langKey.noRecordFound}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Tab.Pane>
                {getSeriesTraining?.total_over_due_training ===
                  getSeriesTraining?.training?.data?.length &&
                getSeriesTraining?.training?.data?.length >= 10 ? (
                  <div className="d-flex justify-content-center mt-3 mb-5">
                    <div className="d-flex align-items-center">
                      <p>
                        {(keywordTranslation &&
                          keywordTranslation["noRecordFound"]) ||
                          langKey.noRecordFound}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center mt-3 mb-5">
                    {getSeriesTraining?.training?.data?.length >= 10 && (
                      <>
                        {loading ? (
                          <div className="d-flex align-items-center">
                            <img src={loaderAsset} height="40px" width="40px" />
                            <p>
                              {(keywordTranslation &&
                                keywordTranslation["loadingMore"]) ||
                                langKey.loadingMore}
                            </p>
                          </div>
                        ) : (
                          <Button
                            label={
                              (keywordTranslation &&
                                keywordTranslation["loadMore"]) ||
                              langKey.loadMore
                            }
                            buttonStyle="text-white fs-14 fw-500 addnew_btn"
                            onClick={handleLoadMore}
                          />
                        )}
                      </>
                    )}
                  </div>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default Tranings;
