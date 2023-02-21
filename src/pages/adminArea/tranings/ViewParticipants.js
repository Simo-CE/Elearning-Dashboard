import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SaveButton from "../../../components/Button/Button";
import TableComponent from "../../../components/table/Table";
import ToggleSlide from "../../../components/ToggleSlide/ToggleSlide";
import paths from "../../../routes/paths";
import "../../workerArea/WorkerArea.css";
import "../adminArea.css";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import TableSettingMenu from "../../../components/TableSetting";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import Embed from "react-embed-video";
import ReactPlayer from "react-player";

import {
  backarrow1Asset,
  besixAsset,
  deleteBlankAsset,
  delete_iconAsset,
  discountIconAsset,
  editAsset,
  editNewAsset,
  filePurpleAsset,
  greenLikeAsset,
  iconAsset,
  notFoundAsset,
  priceIconAsset,
  profileAsset,
  securityAsset,
  settingAsset,
  settingGreyAsset,
  statusGreenAsset,
  timeAsset,
  userAsset,
  validityAsset,
  viewblueAsset,
} from "../../../assets";
import { useEffect } from "react";
import {
  useAddCommentOnTrainingMutation,
  useDeleteCommentOnTrainingMutation,
  useDeleteTrainingMutation,
  useDownloadTrainingCertificateMutation,
  useGetSingleTrainingListQuery,
  useGetSingleTrainingListViewQuery,
  useUpdateCommentOnTrainingMutation,
} from "../../../services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import TraningDetailModal from "../../workerArea/TraningDetailModal";
import DeleteTrainingModal from "./DeleteTrainingModal";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";
import { removeFromCart } from "../../../redux/AddToCart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NoRecordFound from "../../../components/NoRecordFound/NoRecordFound";
import langKey from "../../../localization/locale.json";
import validationMessage from "../../../localization/validationsLocale.json";
import successMsg from "../../../localization/successMsgLocale.json";
import PDFViewer from "pdf-viewer-reactjs";
import useDownloader from "react-use-downloader";
import FileSaver from "file-saver";

