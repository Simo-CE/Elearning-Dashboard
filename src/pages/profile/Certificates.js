import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { deleteAsset, deletebasketAsset, delIconAsset, downloadAsset, downloadDisabledAsset, downloadgreenAsset, downloadIconAsset, download_iconAsset, identityAsset, notFoundAsset, purpleuploadAsset, shareAsset, shareDisabledAsset, statusfailedAsset, statusGreyAsset, statuspassedAsset, statusunderreviewAsset, viewblueAsset, viewDisabledAsset } from '../../assets'
import DeleteModal from '../../components/Model/DeleteModal';
import { useCrudTopicCertificatesMutation, useDeleteUserProfileCertificateMutation, useGetSingleUserDetailQuery, useGetUserCertificateProfileQuery } from '../../services/api';
import '../competence/Competence.css';
import UploadCertificatesModal from './UploadCertificatesModal';
import langKey from "../../localization/locale.json";
import useDownloader from 'react-use-downloader';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import successMsg from "../../localization/successMsgLocale.json";

const Certificates = () => {
  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );
  const [showUploadCertificate, setShowUploadCertificate] = useState(false);
  const [showCertificateData, setShowCertificateData] = useState();
  const [deleteCertModal, setDeleteCertModal] = useState(false);
  const [certDelete, setCertDelete] = useState();
  const [certDeleteName, setCertDeleteName] = useState();

  const uploadCertificateModalHandler = (data) => {
    setShowCertificateData(data);
    setShowUploadCertificate((prev) => !prev);
  };

  const location = useLocation();

  const {
    data: getSingleUserDetail
  } = useGetSingleUserDetailQuery({ params: { user_id: location?.state?.user_id } });

  const currentUserById = getSingleUserDetail?.data;

  const [
    crudTopicCertificates,
    {
      isSuccess: crudTopicCertificatesSuccess,
      isLoading: crudTopicCertificatesLoading,
      isFetching: crudTopicCertificatesFetching,
      error: crudTopicCertificatesError,
      reset: crudTopicCertificatesReset,
    },
  ] = useCrudTopicCertificatesMutation();

  const
    {
      data: getUserCertificateProfile,
      refetch: getUserCertificateProfileRefetch,
      isSuccess: getUserCertificateProfileSuccess,
      isLoading: getUserCertificateProfileLoading,
      error: getUserCertificateProfileError,
      reset: getUserCertificateProfileReset,
    } = useGetUserCertificateProfileQuery({ params: { user_id: currentUserById?.id } });

  const [
    deleteUserProfileCertificate,
    {
      isLoading: deleteUserProfileCertificateLoading,
      isError: deleteUserProfileCertificateIsError,
      isSuccess: deleteUserProfileCertificateSuccess,
      reset: deleteUserProfileCertificateReset,
      error: deleteUserProfileCertificateError,
    },
  ] = useDeleteUserProfileCertificateMutation();

  useEffect(() => {
    getUserCertificateProfileRefetch();
  }, []);

  const createApiHandler = (data) => {
    crudTopicCertificates(data)
      .unwrap()
      .then((payload) => {
        let msg = (payload?.message == "created" && keywordTranslation && keywordTranslation["certiCreatedSuccess"] ||
          successMsg.certiCreatedSuccess);
        toast.success(msg);
        uploadCertificateModalHandler();
      });
  };

  const deleteCertModalHandler = (doc) => {
    setCertDeleteName(doc?.name)

    setCertDelete(doc?.user_certificate[0]?.id);
    setDeleteCertModal((prev) => !prev);
  };

  const deleteApiHandler = (id) => {
    const formData = new FormData();
    formData.append("_method", "delete");
    deleteUserProfileCertificate({ formData, id })
      .unwrap()
      .then((payload) => {
        let msg = (payload?.data?.message == "deleted" && keywordTranslation && keywordTranslation["certiDeleteSuccess"]) ||
          successMsg.certiDeleteSuccess;
        toast.success(msg);
        if (payload.status) {
          deleteCertModalHandler(null);
        }
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    if (deleteUserProfileCertificateSuccess) { getUserCertificateProfileRefetch() }
  }, [deleteUserProfileCertificateSuccess]);

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
                <h4 className='sm_heading fontsize-13'>{(keywordTranslation && keywordTranslation["requiredCerts"]) || langKey.requiredCerts}</h4>
                {/* <p className='para_11 fontsize-11'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </p> */}
              </div>
            </div>

            <div className='row mt-4 rowHeight customScroll'>
              {getUserCertificateProfile?.certificateData?.map((data) =>
                <div className='col-4 mb-3'>
                  <div className='document_card p-2'>
                    <div className='d-flex justify-content-end'>
                      {data.user_certificate.length > 0 ?
                        <>
                          {data?.user_certificate?.map((dataa) => (
                            <>
                              <img src={getDays(dataa?.expiry_date) > 30 ? statuspassedAsset : getDays(dataa?.expiry_date) < 0 ? statusfailedAsset : getDays(dataa?.expiry_date) > 0 || getDays(dataa?.expiry_date) >= 0 ? statusunderreviewAsset : ""} width="16px" height="16px" className="" />
                            </>
                          ))}
                        </>
                        : <img src={statusGreyAsset} width="16px" height="16px" />}


                      {/* {data?.user_certificate?.expiry_date ?
                        <img src={getDays(data?.user_certificate?.expiry_date) > 30 ? statuspassedAsset : getDays(data?.user_certificate?.expiry_date) <= 0 ? statusfailedAsset : getDays(data?.user_certificate?.expiry_date) > 0 || getDays(data?.user_certificate?.expiry_date) <= 30 ? statusunderreviewAsset : ""} width="16px" height="16px" className="" />
                        : <img src={statusGreyAsset} width="16px" height="16px" />} */}

                    </div>
                    <div className='mt-3'>
                      <center>
                        <div className='identity_bg d-flex justify-content-center align-items-center'>
                          <img src={data?.user_certificate?.document || notFoundAsset} width="35px" height="35px" style={{ objectFit: "contain" }} onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = notFoundAsset;
                          }} />
                        </div>
                        <div>
                          <p className='assign_to_name mt-2 fontsize-12'>{data?.name}</p>
                        </div>
                      </center>
                    </div>
                    <div className='d-flex justify-content-center mt-4 align-items-center gap-2'>

                      {data?.user_certificate.length == 0 ?
                        <img src={purpleuploadAsset} width="20px" height="14px" onClick={() => uploadCertificateModalHandler(data)} />
                        :
                        <img src={deletebasketAsset} width="13px" height="13px" onClick={() => deleteCertModalHandler(data)} />
                      }

                      {data?.user_certificate.length == 0 ?
                        <div className='d-flex justify-content-center gap-2'>
                          {/* <img src={shareDisabledAsset} width="15px" height="13.85px" /> */}

                          <img src={downloadDisabledAsset} width="12px" height="13.5px" />

                          <img src={viewDisabledAsset} width="16.87px" height="12.38px" />
                        </div>
                        :
                        <div className='d-flex justify-content-center gap-2'>
                          {/* <img src={shareAsset} width="15px" height="13.85px" /> */}

                          <img src={downloadgreenAsset} className="cursor" width="12px" height="13.5px" onClick={() => download(data?.user_certificate?.document, filename +
                            data?.user_certificate?.document?.split(".")?.pop()
                          )} />

                          <img src={viewblueAsset} className="cursor" width="16.87px" height="12.38px" onClick={() => window.open(data?.user_certificate?.document)} />
                        </div>
                      }
                    </div>
                  </div>
                </div>

              )}
            </div>

            {showCertificateData && showUploadCertificate &&
              <UploadCertificatesModal
                uploadCertificateModalHandler={uploadCertificateModalHandler}
                action={createApiHandler}
                loading={crudTopicCertificatesLoading}
                data={showCertificateData}
              />}

            {deleteCertModal && (
              <DeleteModal
                action={() => deleteApiHandler(certDelete)}
                deleteMessage={(keywordTranslation && keywordTranslation["delCertMsg"]) || langKey.delCertMsg}
                targetName={certDeleteName}
                handleCloseDeleteModal={() => deleteCertModalHandler(null)}
                loading={deleteUserProfileCertificateLoading}
              />
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Certificates;