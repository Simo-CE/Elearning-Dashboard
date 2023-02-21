import React, { useState, useEffect } from "react";
import SaveButton from "../../../components/Button/Button";
import "../adminArea.css";
import "../../workerArea/WorkerArea.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import langKey from "../../../localization/locale.json";
import successMsg from "../../../localization/successMsgLocale.json";
import validationMessage from "../../../localization/validationsLocale.json";

import {
  uploadAsset,
  crossAsset,
  notFoundAsset,
  redCrossAsset,
  trueFalseIconAsset,
  dragDropAsset,
  freeTextIconAsset,
  multichoiceIconAsset,
  deleteBlankAsset,
  infoAsset,
  deleteAsset,
  correctAsset,
  trueFalseActiveIconAsset,
  multichoiceActiveIconAsset,
  dragDropActiveIconAsset,
  freeTextIconActiveAsset,
  multidropdownAsset,
  dragDropDotsAsset,
  documentAsset,
  cuationAsset,
} from "../../../assets";
import Button from "../../../components/Button/Button";
import AddTraningCarousal from "./AddTraningCarousal";
import { Col, Nav, Row, Tab, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import AddGroupModal from "./AddGroupModal";
import ErrorViewer from "../../../components/errorViewer/ErrorViewer";
import {
  useAddCategoryCompetenceMutation,
  useAddSeriesTrainingMutation,
  useAddTopicsMutation,
  useAddTrainingMutation,
  useGetCategoryQuery,
  useGetDepartmentDropdownListQuery,
  useGetFunctionsDropdownQuery,
  useGetSingleTrainingListQuery,
  useGetTopicsQuery,
  useManagerDropDownQuery,
  useRoleDropDownQuery,
  useSeriesTrainingListQuery,
} from "../../../services/api";
import SearchableDropdown from "../../../components/searchDropdown/SearchableDropdown";
import { MultiSelect } from "react-multi-select-component";

import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ImageViewer from "../../../components/ImageViewer";
import paths from "../../../routes/paths";
import moment from "moment";
import { useSelector } from "react-redux";
import LockedModal from "./LockedModal";

const AddNewTraning = () => {
  const navigate = useNavigate();
  let formData = new FormData();

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const company_id = useSelector(
    (state) => state.auth?.userDetail?.user?.company_id
  );

  const { state } = useLocation();
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [function_id, setFucntionId] = useState([]);
  const [trainingImage, setTrainingImage] = useState("");
  const [trainingImageName, setTrainingImageName] = useState("");
  const [trainingFile, setTrainingFile] = useState("");
  const [trainingFileName, setTrainingFileName] = useState("");
  const [quesCounter, setQuesCounter] = useState(0);
  let [timeCounter, setTimeCounter] = useState(0);
  let [passingScoreCounter, setPassingScoreCounter] = useState(0);
  let [attemptsCounter, setAttemptsCounter] = useState(0);
  let [webcamValidation, setWebcamValidation] = useState(0);
  let [checkCount, setCheckCount] = useState(1);
  const [questionsError, setQuestionsError] = useState([]);
  const [questionCheckOptionErrors, setQuestionsCheckOptionError] = useState(
    []
  );

  const [trueFalseCheckError, setTruealseCheckError] = useState(
    []
  );

  const [questionDropDownAnswerErrors, setQuestionsDropDownAnswerError] =
    useState([]);

  const [questionsImageError, setQuestionsImageError] = useState([]);

  const [trueFalse, setTrueFalse] = useState([]);
  const [questions_type, setQuestionType] = useState();
  const [showQuestionErrors, setShowQuestionErrors] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [payloadState, setPayloadState] = useState();
  const [belongToOptions, setBelongToOptions] = useState([]);
  const [showAddTopicsModal, setShowAddTopicsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [showTopicInput, setShowTopicInput] = useState(false);
  const [indexOptions, setIndexOptions] = useState([
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ]);
  const [indexIncreament, setIndexIncreament] = useState(1);
  const [paidTraining, setPaidTraining] = useState(false);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Sorting");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deletedQuestion, setDeletedQuestion] = useState([]);
  const [deletedQuestionOption, setDeletedQuestionOption] = useState([]);
  const [question_option_ans_delete, setQuestionOptionAnsDelete] = useState([]);

  const { data: getSingleTrainingList, refetch: getSingleTrainingRefetch } =
    useGetSingleTrainingListQuery(state?.training.id);

  const [questions, setQuestions] = useState([]);

  let timer = moment
    .utc((timeCounter ? timeCounter * 60 : 0) * 1000)
    .format("HH:mm:ss");

  const handleSelect = (e) => {
    setDropdownValue(e);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(
      (keywordTranslation && keywordTranslation["trainingNameReq"]) ||
        langKey.trainingNameReq
    ),
    validFor: Yup.string().required(
      (keywordTranslation && keywordTranslation["required"]) || langKey.required
    ),
  });

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

  let {
    name,
    category_name,
    topic_name,
    category_image,
    topic_image,
    trainingTitleImageName,
    validFor,
    assignTo,
    belongsTo,
    mediaURL,
    departmentId,
  } = watch();

  let { category_id, topic_id, companyId } = watch();

  const yearsList = [
    { value: "One Year", label: "One Year" },
    { value: "Two Year", label: "Two Year" },
    { value: "Three Year", label: "Three Year" },
    { value: "Four Year", label: "Four Year" },
    { value: "Five Year", label: "Five Year" },
  ];

  const [
    addTraining,
    {
      isSuccess: addTrainingisSuccess,
      isLoading: addTrainingIsLoading,
      isError: addTrainingIsError,
      error: addTrainingError,
      reset: addClientReset,
    },
  ] = useAddTrainingMutation();

  const {
    data: managerList,
    isLoading: managerListLoading,
    isError: managerListError,
    refetch: managererRefetch,
  } = useManagerDropDownQuery(company_id);

  const {
    data: getCategory,
    isLoading: CategoryCompetenceLoading,
    isFetching: CategoryCompetenceFetching,
    isError: CategoryCompetenceError,
    refetch: CategoryCompetenceRefetch,
  } = useGetCategoryQuery({
    params: { company_id },
  });

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

  const { data: roleDropDown } = useRoleDropDownQuery();
  const { data: seriesTrainingList, refetch: sectionListRefetch } =
    useSeriesTrainingListQuery();
  const { data: functionDropdown } = useGetFunctionsDropdownQuery();
  const { data: getDepartmentDropdownList } =
    useGetDepartmentDropdownListQuery();

  const {
    data: topicsList,
    isLoading: topicsListLoading,
    isFetching: topicsListFetching,
    isError: topicsListError,
    refetch: topicsListRefetch,
  } = useGetTopicsQuery({ params: { category_id } });

  const [
    addSeriesTraining,
    {
      isSuccess: addSeriesSuccess,
      isLoading: addSeriesIsLoading,
      isError: addSeriesIsError,
      error: addSeriesError,
      reset: addSeriesReset,
    },
  ] = useAddSeriesTrainingMutation();

  const handleCancel = () => {
    setShowConfirmationModal((prev) => !prev);
  };

  const addGroupModalHandler = () => {
    setShowAddGroup((Prev) => !Prev);
  };

  const addGroup = (data) => {
    addSeriesTraining(data)
      .unwrap()
      .then((payload) => {
        let msg =
          (payload?.message === "created" &&
            keywordTranslation &&
            keywordTranslation["groupCreatedSuccess"]) ||
          successMsg.groupCreatedSuccess;
        toast.success(msg);
      })
      .catch((error) => {
        toast.error(error?.data.message);
      });
  };

  const addAddCategoryHandler = () => {
    setShowCategoryInput((prev) => !prev);
  };
  const addAddTopicsHandler = () => {
    setShowTopicInput((prev) => !prev);
  };

  const categoryOptions = getCategory?.data?.data?.map((category) => {
    return { value: category.id, label: category.name };
  });

  const handleCategories = (value) => {
    setValue("category_id", value);
    categoryOptions?.filter((category) => {
      if (category.value === value) {
        setValue("category_name", category.label);
      }
    });
  };

  const topicOptions = topicsList?.data?.map((topic) => {
    return { value: topic.id, label: topic.name };
  });

  const handleTopics = (value) => {
    setValue("topic_id", value);
    topicOptions?.filter((topic) => {
      if (topic.value === value) {
        setValue("topic_name", topic.label);
      }
    });
  };

  const sectionOptions = seriesTrainingList?.map((section) => {
    return { value: section.value, label: section.label };
  });

  const departmentsOptions = getDepartmentDropdownList?.map((department) => {
    return { value: department.value, label: department.label };
  });

  const functionOptions = functionDropdown?.data?.function?.data?.map(
    (func) => {
      return { label: func.name, value: func.id };
    }
  );

  const childToParent = (
    ques,
    time,
    passingScore,
    attempts,
    webcamValidation
  ) => {
    setQuesCounter(ques);
    setTimeCounter(time);
    setPassingScoreCounter(passingScore);
    // setTimeExpectedCounter(timeExpected);
    setAttemptsCounter(attempts);
    setWebcamValidation(webcamValidation);
  };

  const handleTrainingTitleImage = (e) => {
    let { name, files } = e.target;
    if (files[0].size <= 2097152) {
      setValue(name, files[0]);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  const handleTrainingImage = (e) => {
    if (e.target.files[0].size <= 2097152) {
      setTrainingImageName(e.target.files[0]);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  const reNameStrings = {
    allItemsAreSelected:
      (keywordTranslation && keywordTranslation["selectAllLanguage"]) ||
      langKey.selectAllLanguage,
    selectSomeItems:
      (keywordTranslation && keywordTranslation["selectFunction"]) ||
      langKey.selectFunction,
  };

  const ArrowRenderer = ({ expanded }) => (
    <>
      {expanded ? (
        <img src={multidropdownAsset} />
      ) : (
        <img src={multidropdownAsset} />
      )}
    </>
  );

  const removeTrainingImage = (e) => {
    setTrainingImageName("");
  };

  const handleTrainingFile = (e) => {
    setTrainingFileName(e.target.files[0]);
  };

  const removeTrainingFile = (e) => {
    setTrainingFileName("");
  };

  const handleAddQuestions = () => {
    setQuestionType("1");
    setShowQuestion(false);
    setTrueFalse([]);
    setQuestions([
      ...questions,
      {
        questions_type:
          dropdownValue === "Interactive" ? "5" : questions_type ?? "1",
        optionLength: "",
        checkCondition: 0,
      },
    ]);
  };

  const handleCancelQuestion = (id, edit_id) => {
    let updated = questions?.filter((question, index) => index !== id);
    setQuestions(updated);
    if (state) {
      deletedQuestion.push(edit_id);
    }
  };

  const handleQuestionTitle = (upperIndex, name) => {
    let questionTitle = [...questions];
    questionTitle[upperIndex].name = name;
    questionTitle[upperIndex].id = upperIndex;
    setQuestions([...questionTitle]);
  };

  const addInnerInputFields = (index, innerIndex) => {
    setIndexIncreament(indexIncreament + 1);
    setIndexOptions([
      ...indexOptions,
      { value: indexIncreament, label: indexIncreament },
    ]);

    let rows = [...questions];
    if (rows[index].question_option?.length) {
      setTrueFalse(rows);
      rows[index].question_option = [
        ...rows[index].question_option,
        {
          options_id: "null",
          image: "",
          questions_type,
          answer: "",
          training_question_answer: [{ name: "", sequence: "" }],
        },
      ];
    } else {
      rows[index].question_option = [
        {
          options_id: "null",
          image: "",
          questions_type,
          answer: "",
          training_question_answer: [{ name: "", sequence: "" }],
        },
      ];
    }
    rows[index].optionLength = rows[index].question_option.length;
    setQuestions([...rows]);
  };

  const handleQuestionImage = (index, image) => {
    if (image.size <= 2097152) {
      let rows = [...questions];
      rows[index].image = image;
      setQuestions([...rows]);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  const handleDisplay = (value, upperIndex) => {
    let rows = [...questions];
    rows[upperIndex].questions_type = value || "3";
    setQuestions([...rows]);
  };

  const handleQuestionOption = (upperIndex, innerIndex, value) => {
    const list = [...questions];
    let option = list[upperIndex].question_option;
    option[innerIndex].name = value?.toString();
    setQuestions([...list]);
  };

  const handleCancelQuestionOption = (upperIndex, innerIndex, optionId) => {
    const list = [...questions];
    let option = list[upperIndex].question_option;
    option.splice(innerIndex, 1);
    setQuestions([...list]);
    if (state) {
      deletedQuestionOption.push(optionId);
    }
  };

  const handleQuestionAnswer = (
    upperIndex,
    innerIndex,
    checked,
    name,
    innerData
  ) => {
    let index = 0;
    const list = [...questions];
    let option = list[upperIndex].question_option;
    option[innerIndex].answer = checked ? name : "";
    option[innerIndex].training_question_answer[index].name = checked
      ? name
      : "";

    // checked ? setCheckCount(checkCount + 1) : setCheckCount(checkCount - 1);
    list[upperIndex].checkCondition = checked ? 1 : 0;

    setQuestions([...list]);

    if (state && !checked) {
      question_option_ans_delete.push(innerData.training_question_answer[0].id);
    } else if (state && checked) {

     let remaining = question_option_ans_delete.filter(item => item !== innerData.training_question_answer[0].id)
     setQuestionOptionAnsDelete(remaining)

      // question_option_ans_delete.splice(
      //   innerData.training_question_answer[0].id,
      //   1
      // );
    }
  };

  console.log(questions)

  const handleDropdownQuestionAnswer = (
    upperIndex,
    innerIndex,
    value,
    name
  ) => {
    let index = 0;
    const list = [...questions];
    let option = list[upperIndex].question_option;
    option[innerIndex].answer = value;
    let row = option[innerIndex].training_question_answer;
    row[index].sequence = value;
    row[index].name = name;
    setQuestions(list);
  };

  const handleQuestionOptionImage = (upperIndex, innerIndex, value) => {
    if (value.size <= 2097152) {
      const list = [...questions];
      let image = list[upperIndex].question_option;
      image[innerIndex].image = value;
      list[upperIndex].question_option = image;
      setQuestions(list);
    } else {
      toast.error(
        (keywordTranslation && keywordTranslation["imageSize"]) ||
          langKey.imageSize
      );
    }
  };

  // console.log(questions);

  const questionsTitleValidationHandler = () => {
    let Erors = [];

    questions.forEach((data, index) => {
      if (!data.name) {
        Erors.push(index);
      }
    });
    setQuestionsError([...Erors]);
    return Erors.length ? true : false;
  };

  const questionsValidationHandler = () => {
    let Errors = [];

    questions.forEach((data, index) =>
      data.question_option?.map((innerData, innerIndex) => {
        if (!innerData.name) {
          Errors.push(innerIndex);
        }
      })
    );
    setQuestionsError([...Errors]);
    return Errors.length ? true : false;
  };

  const questionsAnswerValidationHandler = () => {
    let answerError = [];
    questions.forEach((data, index) =>
      data.question_option?.forEach((upperData) =>
        upperData?.training_question_answer?.map((innerData, innerIndex) => {
          if (
            (innerData.name && data.questions_type === "1") ||
            (innerData.name && data.questions_type === "2")
          ) {
            answerError.push(innerIndex);
          }
        })
      )
    );
    setQuestionsCheckOptionError([...answerError]);
    return answerError.length ? true : false;
  };

  console.log(questionCheckOptionErrors) 

  const questionsAnswerValidationHandlerDropDown = () => {
    let answerError = [];
    questions.forEach((data, index) =>
      data.question_option?.map((innerData, innerIndex) => {
        if (
          (!innerData.answer && data.questions_type === "3") ||
          (!innerData.answer && data.questions_type === "5")
        ) {
          answerError.push(innerIndex);
        }
      })
    );
    setQuestionsDropDownAnswerError([...answerError]);
    return answerError.length ? true : false;
  };

  const questionsImageValidationHandler = () => {
    let ImageError = [];

    questions.forEach((data, index) =>
      data.question_option?.map((innerData, innerIndex) => {
        if (!innerData.image && data.questions_type === "5") {
          ImageError.push(innerIndex);
        }
      })
    );
    setQuestionsImageError([...ImageError]);
    return ImageError.length ? true : false;
  };

  const onSubmit = (submittedData) => {
    let trainingIndex = 0;
    setIsLoading(true);
    setShowQuestionErrors(true);
    let titleErrors = questionsTitleValidationHandler();
    let questionErrors = questionsValidationHandler();
    let answerErrors = questionsAnswerValidationHandler();
    let imageErrors = questionsImageValidationHandler();
    let dropDownAnswerErrors = questionsAnswerValidationHandlerDropDown();


    questions?.map((data, index) => {
      // data.id &&
      formData.append(`question[${index}][question_id]`, data.id || "null");
      data.name && formData.append(`question[${index}][title]`, data.name);
      data.questions_type &&
        formData.append(`question[${index}][type]`, data.questions_type);

      if (typeof data.image === "object") {
        formData.append(`question[${index}][question_image]`, data.image);
      }

      data?.question_option?.map((question, innerIndex) => {
        question.name &&
          formData.append(
            `question[${index}][option][${innerIndex}][name]`,
            question.name
          );

        question?.training_question_answer?.map((opt) => {
          formData.append(
            opt.name && `question[${index}][answer][${innerIndex}][answer_id]`,
            opt.id || "null"
          );

          if (data?.questions_type === "1" || data?.questions_type === "2") {
            opt.name &&
              formData.append(
                `question[${index}][answer][${innerIndex}][name]`,
                question.name
              );
          } else if (
            data?.questions_type === "3" ||
            data?.questions_type === "5"
          ) {
            formData.append(
              `question[${index}][answer][${innerIndex}][name]`,
              question.name || "null"
            );
            formData.append(
              `question[${index}][answer][${innerIndex}][sequence]`,
              state ? opt.sequence : opt.sequence - 1
            );
          }
        });

        formData.append(
          `question[${index}][option][${innerIndex}][option_id]`,
          question.option_id || "null"
        );

        if (typeof question.image === "object") {
          formData.append(
            `question[${index}][option][${innerIndex}][image]`,
            question.image
          );
        }
      });
    });

    function_id?.map((data) => {
      formData.append(`function_id[]`, data.value);
    });

    // formData.append("training_mode", paidTraining ? "paid" : "free");
    // if (paidTraining) {
    //   price && formData.append("price", price);
    //   discount && formData.append("discount", discount);
    //   tax && formData.append("tax", tax);
    // }

    if (typeof trainingTitleImageName === "object") {
      formData.append("icon", trainingTitleImageName);
    }
    if (typeof trainingImageName === "object") {
      formData.append(`image`, trainingImageName);
    }
    if (typeof trainingFileName === "object") {
      formData.append(`training_document[${trainingIndex}]`, trainingFileName);
    }

    company_id && formData.append("company_id", company_id);
    submittedData.name && formData.append("name", submittedData.name);
    companyId && formData.append("teacher_id", companyId);
    validFor && formData.append("valid_for", validFor);
    assignTo && formData.append("asign_to[]", assignTo);
    departmentId && formData.append("department_id", departmentId);
    belongsTo && formData.append("belong_to_section_name", belongsTo);
    mediaURL && formData.append("media_url", mediaURL);
    submittedData.description &&
      formData.append("desc", submittedData.description);

    attemptsCounter && formData.append("attempted", attemptsCounter);
    formData.append("webcam", webcamValidation ? 1 : 0);
    timeCounter &&
      formData.append(
        "time_per_q",
        moment
          .utc((timeCounter ? timeCounter * 60 : 0) * 1000)
          .format("HH:mm:ss")
      );
    formData.append("random_q", quesCounter ? 1 : 0);
    passingScoreCounter &&
      formData.append("passing_score", passingScoreCounter);

    state && formData.append("_method", "put");

    deletedQuestion.length &&
      deletedQuestion?.map((ques, ind) => {
        formData.append(`question_delete[${ind}]`, ques);
      });
    deletedQuestionOption.length &&
      deletedQuestionOption?.map((opt, i) => {
        deletedQuestionOption &&
          formData.append(`question_option_delete[${i}]`, opt);
      });

    question_option_ans_delete?.length &&
      question_option_ans_delete?.map((ans, a) => {
        formData.append(`question_option_ans_delete[${a}]`, ans);
      });

    console.log(titleErrors, questionErrors, answerErrors, imageErrors, dropDownAnswerErrors)


    if (
      !titleErrors &&
      !questionErrors &&
      answerErrors &&
      !dropDownAnswerErrors &&
      !imageErrors
    ) {
      addTraining({ formData, state })
        .unwrap()
        .then((payload) => {
          setPayloadState(payload);
          setIsLoading(false);
          navigate(paths.tranings);
          if (payload?.message === "created") {
            let msg =
              (payload?.message === "created" &&
                keywordTranslation &&
                keywordTranslation["trainingCreatedSuccess"]) ||
              successMsg.trainingCreatedSuccess;
            toast.success(msg);
          } else if (payload?.message === "updated") {
            let msgTwo =
              (payload?.message === "updated" &&
                keywordTranslation &&
                keywordTranslation["trainingUpdateSuccess"]) ||
              successMsg.trainingUpdateSuccess;
            toast.success(msgTwo);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error?.data?.message === "noPermission") {
            let msg3 =
              (error?.data?.message === "noPermission" &&
                keywordTranslation &&
                keywordTranslation["noPermission"]) ||
              validationMessage.noPermission;

            toast.error(msg3);
          } else if (
            error?.data?.message === "The time per q field is required." ||
            error?.data?.message?.includes("time per q field")
          ) {
            let msg4 =
              (error?.data?.message === "The time per q field is required." &&
                keywordTranslation &&
                keywordTranslation["totalTime"]) ||
              validationMessage.totalTime;

            toast.error(msg4);
          } else if (
            error?.data?.message === "The passing score field is required." ||
            error?.data?.message?.includes("passing score field")
          ) {
            let msg4 =
              (error?.data?.message ===
                "The passing score field is required." &&
                keywordTranslation &&
                keywordTranslation["passingScore"]) ||
              validationMessage.passingScore;

            toast.error(msg4);
          } else if (
            error?.data?.message === "The attempted field is required." ||
            error?.data?.message?.includes("attempted field")
          ) {
            let msg5 =
              (error?.data?.message === "The attempted field is required." &&
                keywordTranslation &&
                keywordTranslation["attempts"]) ||
              validationMessage.attempts;

            toast.error(msg5);
          } else if (
            error?.data?.message === 'Undefined array key "category_id"'
          ) {
            let msg6 =
              (error?.data?.message === 'Undefined array key "category_id"' &&
                keywordTranslation &&
                keywordTranslation["categoryId"]) ||
              validationMessage.categoryId;

            toast.error(msg6);
          } else if (
            error?.data?.message === "The random q field is required."
          ) {
            let msg7 =
              (error?.data?.message === "The random q field is required." &&
                keywordTranslation &&
                keywordTranslation["randomQuestRequired"]) ||
              validationMessage.randomQuestRequired;

            toast.error(msg7);
          } else if (error?.data?.message === 'Undefined array key "title"') {
            let msg8 =
              (error?.data?.message === 'Undefined array key "title"' &&
                keywordTranslation &&
                keywordTranslation["questionTitleRequired"]) ||
              validationMessage.questionTitleRequired;

            toast.error(msg8); //
          } else if (error?.data?.message === 'Undefined array key "name"') {
            let msg9 =
              (error?.data?.message === 'Undefined array key "name"' &&
                keywordTranslation &&
                keywordTranslation["questionOptionRequired"]) ||
              validationMessage.questionOptionRequired;

            toast.error(msg9);
          } else if (
            error?.data?.message ===
            "Unsupported image type image/avif. GD driver is only able to decode JPG, PNG, GIF, BMP or WebP files."
          ) {
            let msg9 =
              (error?.data?.message ===
                "Unsupported image type image/avif. GD driver is only able to decode JPG, PNG, GIF, BMP or WebP files." &&
                keywordTranslation &&
                keywordTranslation["questionOptionRequired"]) ||
              validationMessage.questionOptionRequired;

            toast.error(msg9);
          }
        });
    } else {
      setIsLoading(false);
    }

    category_name && formData.append("category", category_name);
    topic_name && formData.append("topic", topic_name);
  };

  useEffect(() => {
    getSingleTrainingRefetch();
    if (addSeriesSuccess) {
      sectionListRefetch();
    }
    if (addCategoryCompetenceSuccess) {
      CategoryCompetenceRefetch();
    }
    if (addTopicsSuccess) {
      topicsListRefetch();
      CategoryCompetenceRefetch();
    }
    if (state) {
      setValue("name", state.training.name);

      setValue("description", state.training.desc);
      setValue("validFor", state.training.valid_for);
      setValue("category_id", state.training.category_id);
      setValue("topic_id", state.training.topic_id);
      setValue("trainingTitleImageName", state?.training?.icon);
      setTrainingImageName(state?.training.image);
      state.training.media_url &&
        setValue("mediaURL", state.training.media_url);

      const functions = getSingleTrainingList?.training?.functions?.map(
        (func) => {
          return { label: func.all_functions.name, value: func.id };
        }
      );
      setValue("function_id", functions);

      const options = state.training.belong_to?.map((data) => {
        return { value: data.id, label: data.name };
      });

      setBelongToOptions(options);
    } else {
      setBelongToOptions(sectionOptions);
    }

    // if (window.location.href.includes("singleAddNewTraning") && formData) {
    //   window.history.pushState(null, document.title, window.location.href);
    //   window.addEventListener("popstate", function (e) {
    //     window.history.pushState(null, document.title, window.location.href);
    //     e.preventDefault();
    //   });
    // }
  }, [
    state,
    questions,
    addCategoryCompetenceSuccess,
    addTopicsSuccess,
    addSeriesSuccess,
  ]);

  useEffect(() => {
    getSingleTrainingRefetch()
  })

  useEffect(() => {
    getSingleTrainingRefetch()
    if (state && getSingleTrainingList?.training?.question.length) {
      let row = [...getSingleTrainingList?.training?.question]
      let questionsCopy = row?.map(
        (data) => ({
          ...data,
          question_option: data.question_option?.map((innerData) => ({
            ...innerData,
            option_id: innerData.id,
            answer: innerData.name,
            training_question_answer: innerData.training_question_answer.length
              ? innerData?.training_question_answer?.map((innerAnswer) => ({
                  id: innerAnswer.id,
                  name: innerAnswer.name,
                  sequence: innerAnswer.sequence,
                }))
              : [{ name: "", sequence: "" }],
          })),
        })
      );

      setQuestions(questionsCopy);
    }
  }, [state, getSingleTrainingList]);

  function validURLString(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  const embededContent = [
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "txt",
    "pdf",
    "xlsx",
    "xls",
  ];
  let validEmbededContent = (extension) => {
    if (embededContent.includes(extension)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        e.returnValue = "";
      })}

      <div className="sideMargin">
        {showConfirmationModal && (
          <LockedModal
            confirmatonText={
              (keywordTranslation && keywordTranslation["confirmationText"]) ||
              langKey.confirmationText
            }
            path={paths.tranings}
            handleCancel={handleCancel}
          />
        )}

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="d-flex align-items-center">
              <div>
                <h3 className="pageHeading">
                  {state
                    ? (keywordTranslation &&
                        keywordTranslation["editTraining "]) ||
                      langKey.editTraining + ' "' + name + '"'
                    : (keywordTranslation &&
                        keywordTranslation["addNewTraining"]) ||
                      langKey.addNewTraining}
                </h3>
              </div>
              <div className="d-flex gap-2 align-items-center ml-auto">
                <SaveButton
                  label={
                    (keywordTranslation && keywordTranslation["cancel"]) ||
                    langKey.cancel
                  }
                  buttonStyle="cancel"
                  onClick={handleCancel}
                />
                <SaveButton
                  label={
                    state
                      ? (keywordTranslation &&
                          keywordTranslation["updateAndSave"]) ||
                        langKey.updateAndSave
                      : (keywordTranslation && keywordTranslation["create"]) ||
                        langKey.create
                  }
                  onClick={handleSubmit(onSubmit)}
                  buttonStyle={
                    state ? "update_btn pl-4 pr-4" : "addnew_btn pl-4 pr-4"
                  }
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5 mt-3">
            <div className="div-bg p-3">
              <div className="row">
                <div className="col-lg-4 col-md-4 pr-0">
                  <div className="d-flex">
                    <p className="traningFormLabels">
                      {(keywordTranslation && keywordTranslation["category"]) ||
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
                        className="typetextCategoryTraining mr-2 pl-2"
                        placeholder={
                          (keywordTranslation &&
                            keywordTranslation["category"]) ||
                          langKey.category
                        }
                        value={category_name}
                        onChange={(e) => {
                          setValue("category_name", e.target.value);
                        }}
                      />
                    </>
                  ) : (
                    <SearchableDropdown
                      placeholder={
                        state?.training?.category?.name ??
                        ((keywordTranslation && keywordTranslation["select"]) ||
                          langKey.select)
                      }
                      className="form-select traning-select"
                      options={categoryOptions}
                      selectedValue={
                        category_id || state?.training?.category?.id
                      }
                      changeHandler={(value) => handleCategories(value)}
                    />
                  )}
                </div>
                <div className="col-lg-5 col-md-5">
                  <div className="d-flex">
                    <p className="traningFormLabels">
                      {" "}
                      {(keywordTranslation && keywordTranslation["topic"]) ||
                        langKey.topic}
                    </p>
                    <p className="addnew ml-auto" onClick={addAddTopicsHandler}>
                      {showCategoryInput || showTopicInput
                        ? (keywordTranslation &&
                            keywordTranslation["selectTopic"]) ||
                          langKey.selectTopic
                        : (keywordTranslation &&
                            keywordTranslation["addNewPlus"]) ||
                          langKey.addNewPlus}
                    </p>
                  </div>
                  {showCategoryInput || showTopicInput ? (
                    <>
                      <input
                        type="text"
                        className="typetextCategoryTraining mr-2 pl-2"
                        placeholder={
                          (keywordTranslation && keywordTranslation["topic"]) ||
                          langKey.topic
                        }
                        value={topic_name}
                        onChange={(e) => {
                          setValue("topic_name", e.target.value);
                        }}
                      />
                    </>
                  ) : (
                    <SearchableDropdown
                      placeholder={
                        state?.training?.topic?.name ??
                        ((keywordTranslation && keywordTranslation["select"]) ||
                          langKey.select)
                      }
                      className="form-select traning-select"
                      options={topicOptions}
                      selectedValue={topic_id || state?.training?.topic?.id}
                      changeHandler={(value) => handleTopics(value)}
                    />
                  )}
                </div>
                <div className="col-lg-3 col-md-3 pl-0">
                  <div className="d-flex">
                    <p className="traningFormLabels">
                      {(keywordTranslation && keywordTranslation["validFor"]) ||
                        langKey.validFor}
                    </p>
                  </div>
                  <SearchableDropdown
                    placeholder={
                      (keywordTranslation && keywordTranslation["select"]) ||
                      langKey.select
                    }
                    {...register("validFor")}
                    selectedValue={state ? state.training.valid_for : ""}
                    options={yearsList}
                    changeHandler={(value) => {
                      setValue("validFor", value);
                    }}
                  />
                  {errors.validFor && (
                    <ErrorViewer
                      className="mt-2"
                      message={errors.validFor.message}
                    />
                  )}
                </div>

                <div className="col-lg-7 col-md-7 mt-4">
                  <div className="d-flex">
                    <p className="traningFormLabels">
                      {(keywordTranslation && keywordTranslation["training"]) ||
                        langKey.training}
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("name")}
                      className="form-control typetext "
                      placeholder={
                        (keywordTranslation &&
                          keywordTranslation["workingAtHeight"]) ||
                        langKey.workingAtHeight
                      }
                      style={
                        trainingTitleImageName
                          ? { paddingRight: "90px" }
                          : { paddingRight: "40px" }
                      }
                    />
                    {errors.name && (
                      <ErrorViewer
                        className="mt-2"
                        message={errors.name.message}
                      />
                    )}

                    <div
                      className=" d-flex align-items-center upload_div"
                      style={{ top: "26px" }}
                    >
                      {trainingTitleImageName ? (
                        <>
                          <ImageViewer
                            src={trainingTitleImageName || notFoundAsset}
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
                              setValue("trainingTitleImageName", "")
                            }
                          />
                        </>
                      ) : null}

                      <div className="ml-1">
                        <img
                          src={uploadAsset}
                          alt=""
                          width="24px"
                          height="17px"
                          className={state ? "image" : null}
                        />
                        <input
                          type="file"
                          name="trainingTitleImageName"
                          className="typefile"
                          accept="image/*"
                          onInput={handleTrainingTitleImage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 mt-4 pl-0">
                  <div className="d-flex">
                    <p className="traningFormLabels">
                      {(keywordTranslation && keywordTranslation["belongTo"]) ||
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
                      action={addGroup}
                    />
                  )}
                  {/* <select className="form-select traning-select">
                    <option value="">None</option>
                  </select> */}
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
                          {" "}
                          {(keywordTranslation &&
                            keywordTranslation["assignTo"]) ||
                            langKey.assignTo}
                        </p>
                        <p className="optional ml-auto">
                          {" "}
                          {(keywordTranslation &&
                            keywordTranslation["optional"]) ||
                            langKey.optional}
                        </p>
                      </div>
                      {/* <select className="form-select traning-select">
                        <option value="">Internal workers</option>
                      </select> */}
                      <SearchableDropdown
                        placeholder={
                          getSingleTrainingList?.training?.training_type?.role
                            ?.name ??
                          ((keywordTranslation &&
                            keywordTranslation["selectAssignTo"]) ||
                            langKey.selectAssignTo)
                        }
                        className="form-select traning-select"
                        options={roleDropDown}
                        changeHandler={(value) => setValue("assignTo", value)}
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
                          getSingleTrainingList?.training?.department?.name ??
                          ((keywordTranslation &&
                            keywordTranslation["selectDepart"]) ||
                            langKey.selectDepart)
                        }
                        className="form-select traning-select"
                        selectedValue={
                          state ? state?.training?.department_id : ""
                        }
                        options={departmentsOptions}
                        // value={departmentId}
                        // options={
                        //   departmentsOptions?.length ? departmentsOptions : []
                        // }
                        changeHandler={(value) =>
                          setValue("departmentId", value)
                        }
                        // onChange={(value) => setDepartmentId(value)}
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
                          {(keywordTranslation &&
                            keywordTranslation["optional"]) ||
                            langKey.optional}
                        </p>
                      </div>
                      <SearchableDropdown
                        placeholder={
                          getSingleTrainingList?.training?.teacher
                            ?.first_name ??
                          ((keywordTranslation &&
                            keywordTranslation["selectTeacher"]) ||
                            langKey.selectTeacher)
                        }
                        className="form-select traning-select"
                        options={managerList}
                        changeHandler={(value) => setValue("companyId", value)}
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

                      <MultiSelect
                        options={functionOptions?.length ? functionOptions : []}
                        // displayValue="name"
                        // showCheckbox="true"
                        // placeholder="Select"
                        value={function_id}
                        onChange={(value) => setFucntionId(value)}
                        overrideStrings={reNameStrings}
                        ArrowRenderer={ArrowRenderer}
                        // onRemove={(value) => setFucntionId(value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 mt-3">
                  <p className="traningFormLabels mt-2">
                    {" "}
                    {(keywordTranslation &&
                      keywordTranslation["description"]) ||
                      langKey.description}
                  </p>
                  <textarea
                    name="description"
                    {...register("description")}
                    id=""
                    rows="10"
                    // style={{ height: "172px" }}
                    className="form-control traningTextArea"
                  ></textarea>
                </div>
                {/* <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <p className="traningFormLabels mt-2">
                      {paidTraining
                        ? (keywordTranslation && keywordTranslation["paid"]) ||
                          langKey.paid
                        : (keywordTranslation && keywordTranslation["free"]) ||
                          langKey.free}{" "}
                      {(keywordTranslation && keywordTranslation["training"]) ||
                        langKey.training}
                    </p>
                    <div className="toptoggle ">
                      <ToggleSlide
                        Class="Medium"
                        checked={paidTraining}
                        onChangeHandler={() => setPaidTraining((prev) => !prev)}
                      />
                    </div>
                  </div>
                </div> */}
                {paidTraining && (
                  <div className="col-md-12 mt-3">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <div className="d-flex">
                          <p className="traningFormLabels">
                            {" "}
                            {(keywordTranslation &&
                              keywordTranslation["price"]) ||
                              langKey.price}
                          </p>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            (keywordTranslation &&
                              keywordTranslation["price"]) ||
                            langKey.price
                          }
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
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
                          type="text"
                          className="form-control"
                          placeholder={
                            (keywordTranslation &&
                              keywordTranslation["discount"]) ||
                            langKey.discount
                          }
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
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
                          type="text"
                          className="form-control"
                          placeholder={
                            (keywordTranslation && keywordTranslation["tax"]) ||
                            langKey.tax
                          }
                          value={tax}
                          onChange={(e) => setTax(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-7 mt-3">
            <div className="div-bg p-3 h-100">
              <div className="imageDeleteDiv">
                <p className="traningFormLabels">
                  {(keywordTranslation && keywordTranslation["image"]) ||
                    langKey.image}
                </p>
                {trainingImageName ? (
                  <img
                    src={deleteBlankAsset}
                    alt=""
                    width="16px"
                    height="15px"
                    onClick={removeTrainingImage}
                    className="cursor"
                  />
                ) : null}
              </div>
              <div className="uploadfile-border mt-2">
                <>
                  {trainingImageName ? (
                    <>
                      <ImageViewer
                        src={trainingImageName || notFoundAsset}
                        alt=""
                        width="325px"
                        height="300px"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        name=""
                        id=""
                        accept="image/*"
                        className="fileupload"
                        onChange={(e) => handleTrainingImage(e)}
                      />
                      <center>
                        <div>
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
                              langKey.dropImage}
                            <br />
                            <span
                              style={{ color: "#1B8BCE", cursor: "pointer" }}
                            >
                              {(keywordTranslation &&
                                keywordTranslation["browseFiles"]) ||
                                langKey.browseFiles}
                            </span>{" "}
                          </p>
                          <p
                            className="text-center fs-12 fw-400"
                            style={{ color: "#B5B5B5" }}
                          >
                            {trainingImageName?.name}
                          </p>
                        </div>
                      </center>
                    </>
                  )}
                </>
              </div>
              <p className="fs-11 fw-550 mt-3 mb-3 gray">
                {(keywordTranslation && keywordTranslation["imageSizeText"]) ||
                  langKey.imageSizeText}
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-5 mt-3">
            <div className="div-bg p-3 h-100">
              <p className="traningFormLabels">
                {(keywordTranslation && keywordTranslation["trainingFile"]) ||
                  langKey.trainingFile}
              </p>

              <div className="TraningFileBorder mt-2">
                <input
                  type="file"
                  name=""
                  id=""
                  // accept=".pdf, .pps, video/*,.mkv"
                  accept=".doc, .docx,.ppt, .pptx,.txt,.pdf,.xlsx,.xls"
                  className="uploadTraningFile"
                  onChange={(e) => handleTrainingFile(e)}
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
                      <span style={{ color: "#1B8BCE", cursor: "pointer" }}>
                        {(keywordTranslation &&
                          keywordTranslation["browseFiles"]) ||
                          langKey.browseFiles}
                      </span>
                    </p>
                    {/* <p
                      className="text-center fs-12 fw-400"
                      style={{ color: "#B5B5B5" }}
                    >
                      {trainingFileName?.name}
                    </p> */}
                  </div>
                </center>
              </div>
              {trainingFileName && (
                <div className="d-flex mt-3 uploadSuccess">
                  <div className="media">
                    {/* <img className="mr-3 " src={fileAsset} alt="icon" /> */}
                    <div className="media-body ">
                      <p className="mt-0 cardtitle fs-10 mb-0 text-white">
                        {" "}
                        {(keywordTranslation &&
                          keywordTranslation["completed"]) ||
                          langKey.completed}
                      </p>
                      <p className="cardsubtitle fs-11 mb-0">
                        {trainingFileName?.name}
                      </p>
                    </div>
                  </div>
                  <div className=" ml-auto">
                    <img
                      src={deleteAsset}
                      alt=""
                      width="20px"
                      height="20px"
                      className="cursor"
                      onClick={removeTrainingFile}
                    />
                  </div>
                </div>
              )}

              <p
                className="fs-11 fw-550 mt-3 mb-3 gray"
                style={{ width: "100%" }}
              >
                {(keywordTranslation && keywordTranslation["fileInfoText"]) ||
                  langKey.fileInfoText}{" "}
                {(keywordTranslation && keywordTranslation["filesAllowed"]) ||
                  langKey.filesAllowed}
              </p>

              <div className="d-flex align-items-center gap-2">
                <p className="border w-100 m-0"></p>
                <p className="fs-11 fw-600" style={{ color: "#AAAAAA" }}>
                  {(keywordTranslation && keywordTranslation["or"]) ||
                    langKey.or}
                </p>
                <p className="border w-100 m-0"></p>
              </div>

              <div>
                <p className="traningFormLabels mt-3">
                  {(keywordTranslation && keywordTranslation["mediaUrl"]) ||
                    langKey.mediaUrl}
                </p>
                <input
                  type="text"
                  className="form-control typetext"
                  placeholder={
                    (keywordTranslation && keywordTranslation["youtubeUrl"]) ||
                    langKey.youtubeUrl
                  }
                  value={mediaURL}
                  onChange={(e) => setValue("mediaURL", e.target.value)}
                />
              </div>
              {mediaURL && (
                <div className="d-flex align-items-center mt-2">
                  <p className="fs-10 fw-500" style={{ color: "#878787" }}>
                    {(validURLString(mediaURL) &&
                      mediaURL?.includes("/watch")) ||
                    (mediaURL?.includes("https://") &&
                      validEmbededContent(mediaURL?.split(".")?.pop()))
                      ? name
                      : (keywordTranslation &&
                          keywordTranslation["notEmbeded"]) ||
                        langKey.notEmbeded}
                  </p>
                  {(validURLString(mediaURL) && mediaURL?.includes("/watch")) ||
                  (mediaURL?.includes("https://") &&
                    validEmbededContent(mediaURL?.split(".")?.pop())) ? (
                    <img
                      src={correctAsset}
                      alt=""
                      width="14px"
                      height="14px"
                      className="ml-auto pointer"
                    />
                  ) : (
                    <img
                      src={redCrossAsset}
                      alt=""
                      width="14px"
                      height="14px"
                      className="ml-auto pointer"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-3 m-0">
          <div className="div-bg p-3">
            <div className="col-lg-12">
              <div className="border-bottom pb-2">
                <h4 className="fs-13 traningFormLabels">
                  {(keywordTranslation && keywordTranslation["trainingQuiz"]) ||
                    langKey.trainingQuiz}
                </h4>
                <p className="fs-11 fw-500 mt-2" style={{ color: "#B4B4B4" }}>
                  {(keywordTranslation &&
                    keywordTranslation["addQuestionText"]) ||
                    langKey.addQuestionText}
                </p>
              </div>
            </div>
            {questions?.map((data, upperIndex) => {
              return (
                <div className="col-lg-12 mt-3">
                  <div className="quizQuesBg">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="d-flex">
                          <p className="fs-15 fw-600 black">
                            {(keywordTranslation &&
                              keywordTranslation["question"]) ||
                              langKey.question}{" "}
                            {upperIndex + 1}
                          </p>
                          <img
                            src={crossAsset}
                            alt=""
                            className="ml-auto pointer"
                            onClick={() =>
                              handleCancelQuestion(upperIndex, data.id)
                            }
                          />
                        </div>
                        <div>
                          <>
                            <input
                              type="text"
                              className="questionInput mt-2"
                              placeholder={
                                (keywordTranslation &&
                                  keywordTranslation["dustFilterText"]) ||
                                langKey.dustFilterText
                              }
                              value={data.name}
                              onChange={(e) =>
                                handleQuestionTitle(upperIndex, e.target.value)
                              }
                            />

                            {showQuestionErrors && (
                              <>
                                {!data.name ? (
                                  <ErrorViewer
                                    message={
                                      (keywordTranslation &&
                                        keywordTranslation[
                                          "questionTitleRequired"
                                        ]) ||
                                      validationMessage.questionTitleRequired
                                    }
                                  />
                                ) : null}
                              </>
                            )}
                          </>

                          {data?.question_option?.map(
                            (innerData, innerIndex) => {
                              return (
                                <>
                                  <div
                                    className="d-flex upload_div gap-2 align-items-center"
                                    style={{ marginTop: "-31px" }}
                                  ></div>
                                  <div>
                                    <input
                                      type="text"
                                      className="answerInput mt-2"
                                      placeholder={
                                        data?.questions_type === "1"
                                          ? innerIndex === 0
                                            ? "True"
                                            : "False"
                                          : `Answer ${innerIndex + 1}`
                                      }
                                      value={innerData.name}
                                      onChange={(e) =>
                                        handleQuestionOption(
                                          upperIndex,
                                          innerIndex,
                                          e.target.value,
                                          data?.questions_type
                                        )
                                      }
                                    />
                                    <div
                                      className="d-flex upload_div gap-2 align-items-center"
                                      style={{ marginTop: "-31px" }}
                                    >
                                      {data?.questions_type === "1" ||
                                      data?.questions_type === "2" ? (
                                        <>
                                          {" "}
                                          <input
                                            type="checkbox"
                                            name=""
                                            id={
                                              innerData.name
                                                ? [upperIndex, innerIndex]
                                                : ""
                                            }
                                            className="quizQuesCheckbox"
                                            value={innerData.answer}
                                            defaultChecked={
                                              state &&
                                              innerData?.training_question_answer
                                                ? innerData
                                                    ?.training_question_answer[0]
                                                    ?.name
                                                : ""
                                            }
                                            onChange={(e) =>
                                              handleQuestionAnswer(
                                                upperIndex,
                                                innerIndex,
                                                e.target.checked,
                                                innerData.name,
                                                innerData
                                              )
                                            }
                                          />
                                          <label
                                            for={[upperIndex, innerIndex]}
                                          ></label>
                                        </>
                                      ) : null}
                                      {data?.questions_type === "3" ||
                                      data?.questions_type === "5" ? (
                                        <div
                                          className="h-26px"
                                          style={{ width: "65px" }}
                                        >
                                          <SearchableDropdown
                                            placeholder={
                                              state &&
                                              innerData.training_question_answer
                                                .length
                                                ? innerData
                                                    .training_question_answer[0]
                                                    .sequence
                                                : (keywordTranslation &&
                                                    keywordTranslation["nA"]) ||
                                                  langKey.nA
                                            }
                                            // selectedValue={innerData.sequence}
                                            className="answerSelect"
                                            options={indexOptions}
                                            changeHandler={(value) => {
                                              handleDropdownQuestionAnswer(
                                                upperIndex,
                                                innerIndex,
                                                value,
                                                innerData.name
                                              );
                                            }}
                                          />
                                        </div>
                                      ) : null}
                                      {innerData?.image ? (
                                        <>
                                          <ImageViewer
                                            src={
                                              innerData?.image || notFoundAsset
                                            }
                                            alt=""
                                            className="mr-2"
                                            width="24px"
                                            height="17px"
                                          />

                                          <img
                                            src={deleteBlankAsset}
                                            width="13px"
                                            height="14px"
                                            alt=""
                                            className="cursorOnIcons float-right"
                                            onClick={(e) => {
                                              const list = [...questions];
                                              let option =
                                                list[upperIndex]
                                                  .question_option;
                                              delete option[innerIndex].image;
                                              setQuestions(list);
                                            }}
                                          />
                                        </>
                                      ) : (
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
                                            accept="image/*"
                                            className="typefile"
                                            onChange={(e) =>
                                              handleQuestionOptionImage(
                                                upperIndex,
                                                innerIndex,
                                                e.target.files[0]
                                              )
                                            }
                                          />
                                        </div>
                                      )}

                                      {data?.questions_type === "2" ||
                                      data?.questions_type === "3" ||
                                      data?.questions_type === "5" ||
                                      data?.questions_type === "4" ? (
                                        <div>
                                          <img
                                            src={crossAsset}
                                            alt=""
                                            className="pointer"
                                            onClick={(e) =>
                                              handleCancelQuestionOption(
                                                upperIndex,
                                                innerIndex,
                                                innerData.id
                                              )
                                            }
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>

                                  {showQuestionErrors && (
                                    <div className="d-flex justify-content-between">
                                      <div>
                                        {!innerData.name ? (
                                          <ErrorViewer
                                            message={
                                              (keywordTranslation &&
                                                keywordTranslation[
                                                  "questionOptionRequired"
                                                ]) ||
                                              validationMessage.questionOptionRequired
                                            }
                                          />
                                        ) : null}
                                      </div>

                                      {data?.questions_type === "1" ||
                                      data?.questions_type === "2" ? (
                                        <div>
                                          {!innerData.answer ? (
                                            <ErrorViewer
                                              message={
                                                (keywordTranslation &&
                                                  keywordTranslation[
                                                    "questionAnswerRequired"
                                                  ]) ||
                                                validationMessage.questionAnswerRequired
                                              }
                                            />
                                          ) : null}
                                        </div>
                                      ) : (
                                        <div>
                                          {!innerData.answer ? (
                                            <ErrorViewer
                                              message={
                                                (keywordTranslation &&
                                                  keywordTranslation[
                                                    "questionAnswerRequired"
                                                  ]) ||
                                                validationMessage.questionAnswerRequired
                                              }
                                            />
                                          ) : null}
                                        </div>
                                      )}

                                      {!innerData.image &&
                                      data?.questions_type === "5" ? (
                                        <div>
                                          <ErrorViewer
                                            message={
                                              (keywordTranslation &&
                                                keywordTranslation[
                                                  "questionImageRequired"
                                                ]) ||
                                              validationMessage.questionImageRequired
                                            }
                                          />
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </>
                              );
                            }
                          )}
                        </div>

                        {(data?.questions_type === "1" &&
                          data?.optionLength < 2) ||
                        data?.questions_type === "2" ||
                        data?.questions_type === "3" ||
                        data?.questions_type === "5" ? (
                          <>
                            <div className="d-flex mt-3">
                              <p
                                className="addnew ml-auto mr-2"
                                onClick={(e) => addInnerInputFields(upperIndex)}
                              >
                                {(keywordTranslation &&
                                  keywordTranslation["addAnswer"]) ||
                                  langKey.addAnswer}
                              </p>
                            </div>
                          </>
                        ) : null}
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex align-items-center">
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
                          className="TraningFileBorder mt-1"
                          style={{ height: "160px", background: "#F8F8F8" }}
                        >
                          {data?.image ? (
                            <>
                              <ImageViewer
                                src={data?.image || notFoundAsset}
                                alt=""
                                className="mr-2"
                                width="320px"
                                height="155px"
                              />

                              <img
                                src={deleteBlankAsset}
                                width="13px"
                                height="14px"
                                alt=""
                                className="cursorOnIcons float-right mt-2"
                                onClick={(e) => {
                                  let rows = [...questions];
                                  delete rows[upperIndex].image;
                                  setQuestions([...rows]);
                                }}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                type="file"
                                name=""
                                id=""
                                accept="image/*"
                                className="uploadTraningFile"
                                style={{ height: "160px" }}
                                onChange={(e) =>
                                  handleQuestionImage(
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
                            </>
                          )}
                        </div>

                        {data?.questions_type === "3" ||
                        data?.questions_type === "5" ? (
                          <div>
                            <p className="fs-12 fw-600 mt-3 mb-1">
                              {(keywordTranslation &&
                                keywordTranslation["displayAs"]) ||
                                langKey.displayAs}
                            </p>
                            <div className="w-50">
                              <SearchableDropdown
                                className="dragDropdown w-50"
                                placeholder={
                                  (keywordTranslation &&
                                    keywordTranslation["select"]) ||
                                  langKey.select
                                }
                                selectedValue={data?.questions_type || "3"}
                                options={[
                                  { value: "3", label: "Sorting" },
                                  { value: "5", label: "Interactive" },
                                ]}
                                changeHandler={(value) =>
                                  handleDisplay(value, upperIndex)
                                }
                              />
                            </div>
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
                              <img src={infoAsset} width="16px" height="16px" />
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
                {questions?.length <= 0 && (
                  <p className="fs-12 fw-700 mt-4" style={{ color: "#6B6B6B" }}>
                    {(keywordTranslation &&
                      keywordTranslation["noQuestionYet"]) ||
                      langKey.noQuestionYet}
                  </p>
                )}
                <Button
                  label={
                    (keywordTranslation && keywordTranslation["addQuestion"]) ||
                    langKey.addQuestion
                  }
                  buttonStyle="addQues-btn mt-4 mb-4"
                  onClick={() => {
                    if (questions?.length <= 100) {
                      setShowQuestion(true);
                      setShowQuestionErrors(false);
                    } else {
                      toast.error(
                        (keywordTranslation &&
                          keywordTranslation["addQuestionLimit"]) ||
                          langKey.addQuestionLimit
                      );
                    }
                  }}
                />
              </div>
            </div>

            {showQuestion && (
              <center>
                <div className="col-lg-8 traningTabsBorder p-0 mt-3 mb-3">
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
                            <Nav.Link
                              eventKey={1}
                              onClick={() => setDropdownValue("")}
                            >
                              <img
                                src={
                                  questions_type === "2" ||
                                  questions_type === "3" ||
                                  questions_type === "4"
                                    ? trueFalseActiveIconAsset
                                    : trueFalseIconAsset
                                }
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
                            <Nav.Link
                              eventKey={2}
                              onClick={() => setDropdownValue("")}
                            >
                              <img
                                src={
                                  questions_type === "2"
                                    ? multichoiceActiveIconAsset
                                    : multichoiceIconAsset
                                }
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
                            <Nav.Link
                              eventKey={3}
                              onClick={() => setDropdownValue("Sorting")}
                            >
                              <img
                                src={
                                  questions_type === "3"
                                    ? dragDropActiveIconAsset
                                    : dragDropAsset
                                }
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
                            <Nav.Link
                              eventKey={4}
                              onClick={() => setDropdownValue("")}
                            >
                              <img
                                src={
                                  questions_type === "4"
                                    ? freeTextIconActiveAsset
                                    : freeTextIconAsset
                                }
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
                            <div className="row justify-content-center mt-3">
                              <div className="col-lg-12">
                                <div className="row justify-content-center">
                                  <div
                                    className="col-lg-10"
                                    style={{
                                      border: "1px solid lightgray",
                                    }}
                                  >
                                    {/* <img
                                      src={trueFalseAsset}
                                      width="100%"
                                      height="250px"
                                    /> */}
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
                                              keywordTranslation["3OutOf10"]) ||
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
                                              className="mcqs mcqsCheckbox"
                                            />
                                            <p
                                              className="fs-11 fw-400"
                                              style={{
                                                color: "#6B6B6B",
                                                lineHeight: "initial",
                                              }}
                                            >
                                              {(keywordTranslation &&
                                                keywordTranslation["true"]) ||
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
                                              className="mcqs mcqsCheckbox"
                                            />
                                            <p
                                              className="fs-11 fw-400"
                                              style={{
                                                color: "#6B6B6B",
                                                lineHeight: "initial",
                                              }}
                                            >
                                              {(keywordTranslation &&
                                                keywordTranslation["false"]) ||
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
                                {/* <div
                                  className="d-flex gap-2 mb-3"
                                  style={{ marginTop: "70px", float: "right" }}
                                >
                                  <Button label="Cancel" buttonStyle="cancel" />
                                  <Button
                                    label="Add"
                                    buttonStyle="addnew_btn pl-3 pr-3"
                                  />
                                </div> */}
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey={2}>
                            <div className="row justify-content-center mt-3">
                              <div className="col-lg-12">
                                <div className="row justify-content-center">
                                  <div
                                    className="col-lg-10"
                                    style={{
                                      border: "1px solid lightgray",
                                    }}
                                  >
                                    {/* <img
                                        src={multiSelectAsset}
                                        width="100%"
                                        height="250px"
                                      /> */}
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
                                              keywordTranslation["outOf10"]) ||
                                              langKey.outOf10}
                                          </p>
                                        </center>
                                      </div>
                                      <div className="col-lg-6 col-md-6">
                                        <div className="d-flex">
                                          <div className="d-flex p-1 gap-2 w-100 quesDiv">
                                            <input
                                              type="checkbox"
                                              id=""
                                              className="mcqs mcqsCheckbox"
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
                                                keywordTranslation["host"]) ||
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
                                              className="mcqs mcqsCheckbox"
                                            />
                                            <p
                                              className="fs-11 fw-400 text-start"
                                              style={{
                                                color: "#6B6B6B",
                                                lineHeight: "initial",
                                              }}
                                            >
                                              {(keywordTranslation &&
                                                keywordTranslation["obtain"]) ||
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
                                              className="mcqs mcqsCheckbox"
                                            />
                                            <p
                                              className="fs-11 fw-400 text-start"
                                              style={{
                                                color: "#6B6B6B",
                                                lineHeight: "initial",
                                              }}
                                            >
                                              {(keywordTranslation &&
                                                keywordTranslation["reveal"]) ||
                                                langKey.reveal}{" "}
                                              {(keywordTranslation &&
                                                keywordTranslation["follow"]) ||
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
                                              className="mcqs mcqsCheckbox"
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
                                    keywordTranslation["multipleChoiceText"]) ||
                                    langKey.multipleChoiceText}
                                </p>
                                {/* <div
                                  className="d-flex gap-2 mb-3"
                                  style={{ marginTop: "70px", float: "right" }}
                                >
                                  <Button label="Cancel" buttonStyle="cancel" />
                                  <Button
                                    label="Add"
                                    buttonStyle="addnew_btn pl-3 pr-3"
                                  />
                                </div> */}
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey={3}>
                            <Tab.Container
                              id="left-tabs-example"
                              defaultActiveKey="Sorting"
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
                                      {dropdownValue}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Nav
                                        variant="pills"
                                        className="flex-column"
                                        onSelect={handleSelect}
                                      >
                                        <Nav.Item>
                                          <Nav.Link eventKey="Sorting">
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
                                          <Nav.Link eventKey="Interactive">
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
                                <Tab.Content>
                                  <Tab.Pane eventKey="Sorting">
                                    <div className="col-lg-12">
                                      <div className="row justify-content-center">
                                        <div
                                          className="col-lg-10 mt-3"
                                          style={{
                                            border: "1px solid lightgray",
                                          }}
                                        >
                                          <div className="row justify-content-center pt-3 pb-3">
                                            <div className="col-lg-10 mt-4 mb-4">
                                              <center>
                                                <h3
                                                  className="fs-15 fw-500"
                                                  style={{ color: "#6B6B6B" }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "mangementSystem"
                                                    ]) ||
                                                    langKey.mangementSystem}
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
                                            <div className="col-md-6">
                                              <div
                                                className="border p-2"
                                                style={{ height: "274px" }}
                                              >
                                                <div className="d-flex align-items-center justify-content-between border p-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border p-2 mt-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border p-2 mt-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border p-2 mt-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border p-2 mt-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between border p-2 mt-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-md-6 h-100">
                                              <div
                                                className="border p-2"
                                                style={{ height: "274px" }}
                                              >
                                                <div className="d-flex align-items-center justify-content-between border p-2">
                                                  <p className="fs-12 fw-500 black">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                  <img
                                                    src={dragDropDotsAsset}
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row justify-content-center pt-3">
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
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="Interactive">
                                    <div className="col-lg-12">
                                      <div className="row justify-content-center">
                                        <div
                                          className="col-lg-10 mt-3"
                                          style={{
                                            border: "1px solid lightgray",
                                          }}
                                        >
                                          <div className="row justify-content-center pt-3 pb-3">
                                            <div className="col-lg-10 mt-4 mb-4">
                                              <center>
                                                <h3
                                                  className="fs-15 fw-500"
                                                  style={{ color: "#6B6B6B" }}
                                                >
                                                  {(keywordTranslation &&
                                                    keywordTranslation[
                                                      "mangementSystem"
                                                    ]) ||
                                                    langKey.mangementSystem}
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
                                            <div className="col-md-12">
                                              <div className="row">
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                                <div className="col-xxl-2 col-md-3 mt-3">
                                                  <p className="fs-12 fw-500 black p-2 border">
                                                    {(keywordTranslation &&
                                                      keywordTranslation[
                                                        "simpleText"
                                                      ]) ||
                                                      langKey.simpleText}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="col-md-12">
                                              <div className="row">
                                                <div className="col-md-3 mt-5">
                                                  <img
                                                    src={cuationAsset}
                                                    width="100%"
                                                    alt=""
                                                  />
                                                  <p className="fs-12 fw-500 black p-2 pt-3 pb-3 mt-3 border-dashed"></p>
                                                </div>
                                                <div className="col-md-3 mt-5">
                                                  <img
                                                    src={cuationAsset}
                                                    width="100%"
                                                    alt=""
                                                  />
                                                  <p className="fs-12 fw-500 black p-2 pt-3 pb-3 mt-3 border-dashed"></p>
                                                </div>
                                                <div className="col-md-3 mt-5">
                                                  <img
                                                    src={cuationAsset}
                                                    width="100%"
                                                    alt=""
                                                  />
                                                  <p className="fs-12 fw-500 black p-2 pt-3 pb-3 mt-3 border-dashed"></p>
                                                </div>
                                                <div className="col-md-3 mt-5">
                                                  <img
                                                    src={cuationAsset}
                                                    width="100%"
                                                    alt=""
                                                  />
                                                  <p className="fs-12 fw-500 black p-2 pt-3 pb-3 mt-3 border-dashed"></p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row justify-content-center pt-3">
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
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Row>
                            </Tab.Container>
                          </Tab.Pane>
                          <Tab.Pane eventKey={4}>
                            <div className="row justify-content-center">
                              <div className="col-lg-12">
                                <div className="row justify-content-center">
                                  <div
                                    className="col-lg-10 mt-3"
                                    style={{
                                      border: "1px solid lightgray",
                                    }}
                                  >
                                    <div className="row justify-content-center pt-3 pb-3">
                                      <div className="col-lg-10 mt-4 mb-4">
                                        <center>
                                          <h3
                                            className="fs-15 fw-500"
                                            style={{ color: "#6B6B6B" }}
                                          >
                                            {(keywordTranslation &&
                                              keywordTranslation[
                                                "mangementSystem"
                                              ]) ||
                                              langKey.mangementSystem}
                                          </h3>
                                          <p
                                            className="fs-11 fw-500 mt-1"
                                            style={{ color: "#FACB16" }}
                                          >
                                            {(keywordTranslation &&
                                              keywordTranslation["3OutOf10"]) ||
                                              langKey.outOf10}
                                          </p>
                                        </center>
                                      </div>
                                      <div className="col-md-12">
                                        <div>
                                          <textarea
                                            rows={5}
                                            cols={10}
                                            className="w-100 pt-2 pl-2 fs-12 fw-500 black rounded"
                                            placeholder="Type here"
                                            style={{ borderColor: "#d3d3d3" }}
                                          ></textarea>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-10 pt-4">
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
                          <Col sm={12}>
                            <div
                              className="d-flex gap-2 mb-3 mr-4"
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
                                onClick={handleAddQuestions}
                              />
                            </div>
                          </Col>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
              </center>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="row m-0 mt-3 mb-3 justify-content-center">
          <div className="col-lg-12 col-xl-10 col-xxl-11">
            <AddTraningCarousal
              data={childToParent}
              training={state?.training}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewTraning;
