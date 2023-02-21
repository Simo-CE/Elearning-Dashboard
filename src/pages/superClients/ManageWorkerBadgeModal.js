import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import ModalComponent from "../../components/Model/Model";
import { Modal } from "react-bootstrap";
import {
  addContactAsset,
  aidAsset,
  deleteAsset,
  deleteBlankAsset,
  editAsset,
  englishAsset,
  fileUploadIconAsset,
  flagAsset,
  franceAsset,
  iconAsset,
  nederlandsAsset,
  newlecLogoAsset,
  notFoundAsset,
  phycoProfileAsset,
  profilePageAsset,
  qrcodeAsset,
  transparentAsset,
  uploadAsset,
  uploadCamAsset,
  workerprofileAsset,
} from "../../assets";
import Toggle from "../../components/ToggleSlide/ToggleSlide";
import "./Clients.css";
import { useForm } from "react-hook-form";
import ImageViewer from "../../components/ImageViewer";
import { useSelector } from "react-redux";
import langKey from "../../localization/locale.json";
import InputMasks from "../../components/inputMask/InputMask";
import { useGetWorkerBadgeSettingsQuery } from "../../services/api";

const ManageWorkerBadge = (props) => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showCompanyLogo, setShowCompanyLogo] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWorkerName, setShowWorkerName] = useState(false);
  const [showFunction, setShowFunction] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [showNativeLanguage, setShowNativeLanguage] = useState(false);
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);
  const [showCompletedTraining, setShowCompletedTraining] = useState(false);
  const [showPsychologistName, setShowPsychologistName] = useState(false);
  const [showPsychologistJob, setShowPsychologistJob] = useState(false);
  const [showPsychologistPhoto, setShowPsychologistPhoto] = useState(false);
  const [showPsychologistNumber, setShowPsychologistNumber] = useState(false);
  const [showEmergencyIcon, setShowEmergencyIcon] = useState(false);
  const [showEmergencyNumber, setShowEmergencyNumber] = useState(false);
  const [showBadgeVisible, setShowBadgeVisible] = useState(false);
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("");
  const [psyPhone, setPsyPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [psyNameToggle, setPsyNameToggle] = useState(false);
  const [psyJobToggle, setPsyJobToggle] = useState(false);
  const [psyImageToggle, setPsyImageToggle] = useState(false);
  const [psyPhoneToggle, setPsyPhoneToggle] = useState(false);
  const [emergencyIconToggle, setEmergencyIconToggle] = useState(false);
  const [emergencyPhoneToggle, setEmergencyPhoneToggle] = useState(false);
  const [iconShow, setIconShow] = useState();
  const [imageShow, setImageShow] = useState();

  const {
    data: getWorkerBadgeSettings,
    isSuccess: getWorkerBadgeSettingsSuccess,
    isLoading: getWorkerBadgeSettingsLoading,
    refetch: getWorkerBadgeSettingsRefetch,
  } = useGetWorkerBadgeSettingsQuery({ company_id: props?.data?.id });

  const badgeSetting = getWorkerBadgeSettings?.data;

  useEffect(() => {
    if (props?.success) {
      getWorkerBadgeSettingsRefetch();
    }
  }, [props?.success]);

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      visible_status: 0,
      company_logo: 0,
      complete_training: 0,
      email: 0,
      emergency_icon_id: 0,
      emergency_phone_no_id: 0,
      function_id: 0,
      native_language_id: 0,
      other_language_id: 0,
      phone_number: 0,
      psy_name_id: 0,
      psy_phone_no_id: 0,
      psy_photo_id: 0,
      site_id: 0,
      worker_name: 0,
      worker_photo: 0,
    },
  });

  // visible_status: 0,
  // company_logo: 0,
  // complete_training: 0,
  // email: 0,
  // function_id: 0,
  // native_language_id: 0,
  // other_language_id: 0,
  // phone_number: 0,
  // psy_name_id: 0,
  // site_id: 0,
  // worker_name: 0,
  // worker_photo: 0,

  // const { visible_status } = badgeSetting?.WorkerBadgeSetting;

  let {
    psy_name,
    psy_job,
    psy_phone_no,

    // visible_status,company_logo, complete_training, complete_training, email, function_id, native_language_id, other_language_id,
    // other_language_id, phone_number,site_id, worker_name, worker_photo
  } = watch();

  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setImageShow(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleIcon = (e) => {
    if (e.target.files) {
      setIcon(e.target.files[0]);
      setIconShow(URL.createObjectURL(e.target.files[0]));
    }
  };

  const resetImage = () => {
    setImage("");
  };

  const resetIcon = () => {
    setIcon("");
  };

  const handlePsyPhone = ({ target: { value } }) => {
    setPsyPhone(value);
    setValue("psy_phone_no", psyPhone);
  };

  const handleEmergencyPhone = ({ target: { value } }) => {
    setEmergencyPhone(value);
    setValue("emergency_phone_no", emergencyPhone);
  };

  const onSubmit = (values) => {
    let formData = new FormData();

    // for (const field in values) {
    //   formData.append(field, values[field]);
    // }

    formData.append("visible_status", values?.visible_status == 1 ? 1 : 0);
    formData.append("company_logo", values.company_logo == 1 ? 1 : 0);
    formData.append("complete_training", values.complete_training == 1 ? 1 : 0);
    formData.append("email", values.email == 1 ? 1 : 0);
    formData.append("function_id", values.function_id == 1 ? 1 : 0);
    formData.append(
      "native_language_id",
      values.native_language_id == 1 ? 1 : 0
    );
    formData.append("other_language_id", values.other_language_id == 1 ? 1 : 0);
    formData.append("phone_number", values.phone_number == 1 ? 1 : 0);
    formData.append("site_id", values.site_id == 1 ? 1 : 0);
    formData.append("psy_name_id", values.psy_name_id == 1 ? 1 : 0);
    formData.append("worker_name", values.worker_name == 1 ? 1 : 0);
    formData.append("worker_photo", values.worker_photo == 1 ? 1 : 0);

    formData.append("psy_photo_id", values.psy_photo_id == 1 ? 1 : 0);
    formData.append("psy_phone_no_id", values.psy_phone_no_id == 1 ? 1 : 0);
    formData.append(
      "emergency_phone_no_id",
      values.emergency_phone_no_id == 1 ? 1 : 0
    );
    formData.append("emergency_icon_id", values.emergency_icon_id == 1 ? 1 : 0);

    // psy_photo_id: 0,
    // psy_phone_no_id: 0,
    // emergency_phone_no_id: 0,
    // emergency_icon_id: 0,

    formData.append("_method", "put");
    formData.append("company_id", props?.data?.id);
    image && formData.append("psy_photo", image);
    icon && formData.append("emergency_icon", icon);
    psyPhone &&
      formData.append(
        "psy_phone_no",
        badgeSetting?.company?.psy_phone_no || psyPhone
      );
    emergencyPhone &&
      formData.append(
        "emergency_phone_no",
        badgeSetting?.company?.emergency_phone_no || emergencyPhone
      );
    formData.append("id", badgeSetting?.WorkerBadgeSetting?.id || 0);

    // formData.append(
    //   "visible_status",
    //   Number(badgeSetting?.WorkerBadgeSetting?.visible_status == 1) ?? 0
    // );
    // formData.append(
    //   "company_logo",
    //   Number(badgeSetting?.WorkerBadgeSetting?.company_logo == 1) ?? 0
    // );
    // formData.append(
    //   "complete_training",
    //   Number(badgeSetting?.WorkerBadgeSetting?.complete_training == 1) ?? 0
    // );
    // formData.append(
    //   "email",
    //   Number(badgeSetting?.WorkerBadgeSetting?.email == 1) ?? 0
    // );
    // formData.append(
    //   "emergency_icon_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.emergency_icon_id == 1) ?? 0
    // );
    // formData.append(
    //   "emergency_phone_no_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.emergency_phone_no_id == 1) ?? 0
    // );
    // formData.append(
    //   "function_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.function_id == 1) ?? 0
    // );
    // formData.append(
    //   "native_language_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.native_language_id == 1) ?? 0
    // );
    // formData.append(
    //   "other_language_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.other_language_id == 1) ?? 0
    // );
    // formData.append(
    //   "phone_number",
    //   Number(badgeSetting?.WorkerBadgeSetting?.phone_number == 1) ?? 0
    // );
    // formData.append(
    //   "psy_name_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.psy_name_id == 1) ?? 0
    // );
    // formData.append(
    //   "psy_phone_no_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.psy_phone_no_id == 1) ?? 0
    // );
    // formData.append(
    //   "psy_photo_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.psy_photo_id == 1) ?? 0
    // );
    // formData.append(
    //   "site_id",
    //   Number(badgeSetting?.WorkerBadgeSetting?.site_id == 1) ?? 0
    // );
    // formData.append(
    //   "worker_name",
    //   Number(badgeSetting?.WorkerBadgeSetting?.worker_name == 1) ?? 0
    // );
    // formData.append(
    //   "worker_photo",
    //   Number(badgeSetting?.WorkerBadgeSetting?.worker_photo == 1) ?? 0
    // );

    props.action(formData);
  };

  useEffect(() => {
    if (badgeSetting?.WorkerBadgeSetting?.visible_status == 1) {
      setShowBadgeVisible(true);
    }

    if (badgeSetting?.WorkerBadgeSetting?.company_logo == 1) {
      setShowCompanyLogo(!showCompanyLogo);
    }

    if (badgeSetting?.WorkerBadgeSetting?.complete_training == 1) {
      setShowCompletedTraining(!showCompletedTraining);
    }

    if (badgeSetting?.WorkerBadgeSetting?.email == 1) {
      setShowEmail(!showEmail);
    }

    if (badgeSetting?.WorkerBadgeSetting?.emergency_icon_id == 1) {
      setShowEmergencyIcon(!showEmergencyIcon);
    }

    if (badgeSetting?.WorkerBadgeSetting?.emergency_phone_no_id == 1) {
      setShowEmergencyNumber(!showEmergencyNumber);
    }

    if (badgeSetting?.WorkerBadgeSetting?.function_id == 1) {
      setShowFunction(!showFunction);
    }

    if (badgeSetting?.WorkerBadgeSetting?.native_language_id == 1) {
      setShowNativeLanguage(!showNativeLanguage);
    }

    if (badgeSetting?.WorkerBadgeSetting?.other_language_id == 1) {
      setShowOtherLanguage(!showOtherLanguage);
    }

    if (badgeSetting?.WorkerBadgeSetting?.phone_number == 1) {
      setShowPhoneNumber(!showPhoneNumber);
    }

    if (badgeSetting?.WorkerBadgeSetting?.psy_name_id == 1) {
      setShowPsychologistName(!showPsychologistName);
    }

    if (badgeSetting?.WorkerBadgeSetting?.psy_name_id == 1) {
      setShowPsychologistJob(!showPsychologistJob);
    }

    if (badgeSetting?.WorkerBadgeSetting?.psy_phone_no_id == 1) {
      setShowPsychologistNumber(!showPsychologistNumber);
    }

    if (badgeSetting?.WorkerBadgeSetting?.psy_photo_id == 1) {
      setShowPsychologistPhoto(!showPsychologistPhoto);
    }

    if (badgeSetting?.WorkerBadgeSetting?.site_id == 1) {
      setShowSite(!showSite);
    }

    if (badgeSetting?.WorkerBadgeSetting?.worker_name == 1) {
      setShowWorkerName(!showWorkerName);
    }

    if (badgeSetting?.WorkerBadgeSetting?.worker_photo == 1) {
      setShowProfile(!showProfile);
    }

    if (badgeSetting?.company?.psy_name) {
      setPsyNameToggle(!psyNameToggle);
    }
    if (badgeSetting?.company?.psy_job) {
      setPsyJobToggle(!psyJobToggle);
    }
    if (badgeSetting?.company?.psy_photo) {
      setPsyImageToggle(!psyImageToggle);
    }
    if (badgeSetting?.company?.psy_phone_no) {
      setPsyPhoneToggle(!psyPhoneToggle);
    }
    if (badgeSetting?.company?.emergency_icon) {
      setEmergencyIconToggle(!emergencyIconToggle);
    }
    if (badgeSetting?.company?.emergency_phone_no) {
      setEmergencyPhoneToggle(!emergencyPhoneToggle);
    }

    if (badgeSetting?.company) {
      let { psy_name, psy_job, psy_phone_no, emergency_phone_no } =
        badgeSetting?.company;
      reset({
        psy_name,
        psy_job,
        psy_phone_no,
        emergency_phone_no,
      });
      setValue("psy_name", psy_name);
      setValue("psy_job", psy_job);
    }

    if (badgeSetting?.WorkerBadgeSetting) {
      let {
        visible_status,
        company_logo,
        complete_training,
        email,
        emergency_icon_id,
        emergency_phone_no_id,
        function_id,
        native_language_id,
        other_language_id,
        phone_number,
        psy_name_id,
        psy_job_id,
        psy_phone_no_id,
        psy_photo_id,
        site_id,
        worker_name,
        worker_photo,
      } = badgeSetting?.WorkerBadgeSetting;

      reset({
        visible_status,
        company_logo,
        complete_training,
        email,
        emergency_icon_id,
        emergency_phone_no_id,
        function_id,
        native_language_id,
        other_language_id,
        phone_number,
        psy_name_id,
        psy_phone_no_id,
        psy_photo_id,
        site_id,
        worker_name,
        worker_photo,
      });
    }
  }, [getWorkerBadgeSettingsSuccess]);

  const [resetImg, setResetImg] = useState(false);
  const [resetIconn, setResetIconn] = useState(false);

  return (
    <>
      <ModalComponent
        size="lg"
        show={true}
        handleClose={props.manageWorkerModalHandler}
        title={
          (keywordTranslation && keywordTranslation["manageBadge"]) ||
          langKey.manageBadge
        }
        // icon={reassignAsset}
      >
        <Modal.Body className="overflow">
          <div className="row">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-lg-12">
                  <h4 className="fs-12 fw-500" style={{ color: "#AEAEAE" }}>
                    {(keywordTranslation &&
                      keywordTranslation["badgeVisibility"]) ||
                      langKey.badgeVisibility}
                  </h4>
                  <div className="d-flex align-items-center mt-2">
                    <p className="fs-11 fw-500">
                      {(keywordTranslation && keywordTranslation["disabled"]) ||
                        langKey.disabled}
                      /
                      {(keywordTranslation && keywordTranslation["enabled"]) ||
                        langKey.enabled}
                    </p>
                    <div className="ms-auto">
                      <Toggle
                        Class="Medium"
                        // checked={
                        //   badgeSetting?.WorkerBadgeSetting?.visible_status
                        // }
                        defaultChecked={
                          badgeSetting?.WorkerBadgeSetting?.visible_status
                        }
                        onChangeHandler={(value) => {
                          setShowBadgeVisible(!showBadgeVisible);
                          setValue("visible_status", Number(value));
                        }}
                      />
                    </div>
                  </div>
                </div>

                {showBadgeVisible && (
                  <div className="col-lg-12 mt-3">
                    <h4 className="fs-12 fw-500" style={{ color: "#AEAEAE" }}>
                      {(keywordTranslation &&
                        keywordTranslation["badgeInfo"]) ||
                        langKey.badgeInfo}
                    </h4>

                    <div className="d-flex align-items-center mt-2">
                      <p className="fs-11 fw-500 black">
                        {" "}
                        {(keywordTranslation &&
                          keywordTranslation["companyLogo"]) ||
                          langKey.companyLogo}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.company_logo
                          }
                          onChangeHandler={(value) => {
                            setShowCompanyLogo(!showCompanyLogo);
                            setValue("company_logo", Number(value) || 0);
                            // setToggleSlide(Number(value));
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation &&
                          keywordTranslation["WorkerPhoto"]) ||
                          langKey.WorkerPhoto}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.worker_photo
                          }
                          onChangeHandler={(value) => {
                            setShowProfile(!showProfile);
                            setValue("worker_photo", Number(value));
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation &&
                          keywordTranslation["workerFullName"]) ||
                          langKey.workerFullName}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.worker_name
                          }
                          onChangeHandler={(value) => {
                            setShowWorkerName(!showWorkerName);
                            setValue("worker_name", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {" "}
                        {(keywordTranslation &&
                          keywordTranslation["function"]) ||
                          langKey.function}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.function_id
                          }
                          onChangeHandler={(value) => {
                            setShowFunction(!showFunction);
                            setValue("function_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation &&
                          keywordTranslation["phoneNumber"]) ||
                          langKey.phoneNumber}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.phone_number
                          }
                          onChangeHandler={(value) => {
                            setShowPhoneNumber(!showPhoneNumber);
                            setValue("phone_number", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation && keywordTranslation["email"]) ||
                          langKey.email}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.email
                          }
                          onChangeHandler={(value) => {
                            setShowEmail(!showEmail);
                            setValue("email", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation && keywordTranslation["site"]) ||
                          langKey.site}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.site_id
                          }
                          onChangeHandler={(value) => {
                            setShowSite(!showSite);
                            setValue("site_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation &&
                          keywordTranslation["nativeLanguage"]) ||
                          langKey.nativeLanguage}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.native_language_id
                          }
                          onChangeHandler={(value) => {
                            setShowNativeLanguage(!showNativeLanguage);
                            setValue("native_language_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {" "}
                        {(keywordTranslation &&
                          keywordTranslation["otherLanguage"]) ||
                          langKey.otherLanguage}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.other_language_id
                          }
                          onChangeHandler={(value) => {
                            setShowOtherLanguage(!showOtherLanguage);
                            setValue("other_language_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <p className="fs-11 fw-500 black">
                        {(keywordTranslation &&
                          keywordTranslation["completedTrainings"]) ||
                          langKey.completedTrainings}
                      </p>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.complete_training
                          }
                          onChangeHandler={(value) => {
                            setShowCompletedTraining(!showCompletedTraining);
                            setValue("complete_training", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <p className="fs-11 fw-500 black">
                          {(keywordTranslation &&
                            keywordTranslation["psyName"]) ||
                            langKey.psyName}
                        </p>
                        <img
                          src={editAsset}
                          className="cursor"
                          width="12px"
                          height="12px"
                          onClick={() => setPsyNameToggle(!psyNameToggle)}
                        />
                        {psyNameToggle && (
                          <img
                            src={deleteBlankAsset}
                            className="cursor"
                            width="11px"
                            height="11.69px"
                            onClick={() => setValue("psy_name", "")}
                          />
                        )}
                      </div>

                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.psy_name_id
                          }
                          onChangeHandler={(value) => {
                            setShowPsychologistName(!showPsychologistName);
                            setValue("psy_name_id", value ? Number(value) : 0);
                          }}
                        />
                      </div>
                    </div>
                    {psyNameToggle && (
                      <input
                        {...register("psy_name")}
                        type="text"
                        // value={badgeSetting?.company?.psy_name || psyName}
                        // onChange={(e) => setPsyName(e.target.value)}
                        defaultValue={badgeSetting?.company?.psy_name}
                        className="typetext mr-2 form-control mt-2 mb-2"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["psychologist"]) ||
                          langKey.psychologist
                        }
                      />
                    )}

                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <p className="fs-11 fw-500 black">
                          {(keywordTranslation &&
                            keywordTranslation["psyJob"]) ||
                            langKey.psyJob}
                        </p>
                        <img
                          src={editAsset}
                          className="cursor"
                          width="12px"
                          height="12px"
                          onClick={() => setPsyJobToggle(!psyJobToggle)}
                        />
                        {psyJobToggle && (
                          <img
                            src={deleteBlankAsset}
                            className="cursor"
                            width="11px"
                            height="11.69px"
                            onClick={() => setValue("psy_job", "")}
                          />
                        )}
                      </div>

                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.psy_name_id
                          }
                          onChangeHandler={(value) => {
                            setShowPsychologistJob(!showPsychologistJob);
                            setValue("psy_job_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>
                    {psyNameToggle && (
                      <input
                        {...register("psy_job")}
                        type="text"
                        defaultValue={badgeSetting?.company?.psy_job}
                        className="typetext mr-2 form-control mt-2 mb-2"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["psychologist"]) ||
                          langKey.psychologist
                        }
                      />
                    )}

                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <p className="fs-11 fw-500 black">
                          {(keywordTranslation &&
                            keywordTranslation["psyPhoto"]) ||
                            langKey.psyPhoto}
                        </p>
                        <img
                          src={editAsset}
                          className="cursor"
                          width="12px"
                          height="12px"
                          onClick={() => setPsyImageToggle(!psyImageToggle)}
                        />
                        {psyImageToggle && (
                          <img
                            src={deleteBlankAsset}
                            className="cursor"
                            width="11px"
                            height="11.69px"
                            onClick={() => {
                              resetImage();
                              setResetImg(!resetImg);
                            }}
                          />
                        )}
                      </div>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.psy_photo_id
                          }
                          onChangeHandler={(value) => {
                            setShowPsychologistPhoto(!showPsychologistPhoto);
                            setValue("psy_photo_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    {!resetImg ? (
                      <>
                        {psyImageToggle && (
                          <div className="position-relative">
                            <div className="csvfile_div mt-2 mb-2">
                              {!badgeSetting?.company?.psy_photo && (
                                <center
                                  className={image && "removeUploadImg"}
                                  style={{ zIndex: "13" }}
                                >
                                  <img
                                    src={uploadAsset}
                                    alt=""
                                    className="upload_csv"
                                  />
                                  <input
                                    type="file"
                                    name="image"
                                    className="TbmFileUpload"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={(e) => handleImage(e)}
                                    style={{ top: "0" }}
                                  />
                                  <p className="csvtext">
                                    {(keywordTranslation &&
                                      keywordTranslation["dragDropImg"]) ||
                                      langKey.dragDropImg}
                                    <br />
                                    {(keywordTranslation &&
                                      keywordTranslation["or"]) ||
                                      langKey.or}{" "}
                                    <span className="browse_file">
                                      {" "}
                                      {(keywordTranslation &&
                                        keywordTranslation["browseFiles"]) ||
                                        langKey.browseFiles}
                                    </span>
                                  </p>
                                </center>
                              )}
                            </div>
                            <div className="classiImgPrev position-absolute top-0">
                              <ImageViewer
                                src={
                                  image ||
                                  badgeSetting?.company?.psy_photo ||
                                  transparentAsset
                                }
                                alt="user"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = notFoundAsset;
                                }}
                                width="98%"
                                height="110px"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="position-relative">
                        <div className="csvfile_div mt-2 mb-2">
                          <center
                            className={image && "removeUploadImg"}
                            style={{ zIndex: "13" }}
                          >
                            <img
                              src={uploadAsset}
                              alt=""
                              className="upload_csv"
                            />
                            <input
                              type="file"
                              name="image"
                              className="TbmFileUpload"
                              accept="image/png, image/jpg, image/jpeg"
                              onChange={(e) => handleImage(e)}
                              style={{ top: "0" }}
                            />
                            <p className="csvtext">
                              {(keywordTranslation &&
                                keywordTranslation["dragDropImg"]) ||
                                langKey.dragDropImg}{" "}
                              <br />
                              {(keywordTranslation &&
                                keywordTranslation["or"]) ||
                                langKey.or}{" "}
                              <span className="browse_file">
                                {" "}
                                {(keywordTranslation &&
                                  keywordTranslation["browseFiles"]) ||
                                  langKey.browseFiles}
                              </span>
                            </p>
                          </center>
                        </div>
                        <div className="classiImgPrev position-absolute top-0">
                          <ImageViewer
                            src={image || transparentAsset}
                            alt="user"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = notFoundAsset;
                            }}
                            width="98%"
                            height="110px"
                          />
                        </div>
                      </div>
                    )}

                    <div className="d-flex align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <p className="fs-11 fw-500 black">
                          {(keywordTranslation &&
                            keywordTranslation["psyPhoneNumber"]) ||
                            langKey.psyPhoneNumber}
                        </p>
                        <img
                          src={editAsset}
                          className="cursor"
                          width="12px"
                          height="12px"
                          onClick={() => setPsyPhoneToggle(!psyPhoneToggle)}
                        />
                        {psyPhoneToggle && (
                          <img
                            src={deleteBlankAsset}
                            className="cursor"
                            width="11px"
                            height="11.69px"
                            onClick={() => setPsyPhone("")}
                          />
                        )}
                      </div>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting?.psy_phone_no_id
                          }
                          onChangeHandler={(value) => {
                            setShowPsychologistNumber(!showPsychologistNumber);
                            setValue("psy_phone_no_id", Number(value) || 0);
                          }}
                        />
                      </div>
                    </div>

                    {psyPhoneToggle && (
                      <InputMasks
                        mask="99/99/9999"
                        value={psyPhone || badgeSetting?.company?.psy_phone_no}
                        onChange={handlePsyPhone}
                      >
                        <input
                          // {...register("phone_number")}
                          type="number"
                          className="typetext mr-2 form-control"
                          // value={phone_number}
                          placeholder="+32 0 000 00 00"
                        />
                      </InputMasks>
                    )}

                    <div>
                      <div className="d-flex align-items-center mt-2">
                        <div className="d-flex align-items-center gap-2">
                          <p className="fs-11 fw-500 black">
                            {(keywordTranslation &&
                              keywordTranslation["EmergencyIcon"]) ||
                              langKey.EmergencyIcon}
                          </p>
                          <img
                            src={editAsset}
                            className="cursor"
                            width="12px"
                            height="12px"
                            onClick={() =>
                              setEmergencyIconToggle(!emergencyIconToggle)
                            }
                          />
                          {emergencyIconToggle && (
                            <img
                              src={deleteBlankAsset}
                              className="cursor"
                              width="11px"
                              height="11.69px"
                              onClick={() => {
                                resetIcon();
                                setResetIconn(!resetIconn);
                              }}
                            />
                          )}
                        </div>
                        <div className="ms-auto">
                          <Toggle
                            Class="Medium"
                            defaultChecked={
                              badgeSetting?.WorkerBadgeSetting
                                ?.emergency_icon_id
                            }
                            onChangeHandler={(value) => {
                              setShowEmergencyIcon(!showEmergencyIcon);
                              setValue("emergency_icon_id", Number(value) || 0);
                            }}
                          />
                        </div>
                      </div>

                      {!resetIconn ? (
                        <>
                          {emergencyIconToggle && (
                            <div className="position-relative">
                              <div className="csvfile_div mt-2 mb-2">
                                {!badgeSetting?.company?.emergency_icon && (
                                  <center
                                    className={icon && "removeUploadImg"}
                                    style={{ zIndex: "13" }}
                                  >
                                    <img
                                      src={uploadAsset}
                                      alt=""
                                      className="upload_csv"
                                    />
                                    <input
                                      type="file"
                                      name="icon"
                                      className="TbmFileUpload"
                                      accept="image/png, image/jpg, image/jpeg"
                                      onChange={(e) => handleIcon(e)}
                                      style={{ top: "0" }}
                                    />
                                    <p className="csvtext">
                                      {(keywordTranslation &&
                                        keywordTranslation["dragDropImg"]) ||
                                        langKey.dragDropImg}{" "}
                                      <br />
                                      {(keywordTranslation &&
                                        keywordTranslation["or"]) ||
                                        langKey.or}{" "}
                                      <span className="browse_file">
                                        {" "}
                                        {(keywordTranslation &&
                                          keywordTranslation["browseFiles"]) ||
                                          langKey.browseFiles}
                                      </span>
                                    </p>
                                  </center>
                                )}
                              </div>
                              <div className="classiImgPrev position-absolute top-0">
                                <ImageViewer
                                  src={
                                    icon ||
                                    badgeSetting?.company?.emergency_icon ||
                                    transparentAsset
                                  }
                                  alt="user"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = notFoundAsset;
                                  }}
                                  width="98%"
                                  height="110px"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="position-relative">
                          <div className="csvfile_div mt-2 mb-2">
                            <center
                              className={icon && "removeUploadImg"}
                              style={{ zIndex: "13" }}
                            >
                              <img
                                src={uploadAsset}
                                alt=""
                                className="upload_csv"
                              />
                              <input
                                type="file"
                                name="icon"
                                className="TbmFileUpload"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={(e) => handleIcon(e)}
                                style={{ top: "0" }}
                              />
                              <p className="csvtext">
                                {(keywordTranslation &&
                                  keywordTranslation["dragDropImg"]) ||
                                  langKey.dragDropImg}{" "}
                                <br />
                                {(keywordTranslation &&
                                  keywordTranslation["or"]) ||
                                  langKey.or}{" "}
                                <span className="browse_file">
                                  {" "}
                                  {(keywordTranslation &&
                                    keywordTranslation["browseFiles"]) ||
                                    langKey.browseFiles}
                                </span>
                              </p>
                            </center>
                          </div>
                          <div className="classiImgPrev position-absolute top-0">
                            <ImageViewer
                              src={icon || transparentAsset}
                              alt="user"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = notFoundAsset;
                              }}
                              width="98%"
                              height="110px"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <div className="d-flex align-items-center gap-2">
                          <p className="fs-11 fw-500 black">
                            {(keywordTranslation &&
                              keywordTranslation["EmergPhoneNmbr"]) ||
                              langKey.EmergPhoneNmbr}
                          </p>
                          <img
                            src={editAsset}
                            className="cursor"
                            width="12px"
                            height="12px"
                            onClick={() =>
                              setEmergencyPhoneToggle(!emergencyPhoneToggle)
                            }
                          />
                          {emergencyPhoneToggle && (
                            <img
                              src={deleteBlankAsset}
                              className="cursor"
                              width="11px"
                              height="11.69px"
                              onClick={() => setEmergencyPhone("")}
                            />
                          )}
                        </div>
                      </div>
                      <div className="ms-auto">
                        <Toggle
                          Class="Medium"
                          defaultChecked={
                            badgeSetting?.WorkerBadgeSetting
                              ?.emergency_phone_no_id
                          }
                          // checked={
                          //   badgeSetting?.WorkerBadgeSetting
                          //     ?.emergency_phone_no_id
                          // }
                          onChangeHandler={(value) => {
                            setShowEmergencyNumber(!showEmergencyNumber);
                            setValue(
                              "emergency_phone_no_id",
                              Number(value) || 0
                            );
                          }}
                        />
                      </div>
                    </div>
                    {emergencyPhoneToggle && (
                      <InputMasks
                        mask="99/99/9999"
                        value={
                          emergencyPhone ||
                          badgeSetting?.company?.emergency_phone_no
                        }
                        onChange={handleEmergencyPhone}
                      >
                        <input
                          // {...register("phone_number")}
                          type="number"
                          className="typetext mr-2 form-control"
                          // value={phone_number}
                          placeholder="+32 0 000 00 00"
                        />
                      </InputMasks>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-7">
              {!showBadgeVisible && (
                <div className="row">
                  <div className="col-lg-12">
                    <p
                      className="fs-14 fw-500 text-center mt-4"
                      style={{ color: "#AEAEAE", fontStyle: "italic" }}
                    >
                      {(keywordTranslation &&
                        keywordTranslation["disabledBadge"]) ||
                        langKey.disabledBadge}
                    </p>
                  </div>
                </div>
              )}

              {showBadgeVisible && (
                <div>
                  <div className="row">
                    <div className="col-lg-12">
                      <label
                        className="fs-12 fw-550"
                        style={{ color: "#AEAEAE" }}
                      >
                        {(keywordTranslation &&
                          keywordTranslation["frontSide"]) ||
                          langKey.frontSide}
                      </label>
                      <div
                        className="border p-3 bg-white"
                        style={{ height: "180px" }}
                      >
                        <div className="row">
                          <div className="col-lg-6 mt-3">
                            <div>
                              <div className="media d-flex">
                                {showProfile && (
                                  <img
                                    className="me-3"
                                    src={profilePageAsset}
                                    width="50px"
                                    height="50px"
                                    alt="profile"
                                  />
                                )}
                                <div className="media-body">
                                  {showWorkerName && (
                                    <h5 className="mt-0 fs-12 fw-500">
                                      {(keywordTranslation &&
                                        keywordTranslation["Blaise"]) ||
                                        langKey.Blaise}
                                    </h5>
                                  )}
                                  {showFunction && (
                                    <div>
                                      <p className="function">
                                        {(keywordTranslation &&
                                          keywordTranslation["electrician"]) ||
                                          langKey.electrician}
                                      </p>
                                      <p
                                        className="border-bottom"
                                        style={{ width: "17px" }}
                                      ></p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="media d-flex mt-2">
                                {showProfile && (
                                  <img
                                    className="me-3"
                                    src={qrcodeAsset}
                                    width="50px"
                                    height="50px"
                                    alt="profile"
                                  />
                                )}

                                <div
                                  className="media-body"
                                  style={{ marginTop: "-18px" }}
                                >
                                  {showPhoneNumber && (
                                    <h5 className="mt-0 contactDetail">
                                      {" "}
                                      {(keywordTranslation &&
                                        keywordTranslation["number"]) ||
                                        langKey.number}
                                    </h5>
                                  )}
                                  {showEmail && (
                                    <h5 className="mt-0 contactDetail">
                                      {(keywordTranslation &&
                                        keywordTranslation["mail"]) ||
                                        langKey.mail}
                                    </h5>
                                  )}
                                  {showSite && (
                                    <h5 className="mt-0 contactDetail">
                                      {(keywordTranslation &&
                                        keywordTranslation["hainaut"]) ||
                                        langKey.hainaut}
                                    </h5>
                                  )}
                                  {showOtherLanguage && (
                                    <div className="d-flex gap-2">
                                      <img
                                        src={englishAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                      <img
                                        src={franceAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                      <img
                                        src={nederlandsAsset}
                                        width="18px"
                                        height="18px"
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-6 ">
                            <div>
                              {showCompanyLogo && (
                                <div className="d-flex">
                                  <img
                                    src={props?.data?.logo || notFoundAsset}
                                    width="80px"
                                    height="24px"
                                    className="ms-auto"
                                  />
                                </div>
                              )}
                              {showCompletedTraining && (
                                <div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                  <div className="d-flex gap-2 mt-2">
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                      className="ms-auto"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                    <img
                                      src={iconAsset}
                                      width="28px"
                                      height="28px"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <label
                        className="fs-12 fw-550"
                        style={{ color: "#AEAEAE" }}
                      >
                        {(keywordTranslation && keywordTranslation["back"]) ||
                          langKey.back}
                      </label>
                      <div
                        className="border p-3 bg-white"
                        style={{ height: "200px" }}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="d-flex align-items-start">
                              <div className="media d-flex">
                                {showPsychologistPhoto && (
                                  <img
                                    className="me-3"
                                    src={
                                      imageShow ||
                                      badgeSetting?.company?.psy_photo ||
                                      notFoundAsset
                                    }
                                    width="48px"
                                    height="48px"
                                    alt="profile"
                                  />
                                )}
                                <div className="media-body">
                                  <div>
                                    {showPsychologistName && (
                                      <h5 className="mt-0 fs-12 fw-500">
                                        {psy_name ||
                                          badgeSetting?.company?.psy_name}
                                      </h5>
                                    )}
                                    {showPsychologistJob && (
                                      <>
                                        <p className="function">
                                          {psy_job ||
                                            badgeSetting?.company?.psy_job}
                                        </p>
                                        <p
                                          className="border-bottom mb-0"
                                          style={{ width: "17px" }}
                                        ></p>
                                      </>
                                    )}
                                  </div>
                                  {showPsychologistNumber && (
                                    <div>
                                      <p className="contactDetail">
                                        {psyPhone?.replaceAll("_", "") ||
                                          badgeSetting?.company?.psy_phone_no}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="media d-flex align-items-center ms-auto">
                                {showEmergencyIcon && (
                                  <img
                                    className="me-2"
                                    src={
                                      iconShow ||
                                      badgeSetting?.company?.emergency_icon ||
                                      notFoundAsset
                                    }
                                    width="18px"
                                    height="20px"
                                    alt="profile"
                                  />
                                )}
                                {showEmergencyNumber && (
                                  <div className="media-body">
                                    <h5
                                      className="mt-0 contactDetail"
                                      style={{ lineHeight: "1" }}
                                    >
                                      {emergencyPhone?.replaceAll("_", "") ||
                                        badgeSetting?.company
                                          ?.emergency_phone_no}
                                    </h5>
                                    <p className="function">
                                      {(keywordTranslation &&
                                        keywordTranslation["callForHelp"]) ||
                                        langKey.callForHelp}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-12 ">
                            <div>
                              <div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                  <img
                                    src={iconAsset}
                                    width="28px"
                                    height="28px"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <div>
            <img
              src={props?.data?.logo || notFoundAsset}
              width={props?.data?.logo ? "90px" : "35px"}
              height="27px"
            />
          </div>
          <div className="d-flex gap-3">
            <Button
              label="Cancel"
              buttonStyle="cancel mr-2"
              onClick={props.manageWorkerModalHandler}
            />
            <Button
              label="Done"
              buttonStyle="createbtn pe-3 ps-3"
              loading={props?.loading}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </Modal.Footer>
      </ModalComponent>
    </>
  );
};

export default ManageWorkerBadge;
