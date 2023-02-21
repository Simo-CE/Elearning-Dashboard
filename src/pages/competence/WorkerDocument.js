import React, { useState, useRef } from 'react';
import { profilePageAsset, settingAsset, settingiconAsset, userAsset } from '../../assets';
import { Table } from 'react-bootstrap';
import "./Competence.css";
import Loader from "../../components/loader/Loader";
import NoRecordFound from "../../components/NoRecordFound/NoRecordFound";
import PaginationComponent from "../../components/Pagination/Pagination";
import moment from "moment";
import {
    useGetTopicDocumentsQuery
} from '../../services/api';
import langKey from "../../localization/locale.json";
import { useSelector } from 'react-redux';
import CompetenceRouter from './CompetenceRouter';
import { useDraggable } from "react-use-draggable-scroll";
import { useNavigate } from 'react-router-dom';

const WorkerDocument = () => {

    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);

    const [pageUrl, setPageUrl] = useState('');
    const [showAllRecord, setShowAllRecord] = useState('');

    const
        {
            data: getTopicDocuments,
            isSuccess: getTopicDocumentsSuccess,
            isLoading: getTopicDocumentsLoading,
            isFetching: getTopicDocumentsFetching,
            error: getTopicDocumentsError,
            reset: getTopicDocumentsReset,
        } = useGetTopicDocumentsQuery({ pageUrl, params: { per_page: showAllRecord == true ? "1000" : "10" } });

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

    const ref = useRef(); // We will use React useRef hook to reference the wrapping div:
    const { events } = useDraggable(ref); // Now we pass the reference to the useDraggable hook:


    const navigate = useNavigate();

    const docFunction = (data, userid, dataaId) => {

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                console.log('vallllllllllllllllllllllll', data[i]);

                if (data[i].document_id === dataaId && data[i].user_id === userid)
                    return 1;
                console.log('userID', userid);
                console.log('DOcomentID', dataaId);
            }

        }



        // if(data.length>0){
        //     for (let i = 0; i < data.length; i++) {
        //         console.log('values',data[i]);
        //         // if (data[i].user_document ==dataaId && data[i].user_id === userid) {
        //         //     alert('ji');
        //         //         return 1;
        //         // }
        //     }
        //     return 0;
        // }
        // else
        return 0;
    }
    return (
        <>
            {/* <CompetenceRouter /> */}
            <div>
                <div className="row">
                    <div className='col-lg-12'>
                        <div className='d-flex'>
                            <h4 className='main_heading'>{(keywordTranslation && keywordTranslation["overview"]) || langKey.overview}</h4>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="customScroll" ref={ref} {...events} style={{ overflow: "auto" }}>
                            <Table striped >
                                <thead className='workerDocument_table_head'>
                                    <tr>
                                        <th>#</th>
                                        <th className="text-uppercase d-revert">{(keywordTranslation && keywordTranslation["user"]) || langKey.user}</th>
                                        {getTopicDocuments?.documentData !== undefined ? <>
                                            {getTopicDocuments?.documentData?.map((data) => (
                                                <th className="worker_topic_name" style={{ display: "revert" }}>
                                                    <p>{data?.name}</p>
                                                </th>
                                            ))}
                                        </> : null}
                                    </tr>
                                </thead>
                                <tbody className='workerDocument_table_body'>
                                    {getTopicDocuments?.userwithCompanyAndDepartment?.data?.length ?
                                        getTopicDocuments.userwithCompanyAndDepartment.data.map((data, index) =>
                                            <tr>
                                                <th className='fs-12 fw-500 black' style={{ height: "55px" }}>{index + getTopicDocuments.userwithCompanyAndDepartment.from}</th>
                                                <th className='d-revert'>
                                                    <div className="media align-items-center cursor" style={{ width: "200px" }}
                                                        onClick={() => {
                                                            navigate("/dashboard/profile", {
                                                                state: { user_id: data?.id },
                                                            });
                                                        }}
                                                    >
                                                        <img
                                                            className="mr-2 assign_img"
                                                            src={data?.profile_photo || userAsset}
                                                            alt=""
                                                            width="35px"
                                                            height="35px"
                                                        />
                                                        <div className="media-body text-align-initial">
                                                            <h5 className="mt-0 assign_to_name fontsize-12">
                                                                {data?.first_name} {data?.last_name}
                                                            </h5>
                                                            <p className="function fontsize-11">{data?.department?.name ? data?.department?.name : "—"}</p>
                                                        </div>
                                                    </div>
                                                </th>
                                                {getTopicDocuments?.documentData?.map((dataa) => (
                                                    <th className="worker_topic_name" style={{ display: "revert" }}>
                                                        <p className='d-none'>{dataa?.name}</p>

                                                        {data?.user_company_document?.map((val, index1) => (

                                                            <div>
                                                                {val?.company_user_document.length > 0 ?
                                                                    <>
                                                                        {val?.company_user_document?.map((docVal, index) => (
                                                                            <>
                                                                                {docVal?.user_id === data?.id ?
                                                                                    <>
                                                                                        {docVal?.document_id === dataa.id ?
                                                                                            <div>
                                                                                                {getDays(docVal?.expiry_date) < 0 ?
                                                                                                    <p className='statusExpired'>{moment(docVal?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                                    getDays(docVal?.expiry_date) <= 30 && getDays(docVal?.expiry_date) >= 0 ?
                                                                                                        <p className='statusPending'>{moment(docVal?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                                        <p className='statusPendingLong'>{moment(docVal?.expiry_date).format('DD/MM/YYYY')}</p>}
                                                                                            </div>
                                                                                            : null
                                                                                        }
                                                                                    </>
                                                                                    : null
                                                                                    // <>
                                                                                    //     {data?.user_company_document.length == index1 + 1 && docFunction(data?.user_company_document, data?.id, dataa?.id) == 0 ?
                                                                                    //         <p className='fs-12 black'>_</p>
                                                                                    //         : null}
                                                                                    // </>
                                                                                }
                                                                            </>
                                                                        ))}
                                                                    </>
                                                                    : "_"}


                                                            </div>
                                                        ))}

                                                        {/* {data?.user_company_document?.map((val, index) => (
                                                            <div key={index}>
                                                                {(val?.user_document?.user_id === data?.id) ?
                                                                    <>
                                                                        {
                                                                            val?.user_document?.document_id === dataa?.id ?
                                                                                <div>
                                                                                    {getDays(val?.user_document?.expiry_date) < 0 ?
                                                                                        <p className='statusExpired'>{moment(val?.user_document?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                        getDays(val?.user_document?.expiry_date) <= 30 && getDays(val?.user_document?.expiry_date) >= 0 ?
                                                                                            <p className='statusPending'>{moment(val?.user_document?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                            <p className='statusPendingLong'>{moment(val?.user_document?.expiry_date).format('DD/MM/YYYY')}</p>}
                                                                                </div> :
                                                                                null
                                                                        }
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {data?.user_company_document.length == index + 1 && docFunction(data?.user_company_document, data?.id, dataa?.id) == 0 ?
                                                                            <p className='fs-12 black'>_</p>
                                                                            : null}
                                                                    </>
                                                                }
                                                            </div>
                                                        ))} */}
                                                        {/* {data?.user_document.length ? (
                                                            <>
                                                                {data?.user_document?.map((val) => (
                                                                    <>
                                                                        {val.document_id === dataa.id ?
                                                                            <div>
                                                                                {getDays(val?.expiry_date) < 0 ?
                                                                                    <p className='statusExpired'>{moment(val?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                    getDays(val?.expiry_date) <= 30 && getDays(val?.expiry_date) >= 0 ?
                                                                                        <p className='statusPending'>{moment(val?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                                        <p className='statusPendingLong'>{moment(val?.expiry_date).format('DD/MM/YYYY')}</p>}
                                                                            </div>
                                                                            : null}
                                                                    </>

                                                                ))}
                                                            </>)
                                                            : <p className='mb-0 black'>_</p>
                                                        } */}
                                                    </th>
                                                ))}

                                                {/* {getTopicDocuments?.documentData?.map((data) => (
                                                    <td className="worker_topic_name">
                                                        {data?.user_document !== null ?
                                                            <div>
                                                                {getDays(data?.user_document?.expiry_date) < 0 ? <p className='statusExpired'>{moment(data?.user_document?.expiry_date).format('DD/MM/YYYY')}</p> : getDays(data?.user_document?.expiry_date) <= 30 && getDays(data?.user_document?.expiry_date) >= 0 ? <p className='statusPending'>{moment(data?.user_document?.expiry_date).format('DD/MM/YYYY')}</p> :
                                                                    <p className='statusPendingLong'>{moment(data?.user_document?.expiry_date).format('DD/MM/YYYY')}</p>}
                                                            </div>
                                                            :
                                                            <p>_</p>
                                                        }
                                                    </td>
                                                ))} */}
                                            </tr>
                                        ) : <>
                                            {getTopicDocumentsLoading ? (
                                                <Loader colSpan="3" />
                                            ) : (
                                                <NoRecordFound colSpan="3" />
                                            )}
                                        </>}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div >

            <div className="paginationSideMargin">
                {
                    getTopicDocuments?.userwithCompanyAndDepartment?.links?.length && (
                        <PaginationComponent
                            pagination={showAllRecord == false ? getTopicDocuments.userwithCompanyAndDepartment.links : null}
                            clickHandler={paginationClickHandler}
                            from={getTopicDocuments?.userwithCompanyAndDepartment?.from}
                            to={getTopicDocuments?.userwithCompanyAndDepartment?.to}
                            total={getTopicDocuments?.userwithCompanyAndDepartment?.total}
                            changeHandler={(value, url) => {
                                setShowAllRecord(value);
                                setPageUrl(url, "");
                            }}
                        />
                    )
                }
            </div>
        </>
    )
}

export default WorkerDocument;