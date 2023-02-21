import React, { useState, useEffect } from "react";
import SaveButton from "../../../components/Button/Button";
import "../../adminArea/adminArea.css";
import AddGroupModal from "./AddGroupModal";
import Button from "../../../components/Button/Button";
import AddTraningCarousal from "./AddTraningCarousal";
import { Col, Nav, Row, Tab, Dropdown } from "react-bootstrap";
import paths from "../../../routes/paths";
import "../../workerArea/WorkerArea.css";
import { NavLink } from "react-router-dom";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";

import {
  batchAsset,
  blueUploadAsset,
  uploadAsset,
  crossAsset,
  redCrossAsset,
  binSimpleAsset,
  addIconAsset2,
  backarrow1Asset,
  filePurpleAsset,
  iconAsset,
  img1Asset,
  securityAsset,
  statusGreenAsset,
  validityAsset,
  editSimpleAsset,
  dragDropDotsAsset,
  editiconAsset,
  editNewAsset,
  editIconAsset,
  editsimpleAsset1,
  discountFrameAsset,
  trueFalseIconAsset,
  multichoiceIconAsset,
  dragDropAsset,
  freeTextIconAsset,
  dragDropImgAsset,
  interectiveImgAsset,
  textAreaImgAsset,
  bin2Asset,
  addBlueAsset,
  notFoundAsset,
  deleteBlankAsset,
} from "../../../assets";
import {
  useAddCategoryCompetenceMutation,
  useAddSeriesTrainingMutation,
  useAddTopicsMutation,
  useGetCategoryQuery,
  useGetDepartmentDropdownListQuery,
  useGetFunctionsDropdownQuery,
  useGetTopicQuery,
  useGetTopicsQuery,
  useManagerDropDownQuery,
  useRoleDropDownQuery,
  useSeriesTrainingListQuery,
  useTopicDropdownQuery,
} from "../../../services/api";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import SearchableDropdown from "../../../components/searchDropdown/SearchableDropdown";
import AlertComponent from "../../../components/alert/Alert";
import Multiselect from "multiselect-react-dropdown";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Toggle from "../../../components/ToggleSlide/ToggleSlide";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import {
  diceAsset,
  expectedTime1Asset,
  expectedTimeAsset,
  infoAsset,
  minesAsset,
  passedIconAsset,
  passsingScoreAsset,
  repeatAsset,
  timeAsset,
  timerAsset,
  webcamAsset,
} from "../../../assets";
import "../adminArea.css";
import moment from "moment";
import CategoryModal from "../../competenceSetting/CategoryModal";
import { toast } from "react-toastify";
import TopicsModal from "../../competenceSetting/TopicsModal";
import ImageViewer from "../../../components/ImageViewer";
import ToggleSlide from "../../../components/ToggleSlide/ToggleSlide";
import { useSelector } from "react-redux";
import langKey from "../../../localization/locale.json";
import successMsg from "../../../localization/successMsgLocale.json";

