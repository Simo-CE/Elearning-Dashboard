import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteAsset, deletebasketAsset, delIconAsset, downloadAsset, downloadDisabledAsset, downloadgreenAsset, downloadIconAsset, download_iconAsset, identityAsset, notFoundAsset, noyetAsset, purpleuploadAsset, shareAsset, shareDisabledAsset, statuspassedAsset, verifyAsset, viewblueAsset, viewDisabledAsset } from '../../assets';
import DeleteModal from '../../components/Model/DeleteModal';
import { useCrudTopicDocumentsMutation, useDeleteUserProfileDocumentMutation, useGetSingleUserDetailQuery, useGetUserDocumentsProfileQuery } from '../../services/api';
import '../competence/Competence.css';
import UploadDocumentModal from "./UploadDocumentModal";
import langKey from "../../localization/locale.json";
import useDownloader from 'react-use-downloader';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import successMsg from "../../localization/successMsgLocale.json";

const Documents = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showUploadDocument, setShowUploadDocument] = useState(false);
  const [deleteDocModal, setDeleteDocModal] = useState(false);
  const [showDocumentData, setShowDocumentData] = useState();
  const [docDelete, setDocDelete] = useState();
  const [docNameDelete, setDocNameDelete] = useState();

  const uploadDocumentModalHandler = (data) => {
    setShowDocumentData(data);
    setShowUploadDocument((prev) => !prev);
  };

  const location = useLocation();

  const {
    data: getSingleUserDetail
  } = useGetSingleUserDetailQuery({ params: { user_id: location?.state?.user_id } });

  const currentUserById = getSingleUserDetail?.data;

  const [
    crudTopicDocuments,
    {
      isSuccess: crudTopicDocumentsSuccess,
      isLoading: crudTopicDocumentsLoading,
      isFetching: crudTopicDocumentsFetching,
      error: crudTopicDocumentsError,
      reset: crudTopicDocumentsReset,
    },
  ] = useCrudTopicDocumentsMutation();

  const
    {
      data: getUserDocumentsProfile,
      refetch: getUserDocumentsProfileRefetch,
      isSuccess: getUserDocumentsProfileSuccess,
      isLoading: getUserDocumentsProfileLoading,
      error: getUserDocumentsProfileError,
      reset: getUserDocumentsProfileReset,
    } = useGetUserDocumentsProfileQuery({ params: { user_id: currentUserById?.id } });

  const [
    deleteUserProfileDocument,
    {
      isLoading: deleteUserProfileDocumentLoading,
      isError: deleteUserProfileDocumentIsError,
      isSuccess: deleteUserProfileDocumentSuccess,
      reset: deleteUserProfileDocumentReset,
      error: deleteUserProfileDocumentError,
    },
  ] = useDeleteUserProfileDocumentMutation();

  useEffect(() => {
    getUserDocumentsProfileRefetch();
  }, []);

  const createApiHandler = (data) => {
    crudTopicDocuments(data)
      .unwrap()
      .then((payload) => {
        let msg = (payload?.message == "created" && keywordTranslation && keywordTranslation["docuCreatedSuccess"] ||
          successMsg.docuCreatedSuccess);
        toast.success(msg);
        uploadDocumentModalHandler();
      });
  };

  const deleteDocModalHandler = (doc) => {
    setDocDelete(doc?.user_document?.id)
    setDocNameDelete(doc?.name)
    setDeleteDocModal((prev) => !prev);
  };

  const deleteApiHandler = (id) => {
    const formData = new FormData();
    formData.append("_method", "delete");
    deleteUserProfileDocument({ formData, id })
      .unwrap()
      .then((payload) => {
        let msg = (payload?.data?.message == "deleted" && keywordTranslation && keywordTranslation["docuDeleteSuccess"]) ||
          successMsg.docuDeleteSuccess;
        toast.success(msg);
        if (payload.status) {
          deleteDocModalHandler(null);
        }
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    if (deleteUserProfileDocumentSuccess) { getUserDocumentsProfileRefetch() }
  }, [deleteUserProfileDocumentSuccess]);

  const getDays = (date) => {
    var now = moment(new Date()); //todays date
    var end = moment(date); // another date
    var duration = moment.duration(end.diff(now));
    var Days = Math.floor(duration.asDays());
    return Days + 1;
  };

  const { download, error } = useDownloader();

  const filename = `${(Math.random() + 1).toString(36).substring(5)}.`;

  error && toast.error((keywordTranslation && keywordTranslation["fileFormatNotCorrect"]) || langKey.fileFormatNotCorrect, { toastId: "" });

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <div className='require_document_bg'>
            <div className='row'>
              <div className='col-lg-12'>
                <h4 className='sm_heading fontsize-13'>{(keywordTranslation && keywordTranslation["requiredDocs"]) || langKey.requiredDocs}</h4>
                {/* <p className='para_11 fontsize-11'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p> */}
              </div>
            </div>

            <div className='row mt-4 rowHeight customScroll'>
              {getUserDocumentsProfile?.documentData?.map((data) => {
                return (
                  <div className='col-4 mb-3'>
                    <div className='document_card p-2'>

                      <div className='d-flex justify-content-end  align-items-center'>
                        {getDays(data?.user_document?.expiry_date) >= 30 ?
                          <>
                            <img src={verifyAsset} alt="passed-icon" width="16px" height="16px" className="mr-1" />
                            <p className='verfied para_11 fontsize-11'>{(keywordTranslation && keywordTranslation["verified"]) || langKey.verified}</p>
                          </>
                          :
                          <>
                            <img src={noyetAsset} alt="passed-icon" width="16px" height="16px" className="mr-1" />
                            <p className='not_yet para_11 fontsize-11'>{(keywordTranslation && keywordTranslation["notYet"]) || langKey.notYet}</p>
                          </>
                        }
                      </div>

                      <div className='mt-3'>
                        <center>
                          <div className='identity_bg d-flex justify-content-center align-items-center'>
                            <img src={data?.user_document?.document || notFoundAsset} width="35px" height="35px" style={{ objectFit: "contain" }} onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = notFoundAsset;
                            }} />
                          </div>
                          <div>
                            <p className='assign_to_name mt-2 fontsize-12'>{data?.name}</p>
                            <p className='para_11 mt-1 fontsize-11'>Internal & External</p>
                          </div>
                        </center>
                      </div>

                      <div className='d-flex justify-content-center mt-4 align-items-center gap-2'>

                        {!data?.user_document ?
                          <img src={purpleuploadAsset} width="20px" height="14px" onClick={() => uploadDocumentModalHandler(data)} />
                          :
                          <img src={deletebasketAsset} width="13px" height="13px" onClick={() => deleteDocModalHandler(data)} />
                        }

                        {!data?.user_document ?
                          <div className='d-flex justify-content-center gap-2'>
                            {/* <img src={shareDisabledAsset} width="15px" height="13.85px" /> */}

                            <img src={downloadDisabledAsset} width="12px" height="13.5px" />

                            <img src={viewDisabledAsset} width="16.87px" height="12.38px" />
                          </div>
                          :
                          <div className='d-flex justify-content-center gap-2'>
                            {/* <img src={shareAsset} width="15px" height="13.85px" /> */}

                            <img src={downloadgreenAsset} className="cursor" width="12px" height="13.5px" onClick={() => download(data?.user_document?.document, filename +
                              data?.user_document?.document?.split(".")?.pop()
                            )} />

                            <img src={viewblueAsset} className="cursor" width="16.87px" height="12.38px" onClick={() => window.open(data?.user_document?.document)} />
                          </div>
                        }
                      </div>
                    </div>
                  </div>)
              })
              }

              {showDocumentData && showUploadDocument &&
                <UploadDocumentModal
                  action={createApiHandler}
                  loading={crudTopicDocumentsLoading}
                  uploadDocumentModalHandler={uploadDocumentModalHandler}
                  data={showDocumentData}
                />}

              {deleteDocModal && (
                <DeleteModal
                  action={() => deleteApiHandler(docDelete)}
                  deleteMessage={(keywordTranslation && keywordTranslation["delDocMsg"]) || langKey.delDocMsg}
                  targetName={docNameDelete}
                  handleCloseDeleteModal={() => deleteDocModalHandler(null)}
                  loading={deleteUserProfileDocumentLoading}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Documents;