const ViewParticipants = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch("");
  const [commentId, setCommentId] = useState("");
  const [trainingId, setTrainingId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [delClient, setDelClient] = useState(false);
  const [deletedData, setDeletedData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [participentData, setParticipentData] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.auth?.userDetail?.token);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const validationSchema = Yup.object().shape({
    note: Yup.string().required("Note is required"),
  });

  const [tableTitle, setTableTitle] = useState([
    {
      id: 1,
      status: true,
      name: (keywordTranslation && keywordTranslation["hash"]) || langKey.hash,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 2,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["participants"]) ||
        langKey.participants,
      elementStyle: "ml-1",
      icon: "",
    },

    {
      id: 3,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["company"]) ||
        langKey.company,
      elementStyle: "",
      icon: "",
    },
    {
      id: 4,
      status: true,
      name: (keywordTranslation && keywordTranslation["type"]) || langKey.type,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 5,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["status"]) || langKey.status,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 6,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["score"]) || langKey.score,
      elementStyle: "",
      icon: "",
    },
    {
      id: 7,
      status: true,
      name: (keywordTranslation && keywordTranslation["time"]) || langKey.time,
      elementStyle: "ml-1",
      icon: "",
    },
    {
      id: 8,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["issueDate"]) ||
        langKey.issueDate,
      // icon: sortAsset,
      icon: "",
      elementStyle: "ml-1 data-icon",
    },
    {
      id: 9,
      status: true,
      name:
        (keywordTranslation && keywordTranslation["expireDate"]) ||
        langKey.expireDate,
      // icon: sortAsset,
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const { notes } = watch();

  const handleDetailModal = (data) => {
    setShowModal((prev) => !prev);
    setParticipentData(data);
  };

  const [
    addCommentOnTraining,
    {
      isSuccess: addCommentisSuccess,
      isLoading: addCommentIsLoading,
      isError: addCommentIsError,
      error: addCommentError,
      reset: addCommentReset,
    },
  ] = useAddCommentOnTrainingMutation();

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListViewQuery({
      params: {
        result_status: result,
        id: state?.training.id,
      },
    });

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

  const [
    deleteCommentOnTraining,
    {
      isSuccess: deleteCommentisSuccess,
      isLoading: deleteCommentIsLoading,
      isError: deleteCommentIsError,
      error: deleteCommentError,
      reset: deleteCommentReset,
    },
  ] = useDeleteCommentOnTrainingMutation();

  const [
    updateCommentOnTraining,
    {
      isSuccess: updateCommentisSuccess,
      isLoading: updateCommentIsLoading,
      isError: updateCommentIsError,
      error: updateCommentError,
      reset: updateCommentReset,
    },
  ] = useUpdateCommentOnTrainingMutation();

  const { download } = useDownloader({
    mode: "no-cors",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [
    downloadTrainingCertificate,
    {
      isSuccess: downloadTrainingCertificateSuccess,
      isLoading: downloadTrainingCertificateLoading,
      isFetching: downloadTrainingCertificateFetching,
      error: downloadTrainingCertificateError,
      reset: downloadTrainingCertificateReset,
    },
  ] = useDownloadTrainingCertificateMutation();

  const handleDownloadTrainingCertificate = () => {
    downloadTrainingCertificate(state?.training.id)
      .unwrap()
      .then((payload) => {
        download(payload?.data, "file." + payload?.data?.split(".").pop());
        FileSaver.saveAs(
          payload?.data,
          "file." + payload?.data?.split(".").pop()
        );
      })
      .catch((error) => {
        if (error?.data?.message === "mustBePass") {
          let msg =
            (error?.data?.message === "mustBePass" &&
              keywordTranslation &&
              keywordTranslation["mustBePass"]) ||
            validationMessage.mustBePass;
          toast.error(msg);
        }
      });
  };

  const handleStartQuiz = () => {
    if (getSingleTrainingList?.remaining_attempted === 0) {
      toast.error(
        (keywordTranslation && keywordTranslation["noAttemps"]) ||
        validationMessage.noAttemps
      );
    } else {
      navigate(paths.trueFalse, {
        state: { questions: getSingleTrainingList },
      });
    }
  };

  const onSubmit = (training) => {
    setIsLoading(true);

    const formData = new FormData();
    if (commentId) {
      formData.append("_method", "put");
      formData.append("id", commentId);
      formData.append("training_id", trainingId);
      formData.append("comments", notes);

      updateCommentOnTraining(formData)
        .unwrap()
        .then((payload) => {
          // payload &&
          // toast.success("Note updated successfully", { toastId: "" });
          let msg =
            (payload?.message === "updated" &&
              keywordTranslation &&
              keywordTranslation["noteUpdatedSuccess"]) ||
            successMsg.noteUpdatedSuccess;
          toast.success(msg, { toastId: "" });
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message, { toastId: "" });
        });
    } else {
      formData.append("comments", notes);
      formData.append("training_id", state?.training.id);

      addCommentOnTraining(formData)
        .unwrap()
        .then((payload) => {
          // payload && toast.success("Note added successfully", { toastId: "" });
          let msg =
            (payload?.message === "created" &&
              keywordTranslation &&
              keywordTranslation["noteCreatedSuccess"]) ||
            successMsg.noteCreatedSuccess;
          toast.success(msg, { toastId: "" });
          setIsLoading(false);
          setValue("notes", "");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message, { toastId: "" });
        });
    }
  };

  const handleDeleteComment = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("_method", "delete");

    deleteCommentOnTraining(formData)
      .unwrap()
      .then((payload) => {
        // payload && toast.success("Note deleted successfully", { toastId: "" });
        let msg =
          (payload?.message === "deleted" &&
            keywordTranslation &&
            keywordTranslation["noteDeletedSuccess"]) ||
          successMsg.noteDeletedSuccess;
        toast.success(msg, { toastId: "" });
      });
  };

  const handleUpdateComment = (training) => {
    setValue("notes", training.comments);
    setCommentId(training.id);
    setTrainingId(training.training_id);
  };

  const delTrainingModalHandler = (data) => {
    setDelClient((prev) => !prev);
  };

  const handleDeleteTraining = (data) => {
    const formData = new FormData();
    if (data?.id) {
      formData.append("_method", "delete");
      formData.append("training_data", 1);
      formData.append(`ids[]`, data.id);
    }

    deleteTraining(formData)
      .unwrap()
      .then((payload) => {
        payload && navigate(paths.tranings, { state: { deleted: true } });
        // payload &&
        // toast.success("Training deleted successfully", { toastId: "" });
        let msg =
          (payload?.message === "deleted" &&
            keywordTranslation &&
            keywordTranslation["trainingDeleteSuccess"]) ||
          successMsg.trainingDeleteSuccess;
        toast.success(msg);
        cart?.filter((item) => {
          if (item.id === data?.id) {
            dispatch(removeFromCart(data?.id));
          }
        });
      });
  };

  useEffect(() => {
    if (
      deleteCommentisSuccess ||
      addCommentisSuccess ||
      updateCommentisSuccess
    ) {
      getSingleTrainingRefetch();
      setValue("notes", "");
      setCommentId("");
    }
  }, [deleteCommentisSuccess, addCommentisSuccess, updateCommentisSuccess]);

  return (
    <>
      {showModal && (
        <TraningDetailModal
          handleDetailModal={handleDetailModal}
          getSingleTrainingList={getSingleTrainingList}
          participentData={participentData}
        />
      )}
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
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="row mt-4">
          <div className="col-12 main-div">
            <div className="row">
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <NavLink to={paths.tranings}>
                      <img src={backarrow1Asset} width="14px" height="14.7px" />
                    </NavLink>
                    <p className="ml-3 working-at-height">
                      {(keywordTranslation && keywordTranslation["training"]) ||
                        langKey.training}
                      : {getSingleTrainingList?.training?.name}
                    </p>
                  </div>
                  <img
                    src={getSingleTrainingList?.training.icon || notFoundAsset}
                    width="25px"
                    height="25px"
                  />
                </div>

                <div className="d-flex mt-2 mb-3 gap-3 ml-1">
                  <div className="d-flex align-items-center ml-4">
                    <img
                      src={
                        getSingleTrainingList?.training?.category?.image ||
                        notFoundAsset
                      }
                      width="16px"
                      height="16px"
                    />
                    <p className="status">
                      {getSingleTrainingList?.training?.category?.name || "—"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img src={filePurpleAsset} width="14px" height="16.8px" />
                    <p className="status">
                      {getSingleTrainingList?.training?.training_resource
                        ?.length ? (
                        <>
                          {getSingleTrainingList?.training?.training_resource[0].documents
                            ?.split(".")
                            .pop()}{" "}
                          file (98 pages)
                        </>
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <ToggleSlide
                      Class="Medium"
                      checked={
                        getSingleTrainingList?.training.status === "failed"
                          ? false
                          : true
                      }
                    />

                    <p className="status mt-1">
                      {" "}
                      {getSingleTrainingList?.training.status === "failed"
                        ? (keywordTranslation &&
                          keywordTranslation["inActive"]) ||
                        langKey.inActive
                        : (keywordTranslation &&
                          keywordTranslation["active"]) ||
                        langKey.active}
                    </p>
                  </div>
                  <div className="d-flex align-items-center">
                    <img src={validityAsset} width="16px" height="16px" />
                    <p className="status">
                      {(keywordTranslation && keywordTranslation["validFor"]) ||
                        langKey.validFor}{" "}
                      {getSingleTrainingList?.training?.valid_for}{" "}
                    </p>
                  </div>

                  {getSingleTrainingList?.training?.training_mode !==
                    "free" && (
                      <>
                        <div className="d-flex align-items-center">
                          <img src={priceIconAsset} width="16px" height="16px" />
                          <p className="status">
                            {getSingleTrainingList?.training.price || "—"}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <img
                            src={discountIconAsset}
                            width="16px"
                            height="16px"
                          />
                          <p className="status">
                            {getSingleTrainingList?.training?.discount || "—"}
                          </p>
                        </div>
                      </>
                    )}
                </div>

                <p className="working-text pb-5">
                  {getSingleTrainingList?.training?.desc}
                </p>

                <div className="d-flex gap-3 align-items-center mt-5 ml-4 position-absolute bottom-0">
                  {getSingleTrainingList?.training?.internal_training_single ===
                    null && getSingleTrainingList?.training?.question.length ? (
                    <button className="addtocart-btn" onClick={handleStartQuiz}>
                      {(keywordTranslation &&
                        keywordTranslation["startQuiz"]) ||
                        langKey.startQuiz}
                    </button>
                  ) : getSingleTrainingList?.training
                    ?.internal_training_single &&
                    getSingleTrainingList?.training?.internal_training_single
                      .result === "passed" ? (
                    <button
                      className="getCertificate"
                      onClick={handleDownloadTrainingCertificate}
                    >
                      {(keywordTranslation &&
                        keywordTranslation["getCertificate"]) ||
                        langKey.getCertificate}
                    </button>
                  ) : getSingleTrainingList?.training
                    ?.internal_training_single &&
                    getSingleTrainingList?.training?.internal_training_single
                      .result === "failed" &&
                    getSingleTrainingList?.training?.question.length ? (
                    <button className="addtocart-btn" onClick={handleStartQuiz}>
                      {(keywordTranslation &&
                        keywordTranslation["startQuiz"]) ||
                        langKey.startQuiz}
                    </button>
                  ) : null}

                  <div className="d-flex align-items-center gap-2">
                    <NavLink
                      to={paths.singleAddNewTraning}
                      state={{ training: getSingleTrainingList?.training }}
                    >
                      <img
                        src={editAsset}
                        alt=""
                        width="16.11px"
                        height="16.11px"
                        className="cursor"
                      />
                    </NavLink>

                    <img
                      src={deleteBlankAsset}
                      alt=""
                      width="16px"
                      height="17px"
                      className="cursor ml-3"
                      onClick={() => {
                        delTrainingModalHandler(
                          getSingleTrainingList?.training
                        );
                        setDeletedData(getSingleTrainingList?.training);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <img
                  src={state?.training?.image || notFoundAsset}
                  width="250px"
                  height="185px"
                  className="certificate-img"
                />
              </div>
            </div>
          </div>

          <div className="col-12 main-div mt-3">
            <div className="row">
              <div className="col-md-8">
                {state?.training.media_url && (
                  <div className="pdf-div">
                    {/* {
                    <PDFViewer
                      document={{
                        url: state?.training.training_resource[0]?.documents,
                      }}
                    />
                  } */}

                    {state?.training.media_url?.split(".").pop() !== "pdf" ? (
                      <ReactPlayer
                        url={state?.training.media_url}
                        playing={true}
                        controls={true}
                        light={true}
                        volume={true}
                        muted={true}
                        pip={true}
                        width="100%"
                        height="398px"
                      />
                    ) : (
                      <iframe
                        src={state?.training.media_url}
                        width="100%"
                        height="398px"
                      ></iframe>
                    )}
                  </div>
                )}
              </div>
              <div className="col-md-4">

                <textarea
                  placeholder={
                    (keywordTranslation && keywordTranslation["createNote"]) ||
                    langKey.createNote
                  }
                  {...register("note")}
                  col="3"
                  className="addNote"
                  value={notes}
                  onChange={(e) => setValue("notes", e.target.value)}
                ></textarea>
                {errors.note && <ErrorViewer message={errors.note.message} />}

                <div className="d-flex justify-content-end mt-2">
                  <SaveButton
                    label={
                      (keywordTranslation && keywordTranslation["save"]) ||
                      langKey.save
                    }
                    buttonStyle="addnew_btn pl-4 pr-4"
                    onClick={handleSubmit(onSubmit)}
                    loading={isLoading}
                  />
                </div>

                <hr className="gray" />
                <div className="overflow-auto customScroll mt-3" style={{ height: "272px" }}>
                  {getSingleTrainingList?.training.comment_on_training?.map(
                    (data) => {
                      return (
                        <div
                          className="p-3 mb-3"
                          style={{ background: "#F4F4F4", borderRadius: "3px" }}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={timeAsset}
                                alt=""
                                width="14px"
                                height="14px"
                              />
                              <p
                                className="mb-0 fs-11 fw-500"
                                style={{ color: "#A7A7A7" }}
                              >
                                {
                                  moment(data?.created_at)
                                    .format("LLL")
                                    ?.split("PM" || "AM")[0]
                                }
                              </p>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={editNewAsset}
                                alt=""
                                width="14px"
                                height="14px"
                                className="cursor"
                                onClick={() => handleUpdateComment(data)}
                              />
                              <img
                                src={delete_iconAsset}
                                alt=""
                                width="13px"
                                height="14px"
                                className="cursor"
                                onClick={() => handleDeleteComment(data?.id)}
                              />
                            </div>
                          </div>

                          <div>
                            <p
                              className="mb-0 fs-13 fw-500 mt-2"
                              style={{ color: "#838383", lineBreak: "anywhere" }}
                            >
                              {data?.comments}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-4">
          <div className="main-div">
            <div className="col-lg-12">
              <div className="d-flex align-items-center">
                <h3 className="fs-15 fw-600" style={{ color: "#6B6B6B" }}>
                  {(keywordTranslation &&
                    keywordTranslation["totalParticipants"]) ||
                    langKey.totalParticipants}
                </h3>

                <div className="d-flex gap-2 ml-auto">
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="internalDropdown"
                    >
                      {(keywordTranslation && keywordTranslation["internal"]) ||
                        langKey.internal}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {" "}
                        {(keywordTranslation && keywordTranslation["action"]) ||
                          langKey.action}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  {/* <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="internalDropdown"
                    >
                      {(keywordTranslation &&
                        keywordTranslation["completed"]) ||
                        langKey.completed}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>
                        {" "}
                        {(keywordTranslation && keywordTranslation["action"]) ||
                          langKey.action}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}

                  <select
                    name=""
                    id=""
                    className="internalDropdown p-2"
                    onChange={(e) => setResult(e.target.value)}
                  >
                    <option value="" disabled="true">
                      {(keywordTranslation && keywordTranslation["Result"]) ||
                        langKey.result}
                    </option>
                    <option value="passed">
                      {" "}
                      {(keywordTranslation && keywordTranslation["passed"]) ||
                        langKey.passed}
                    </option>
                    <option value="failed">
                      {" "}
                      {(keywordTranslation && keywordTranslation["failed"]) ||
                        langKey.failed}
                    </option>
                    <option value="new">
                      {" "}
                      {(keywordTranslation && keywordTranslation["new"]) ||
                        langKey.new}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <TableComponent>
              <thead>
                <tr>
                  {tableTitle.map(
                    ({ id, name, status, icon, elementStyle }) => (
                      <>
                        {name === langKey.setting ? (
                          <th scope="col" key={id}>
                            <div className="last-th">
                              <p
                                className="fs-12"
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
                                  <img src={icon} className={elementStyle} />
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
                {getSingleTrainingList?.training.participants.length === 0 ? (
                  <NoRecordFound colSpan="10" />
                ) : (
                  <>
                    {getSingleTrainingList?.training.participants?.map(
                      (data, index) => {
                        return (
                          <tr>
                            {tableTitle[0].status && <td>{index + 1}</td>}

                            {tableTitle[1].status && (
                              <td>
                                <div className="media">
                                  <img
                                    className="mr-3 rounded-circle"
                                    src={data.profile_photo || userAsset}
                                    alt=""
                                    width="26px"
                                    height="26px"
                                  />
                                  <div className="media-body">
                                    <div style={{ display: "flex" }}>
                                      <h5 className="mt-0 fs-12 fw-600">
                                        {data?.first_name}
                                      </h5>
                                      <h5 className="mt-0 fs-12 fw-600 ml-1">
                                        {data?.last_name}
                                      </h5>
                                    </div>
                                    <p
                                      className="mb-0 fs-11"
                                      style={{ color: "#ADADAD" }}
                                    >
                                      {data?.function
                                        ? data?.function.name
                                        : "—"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            )}

                            {tableTitle[2].status && (
                              <td>
                                {/* <img
                                  src={besixAsset}
                                  width="72.53px"
                                  height="51px"
                                  alt=""
                                /> */}
                                <p
                                  className="mb-0"
                                  style={{ color: "#2C8EFF" }}
                                >
                                  {
                                    getSingleTrainingList?.training?.company
                                      ?.name
                                  }
                                </p>
                              </td>
                            )}
                            {tableTitle[3].status && (
                              <td>
                                <div className="d-flex justify-content-center align-items-center internal-td">
                                  <p
                                    className="mb-0"
                                    style={{ color: "#2C8EFF" }}
                                  >
                                    Internal
                                  </p>
                                </div>
                              </td>
                            )}

                            {tableTitle[4].status && (
                              <td>
                                <img
                                  src={data?.status === 1 && statusGreenAsset}
                                  alt=""
                                />
                              </td>
                            )}

                            {tableTitle[5].status && (
                              <td>
                                <p
                                  className="mb-0"
                                  style={{ color: "#994308" }}
                                >
                                  {getSingleTrainingList?.training
                                    ?.passing_score ? (
                                    <>
                                      {
                                        getSingleTrainingList?.training
                                          ?.passing_score
                                      }
                                      %
                                    </>
                                  ) : (
                                    "—"
                                  )}
                                </p>
                              </td>
                            )}

                            {tableTitle[6].status && (
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <img
                                    src={greenLikeAsset}
                                    alt=""
                                    width="14px"
                                    height="14.42px"
                                  />
                                  <p
                                    className="mb-0"
                                    style={{ color: "green" }}
                                  >
                                    22:22s
                                  </p>
                                </div>
                              </td>
                            )}

                            {tableTitle[7].status && (
                              <td>
                                {moment(data?.created_at).format("DD/MM/YYYY")}
                              </td>
                            )}

                            {tableTitle[8].status && (
                              <td>
                                {moment(data?.deadline).format("DD/MM/YYYY")}
                              </td>
                            )}
                            <td>
                              <div className="last-td">
                                <img
                                  src={viewblueAsset}
                                  alt=""
                                  className="cursor"
                                  onClick={() => handleDetailModal(data)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </>
                )}
              </tbody>
            </TableComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewParticipants;
