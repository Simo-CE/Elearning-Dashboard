import React, { useState } from "react";
import ModalComponent from "../../../components/Model/Model";
import Button from "../../../components/Button/Button";
import { Modal } from "react-bootstrap";
import { useTeacherTrainingRemarksMutation } from "../../../services/api";
import { toast } from "react-toastify";
import langkey from "../../../localization/locale.json";
import { useSelector } from "react-redux";

const ScoreConfirmantionModal = (props) => {
  const [detail, setDetail] = useState("");

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [
    teacherTrainingRemarks,
    {
      isSuccess: teacherTrainingRemarksSuccess,
      isLoading: teacherTrainingRemarksLoading,
      isFetching: teacherTrainingRemarksFetching,
      error: teacherTrainingRemarksError,
      reset: teacherTrainingRemarksReset,
    },
  ] = useTeacherTrainingRemarksMutation();

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append(
      "user_id",
      props?.teacherTrainingQuestion?.question_result.user_id
    );
    formData.append("mark", props?.scoreValue);
    formData.append(
      "training_id",
      props?.teacherTrainingQuestion?.question_result.training_id
    );
    formData.append(
      "question_id",
      props?.teacherTrainingQuestion?.question_result?.question_id
    );
    formData.append("detail", detail);
    formData.append("tt_id", props?.tt_id);
    props?.teacherTrainingQuestion?.teacher_check &&
      formData.append("id", props?.teacherTrainingQuestion?.teacher_check?.id);
    teacherTrainingRemarks(formData)
      .unwrap()
      .then((payload) => {
        toast.success("Success");
        props.ScoreModalHandler();
        props.action(payload?.data);
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  return (
    <>
      <ModalComponent
        size="md"
        show={true}
        handleClose={props.ScoreModalHandler}
        title="Score Confermation"
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-lg-12">
              <p className="fs-12 fw-500" style={{ color: "#4E4E4E" }}>
                {(keywordTranslation && keywordTranslation["scoreValueText"]) ||
                  langkey.scoreValueText}
                <span style={{ color: "#ED4C5C" }} className="ml-1">
                  {props?.scoreValue}{" "}
                  {(keywordTranslation && keywordTranslation["points"]) ||
                    langkey.points}
                </span>
                .{" "}
                {(keywordTranslation && keywordTranslation["describeWhy"]) ||
                  langkey.describeWhy}
                :
              </p>
              <textarea
                rows="7"
                placeholder="Type here.."
                className="mt-3 scoreTextArea w-100 fs-12 fw-500 black"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
              ></textarea>
              <p className="optional text-end">
                {" "}
                {(keywordTranslation && keywordTranslation["optional"]) ||
                  langkey.optional}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Cancel"
            buttonStyle="cancel mr-2"
            onClick={props.ScoreModalHandler}
          />
          <Button
            label="Submit"
            buttonStyle="addnew_btn pe-3 ps-3"
            onClick={handleSubmit}
            loading={teacherTrainingRemarksLoading}
          />
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default ScoreConfirmantionModal;