const MultipleAddNewTraning = () => {
  const company_id = useSelector(
    (state) => state.auth?.userDetail?.user?.company_id
  );

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [showAddGroup, setShowAddGroup] = useState(false);
  const [category_id, setCategory_id] = useState("");
  const [topicId, setTopicId] = useState("");
  const [function_id, setFucntionId] = useState([]);
  const [belongTo, setBelongTo] = useState();
  const [quesCounter, setQuesCounter] = useState(1);
  let [timeCounter, setTimeCounter] = useState(0);
  let [passingScoreCounter, setPassingScoreCounter] = useState(0);
  let [timeExpectedCounter, setTimeExpectedCounter] = useState(0);
  let [attemptsCounter, setAttemptsCounter] = useState(0);
  const [createTrainingSuccess, setCreateTrainingSuccess] = useState(false);
  const [trainingImage, setTrainingImage] = useState("");
  const [trainingImageName, setTrainingImageName] = useState("");
  const [trainingLogo, setTrainingLogo] = useState("");
  const [trainingLogoName, setTrainingLogoName] = useState("");
  const [section, setSection] = useState([]);
  const [questionType, setQuestionType] = useState();
  const [payloadTrainging, setPayloadTraining] = useState("");
  const [sectionHandler, setSectionHandler] = useState([]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [indexOptions, setIndexOptions] = useState([]);
  const [indexIncreament, setIndexIncreament] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddTopicsModal, setShowAddTopicsModal] = useState(false);

  const renderTooltip = (props) => (
    <Popover id="popover-basic" {...props}>
      <Popover.Body>
        When the countdown is <br />
        finished, the system will <br />
        automatically move to
        <br /> the next question.
      </Popover.Body>
    </Popover>
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const yearsList = [
    { value: "One Year", label: "One Year" },
    { value: "Two Year", label: "Two Year" },
    { value: "Three Year", label: "Three Year" },
    { value: "Four Year", label: "Four Year" },
    { value: "Five Year", label: "Five Year" },
  ];

  const [
    addSeriesTraining,
    {
      isSuccess: addTrainingisSuccess,
      isLoading: addTrainingIsLoading,
      isError: addTrainingIsError,
      error: addTrainingError,
      reset: addClientReset,
    },
  ] = useAddSeriesTrainingMutation();

  const [
    addCategoryCompetence,
    {
      isSuccess: addCategoryCompetenceSuccess,
      isLoading: addCategoryCompetenceLoading,
      isFetching: addCategoryCompetenceFetching,
      error: addCategoryCompetenceError,
      reset: addCategoryCompetenceReset,
    },
  ] = useAddCategoryCompetenceMutation();

  const [
    addTopics,
    {
      isSuccess: addTopicsSuccess,
      isLoading: addTopicsLoading,
      isFetching: addTopicsFetching,
      error: addTopicsError,
      reset: addTopicsReset,
    },
  ] = useAddTopicsMutation();

  const {
    data: topicsList,
    isLoading: topicsListLoading,
    isFetching: topicsListFetching,
    isError: topicsListError,
    refetch: topicsListRefetch,
  } = useGetTopicsQuery({ params: { category_id } });

  const { data: roleDropDown } = useRoleDropDownQuery();
  const { data: seriesTrainingList } = useSeriesTrainingListQuery();
  const { data: functionDropdown } = useGetFunctionsDropdownQuery();
  const { data: getDepartmentDropdownList } =
    useGetDepartmentDropdownListQuery();

  const {
    data: getCategory,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch: CategoryCompetenceRefetch,
  } = useGetCategoryQuery();

  const {
    data: managerList,
    isLoading: managerListLoading,
    isError: managerListError,
    refetch: managererRefetch,
  } = useManagerDropDownQuery(company_id);

  const categoryOptions = getCategory?.data?.data?.map((category) => {
    return { value: category.id, label: category.name };
  });

  const topicOptions = topicsList?.data?.map((topic) => {
    return { value: topic.id, label: topic.name };
  });

  const sectionOptions = seriesTrainingList?.map((section) => {
    return { value: section.value, label: section.label };
  });

  const departmentsOptions = getDepartmentDropdownList?.map((department) => {
    return { value: department.value, label: department.label };
  });

  const functionOptions = functionDropdown?.data?.function?.data?.map(
    (func) => {
      return { name: func.name, id: func.id };
    }
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Training title is required"),
    description: Yup.string(),
    price: Yup.number().required("Required"),
    discount: Yup.number().required("Required"),
    validFor: Yup.string().required("Required"),
  });

  const addAddCategoryHandler = () => {
    setShowCategoryInput((prev) => !prev);
  };
  const addAddTopicsHandler = () => {
    setShowAddTopicsModal((prev) => !prev);
  };

  const addCategoryCompetenceHandler = (data) => {
    addCategoryCompetence(data)
      .unwrap()
      .then((payload) => {
        setShowAddCategoryModal((prev) => !prev);
        payload && toast.success("Category added successfully");
        payload && toast.error("Error");
      });
  };

  const addTopicsHandler = (data) => {
    addTopics(data)
      .unwrap()
      .then((payload) => {
        toast.success("Success");
        addAddTopicsHandler();
      });
  };

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

  let { category_name, category_image, validFor } = watch();

  const addGroupModalHandler = () => {
    setShowAddGroup((Prev) => !Prev);
  };

  const handleTrainingTitleImage = (index, value) => {
    let list = [...section];
    list[index].categoryImage = value;
    setSection([...list]);
  };

  const handleTrainingLogo = (e) => {
    setTrainingLogoName(e.target.files[0]);
    setTrainingLogo(URL.createObjectURL(e.target.files[0]));
  };

  const handleAddSection = () => {
    setSection([...section, {}]);
  };

  const handleSection = () => {
    setSectionHandler([sectionHandler, {}]);
  };

  const handleTrainingImage = (e) => {
    setTrainingImageName(e.target.files[0]);
    setTrainingImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTrainingTitle = (index, title) => {
    let list = [...section];
    list[index].title = title;
    setSection([...list]);
  };

  const handleCategoryInput = (value, index) => {
    setValue("category_name", value);
    let list = [...section];
    list[index].category = value;
    setSection([...list]);
  };

  const removeImg = (index) => {
    let list = [...section];
    let option = list[index].categoryImage;
    option.splice(index, 1);
    setSection([...list]);
  };

  const handleTrainingImages = (index, image) => {
    let list = [...section];
    list[index].trainingImage = image;
    setSection([...list]);
  };

  const removeTrainingImage = (index) => {
    let list = [...section];
    list[index].trainingImage = "";
    setSection([...list]);
  };

  const handleTrainingTitleImages = (index, image) => {
    let list = [...section];
    list[index].trainingTitleImage = image;
    setSection([...list]);
  };

  const handleTrainingMediaURL = (index, url) => {
    let list = [...section];
    list[index].mediaURL = url;
    setSection([...list]);
  };

  const removeTrainingTitleImage = (index) => {
    let list = [...section];
    list[index].trainingTitleImage = null;
    setSection([...list]);
  };

  const handleTrainingFile = (index, file) => {
    let list = [...section];
    list[index].trainingFile = file;
    setSection([...list]);
  };

  const removeTrainingFile = (index) => {
    let list = [...section];
    list[index].trainingFile = "";
    setSection([...list]);
  };

  const handleTrainingDescription = (index, value) => {
    let list = [...section];
    list[index].description = value;
    setSection([...list]);
  };

  const handleTrainingPrice = (index, value) => {
    let list = [...section];
    list[index].trainingPrice = Number(value);
    setSection([...list]);
  };

  const handleTrainingDiscount = (index, value) => {
    let list = [...section];
    list[index].trainingDiscount = Number(value);
    setSection([...list]);
  };

  const handleTrainingTax = (index, value) => {
    let list = [...section];
    list[index].trainingTax = Number(value);
    setSection([...list]);
  };

  const handleRandomQuestionCounter = (index, value) => {
    setQuesCounter(value);
    let list = [...section];
    list[index].RandomQuestion = value;
    setSection([...list]);
  };

  const handleTimePerQuestionCounter = (index, value) => {
    setTimeCounter(value);
    let list = [...section];
    list[index].TimePerQuestion = value;
    setSection([...list]);
  };

  const handlePassingScoreCounter = (index, value) => {
    setPassingScoreCounter(value);
    let list = [...section];
    list[index].PassingScore = value;
    setSection([...list]);
  };

  const handleTimeExpectedCounter = (index, value) => {
    setTimeExpectedCounter(value);
    let list = [...section];
    list[index].TimeExpected = value;
    setSection([...list]);
  };

  const handleAttemptsCounter = (index, value) => {
    setAttemptsCounter(value);
    let list = [...section];
    list[index].Attempts = value;
    setSection([...list]);
  };

  const handleAddQuestions = (index) => {
    let list = [...section];

    if (list[index].questions?.length) {
      list[index].questions = [
        ...list[index].questions,
        {
          questionType: questionType ?? "1",
        },
      ];
    } else {
      list[index].questions = [
        {
          questionType: questionType ?? "1",
        },
      ];
    }

    setSection([...list]);
  };

  const handleCancelQuestion = (sectionIndex, upperIndex) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    option.splice(upperIndex, 1);
    setSection([...list]);
  };

  const handleQuestionTitle = (sectionIndex, upperIndex, title) => {
    const list = [...section];
    let row = list[sectionIndex].questions;
    row[upperIndex].title = title;
    // list[sectionIndex].questions = row;
    setSection([...list]);
  };

  const handleQuestionImage = (sectionIndex, upperIndex, image) => {
    let rows = [...section];
    rows[sectionIndex].questions[upperIndex].questionImage = image;
    setSection([...rows]);
  };

  const addInnerInputFields = (sectionIndex, upperIndex) => {
    setIndexIncreament(indexIncreament + 1);
    setIndexOptions([
      ...indexOptions,
      { value: indexIncreament, label: indexIncreament },
    ]);
    let rows = [...section];
    let list = rows[sectionIndex].questions;
    if (list[upperIndex].options?.length) {
      list[upperIndex].options = [...list[upperIndex].options, {}];
    } else {
      list[upperIndex].options = [{}];
    }
    setSection([...rows]);
  };

  const handleQuestionOption = (
    sectionIndex,
    upperIndex,
    innerIndex,
    value
  ) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    let innerOptions = option[upperIndex].options;
    innerOptions[innerIndex].option = value;
    setSection(list);
  };

  const handleQuestionAnswer = (
    sectionIndex,
    upperIndex,
    innerIndex,
    checked
  ) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    let innerOptions = option[upperIndex].options;
    innerOptions[innerIndex].answer = checked;
    setSection(list);
  };

  const handleDisplay = (sectionIndex, upperIndex, value) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    option[upperIndex].questionType = value || "3";
    setSection(list);
  };

  const handleDropdownQuestionAnswer = (
    sectionIndex,
    upperIndex,
    innerIndex,
    value
  ) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    let innerOptions = option[upperIndex].options;
    innerOptions[innerIndex].answer = value;
    setSection(list);
  };

  const handleCancelQuestionOption = (sectionIndex, upperIndex, innerIndex) => {
    let row = [...indexOptions];
    row.pop();
    setIndexOptions(row);

    const list = [...section];
    let option = list[sectionIndex].questions[upperIndex].options;
    option.splice(innerIndex, 1);
    setSection([...list]);
  };

  const handleQuestionOptionImage = (
    sectionIndex,
    upperIndex,
    innerIndex,
    image
  ) => {
    const list = [...section];
    let option = list[sectionIndex].questions;
    let innerOptions = option[upperIndex].options;
    innerOptions[innerIndex].optionImage = image;
    setSection(list);
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const formData = new FormData();
    let categoryFormData = new FormData();

    data.title && formData.append("name", data.title);
    data.description && formData.append("desc", data.description);
    data.price && formData.append("price", data.price);
    data.discount && formData.append("discount", data.discount);
    validFor && formData.append("valid_for", validFor);
    trainingImageName &&
      trainingImageName &&
      formData.append("image", trainingImageName);
    trainingLogoName &&
      trainingLogoName &&
      formData.append("power_by", trainingLogoName);

    // Multiple Training
    section?.map((data, index) => {
      formData.append("training_mode", data.trainingType ? "paid" : "free");
      if (data.trainingType) {
        formData.append("price", data.trainingPrice);
        formData.append("discount", data.trainingDiscount);
        formData.append("tax", data.trainingTax);
      }

      data.title && formData.append(`training[${index}][name]`, data.title);
      data.validity &&
        formData.append(`training[${index}][valid_for]`, data.validity);
      data.assignTo &&
        formData.append(`training[${index}][assign_for]`, data.assignTo);
      data.department &&
        formData.append(`training[${index}][assign_for]`, data.department);
      data.teacher &&
        formData.append(`training[${index}][teacher_id]`, data.teacher);
      data.trainingImage &&
        formData.append(`training[${index}][image]`, data.trainingImage);
      data.mediaURL &&
        formData.append(`training[${index}][media_url]`, data.mediaURL);
      data.traininFile &&
        formData.append(`training[${index}][document]`, data.traininFile);
      data.description &&
        formData.append(`training[${index}][desc]`, data.description);
      // data.category &&
      //   formData.append(
      //     `training[${index}][topic_image]`,
      //     data.trainingTitleImage
      //   );
      if (category_name) {
        categoryFormData.append(`name[${index}]`, category_name);
        categoryFormData.append(`image[${index}]`, category_image);
        if (category_name) {
          addCategoryCompetence(categoryFormData)
            .unwrap()
            .then((payload) => {
              setIsLoading(false);
              // payload && toast.success("Category added successfully");
              let msg =
              (payload?.message === "created" &&
                keywordTranslation &&
                keywordTranslation["categoryCreatedSuccess"]) ||
              successMsg.categoryCreatedSuccess;
            toast.success(msg);
            })
            .catch((error) => {
              setIsLoading(false);
              toast.error(error?.data?.message);
            });
        }
      } else {
        data.category &&
          formData.append(`training[${index}][category_id]`, data.category);
      }

      data.RandomQuestion &&
        formData.append(`training[${index}][random_q]`, data.RandomQuestion);
      data.TimePerQuestion &&
        formData.append(`training[${index}][time_per_q]`, data.TimePerQuestion);
      data.PassingScore &&
        formData.append(`training[${index}][passing_score]`, data.PassingScore);
      data.Attempts &&
        formData.append(`training[${index}][attempted]`, data.Attempts);

      data?.function &&
        data?.function?.map((func, functionIndex) => {
          func.id &&
            formData.append(
              `training[${index}][function_id][${functionIndex}]`,
              func.id
            );
        });

      data.questions &&
        data.questions.map((question, questionIndex) => {
          question.title &&
            formData.append(
              `training[${index}][question][${questionIndex}][title]`,
              question.title
            );
          question.questionType &&
            formData.append(
              `training[${index}][question][${questionIndex}][type]`,
              question.questionType
            );
          question.questionImage &&
            formData.append(
              `training[${index}][question][${questionIndex}][question_image]`,
              question.questionImage
            );

          question.options.map((option, optionIndex) => {
            option.option &&
              formData.append(
                `training[${index}][question][${questionIndex}][option][${optionIndex}][name]`,
                option.option
              );
            option.answer &&
              formData.append(
                `training[${index}][question][${questionIndex}][answer][${optionIndex}]`,
                option.answer
              );
            // formData.append(`training[${index}][question][${questionIndex}][answer][${optionIndex}]`, option.optionImage);
          });
        });
    });

    addSeriesTraining(formData)
      .unwrap()
      .then((payload) => {
        setPayloadTraining(payload);
        // payload && setCreateTrainingSuccess(true);
        // const timer = setTimeout(() => {
        //   setCreateTrainingSuccess(false);
        //   setIsLoading(false);
        // }, 2000);
        // return () => clearTimeout(timer);

        let msg =
        (payload?.message === "created" &&
          keywordTranslation &&
          keywordTranslation["seriesCreatedSuccess"]) ||
        successMsg.seriesCreatedSuccess;
      toast.success(msg);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.data.message);
      });
  };

  useEffect(() => {
    if (addCategoryCompetenceSuccess) {
      CategoryCompetenceRefetch();
    }
    if (addTopicsSuccess) {
      topicsListRefetch();
      CategoryCompetenceRefetch();
    }
  }, [section, addCategoryCompetenceSuccess, addTopicsSuccess]);

  return (
    <>
      {createTrainingSuccess && (
        <AlertComponent
          message="Training series created successfully."
          closeHandler={addClientReset}
          className="mb-2"
        />
      )}
      <div className="row blue-bg m-0 pt-3 pb-3 ps-4 pe-4">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-5 col-md-7">
              <div>
                <p className="fs-18 fw-550" style={{ color: "#7C7C7C" }}>
                  {(keywordTranslation &&
                    keywordTranslation["addNewTraining"]) ||
                    langKey.addNewTraining}
                </p>
                <input
                  type="text"
                  {...register("title")}
                  className="multiTraningInput w-100"
                  placeholder={
                    (keywordTranslation &&
                      keywordTranslation["trainingTitle"]) ||
                    langKey.trainingTitle
                  }
                />
                {errors.title && (
                  <ErrorViewer
                    className="mt-2"
                    message={errors.title.message}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-12 mt-2">
              <div className="d-flex gap-2">
                <img src={batchAsset} width="12px" height="16.8px" alt="" />
                <p className="fs-12 fw-400" style={{ color: "#313131" }}>
                  This training series has 0 trainings
                </p>
              </div>

              <textarea
                {...register("description")}
                className="multiTraningInput w-100 pt-2 mt-3"
                placeholder={
                  (keywordTranslation && keywordTranslation["description"]) ||
                  langKey.description
                }
                style={{ height: "172px" }}
              ></textarea>
            </div>

            <div className="col-lg-12 mt-2">
              <div className="row">
                <div className="col-lg-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      {...register("price")}
                      type="number"
                      className="multiTraningInput w-100 form-number"
                      placeholder={
                        (keywordTranslation && keywordTranslation["price"]) ||
                        langKey.price
                      }
                    />
                    <p className="fs-20 fw-400">€</p>
                  </div>
                  {errors.price && (
                    <ErrorViewer className="mt-2" message="Required" />
                  )}
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2 align-items-center">
                    <input
                      {...register("discount")}
                      type="number"
                      className="multiTraningInput w-100 form-number"
                      placeholder={
                        (keywordTranslation &&
                          keywordTranslation["discount"]) ||
                        langKey.discount
                      }
                    />
                    <p className="fs-20 fw-400">%</p>
                  </div>
                  {errors.discount && (
                    <ErrorViewer className="mt-2" message="Required" />
                  )}
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2 align-items-center searchable36">
                    <SearchableDropdown
                      placeholder="Validity"
                      {...register("validFor")}
                      options={yearsList}
                      changeHandler={(value) => {
                        setValue("validFor", value);
                      }}
                    />
                    <p className="fs-20 fw-400">
                      {(keywordTranslation && keywordTranslation["day"]) ||
                        langKey.day}
                    </p>
                  </div>
                  {errors.validFor && (
                    <ErrorViewer className="mt-2" message="Required" />
                  )}
                </div>
                <div className="col-lg-3">
                  <div className="d-flex gap-2 align-items-center">
                    <NavLink to={paths.traningSeries}>
                      <SaveButton
                        label={
                          (keywordTranslation &&
                            keywordTranslation["cancel"]) ||
                          langKey.cancel
                        }
                        buttonStyle="cancel"
                      />
                    </NavLink>
                    <SaveButton
                      label={
                        (keywordTranslation && keywordTranslation["create"]) ||
                        langKey.create
                      }
                      buttonStyle="addnew_btn36 ps-4 pe-4"
                      onClick={handleSubmit(onSubmit)}
                      loading={isLoading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-lg-3 ">
              <p
                className="fs-10 fw-500 text-start"
                style={{ color: "#9B9B9B" }}
              >
                {(keywordTranslation && keywordTranslation["providedBy"]) ||
                  langKey.providedBy}
              </p>
              <div className="p-3 blueDashedBorder mt-2">
                <input
                  type="file"
                  name=""
                  id=""
                  className="w-100 h-100 dragdropfile"
                  onChange={(e) => handleTrainingLogo(e)}
                />
                <div className="d-flex jystify-content-center flex-column align-items-center">
                  {trainingLogoName ? (
                    <img
                      src={trainingLogo}
                      width="100%"
                      height="50px"
                      alt=""
                      className="mb-2"
                    />
                  ) : (
                    <>
                      <img
                        src={blueUploadAsset}
                        width="30px"
                        height="21.18px"
                        alt=""
                        className="mb-2"
                      />
                      <p
                        className="fs-12 fw-400 text center"
                        style={{ color: "#6D6D6D" }}
                      >
                        {(keywordTranslation &&
                          keywordTranslation["dragDrop"]) ||
                          langKey.dragDrop}{" "}
                        <br />
                        {(keywordTranslation &&
                          keywordTranslation["yourLogo"]) ||
                          langKey.yourLogo}{" "}
                        <br />
                        {(keywordTranslation && keywordTranslation["or"]) ||
                          langKey.or}
                        <span style={{ color: "#0E4382" }}>
                          {(keywordTranslation &&
                            keywordTranslation["browseFiles"]) ||
                            langKey.browseFiles}
                        </span>{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div style={{ marginTop: "120px" }}>
                <center>
                  <input
                    type="file"
                    name=""
                    id=""
                    className="w-100 traningfile"
                    onChange={(e) => handleTrainingImage(e)}
                  />
                  <div className="d-flex jystify-content-center flex-column align-items-center">
                    {trainingImageName ? (
                      <img
                        src={trainingImage}
                        width="100%"
                        height="276px"
                        alt=""
                        className="mb-2 position-absolute"
                        style={{ top: "22px" }}
                      />
                    ) : (
                      <>
                        <img
                          src={blueUploadAsset}
                          width="30px"
                          height="21.18px"
                          alt=""
                          className="mb-2"
                        />
                        <p
                          className="fs-12 fw-400 text center"
                          style={{ color: "#6D6D6D" }}
                        >
                          {(keywordTranslation &&
                            keywordTranslation["dragDropTraning"]) ||
                            langKey.dragDropTraning}
                          <br />{" "}
                          {(keywordTranslation && keywordTranslation["or"]) ||
                            langKey.or}
                          <span style={{ color: "#0E4382" }}>
                            {(keywordTranslation &&
                              keywordTranslation["browseFiles"]) ||
                              langKey.browseFiles}
                          </span>{" "}
                        </p>
                      </>
                    )}
                  </div>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="row mt-5"
          style={{ marginLeft: "5%", marginRight: "5%" }}
        >
          <div className="col-lg-12 mt-3">
            <Button
              label={
                (keywordTranslation && keywordTranslation["addTraining"]) ||
                langKey.addTraining
              }
              buttonStyle="addQues-btn w-100"
              onClick={handleAddSection}
            />
          </div>
        </div>

        {section?.map((sectionData, sectionIndex) => {
          return (
            <>
              <div
                className="row mt-2"
                style={{ marginLeft: "5%", marginRight: "5%" }}
              >
                <div className="col-lg-5 mt-3">
                  <div className="main-div p-3">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 pr-0">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {(keywordTranslation &&
                              keywordTranslation["category"]) ||
                              langKey.category}
                          </p>
                          <p
                            className="addnew ml-auto"
                            onClick={addAddCategoryHandler}
                          >
                            {showCategoryInput
                              ? (keywordTranslation &&
                                  keywordTranslation["selectCategory"]) ||
                                langKey.selectCategory
                              : (keywordTranslation &&
                                  keywordTranslation["addNewPlus"]) ||
                                langKey.addNewPlus}
                          </p>
                        </div>
                        {showCategoryInput ? (
                          <>
                            <input
                              type="text"
                              {...register("category_input")}
                              className="typetextCategory mr-2 pl-2 paddingRight"
                              placeholder={
                                (keywordTranslation &&
                                  keywordTranslation["category"]) ||
                                langKey.category
                              }
                              value={sectionData.category}
                              onChange={(e) =>
                                handleCategoryInput(
                                  e.target.value,
                                  sectionIndex
                                )
                              }
                            />
                            <div className="upload_div_cs2_category">
                              {category_image && (
                                <>
                                  <ImageViewer
                                    src={category_image || notFoundAsset}
                                    alt=""
                                    className="mr-2"
                                    width="16px"
                                    height="16px"
                                  />
                                  <img
                                    src={bin2Asset}
                                    alt=""
                                    width="16px"
                                    height="15px"
                                    onClick={() => removeImg(sectionIndex)}
                                  />
                                </>
                              )}
                              <img
                                src={uploadAsset}
                                alt=""
                                width="16px"
                                height="13px"
                              />
                              <input
                                type="file"
                                name="category_image"
                                className="typefile"
                                onInput={(e) =>
                                  handleTrainingTitleImage(
                                    sectionIndex,
                                    e.target.files[0]
                                  )
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <SearchableDropdown
                            className="form-select traning-select"
                            placeholder={
                              (keywordTranslation &&
                                keywordTranslation["category"]) ||
                              langKey.category
                            }
                            options={categoryOptions}
                            changeHandler={(value) =>
                              handleCategoryInput(value, sectionIndex)
                            }
                          />
                        )}
                      </div>
                      <div className="col-lg-5 col-md-5">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {" "}
                            {(keywordTranslation &&
                              keywordTranslation["topic"]) ||
                              langKey.topic}
                          </p>
                          <p
                            className="addnew ml-auto"
                            onClick={addAddTopicsHandler}
                          >
                            {(keywordTranslation &&
                              keywordTranslation["addNewPlus"]) ||
                              langKey.addNewPlus}
                          </p>
                        </div>
                        {showAddTopicsModal && (
                          <TopicsModal
                            loading={addTopicsLoading}
                            action={addTopicsHandler}
                            handleCloseAddTopicsModal={addAddTopicsHandler}
                          >
                            {addTopicsError && (
                              <AlertComponent
                                error={true}
                                message={addTopicsError.data.message}
                                closeHandler={addTopicsReset}
                              />
                            )}
                          </TopicsModal>
                        )}

                        <SearchableDropdown
                          className="form-select traning-select"
                          placeholder={
                            (keywordTranslation &&
                              keywordTranslation["select"]) ||
                            langKey.select
                          }
                          options={topicOptions}
                          changeHandler={(value, label) => {
                            let rows = [...section];
                            rows[sectionIndex].topic = value;
                            setSection([...rows]);
                          }}
                        />
                      </div>
                      <div className="col-lg-3 col-md-3 pl-0">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {" "}
                            {(keywordTranslation &&
                              keywordTranslation["validFor"]) ||
                              langKey.validFor}
                          </p>
                        </div>
                        <SearchableDropdown
                          placeholder={
                            (keywordTranslation &&
                              keywordTranslation["select"]) ||
                            langKey.select
                          }
                          options={yearsList}
                          changeHandler={(value) => {
                            let rows = [...section];
                            rows[sectionIndex].validity = value;
                            setSection([...rows]);
                          }}
                        />
                      </div>

                      <div className="col-lg-7 col-md-7 mt-4">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {" "}
                            {(keywordTranslation &&
                              keywordTranslation["training"]) ||
                              langKey.training}
                          </p>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control typetext "
                            placeholder={
                              (keywordTranslation &&
                                keywordTranslation["workingAtHeight"]) ||
                              langKey.workingAtHeight
                            }
                            value={sectionData.title}
                            style={
                              sectionData?.trainingTitleImage
                                ? { paddingRight: "90px" }
                                : { paddingRight: "40px" }
                            }
                            onChange={(e) =>
                              handleTrainingTitle(sectionIndex, e.target.value)
                            }
                          />

                          <div className="upload_div" style={{ top: "26px" }}>
                            {sectionData?.trainingTitleImage && (
                              <>
                                <ImageViewer
                                  src={
                                    sectionData?.trainingTitleImage ||
                                    notFoundAsset
                                  }
                                  alt=""
                                  className="mr-2"
                                  width="22px"
                                  height="22px"
                                />

                                <img
                                  src={deleteBlankAsset}
                                  width="13px"
                                  height="14px"
                                  alt=""
                                  className="cursorOnIcons"
                                  onClick={(e) =>
                                    removeTrainingTitleImage(sectionIndex)
                                  }
                                />
                              </>
                            )}
                            <img
                              src={uploadAsset}
                              alt=""
                              width="24px"
                              height="17px"
                            />
                            <input
                              type="file"
                              name="imageupload"
                              className="typefile"
                              onChange={(e) =>
                                handleTrainingTitleImages(
                                  sectionIndex,
                                  e.target.files[0]
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5 mt-4 pl-0">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {(keywordTranslation &&
                              keywordTranslation["belongTo"]) ||
                              langKey.belongTo}
                          </p>
                          <p
                            className="addnew ml-auto cursor"
                            onClick={() => addGroupModalHandler()}
                          >
                            {(keywordTranslation &&
                              keywordTranslation["addNewPlus"]) ||
                              langKey.addNewPlus}
                          </p>
                        </div>
                        {showAddGroup && (
                          <AddGroupModal
                            addGroupModalHandler={addGroupModalHandler}
                          />
                        )}
                        <SearchableDropdown
                          className="form-select traning-select"
                          options={sectionOptions}
                          changeHandler={(value) => {
                            setValue("belongsTo", value);
                          }}
                        />
                      </div>

                      <div className="col-lg-4 col-md-4 mt-1">
                        <div className="row">
                          <div className="col-lg-12 mt-2">
                            <div className="d-flex align-items-center mt-2">
                              <p className="traningFormLabels">
                                {(keywordTranslation &&
                                  keywordTranslation["assignTo"]) ||
                                  langKey.assignTo}
                              </p>
                              <p className="optional ml-auto">
                                {(keywordTranslation &&
                                  keywordTranslation["optional"]) ||
                                  langKey.optional}
                              </p>
                            </div>
                            <SearchableDropdown
                              placeholder={
                                (keywordTranslation &&
                                  keywordTranslation["selectAssignTo"]) ||
                                langKey.selectAssignTo
                              }
                              className="form-select traning-select"
                              options={roleDropDown}
                              changeHandler={(value) => {
                                let rows = [...section];
                                rows[sectionIndex].assignTo = value;
                                setSection([...rows]);
                              }}
                            />
                          </div>

                          <div className="col-lg-12 mt-2">
                            <div className="d-flex align-items-center mt-2">
                              <p className="traningFormLabels">
                                {(keywordTranslation &&
                                  keywordTranslation["departments"]) ||
                                  langKey.departments}
                              </p>
                              <p className="optional ml-auto">
                                {(keywordTranslation &&
                                  keywordTranslation["optional"]) ||
                                  langKey.optional}
                              </p>
                            </div>
                            <SearchableDropdown
                              placeholder={
                                (keywordTranslation &&
                                  keywordTranslation["selectDepart"]) ||
                                langKey.selectDepart
                              }
                              className="form-select traning-select"
                              options={departmentsOptions}
                              changeHandler={(value) => {
                                let rows = [...section];
                                rows[sectionIndex].departments = value;
                                setSection([...rows]);
                              }}
                            />
                          </div>

                          <div className="col-lg-12 mt-2">
                            <div className="d-flex align-items-center mt-2">
                              <p className="traningFormLabels">
                                {(keywordTranslation &&
                                  keywordTranslation["teacher"]) ||
                                  langKey.teacher}
                              </p>
                              <p className="optional ml-auto">
                                {" "}
                                {(keywordTranslation &&
                                  keywordTranslation["optional"]) ||
                                  langKey.optional}
                              </p>
                            </div>
                            <SearchableDropdown
                              placeholder={
                                (keywordTranslation &&
                                  keywordTranslation["selectTeacher"]) ||
                                langKey.selectTeacher
                              }
                              className="form-select traning-select"
                              options={managerList}
                              changeHandler={(value) => {
                                let rows = [...section];
                                rows[sectionIndex].teacher = value;
                                setSection([...rows]);
                              }}
                            />
                          </div>

                          <div className="col-lg-12 mt-2">
                            <div className="d-flex align-items-center mt-2">
                              <p className="traningFormLabels">
                                {(keywordTranslation &&
                                  keywordTranslation["function"]) ||
                                  langKey.function}
                              </p>
                              <p className="optional ml-auto">
                                {(keywordTranslation &&
                                  keywordTranslation["optional"]) ||
                                  langKey.optional}
                              </p>
                            </div>
                            <Multiselect
                              options={functionOptions}
                              displayValue="name"
                              showCheckbox="true"
                              placeholder="Select"
                              onSelect={(value) => {
                                let rows = [...section];
                                rows[sectionIndex].function = value;
                                setSection([...rows]);
                              }}
                              onRemove={(value) => {
                                let rows = [...section];
                                delete rows[sectionIndex].function;
                                setSection([...rows]);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8 mt-3">
                        <p className="traningFormLabels mt-2">
                          {(keywordTranslation &&
                            keywordTranslation["description"]) ||
                            langKey.description}
                        </p>
                        <textarea
                          name=""
                          id=""
                          rows="10"
                          // style={{ height: "172px" }}
                          className="form-control"
                          value={sectionData.description}
                          onChange={(e) =>
                            handleTrainingDescription(
                              sectionIndex,
                              e.target.value
                            )
                          }
                        ></textarea>
                      </div>

                      <div className="col-lg-4">
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <p className="traningFormLabels mt-2">
                            {sectionData.trainingType
                              ? (keywordTranslation &&
                                  keywordTranslation["paid"]) ||
                                langKey.paid
                              : (keywordTranslation &&
                                  keywordTranslation["free"]) ||
                                langKey.free}
                            {(keywordTranslation &&
                              keywordTranslation["training"]) ||
                              langKey.training}
                          </p>
                          <ToggleSlide
                            Class="Medium"
                            // checked={sectionData.trainingType}
                            onChangeHandler={(checked) => {
                              let list = [...section];
                              list[sectionIndex].trainingType =
                                checked === 1 ? true : false;
                              setSection([...list]);
                            }}
                          />
                        </div>
                      </div>
                      {sectionData.trainingType && (
                        <div className="col-md-12 mt-3">
                          <div className="row">
                            <div className="col-lg-4 col-md-4">
                              <div className="d-flex">
                                <p className="traningFormLabels">
                                  {(keywordTranslation &&
                                    keywordTranslation["price"]) ||
                                    langKey.price}
                                </p>
                              </div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder={
                                  (keywordTranslation &&
                                    keywordTranslation["price"]) ||
                                  langKey.price
                                }
                                value={sectionData.price}
                                onChange={(e) =>
                                  handleTrainingPrice(
                                    sectionIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <div className="d-flex">
                                <p className="traningFormLabels">
                                  {(keywordTranslation &&
                                    keywordTranslation["discount"]) ||
                                    langKey.discount}
                                </p>
                              </div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder={
                                  (keywordTranslation &&
                                    keywordTranslation["discount"]) ||
                                  langKey.discount
                                }
                                value={sectionData.discount}
                                onChange={(e) =>
                                  handleTrainingDiscount(
                                    sectionIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <div className="d-flex">
                                <p className="traningFormLabels">
                                  {(keywordTranslation &&
                                    keywordTranslation["tax"]) ||
                                    langKey.tax}
                                </p>
                              </div>
                              <input
                                type="number"
                                className="form-control"
                                placeholder={
                                  (keywordTranslation &&
                                    keywordTranslation["tax"]) ||
                                  langKey.tax
                                }
                                value={sectionData.tax}
                                onChange={(e) =>
                                  handleTrainingTax(
                                    sectionIndex,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-7 mt-3">
                  <div className="main-div p-3 h-100">
                    <div className="d-flex justify-content-between">
                      <p className="traningFormLabels">
                        {(keywordTranslation && keywordTranslation["image"]) ||
                          langKey.image}
                      </p>
                      <img
                        src={deleteBlankAsset}
                        alt=""
                        width="16px"
                        height="15px"
                        onClick={() => removeTrainingImage(sectionIndex)}
                        className="cursor"
                      />
                    </div>

                    <div className="uploadfile-border mt-2 d-flex align-items-center justify-content-center">
                      {sectionData?.trainingImage ? (
                        <>
                          <ImageViewer
                            src={sectionData?.trainingImage || notFoundAsset}
                            alt=""
                            className="mr-2"
                            width="100%"
                            height="100%"
                          />
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            name=""
                            id=""
                            className="fileupload"
                            onChange={(e) =>
                              handleTrainingImages(
                                sectionIndex,
                                e.target.files[0]
                              )
                            }
                          />
                          <center>
                            <div>
                              <img
                                src={uploadAsset}
                                alt=""
                                width="50px"
                                height="35.29px"
                              />
                              <p className="text-center fs-12 fw-400 gray">
                                {(keywordTranslation &&
                                  keywordTranslation["dropImage"]) ||
                                  langKey.dropImage}{" "}
                                <br />
                                <span style={{ color: "#1B8BCE" }}>
                                  {(keywordTranslation &&
                                    keywordTranslation["browseFiles"]) ||
                                    langKey.browseFiles}
                                </span>{" "}
                              </p>
                            </div>
                          </center>
                        </>
                      )}
                    </div>
                    <p className="fs-11 fw-550 mt-3 mb-3 gray">
                      {(keywordTranslation &&
                        keywordTranslation["imageSizeText"]) ||
                        langKey.imageSizeText}
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-5 mt-3">
                  <div className="main-div p-3 h-100">
                    <div className="d-flex justify-content-between">
                      <p className="traningFormLabels">
                        {(keywordTranslation &&
                          keywordTranslation["trainingFile"]) ||
                          langKey.trainingFile}
                      </p>
                      {/* <img
                        src={bin2Asset}
                        alt=""
                        width="16px"
                        height="15px"
                        onClick={() => removeTrainingFile(sectionIndex)}
                        className="cursor"
                      /> */}
                    </div>

                    <div className="TraningFileBorder mt-2">
                      {sectionData?.trainingFile ? (
                        <>
                          {/* <ImageViewer
                            src={sectionData?.trainingFile || notFoundAsset}
                            alt=""
                            className="mr-2"
                            width="100%"
                            height="100%"
                          /> */}
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            name=""
                            id=""
                            className="uploadTraningFile"
                            onChange={(e) =>
                              handleTrainingFile(
                                sectionIndex,
                                e.target.files[0]
                              )
                            }
                          />
                          <center>
                            <div className="mt-5 mb-5">
                              <img
                                src={uploadAsset}
                                alt=""
                                width="50px"
                                height="35.29px"
                              />
                              <p
                                className="text-center fs-12 fw-400"
                                style={{ color: "#B5B5B5" }}
                              >
                                {(keywordTranslation &&
                                  keywordTranslation["dropImage"]) ||
                                  langKey.dropImage}{" "}
                                <br />
                                <span style={{ color: "#1B8BCE" }}>
                                  {(keywordTranslation &&
                                    keywordTranslation["browseFiles"]) ||
                                    langKey.browseFiles}
                                </span>{" "}
                              </p>
                            </div>
                          </center>
                        </>
                      )}
                    </div>
                    <p className="fs-11 fw-550 mt-3 mb-3 gray">
                      {(keywordTranslation &&
                        keywordTranslation["fileInfoText"]) ||
                        langKey.fileInfoText}{" "}
                      {(keywordTranslation &&
                        keywordTranslation["filesAllowed"]) ||
                        langKey.filesAllowed}
                    </p>

                    <div className="d-flex align-items-center gap-2">
                      <p className="border w-100"></p>
                      <p className="fs-11 fw-600" style={{ color: "#AAAAAA" }}>
                        {(keywordTranslation && keywordTranslation["or"]) ||
                          langKey.or}
                      </p>
                      <p className="border w-100"></p>
                    </div>

                    <div>
                      <p className="traningFormLabels mt-2">
                        {(keywordTranslation &&
                          keywordTranslation["mediaUrl"]) ||
                          langKey.mediaUrl}
                      </p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["youtubeUrl"]) ||
                          langKey.youtubeUrl
                        }
                        value={sectionData.mediaURL}
                        onChange={(e) =>
                          handleTrainingMediaURL(sectionIndex, e.target.value)
                        }
                      />
                    </div>
                    <div className="d-flex align-items-center mt-2">
                      <p className="fs-10 fw-500" style={{ color: "#878787" }}>
                        Sorry, this content could not be embedded.
                      </p>
                      <img
                        src={redCrossAsset}
                        alt=""
                        width="14px"
                        height="14px"
                        className="ml-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row mt-3"
                style={{ marginLeft: "5%", marginRight: "5%" }}
              >
                <div className="main-div p-3">
                  <div className="col-lg-12">
                    <div className="border-bottom pb-2">
                      <h4 className="fs-13 traningFormLabels">
                        {(keywordTranslation &&
                          keywordTranslation["trainingQuiz"]) ||
                          langKey.trainingQuiz}
                      </h4>
                      <p className="fs-11 fw-500 mt-2 gray">
                        {(keywordTranslation &&
                          keywordTranslation["addQuestionText"]) ||
                          langKey.addQuestionText}
                      </p>
                    </div>
                  </div>

                  {sectionData.questions?.map((data, upperIndex) => {
                    return (
                      <div className="col-lg-12 mt-3">
                        <div className="quizQuesBg">
                          <div className="row">
                            <div className="col-lg-8">
                              <div className="d-flex">
                                <p className="fs-15 fw-600">
                                  {(keywordTranslation &&
                                    keywordTranslation["question"]) ||
                                    langKey.question}{" "}
                                  {upperIndex + 1}
                                </p>
                                <img
                                  src={crossAsset}
                                  alt=""
                                  className="ml-auto"
                                  onClick={() =>
                                    handleCancelQuestion(
                                      sectionIndex,
                                      upperIndex
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  className="questionInput mt-2"
                                  placeholder={
                                    (keywordTranslation &&
                                      keywordTranslation["dustFilterText"]) ||
                                    langKey.dustFilterText
                                  }
                                  value={data.title}
                                  onChange={(e) =>
                                    handleQuestionTitle(
                                      sectionIndex,
                                      upperIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                {data?.options?.map((innerData, innerIndex) => {
                                  return (
                                    <>
                                      <div
                                        className="d-flex upload_div gap-2 align-items-center"
                                        style={{ marginTop: "-33px" }}
                                      ></div>
                                      <div>
                                        <input
                                          type="text"
                                          className="answerInput mt-2"
                                          placeholder={
                                            data?.questionType === "1"
                                              ? (keywordTranslation &&
                                                  keywordTranslation["true"]) ||
                                                langKey.true
                                              : (keywordTranslation &&
                                                  keywordTranslation[
                                                    "answer"
                                                  ]) ||
                                                langKey.answer` ${
                                                  innerIndex + 1
                                                }`
                                          }
                                          value={innerData.option}
                                          onChange={(e) =>
                                            handleQuestionOption(
                                              sectionIndex,
                                              upperIndex,
                                              innerIndex,
                                              e.target.value
                                            )
                                          }
                                        />
                                        <div
                                          className="d-flex upload_div gap-2 align-items-center"
                                          style={{ marginTop: "-32px" }}
                                        >
                                          {data?.questionType === "1" ||
                                          data?.questionType === "2" ? (
                                            <>
                                              {" "}
                                              <input
                                                type="checkbox"
                                                name=""
                                                id={[
                                                  sectionIndex,
                                                  upperIndex,
                                                  innerIndex,
                                                ]}
                                                className="quizQuesCheckbox"
                                                value={innerData.answer}
                                                onChange={(e) =>
                                                  handleQuestionAnswer(
                                                    sectionIndex,
                                                    upperIndex,
                                                    innerIndex,
                                                    e.target.checked
                                                  )
                                                }
                                              />
                                              <label
                                                for={[
                                                  sectionIndex,
                                                  upperIndex,
                                                  innerIndex,
                                                ]}
                                              ></label>
                                            </>
                                          ) : null}
                                          {data?.questionType === "3" ||
                                          data?.questionType === "5" ? (
                                            <div style={{ width: "94px" }}>
                                              <SearchableDropdown
                                                placeholder={
                                                  (keywordTranslation &&
                                                    keywordTranslation["nA"]) ||
                                                  langKey.nA
                                                }
                                                className="answerSelect"
                                                options={indexOptions}
                                                changeHandler={(value) => {
                                                  handleDropdownQuestionAnswer(
                                                    sectionIndex,
                                                    upperIndex,
                                                    innerIndex,
                                                    value
                                                  );
                                                }}
                                              />
                                            </div>
                                          ) : null}
                                          <div>
                                            <img
                                              src={uploadAsset}
                                              alt=""
                                              width="24px"
                                              height="17px"
                                            />
                                            <input
                                              type="file"
                                              name="imageupload"
                                              className="typefile"
                                              onChange={(e) =>
                                                handleQuestionOptionImage(
                                                  sectionIndex,
                                                  upperIndex,
                                                  innerIndex,
                                                  e.target.files[0]
                                                )
                                              }
                                            />
                                          </div>
                                          {data?.questionType === "2" ||
                                          data?.questionType === "3" ||
                                          data?.questionType === "5" ||
                                          data?.questionType === "4" ? (
                                            <div>
                                              <img
                                                src={crossAsset}
                                                alt=""
                                                onClick={(e) =>
                                                  handleCancelQuestionOption(
                                                    sectionIndex,
                                                    upperIndex,
                                                    innerIndex
                                                  )
                                                }
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>

                              {data?.questionType !== "4" && (
                                <div className="d-flex mt-3">
                                  <p
                                    className="addnew ml-auto mr-2"
                                    onClick={(e) =>
                                      addInnerInputFields(
                                        sectionIndex,
                                        upperIndex
                                      )
                                    }
                                  >
                                    {(keywordTranslation &&
                                      keywordTranslation["addAnswer"]) ||
                                      langKey.addAnswer}
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="col-lg-4">
                              <div className="d-flex">
                                <p
                                  className="fs-13 fw-550"
                                  style={{ color: "#616161" }}
                                >
                                  {(keywordTranslation &&
                                    keywordTranslation["questionImage"]) ||
                                    langKey.questionImage}
                                </p>
                                <p className="optional ml-auto">
                                  {" "}
                                  {(keywordTranslation &&
                                    keywordTranslation["optional"]) ||
                                    langKey.optional}
                                </p>
                              </div>

                              <div
                                className="TraningFileBorder mt-2"
                                style={{
                                  height: "160px",
                                  background: "#F8F8F8",
                                }}
                              >
                                <input
                                  type="file"
                                  name=""
                                  id=""
                                  className="uploadTraningFile"
                                  style={{ height: "160px" }}
                                  onChange={(e) =>
                                    handleQuestionImage(
                                      sectionIndex,
                                      upperIndex,
                                      e.target.files[0]
                                    )
                                  }
                                />
                                <center>
                                  <div className="mt-5 mb-5">
                                    <img
                                      src={uploadAsset}
                                      alt=""
                                      width="50px"
                                      height="35.29px"
                                    />
                                    <p
                                      className="text-center fs-12 fw-400"
                                      style={{ color: "#B5B5B5" }}
                                    >
                                      {(keywordTranslation &&
                                        keywordTranslation["dropImage"]) ||
                                        langKey.dropImage}{" "}
                                      <br />
                                      <span
                                        style={{
                                          color: "#1B8BCE",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {(keywordTranslation &&
                                          keywordTranslation["browseFiles"]) ||
                                          langKey.browseFiles}
                                      </span>{" "}
                                    </p>
                                  </div>
                                </center>
                              </div>

                              {data?.questionType === "3" ||
                              data?.questionType === "5" ? (
                                <div>
                                  <p className="fs-12 fw-600 mt-3 mb-1">
                                    {(keywordTranslation &&
                                      keywordTranslation["displayAs"]) ||
                                      langKey.displayAs}
                                  </p>
                                  <SearchableDropdown
                                    className="dragDropdown w-50"
                                    placeholder="Select"
                                    options={[
                                      { value: "3", label: "Sorting" },
                                      { value: "5", label: "Interactive" },
                                    ]}
                                    changeHandler={(value) =>
                                      handleDisplay(
                                        sectionIndex,
                                        upperIndex,
                                        value
                                      )
                                    }
                                  />
                                  {/* <Dropdown>
                                    <Dropdown.Toggle
                                      variant="transparent"
                                      id="dropdown-basic"
                                      className="dragDropdown w-50"
                                    >
                                      Sorting
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item>Sorting</Dropdown.Item>
                                      <Dropdown.Item>Interactive</Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown> */}
                                </div>
                              ) : null}
                              <div className="mt-1">
                                {data?.questions_type === "5" && (
                                  <div>
                                    <img
                                      src={infoAsset}
                                      width="16px"
                                      height="16px"
                                    />
                                    <span className="fs-11 gray ml-1">
                                      {(keywordTranslation &&
                                        keywordTranslation["requiresImages"]) ||
                                        langKey.requiresImages}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="col-lg-12">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <p
                        className="fs-12 fw-700 mt-4"
                        style={{ color: "#6B6B6B" }}
                      >
                        {(keywordTranslation &&
                          keywordTranslation["noQuestionYet"]) ||
                          langKey.noQuestionYet}
                      </p>
                      <Button
                        label="Add Question +"
                        buttonStyle="addQues-btn mt-4 mb-4"
                        onClick={() => setShowQuestion(true)}
                        // onClick={() => handleAddQuestions(sectionIndex)}
                      />
                    </div>
                  </div>
                  <center>
                    <div className="col-lg-8 traningTabsBorder p-0 mt-3">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey={1}
                        className=""
                      >
                        <Row>
                          <Col sm={3}>
                            <Nav
                              variant="pills"
                              className="flex-column traningQuizTabs h-100"
                              style={{ background: "#F8F8F8" }}
                              onSelect={(selectedKey) =>
                                setQuestionType(selectedKey)
                              }
                            >
                              <Nav.Item>
                                <Nav.Link eventKey={1}>
                                  <img
                                    src={trueFalseIconAsset}
                                    alt=""
                                    width="14px"
                                    height="6px"
                                  />
                                  {(keywordTranslation &&
                                    keywordTranslation["trueFalse"]) ||
                                    langKey.trueFalse}
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey={2}>
                                  <img
                                    src={multichoiceIconAsset}
                                    alt=""
                                    width="6px"
                                    height="20px"
                                  />
                                  {(keywordTranslation &&
                                    keywordTranslation["multipleChoice"]) ||
                                    langKey.multipleChoice}
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey={3}>
                                  <img
                                    src={dragDropAsset}
                                    alt=""
                                    width="18px"
                                    height="17.99px"
                                  />
                                  {(keywordTranslation &&
                                    keywordTranslation["dragDrop"]) ||
                                    langKey.dragDrop}
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey={4}>
                                  <img
                                    src={freeTextIconAsset}
                                    alt=""
                                    width="14px"
                                    height="13px"
                                  />
                                  {(keywordTranslation &&
                                    keywordTranslation["freeText"]) ||
                                    langKey.freeText}
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={9}>
                            <Tab.Content>
                              <Tab.Pane eventKey={1}>
                                <div className="row justify-content-center mt-5">
                                  <div className="col-lg-12">
                                    <div className="row justify-content-center">
                                      <div className="col-lg-10 border pb-5">
                                        <div className="row justify-content-center pb-5">
                                          <div className="col-lg-10 mt-5 mb-5">
                                            <center>
                                              <h3
                                                className="fs-15 fw-500"
                                                style={{ color: "#6B6B6B" }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "dustFilterText"
                                                  ]) ||
                                                  langKey.dustFilterText}
                                              </h3>
                                              <p
                                                className="fs-11 fw-500 mt-1"
                                                style={{ color: "#FACB16" }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "3OutOf10"
                                                  ]) ||
                                                  langKey.outOf10}
                                              </p>
                                            </center>
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                            <div className="d-flex">
                                              <div className="d-flex p-2  gap-2 w-100 quesDiv">
                                                <input
                                                  type="radio"
                                                  name="true"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "true"
                                                    ]) ||
                                                    langKey.true}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                            <div className="d-flex">
                                              <div className="d-flex p-2  gap-2 w-100 quesDiv">
                                                <input
                                                  type="radio"
                                                  name="true"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "false"
                                                    ]) ||
                                                    langKey.false}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-10 mt-4">
                                    <p
                                      className="text-start fs-11 fw-500"
                                      style={{
                                        color: "#888888",
                                        lineHeight: "13px",
                                      }}
                                    >
                                      {(keywordTranslation &&
                                        keywordTranslation["trueFalseText"]) ||
                                        langKey.trueFalseText}
                                    </p>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey={2}>
                                <div className="row justify-content-center mt-5">
                                  <div className="col-lg-12">
                                    <div className="row justify-content-center">
                                      <div className="col-lg-10 border">
                                        <div className="row justify-content-center pb-5">
                                          <div className="col-lg-10 mt-5 mb-5">
                                            <center>
                                              <h3
                                                className="fs-15 fw-500"
                                                style={{ color: "#6B6B6B" }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "dustFilterText"
                                                  ]) ||
                                                  langKey.dustFilterText}
                                              </h3>
                                              <p
                                                className="fs-11 fw-500 mt-1"
                                                style={{ color: "#FACB16" }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "outOf10"
                                                  ]) ||
                                                  langKey.outOf10}
                                              </p>
                                            </center>
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                            <div className="d-flex">
                                              <div className="d-flex p-1  gap-2 w-100 quesDiv">
                                                <input
                                                  type="checkbox"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400 text-start"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "coordinate"
                                                    ]) ||
                                                    langKey.coordinate}{" "}
                                                  <br />
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "host"
                                                    ]) ||
                                                    langKey.host}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6">
                                            <div className="d-flex">
                                              <div className="d-flex p-1  gap-2 w-100 quesDiv">
                                                <input
                                                  type="checkbox"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400 text-start"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "obtain"
                                                    ]) ||
                                                    langKey.obtain}
                                                  <br />
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "confined"
                                                    ]) ||
                                                    langKey.confined}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6 mt-2">
                                            <div className="d-flex">
                                              <div className="d-flex p-1  gap-2 w-100 quesDiv">
                                                <input
                                                  type="checkbox"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400 text-start"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "reveal"
                                                    ]) ||
                                                    langKey.reveal}{" "}
                                                  <br />
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "follow"
                                                    ]) ||
                                                    langKey.follow}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6 mt-2">
                                            <div className="d-flex">
                                              <div className="d-flex p-1  gap-2 w-100 quesDiv">
                                                <input
                                                  type="checkbox"
                                                  id=""
                                                  className="mcqs"
                                                />
                                                <p
                                                  className="fs-11 fw-400 text-start"
                                                  style={{
                                                    color: "#6B6B6B",
                                                    lineHeight: "initial",
                                                  }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "dontknow"
                                                    ]) ||
                                                    langKey.dontknow}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-10 mt-4">
                                    <p
                                      className="text-start fs-12 fw-500"
                                      style={{
                                        color: "#888888",
                                        lineHeight: "18px",
                                      }}
                                    >
                                      {(keywordTranslation &&
                                        keywordTranslation[
                                          "multipleChoiceText"
                                        ]) ||
                                        langKey.multipleChoiceText}
                                    </p>
                                  </div>
                                </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey={3}>
                                <Tab.Container
                                  id="left-tabs-example"
                                  defaultActiveKey="sorting"
                                >
                                  <Row>
                                    <Col sm={1}></Col>
                                    <Col sm={3}>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          variant="transparent"
                                          id="dropdown-basic"
                                          className="dragDropdown mt-3"
                                        >
                                          {(keywordTranslation &&
                                            keywordTranslation["sorting"]) ||
                                            langKey.sorting}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          <Nav
                                            variant="pills"
                                            className="flex-column"
                                          >
                                            <Nav.Item>
                                              <Nav.Link eventKey="sorting">
                                                <Dropdown.Item>
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "sorting"
                                                    ]) ||
                                                    langKey.sorting}
                                                </Dropdown.Item>
                                              </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                              <Nav.Link eventKey="interactive">
                                                <Dropdown.Item>
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "interactive"
                                                    ]) ||
                                                    langKey.interactive}
                                                </Dropdown.Item>
                                              </Nav.Link>
                                            </Nav.Item>
                                          </Nav>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col>
                                    <Col sm={12}>
                                      <Tab.Content>
                                        <Tab.Pane eventKey="sorting">
                                          <div className="row justify-content-center">
                                            <div className="col-10">
                                              <img
                                                src={dragDropImgAsset}
                                                alt=""
                                                width="100%"
                                                height="300px"
                                              />
                                            </div>

                                            <div className="col-10">
                                              <p
                                                className="text-start fs-12 fw-500"
                                                style={{
                                                  color: "#888888",
                                                  lineHeight: "18px",
                                                }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "dragAndDropText"
                                                  ]) ||
                                                  langKey.dragAndDropText}
                                              </p>
                                            </div>
                                          </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="interactive">
                                          <div className="row justify-content-center">
                                            <div className="col-10">
                                              <img
                                                src={interectiveImgAsset}
                                                alt=""
                                                width="100%"
                                                height="300px"
                                              />
                                            </div>

                                            <div className="col-10">
                                              <p
                                                className="text-start fs-12 fw-500"
                                                style={{
                                                  color: "#888888",
                                                  lineHeight: "18px",
                                                }}
                                              >
                                                {(keywordTranslation &&
                                                  keywordTranslation[
                                                    "dragAndDropTextTwo"
                                                  ]) ||
                                                  langKey.dragAndDropTextTwo}
                                              </p>
                                            </div>
                                          </div>
                                        </Tab.Pane>
                                      </Tab.Content>
                                    </Col>
                                  </Row>
                                </Tab.Container>
                              </Tab.Pane>

                              <Tab.Pane eventKey={4}>
                                <div className="row justify-content-center">
                                  <div className="col-10">
                                    <img
                                      src={textAreaImgAsset}
                                      alt=""
                                      width="100%"
                                      height="300px"
                                    />
                                  </div>

                                  <div className="col-10">
                                    <p
                                      className="text-start fs-12 fw-500"
                                      style={{
                                        color: "#888888",
                                        lineHeight: "18px",
                                      }}
                                    >
                                      {(keywordTranslation &&
                                        keywordTranslation[
                                          "dragAndDropTextThree"
                                        ]) ||
                                        langKey.dragAndDropTextThree}
                                    </p>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Col>
                          <Col sm={12}>
                            <div
                              className="d-flex gap-2 mb-3 mr-5"
                              style={{ marginTop: "50px", float: "right" }}
                            >
                              <Button
                                label={
                                  (keywordTranslation &&
                                    keywordTranslation["cancel"]) ||
                                  langKey.cancel
                                }
                                buttonStyle="cancel"
                                onClick={() => setShowQuestion(false)}
                              />
                              <Button
                                label={
                                  (keywordTranslation &&
                                    keywordTranslation["add"]) ||
                                  langKey.add
                                }
                                buttonStyle="addnew_btn pl-3 pr-3"
                                // onClick={handleAddQuestions}
                                onClick={() => handleAddQuestions(sectionIndex)}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Tab.Container>
                    </div>
                  </center>
                </div>
              </div>
              <div className="row mt-3 mb-3 m-0 justify-content-center">
                <div className="col-lg-11">
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    // showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    // autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}

                    itemClass="carousel-item-padding-40-px"
                  >
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={diceAsset}
                              width="30px"
                              height="35.16px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">
                              Random questions
                            </p>
                          </div>
                          <div className="d-flex gap-1 justify-content-center mt-3">
                            <Button
                              label="-"
                              buttonStyle="plus-btn"
                              value={sectionData.RandomQuestion}
                              onClick={() =>
                                handleRandomQuestionCounter(
                                  sectionIndex,
                                  quesCounter - 1
                                )
                              }
                            />
                            <h1 className="counterOutput">
                              {sectionData.RandomQuestion ?? 0}
                            </h1>
                            <Button
                              label="+"
                              buttonStyle="plus-btn"
                              value={sectionData.RandomQuestion}
                              onClick={() =>
                                handleRandomQuestionCounter(
                                  sectionIndex,
                                  quesCounter + 1
                                )
                              }
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={timerAsset}
                              width="30px"
                              height="35px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">
                              Time per question
                            </p>
                          </div>
                          <div className="d-flex gap-1 justify-content-center mt-3">
                            <Button
                              label="-"
                              buttonStyle="plus-btn"
                              value={sectionData.TimePerQuestion}
                              onClick={() =>
                                handleTimePerQuestionCounter(
                                  sectionIndex,
                                  timeCounter - 1
                                )
                              }
                            />
                            <h1 className="counterOutput">
                              {sectionData.TimePerQuestion ?? 0}s
                            </h1>
                            <Button
                              label="+"
                              buttonStyle="plus-btn"
                              value={sectionData.TimePerQuestion}
                              onClick={() =>
                                handleTimePerQuestionCounter(
                                  sectionIndex,
                                  timeCounter + 1
                                )
                              }
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={passsingScoreAsset}
                              width="34px"
                              height="34px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">Passing score</p>
                          </div>
                          <div className="d-flex gap-1 justify-content-center mt-3">
                            <Button
                              label="-"
                              buttonStyle="plus-btn"
                              value={sectionData.PassingScore}
                              onClick={() =>
                                handlePassingScoreCounter(
                                  sectionIndex,
                                  passingScoreCounter - 1
                                )
                              }
                            />
                            <h1 className="counterOutput">
                              {sectionData.PassingScore ?? 0}%
                            </h1>
                            <Button
                              label="+"
                              buttonStyle="plus-btn"
                              value={sectionData.PassingScore}
                              onClick={() =>
                                handlePassingScoreCounter(
                                  sectionIndex,
                                  passingScoreCounter + 1
                                )
                              }
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={webcamAsset}
                              width="28px"
                              height="35px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">
                              Webcam validation
                            </p>
                          </div>
                          <div className="d-flex justify-content-center mt-3 mb-3">
                            <Toggle className="Big" />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={expectedTime1Asset}
                              width="28px"
                              height="35px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">Time Expected</p>
                          </div>
                          <div className="d-flex gap-1 justify-content-center mt-3">
                            <Button
                              label="-"
                              buttonStyle="plus-btn"
                              value={sectionData.TimeExpected}
                              onClick={() =>
                                handleTimeExpectedCounter(
                                  sectionIndex,
                                  timeExpectedCounter - 1
                                )
                              }
                            />
                            <h1 className="counterOutput">
                              {sectionData.TimeExpected ?? 0}min
                            </h1>
                            <Button
                              label="+"
                              buttonStyle="plus-btn"
                              value={sectionData.TimeExpected}
                              onClick={() =>
                                handleTimeExpectedCounter(
                                  sectionIndex,
                                  timeExpectedCounter + 1
                                )
                              }
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                    <div>
                      <div className="main-div p-2">
                        <center>
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 200 }}
                            overlay={renderTooltip}
                          >
                            <img
                              src={infoAsset}
                              alt=""
                              style={{ float: "right" }}
                            />
                          </OverlayTrigger>
                          <div>
                            <img
                              src={repeatAsset}
                              width="28px"
                              height="35px"
                              alt=""
                              className="mt-4"
                            />
                            <p className="fs-12 fw-600 mt-2">Attemps</p>
                          </div>
                          <div className="d-flex gap-1 justify-content-center mt-3">
                            <Button
                              label="-"
                              buttonStyle="plus-btn"
                              value={sectionData.Attempts}
                              onClick={() =>
                                handleAttemptsCounter(
                                  sectionIndex,
                                  attemptsCounter - 1
                                )
                              }
                            />
                            <h1 className="counterOutput">
                              {sectionData.Attempts ?? 0}
                            </h1>
                            <Button
                              label="+"
                              buttonStyle="plus-btn"
                              value={sectionData.Attempts}
                              onClick={() =>
                                handleAttemptsCounter(
                                  sectionIndex,
                                  attemptsCounter + 1
                                )
                              }
                            />
                          </div>
                        </center>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MultipleAddNewTraning;
