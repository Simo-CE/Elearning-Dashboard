import React, { useEffect, useState } from "react";
import { Card, Dropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../adminArea.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TableComponent from "../../../components/table/Table";
import TableSettingMenu from "../../../components/TableSetting";

import {
  allAsset,
  security1Asset,
  securityAsset,
  tableFilterAsset,
  cardsFilterAsset,
  profileAsset,
  profilePageAsset,
  settingGreyAsset,
  orangeFolderAsset,
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
  gifLoaderAsset,
  settingAsset,
  notFoundAsset,
} from "../../../assets";
import Button from "../../../components/Button/Button";
import paths from "../../../routes/paths";
import "../../workerArea/WorkerArea.css";
import {
  useCategoryCompetenceDropdownQuery,
  useDeleteTrainingMutation,
  useGetAllTrainingQuery,
  useGetCategoryCompetenceQuery,
  useGetCategoryQuery,
} from "../../../services/api";
import moment from "moment";
import DeleteModal from "../../../components/Model/DeleteModal";
import DeleteTrainingModal from "./DeleteTrainingModal";
import { toast } from "react-toastify";
import { removeFromCart } from "../../../redux/AddToCart";
import { useDispatch } from "react-redux";
import SaveButton from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";
import successMsg from "../../../localization/successMsgLocale.json";
import Loader from "../../../components/loader/Loader";
import NoRecordFound from "../../../components/NoRecordFound/NoRecordFound";

const Tranings = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [showMore, setShowMore] = useState(false);
  const [trainingIds, setTrainingIds] = useState([]);
  const [deletedData, setDeletedData] = useState();
  const [delClient, setDelClient] = useState(false);
  const [sorting, setSorting] = useState("order_by=DESC");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState("");
  const [more, setMore] = useState(20);
  const [perPage, setPerPage] = useState();

  const cart = useSelector((state) => state.cart.cart);
  const search = useSelector((state) => state.search?.searchedValue);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const company_id = useSelector(
    (state) => state.auth.userDetail.user.company_id
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
        (keywordTranslation && keywordTranslation["training"]) ||
        langKey.training,
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
        (keywordTranslation && keywordTranslation["content"]) ||
        langKey.content,
      elementStyle: "",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["validity"]) ||
        langKey.validity,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["participants"]) ||
        langKey.participants,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["setting"]) ||
        langKey.setting,
      icon: settingAsset,
      elementStyle: "setting-icon ",
    },
  ]);


  const {
    data: getAllTraining,
    isSuccess: getAllTrainingSuccess,
    isLoading: getAllTrainingLoading,
    isFetching: getAllTrainingFetching,
    error: getAllTrainingError,
    reset: getAllTrainingReset,
    refetch: getAllTrainingRefetch,
  } = useGetAllTrainingQuery({
    params: {
      search,
      // category_id: sorting,
      per_page: perPage,
    },
    sorting,
  });

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
    deleteTraining,
    {
      isSuccess: deleteTrainingSuccess,
      isLoading: deleteTrainingLoading,
      isFetching: deleteTrainingFetching,
      error: deleteTrainingError,
      reset: deleteTrainingReset,
      refetch: deleteTrainingRefetch,
    },
  ] = useDeleteTrainingMutation();

  const {
    data: getCategory,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch,
  } = useGetCategoryQuery({
    params: { company_id },
  });

  const { data: categoryDropdown, refetch: categoryRefetch } =
    useCategoryCompetenceDropdownQuery({
      params: { company_id },
    });

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
      let ids =
        getAllTraining &&
        getAllTraining?.training?.data?.map((data) => data.id);
      setTrainingIds([...ids]);
    } else {
      setTrainingIds([]);
    }
  };

  const isIdAdded = (id) => {
    return trainingIds.includes(JSON.parse(id));
  };

  const delTrainingModalHandler = () => {
    setDelClient((prev) => !prev);
  };

  const handleDeleteTraining = (data) => {
    const formData = new FormData();
    if (data?.id) {
      formData.append("_method", "delete");
      formData.append("training_data", 1);
      formData.append(`ids[]`, data.id);
    } else {
      formData.append("_method", "delete");
      trainingIds &&
        trainingIds?.map((data, index) => {
          formData.append(`training_data[${index}]`, 1);
          formData.append(`ids[${index}]`, data);
        });
    }

    deleteTraining(formData)
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "deleted" &&
            keywordTranslation &&
            keywordTranslation["trainingDeleteSuccess"]) ||
          successMsg.trainingDeleteSuccess;
        toast.success(msg);
        delTrainingModalHandler();
        cart?.filter((item) => {
          if (item.id === data?.id) {
            dispatch(removeFromCart(data?.id));
          }
        });
      });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setMore(more + 10);
    // setSorting(`per_page=${more}`);
    setPerPage(more);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    getAllTrainingRefetch();
    if (deleteTrainingSuccess) {
      getAllTrainingRefetch();
      setTrainingIds([]);
    }
    if (state) {
      getAllTrainingRefetch();
    }
  }, [deleteTrainingSuccess, state]);

  return (
    <>
      {delClient && (
        <DeleteTrainingModal
          loading={deleteTrainingLoading}
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
        <div className="row mt-4">
          <div className="col-lg-12 mt-4">
            {getCategory?.data?.data?.length !== 0 && (
              <div className="d-flex gap-2 align-items-end">
                <p className="pageHeading">
                  {" "}
                  {(keywordTranslation && keywordTranslation["categories"]) ||
                    langKey.categories}
                </p>

                <div className="d-flex gap-2 thinOverflow overflow-auto">
                  <div
                    className="allCategory"
                    onClick={() => {
                      setCategory("All Categories");
                      setSorting("");
                    }}
                  >
                    <img src={allAsset} width="18px" height="18px" alt="" />
                    <p>
                      {" "}
                      {(keywordTranslation && keywordTranslation["all"]) ||
                        langKey.all}
                    </p>
                  </div>

                  {getCategory?.data?.data?.map((data) => {
                    return (
                      <div
                        className="allCategory"
                        onClick={() => {
                          setSorting(`category_id=${data.id}`);
                          setCategory(data?.name);
                        }}
                      >
                        <img
                          src={data?.image || notFoundAsset}
                          width="18px"
                          height="18px"
                          alt=""
                        />
                        <p>{data.name}</p>
                      </div>
                    );
                  })}

                  {/* <div className="allCategory">
                  <img src={security1Asset} width="17px" height="21px" alt="" />
                  <p>Security</p>
                </div>
                <div className="allCategory">
                  <img src={quality1Asset} width="15px" height="20px" alt="" />
                  <p>Quality</p>
                </div>
                <div className="allCategory">
                  <img
                    src={envoirmentAsset}
                    width="15px"
                    height="14px"
                    alt=""
                  />
                  <p>Environment</p>
                </div>
                <div className="allCategory">
                  <img src={healthAsset} width="17px" height="17px" alt="" />
                  <p>Health</p>
                </div>
                <div className="allCategory">
                  <img src={securityAsset} width="18px" height="18px" alt="" />
                  <p>Safety</p>
                </div>
                <div className="allCategory">
                  <img src={aidAsset} width="18px" height="16px" alt="" />
                  <p>First Aid</p>
                </div>
                <div className="allCategory">
                  <img
                    src={maintenanceAsset}
                    width="17px"
                    height="17px"
                    alt=""
                  />
                  <p>Maintenance</p>
                </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={12} className="mt-5">
              {/* <div className="col-lg-12 mt-5"> */}
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="pageHeading">
                  {(keywordTranslation && keywordTranslation["myTraining"]) ||
                    langKey.myTraining}

                  {getCategory?.data?.data?.length !== 0 && (
                    <span className="ml-1" style={{ color: "#2C8EFF" }}>
                      “
                      {category
                        ? category
                        : (keywordTranslation &&
                          keywordTranslation["allcategories"]) ||
                        langKey.allcategories}
                      ”
                    </span>
                  )}
                </h3>

                <div className="d-flex align-items-center gap-md-2 gap-lg-3">
                  {trainingIds.length ? (
                    <>
                      <img
                        src={deleteBlankAsset}
                        alt=""
                        className="mr-3 cursorOnIcons"
                        onClick={() => {
                          delTrainingModalHandler(trainingIds);
                          setDeletedData(trainingIds);
                        }}
                      />
                    </>
                  ) : null}
                  <p className="fs-14 fw-600" style={{ color: "#7C7C7C" }}>
                    {(keywordTranslation && keywordTranslation["sortBy"]) ||
                      langKey.sortBy}
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
                      {(keywordTranslation && keywordTranslation["recent"]) ||
                        langKey.recent}
                    </option>
                    <option value="order_by=DESC">
                      {(keywordTranslation && keywordTranslation["oldest"]) ||
                        langKey.oldest}
                    </option>
                    <option value="participants_by=DESC">
                      {(keywordTranslation &&
                        keywordTranslation["highParticipents"]) ||
                        langKey.highParticipation}
                    </option>
                    <option value="participants_by=ASC">
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

                  <NavLink to={paths.singleAddNewTraning}>
                    <SaveButton
                      buttonStyle="text-white addnew_btn fs-14 fw-500 pl-3 pr-3"
                      label={
                        (keywordTranslation &&
                          keywordTranslation["addNewTraining"]) ||
                        langKey.addNewTraining
                      }
                    />
                  </NavLink>
                  {/* <Dropdown>
                    <Dropdown.Toggle
                      variant="transparent"
                      className="text-white fs-14 fw-500 newTraningDropdown"
                    >
                      Add New Training
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="newTraningDropdownMenu">
                      <Dropdown.Item>
                        <NavLink to={paths.singleAddNewTraning}>
                          Single training
                        </NavLink>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <NavLink to={paths.multipleAddNewTraning}>
                          Multiple training series
                        </NavLink>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
                {/* </div> */}
              </div>
            </Col>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <TableComponent>
                    <thead className="traningTableHead">
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
                                          getAllTraining &&
                                          getAllTraining?.training?.data
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
                      </tr>
                    </thead>
                    <tbody>
                      {/* {getAllTraining?.training?.data.length === 0 ? (
                        <tr>
                          <td colSpan="10">
                            <div className="d-flex justify-content-center mt-3 mb-5">
                              <div className="d-flex align-items-center">
                                <p className="fs-18">
                                  {" "}
                                  {(keywordTranslation &&
                                    keywordTranslation["noRecordFound"]) ||
                                    langKey.noRecordFound}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : ( */}
                      {getAllTraining?.training?.data?.length ? (
                        getAllTraining?.training?.data?.map(
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
                                      <img
                                        src={
                                          trainings?.category?.image ||
                                          notFoundAsset
                                        }
                                        alt=""
                                        className="training_image"
                                      />
                                      <p className="mb-0">
                                        {trainings?.category?.name || "—"}
                                      </p>
                                    </div>
                                  </td>
                                )}

                                {tableTitle[3].status && (
                                  <td>
                                    <div className="d-flex align-items-center gap-2">
                                      <img
                                        src={trainings?.image || notFoundAsset}
                                        alt=""
                                        className="training_image"
                                      />
                                      <p className="mb-0">{trainings?.name}</p>
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
                                      <img src={orangeFolderAsset} alt="" />
                                      <p
                                        className="mb-0"
                                        style={{
                                          color: "#EB7421",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {trainings?.training_resource[0]?.documents?.substr(
                                          trainings?.training_resource[0]?.documents?.lastIndexOf(
                                            "."
                                          ) + 1
                                        ) || "—"}
                                      </p>
                                    </div>
                                  </td>
                                )}
                                {tableTitle[6].status && (
                                  <td>{trainings?.valid_for}</td>
                                )}

                                {tableTitle[7].status && (
                                  <td>
                                    {trainings?.participants_count === 0 ? (
                                      "—"
                                    ) : (
                                      <>
                                        <div className="d-flex ">
                                          {trainings?.participants?.slice(0, 4)?.map((p) => {
                                            return (
                                              <>
                                                <img
                                                  src={
                                                    p?.profile_photo ||
                                                    notFoundAsset
                                                  }
                                                  alt=""
                                                  width="28px"
                                                  height="28px"
                                                  className="rounded-circle"
                                                  style={{
                                                    position: "relative",
                                                    marginLeft: "-12px",
                                                    objectFit: "none",
                                                  }}
                                                />
                                              </>
                                            );
                                          })}
                                          <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{
                                              width: "28px",
                                              height: "28px",
                                              background: "#8C2CAE",
                                              position: "relative",
                                              marginLeft: "-12px",
                                            }}
                                          >
                                            <p className="mb-0 text-white">
                                              {trainings?.participants_count}
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </td>
                                )}
                                <td>
                                  <div className="last-td">
                                    <img
                                      src={deleteBlankAsset}
                                      width="13px"
                                      height="14px"
                                      alt=""
                                      className="cursorOnIcons"
                                      onClick={() => {
                                        delTrainingModalHandler(trainings);
                                        setDeletedData(trainings);
                                      }}
                                    />
                                    <NavLink
                                      to={paths.singleAddNewTraning}
                                      state={{ training: trainings }}
                                    >
                                      <img
                                        src={editAsset}
                                        width="13.26px"
                                        height="13.26px"
                                        alt=""
                                        className="cursorOnIcons"
                                      />
                                    </NavLink>
                                    {/* <img
                                      src={downloadgreenAsset}
                                      width="12px"
                                      height="13.26px"
                                      alt=""
                                      className="cursorOnIcons"
                                    /> */}
                                    <NavLink
                                      to={paths.viewParticipant}
                                      state={{ training: trainings }}
                                    >
                                      <img
                                        src={viewblueAsset}
                                        width="14px"
                                        height="14.26px"
                                        alt=""
                                        className="cursorOnIcons"
                                      />
                                    </NavLink>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                        )
                      ) : (
                        <>
                          {getAllTrainingLoading ? (
                            <Loader colSpan="10" />
                          ) : (
                            <NoRecordFound colSpan="10" />
                          )}
                        </>
                      )}
                      {/* )} */}
                    </tbody>
                  </TableComponent>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="col-lg-12 mt-3 p-0">
                    <div className="row">
                      {getAllTraining?.training?.data?.length === 0 ? (
                        <p className="d-flex justify-content-center">
                          {(keywordTranslation &&
                            keywordTranslation["noRecordFound"]) ||
                            langKey.noRecordFound}
                        </p>
                      ) : (
                        <>
                          {getAllTraining?.training?.data?.map(
                            (trainings, index) => {
                              return (
                                <div className="col-lg-3 col-xxl-2 col-xl-3 col-md-4 mb-3">
                                  <Card className="h-100 allCategoriesCards">
                                    <Card.Body>
                                      <img
                                        src={trainings?.image || notFoundAsset}
                                        width="100%"
                                        height="150px"
                                        alt=""
                                        className=" rounded"
                                      />
                                      <div className="d-flex mt-3 align-items-center">
                                        <Card.Subtitle
                                          className=" fs-10 fw-600"
                                          style={{ color: "#D9D9D9" }}
                                        >
                                          {trainings?.category?.name}
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
                                        style={{
                                          color: "#A0A0A0"
                                        }}
                                      >
                                        {trainings?.desc ? (
                                          <>
                                            {showMore && selected === index
                                              ? trainings?.desc
                                              : `${trainings?.desc?.substring(
                                                0,
                                                50
                                              )}`}
                                          </>
                                        ) : (
                                          "—"
                                        )}

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
                                      </Card.Text>
                                      <div className="d-flex justify-content-between align-items-center mt-4 pb-2">
                                        <p
                                          className="fs-12 fw-500 position-absolute"
                                          style={{ color: "#2C8EFF", bottom: "24px" }}
                                        >
                                          {(keywordTranslation &&
                                            keywordTranslation[
                                            "participants"
                                            ]) ||
                                            langKey.participants}
                                        </p>

                                        <div className="position-absolute" style={{ right: "15px", bottom: "20px" }}>
                                          {trainings?.participants_count === 0 ? (
                                            "—"
                                          ) : (
                                            <>
                                              <div className="d-flex">
                                                {trainings?.participants?.map(
                                                  () => {
                                                    return (
                                                      <img
                                                        src={profilePageAsset}
                                                        alt=""
                                                        className="rounded-circle"
                                                        width="28px"
                                                        height="28px"
                                                        style={{
                                                          position: "relative",
                                                          marginLeft: "-13px",
                                                        }}
                                                      />
                                                    );
                                                  }
                                                )}
                                                <p
                                                  className="rounded-circle d-flex align-items-center justify-content-center fs-11 fw-500 text-white"
                                                  style={{
                                                    width: "28px",
                                                    height: "28px",
                                                    background: "#8C2CAE",
                                                    position: "relative",
                                                    marginLeft: "-13px",
                                                  }}
                                                >
                                                  {trainings?.participants_count}
                                                </p>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            }
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Tab.Pane>
                {getAllTraining?.total_over_due_training <=
                  getAllTraining?.training?.data?.length &&
                  getAllTraining?.training?.data?.length >= 11 ? (
                  <div className="d-flex justify-content-center mt-3 mb-5">
                    <div className="d-flex align-items-center">
                      <p>
                        {(keywordTranslation &&
                          keywordTranslation["noMoreTraining"]) ||
                          langKey.noMoreTraining}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center mt-3 mb-5">
                    {getAllTraining?.training?.data?.length >= 10 && (
                      <>
                        {loading ? (
                          <div className="d-flex align-items-center">
                            <img src={loaderAsset} height="40px" width="40px" />
                            <p className="fs-14 fw-500">
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
