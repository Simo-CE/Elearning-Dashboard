import "../../components/Model/Modal.css";
import Button from "../../components/Button/Button";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  totalUsersAsset,
  uploadAsset,
  fileAsset,
  tickAsset,
  deleteAsset,
} from "../../assets";
import TableComponent from "../../components/table/Table";
import langKey from "../../localization/locale.json";
import { useImportCSVFileMutation } from "../../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import SaveButton from "../../components/Button/Button";

const ImportCsvFileModal = (props) => {
  const [csvfile, setCSVFile] = useState("");
  const [jsonData, setJsonData] = useState([]);

  const { keywordTranslation, language_direction } = useSelector(
    (state) => state.localization?.selectedLanguage
  );

  const [
    importCSVFile,
    {
      isLoading: importCSVFileLoading,
      isError: importCSVFileError,
      isSuccess: importCSVFileSuccess,
      reset: importCSVFileReset,
      error: importCSVFileErrorMessage,
    },
  ] = useImportCSVFileMutation();

  const handleCSVFileUpload = (file) => {
    setCSVFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportCSVFile = () => {
    const formData = new FormData();
    formData.append("file", csvfile);
    if (csvfile) {
      importCSVFile(formData)
        .unwrap()
        .then((payload) => {
          props.handleCloseCSVFileModal(payload);
          if (payload.status) {
            toast.success("File uploaded successfully");
          }
        })
        .catch((error) => {
          toast.error("File formate is incorrect");
        });
    }
  };

  const handleCancelFile = () => {
    setCSVFile("");
    setJsonData([]);
  };

  return (
    <>
      <Modal
        size="lg"
        show={true}
        onHide={props.handleCloseCSVFileModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex">
            <img src={totalUsersAsset} alt="" className="mr-2" />
            <h5 className="title">
              {(keywordTranslation && keywordTranslation["importCsvFile"]) ||
                langKey.importCsvFile}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overflow pt-0">
          <div className="ml-3 mr-3">
            <div className="row pt-3">
              <div className="col-6 csvfile_div pt-2 pb-2">
                <center>
                  <img src={uploadAsset} alt="" className="upload_csv" />
                  <input
                    type="file"
                    className="csvfile"
                    accept=".xlsx, .xls, .csv"
                    onChange={(e) => handleCSVFileUpload(e.target.files[0])}
                  />
                  <p className="csvtext">
                    {(keywordTranslation &&
                      keywordTranslation["dragDropFile"]) ||
                      langKey.dragDropFile}{" "}
                    <br />
                    {(keywordTranslation && keywordTranslation["or"]) ||
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
              <div className="col-6">
                <div className="row">
                  <div className="col-12 ">
                    {csvfile ? (
                      <>
                        <div className="d-flex">
                          <div className="media">
                            <img className="mr-3 " src={fileAsset} alt="icon" />
                            <div className="media-body ">
                              <h5 className="mt-0 cardtitle mb-0">
                                {csvfile?.name}
                              </h5>
                              <p className="cardsubtitle fontsize-12 mb-0">
                                {csvfile?.size}
                              </p>
                            </div>
                          </div>
                          <div className=" ml-auto">
                            <img
                              src={tickAsset}
                              alt=""
                              width="13px"
                              height="9.75px"
                              className="mr-3"
                            />
                            <img
                              src={deleteAsset}
                              alt=""
                              width="20px"
                              height="20px"
                              className="cursor"
                              onClick={handleCancelFile}
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="col-12" style={{ marginLeft: "-14px" }}>
                          <div className="media">
                            <img
                              className=""
                              src={totalUsersAsset}
                              alt="icon"
                            />
                            <div
                              className="media-body "
                              style={{ marginLeft: "14px" }}
                            >
                              <h5 className="mt-0 cardtitle mb-0 font-size-14">
                                {jsonData?.length}
                              </h5>
                              <p className="cardsubtitle fontsize-12">
                                {(keywordTranslation &&
                                  keywordTranslation["usersWillBeCreated"]) ||
                                  langKey.usersWillBeCreated}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <TableComponent>
              {csvfile ? (
                <>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Age</th>
                      <th scope="col">Function</th>
                      <th scope="col">Department</th>
                      <th scope="col">Company</th>
                      <th scope="col">Report to</th>
                      <th scope="col">Phone</th>
                      <th scope="col" style={{ display: "revert" }}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData?.map((data, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {data?.first_name || "—"} {data?.last_name || "—"}
                          </td>
                          <td>
                            {moment().diff(data?.birthday, "years") || "—"}{" "}
                          </td>
                          <td>Electrician</td>
                          <td>Electrical Department</td>
                          <td>Newelec</td>
                          <td>{data?.report_to || "—"}</td>
                          <td>{data?.number || "—"}</td>
                          <td style={{ display: "revert" }}>{data?.email || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              ) : null}
            </TableComponent>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label={
              (keywordTranslation && keywordTranslation["cancel"]) ||
              langKey.cancel
            }
            buttonStyle="cancel mr-2"
            onClick={props.handleCloseCSVFileModal}
          />
          <SaveButton
            label={
              (keywordTranslation && keywordTranslation["create"]) ||
              langKey.create
            }
            buttonStyle="createbtn"
            onClick={handleImportCSVFile}
            loading={importCSVFileLoading}
            disabled={!csvfile && true}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImportCsvFileModal;
