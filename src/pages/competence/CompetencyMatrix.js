import React, { useEffect, useState, useRef } from "react";
import { Button, Table } from "react-bootstrap";
// import Tooltip from '@mui/material/';
import {
  greySettingIconAsset,
  profilePageAsset,
  settingAsset,
  settingiconAsset,
  statusfailedAsset,
  statusgreenAsset,
  statusgreenjpg,
  statusGreyAsset,
  statuspassedAsset,
  statusunderreviewAsset,
  userAsset,
} from "../../assets";
import "./Competence.css";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import moment from "moment";
import PaginationComponent from "../../components/Pagination/Pagination";
import { useGetTopicCertsQuery } from "../../services/api";
import { useNavigate } from "react-router-dom";
import langKey from "../../localization/locale.json";
import { useSelector } from "react-redux";
import CompetenceTabs from "./CompetenceTabs";
import { useDraggable } from "react-use-draggable-scroll";
import { useDownloadExcel } from "react-export-table-to-excel";
import Tooltip from "@mui/material/Tooltip";
import CompetenceMatrixData from "./CompetenceMatrixData";
import ExcelMatrixData from "./ExcelMatrixData";

const CompetenceOverview = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [pageUrl, setPageUrl] = useState("");
  const [showAllRecord, setShowAllRecord] = useState("");
  const [count, setCount] = useState(0);
  const {
    data: getTopicCerts,
    isSuccess: getTopicCertSuccess,
    isLoading: getTopicCertLoading,
    refetch: getTopicCertRefetch,
    error: getTopicCertError,
    reset: getTopicCertReset,
  } = useGetTopicCertsQuery({
    pageUrl,
    params: { per_page: showAllRecord == true ? "1000" : "10" },
  });

  const userCount = getTopicCerts?.user_count;

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());
    return Days + 1;
  };

  const paginationClickHandler = (url) => {
    setPageUrl(url);
  };
  const setCounter = (event) => {
    event.preventDefault();
    if (count == 0);
    setCount(1);
  };
  useEffect(() => {
    getTopicCertRefetch();
  }, []);

  const navigate = useNavigate();

  const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
  const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:

  const callBackButton = (res) => {
    if (res == "download") onDownload();
  };

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  return (
    <>
      {/* <CompetenceTabs ButtonClick={callBackButton} /> */}
      {/* <button onClick={onDownload}> Export excel </button> */}
      <div>
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex">
              <h4 className="main_heading">
                {(keywordTranslation && keywordTranslation["overview"]) ||
                  langKey.overview}
              </h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div
              className="competenceCustomScroll"
              ref={ref}
              {...events}
              style={{ overflow: "auto" }}
            >
              <Table striped>
                <thead className="competence_table_head">
                  <tr>
                    <th>
                      <div>
                        {/* <img
                          src={greySettingIconAsset}
                          alt=""
                          className="setting_icon"
                        /> */}
                        <p className="mb-0">#</p>
                      </div>
                    </th>

                    <th className="ps-5 text-uppercase d-revert">
                      {(keywordTranslation && keywordTranslation["user"]) ||
                        langKey.user}
                    </th>

                    {getTopicCerts?.topicData?.map((data) =>
                      data?.competence_certificate?.length ? (
                        <>
                          <th className="ps-0 pe-0 d-revert">
                            <div className="border_right w-100">
                              <div className="vertical_div d-flex flex-column">
                                {/* topic name */}
                                <p className="topic_heading mb-0">
                                  {data?.name}
                                </p>

                                {/* count */}
                                <div className="vertical_div  d-flex">
                                  {data?.competence_certificate?.map((data) => (
                                    <>
                                      <p className="topic_no mb-0">
                                        {data?.user_certificate_count}
                                      </p>
                                    </>
                                  ))}
                                </div>

                                {/* certificate name */}
                                <div className="vertical_div  certNameDiv d-flex">
                                  {data?.competence_certificate?.map(
                                    (dataa) => (
                                      <>
                                        <div className="d-flex flex-column w-100 align-items-center">
                                          <p className="topic_name mb-0 h-100">
                                            {dataa?.name}
                                          </p>
                                        </div>
                                      </>
                                    )
                                  )}
                                </div>

                                {/* percentage */}
                                <div className="vertical_div  d-flex">
                                  {data?.competence_certificate.map((data) => (
                                    <p className="topic_per mb-0">
                                      {Math.trunc(
                                        (data?.user_certificate_count /
                                          userCount) *
                                        100
                                      )}
                                      %
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </th>
                        </>
                      ) : null
                    )}
                  </tr>
                </thead>

                <tbody className="competence_table_body">
                  {getTopicCerts?.userwithCompanyAndDepartment?.data?.length ? (
                    getTopicCerts?.userwithCompanyAndDepartment.data?.map(
                      (topicItem, topicIndex) => {
                        return (
                          <tr>
                            <th className="fs-12 fw-500 black">
                              {topicIndex +
                                getTopicCerts.userwithCompanyAndDepartment
                                  ?.from}
                            </th>

                            <th className="d-revert">
                              <div
                                className="media align-items-center cursor"
                                onClick={() => {
                                  navigate("/dashboard/profile", {
                                    state: { user_id: topicItem?.id },
                                  });
                                }}
                              >
                                <img
                                  className="mr-2 assign_img"
                                  src={topicItem.profile_photo || userAsset}
                                  alt=""
                                  width="35px"
                                  height="35px"
                                />
                                <div className="media-body text-align-initial">
                                  <h5 className="mt-0 assign_to_name fontsize-12">
                                    {topicItem?.first_name}
                                    {topicItem?.last_name}
                                  </h5>
                                  <p className="function fontsize-11">
                                    {topicItem?.department?.name
                                      ? topicItem?.department?.name
                                      : "—"}
                                  </p>
                                </div>
                              </div>
                            </th>

                            {getTopicCerts?.topicData?.map((data) =>
                              data?.competence_certificate?.length ? (
                                <>
                                  <td className="ps-0 pe-0">
                                    <div className="vertical_div  d-flex">
                                      {data?.competence_certificate?.map(
                                        (dataa) => (
                                          <>
                                            <div className="d-flex flex-column w-100 align-items-center justify-content-center">
                                              <p className="topic_name mb-0 h-100 d-none">
                                                {dataa?.name}
                                              </p>
                                              <div className="">
                                                <>
                                                  {topicItem?.user_company_certificate?.map(
                                                    (val) => (
                                                      <>
                                                        {val.topic_id ===
                                                          data.id ? (
                                                          <>
                                                            {val
                                                              .user_certificate
                                                              .length === 0 ? (
                                                              <img
                                                                src={
                                                                  statusGreyAsset
                                                                }
                                                                width="20px"
                                                                height="20px"
                                                              />
                                                            ) : (
                                                              <>
                                                                {val?.user_certificate?.map(
                                                                  (
                                                                    vall,
                                                                    ind
                                                                  ) => (
                                                                    <>
                                                                      {dataa.id ==
                                                                        vall.certificates_id ? (
                                                                        <CompetenceMatrixData
                                                                          vall={vall}
                                                                          topicItem={topicItem}
                                                                          ind={ind}
                                                                          val={val}
                                                                          company={val?.user_certificate}
                                                                        />
                                                                      ) : null}
                                                                    </>
                                                                  )
                                                                )}
                                                              </>
                                                            )}
                                                          </>
                                                        ) : null}
                                                      </>
                                                    )
                                                  )}
                                                </>
                                              </div>

                                              {/* <div className="">
                                              {topicItem?.user_certificate.length > 0 ? (
                                                <>{topicItem?.user_certificate?.map((val) => (
                                                  <>
                                                    {
                                                      val.certificate.topic_id === data.id && val.certificates_id === dataa.id ?
                                                        <>
                                                          <div className="p-0 m-0">
                                                            {getDays(val?.expiry_date) < 0 ?
                                                              <div className="m-0 p-0">
                                                                <Tooltip title={val?.expiry_date} arrow>
                                                                  <img src={statusfailedAsset} alt="" width="20px" height="20px" className="cursor" />
                                                                </Tooltip>
                                                              </div>
                                                              :
                                                              getDays(val?.expiry_date) <= 30 &&
                                                                getDays(val?.expiry_date) >= 0 ?
                                                                <Tooltip title={val?.expiry_date} arrow>
                                                                  <img src={statusunderreviewAsset} alt="" width="20px" height="20px" className="cursor" />
                                                                </Tooltip>
                                                                :
                                                                <Tooltip title={val?.expiry_date} arrow>
                                                                  <img src={statuspassedAsset} alt="" width="20px" height="20px" className="cursor" />
                                                                </Tooltip>
                                                            }
                                                          </div>
                                                        </>
                                                        :
                                                        null
                                                    }
                                                  </>
                                                ))}
                                                </>)
                                                : <img src={statusGreyAsset} width="20px" height="20px" />
                                              }
                                            </div> */}
                                            </div>
                                          </>
                                        )
                                      )}
                                    </div>
                                  </td>
                                </>
                              ) : null
                            )}
                          </tr>
                        );
                      }
                    )
                  ) : (
                    <>
                      {getTopicCertLoading ? (
                        <Loader colSpan="3" />
                      ) : (
                        <NoRecordFound colSpan="3" />
                      )}
                    </>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="paginationSideMargin">
        {getTopicCerts?.userwithCompanyAndDepartment?.links?.length && (
          <PaginationComponent
            pagination={
              showAllRecord == false
                ? getTopicCerts.userwithCompanyAndDepartment.links
                : null
            }
            clickHandler={paginationClickHandler}
            from={getTopicCerts?.userwithCompanyAndDepartment?.from}
            to={getTopicCerts?.userwithCompanyAndDepartment?.to}
            total={getTopicCerts?.userwithCompanyAndDepartment?.total}
            changeHandler={(value, url) => {
              setShowAllRecord(value);
              setPageUrl(url, "");
            }}
          />
        )}
      </div>

      <div className="d-none">
        <Table striped ref={tableRef}>
          <thead className="competence_table_head">
            <tr>
              <th>
                <div>
                  <p className="mb-0">#</p>
                </div>
              </th>

              <th className="ps-5 text-uppercase">
                {(keywordTranslation && keywordTranslation["user"]) ||
                  langKey.user}
              </th>

              {getTopicCerts?.topicData?.map((data) =>
                data?.competence_certificate?.length ? (
                  <>
                    <th>
                      <p className="topic_heading mb-0">{data?.name}</p>
                      {data?.competence_certificate?.map((data) => (
                        <>
                          <div>
                            <p className="topic_no mb-0">
                              {data?.user_certificate_count}
                            </p>
                            <div className="d-flex flex-column w-100 align-items-center">
                              <p className="topic_name mb-0 h-100">
                                {data?.name}
                              </p>
                            </div>
                            <p className="topic_per mb-0">
                              {Math.trunc(
                                (data?.user_certificate_count / userCount) * 100
                              )}
                              %
                            </p>
                          </div>
                        </>
                      ))}
                    </th>
                  </>
                ) : null
              )}
            </tr>
          </thead>
          <tbody className="competence_table_body">
            {getTopicCerts?.userwithCompanyAndDepartment?.data?.length ? (
              getTopicCerts?.userwithCompanyAndDepartment.data?.map(
                (topicItem, topicIndex) => {
                  return (
                    <tr>
                      <th className="fs-12 fw-500 black">
                        {topicIndex +
                          getTopicCerts.userwithCompanyAndDepartment?.from}
                      </th>

                      <th className="d-revert">
                        <h5 className="mt-0 assign_to_name fontsize-12">
                          {topicItem?.first_name}
                          {topicItem?.last_name}
                        </h5>
                        {topicItem?.department?.name
                          ? topicItem?.department?.name
                          : "—"}
                      </th>

                      {getTopicCerts?.topicData?.map((data) =>
                        data?.competence_certificate?.length ? (
                          <>
                            <td className="ps-0 pe-0">
                              {/* certificate name */}
                              <div className="vertical_div  d-flex">
                                {data?.competence_certificate?.map((dataa) => (
                                  <>
                                    {topicItem?.user_company_certificate?.map(
                                      (val) => (
                                        <>
                                          {val.topic_id === data.id ? (
                                            <>
                                              {val.user_certificate.length ===
                                                0 ? (
                                                <img
                                                  src={statusGreyAsset}
                                                  width="20px"
                                                  height="20px"
                                                />
                                              ) : (
                                                <>
                                                  {val?.user_certificate?.map(
                                                    (vall, ind) => (
                                                      <ExcelMatrixData
                                                        vall={vall}
                                                        topicItem={topicItem}
                                                        ind={ind}
                                                        val={val}
                                                        company={
                                                          val?.user_certificate
                                                        }
                                                      />
                                                    )
                                                  )}
                                                </>
                                              )}
                                            </>
                                          ) : null}
                                        </>
                                      )
                                    )}
                                  </>
                                ))}
                              </div>
                            </td>
                          </>
                        ) : null
                      )}
                    </tr>
                  );
                }
              )
            ) : (
              <>
                {getTopicCertLoading ? (
                  <Loader colSpan="3" />
                ) : (
                  <NoRecordFound colSpan="3" />
                )}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CompetenceOverview;
