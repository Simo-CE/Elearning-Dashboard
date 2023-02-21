import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  backarrow1Asset,
  deleteAsset,
  delete_iconAsset,
  editNewAsset,
  filePurpleAsset,
  iconAsset,
  img1Asset,
  profileAsset,
  securityAsset,
  statusGreenAsset,
  timeAsset,
  validityAsset,
} from "../../assets";
import SaveButton from "../../components/Button/Button";
import PDFViewer from "../../components/PDFViewerPlugin/PDFViewer";
import paths from "../../routes/paths";
import {
  useAddCommentOnTrainingMutation,
  useDeleteCommentOnTrainingMutation,
  useGetSingleTrainingListQuery,
  useUpdateCommentOnTrainingMutation,
} from "../../services/api";
import "./WorkerArea.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const StartQuizGetCertificate = () => {
  const { state } = useLocation();
  const [notes, setNotes] = useState("");
  const [commentId, setCommentId] = useState("");
  const [trainingId, setTrainingId] = useState("");

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
    useGetSingleTrainingListQuery(state?.training.id);

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

  const hanldeSaveComment = (training) => {
    const formData = new FormData();
    if (commentId) {
      formData.append("_method", "put");
      formData.append("id", commentId);
      formData.append("training_id", trainingId);
      formData.append("comments", notes);

      updateCommentOnTraining(formData)
        .unwrap()
        .then((payload) => {
          payload && toast.success("Notes updated successfully");
        });
    } else {
      formData.append("comments", notes);
      formData.append("training_id", state?.training.id);

      addCommentOnTraining(formData)
        .unwrap()
        .then((payload) => {
          payload && toast.success("Notes added successfully");
          setNotes("");
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
        // payload && toast.success("Notes deleted successfully");
      });
  };

  const handleUpdateComment = (training) => {
    setNotes(training.comments);
    setCommentId(training.id);
    setTrainingId(training.training_id);
  };

  useEffect(() => {
    if (
      deleteCommentisSuccess ||
      addCommentisSuccess ||
      updateCommentisSuccess
    ) {
      getSingleTrainingRefetch();
      setNotes("");
    }
  }, [deleteCommentisSuccess, addCommentisSuccess, updateCommentisSuccess]);

  return (
    <>
      <div style={{ marginLeft: "10%", marginRight: "10%" }}>
        <div className="row mt-4">
          <div className="col-12 main-div">
            <div className="row">
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img src={backarrow1Asset} width="14px" height="14.7px" />
                    <p className="ml-3 working-at-height">
                      {state?.training?.name}
                    </p>
                  </div>
                  <img src={iconAsset} width="25px" height="25px" />
                </div>

                <div className="d-flex align-items-center mt-2 mb-3">
                  <img
                    src={securityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">{state?.training?.category?.name}</p>
                  <img
                    src={filePurpleAsset}
                    width="14px"
                    height="16.8px"
                    className="imgs"
                  />
                  <p className="status">PDF file (98 pages)</p>
                  <img
                    src={statusGreenAsset}
                    width="20px"
                    height="20px"
                    className="imgs"
                  />
                  <p className="status">Completed</p>
                  <img
                    src={validityAsset}
                    width="16px"
                    height="16px"
                    className="imgs"
                  />
                  <p className="status">Valid for 2 years</p>
                </div>

                <p className="working-text">{state?.training?.desc}</p>

                <NavLink
                  to={paths.trueFalse}
                  state={{ questions: getSingleTrainingList }}
                >
                  <button className="addtocart-btn mt-3">START QUIZ</button>
                </NavLink>
              </div>
              <div className="col-md-3">
                <img
                  src={state?.training?.image || profileAsset}
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
                <div className="pdf-div">
                  <PDFViewer />
                </div>
              </div>
              <div className="col-md-4">
                <textarea
                  placeholder="Add note.."
                  col="3"
                  className="addNote"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>

                <div className="d-flex justify-content-end mt-2">
                  <SaveButton
                    label="Save"
                    buttonStyle="addnew_btn pl-4 pr-4"
                    onClick={hanldeSaveComment}
                  />
                </div>

                <hr />
                {getSingleTrainingList?.comment_on_training?.map((data) => {
                  return (
                    <div
                      className="p-3"
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
                            onClick={() => handleUpdateComment(data)}
                          />
                          <img
                            src={delete_iconAsset}
                            alt=""
                            width="13px"
                            height="14px"
                            onClick={() => handleDeleteComment(data?.id)}
                          />
                        </div>
                      </div>

                      <div>
                        <p
                          className="mb-0 fs-13 fw-500"
                          style={{ color: "#838383" }}
                        >
                          {data?.comments}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartQuizGetCertificate;
