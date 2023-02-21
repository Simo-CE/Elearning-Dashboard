import "../../components/Model/Modal.css";
import { useSelector } from "react-redux";
import Button from '../../components/Button/Button'
import { Modal } from "react-bootstrap";
import langKey from "../../localization/locale.json";

const DeleteModal = ({ action, modelHandler, data, langName, children, loading }) => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <>
            <Modal
                show={true}
                onHide={modelHandler}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex">
                        <h5 className="title">{(keywordTranslation && keywordTranslation["delConfirmation"]) || langKey.delConfirmation}</h5>
                    </Modal.Title>
                </Modal.Header>
                {/* {children} */}
                <Modal.Body>
                    <p className='delete_text fontsize-12'>{(keywordTranslation && keywordTranslation["langDelMsg"]) || langKey.langDelMsg} <span className='lang'>"{langName}"</span>. {(keywordTranslation && keywordTranslation["areYouSureToDel"]) || langKey.areYouSureToDel}</p>
                    <p className='del-text'>
                        {(keywordTranslation && keywordTranslation["associateLangDelMsg"]) || langKey.associateLangDelMsg}</p>

                    <div className='d-flex justify-content-end'>
                        <Button label={(keywordTranslation && keywordTranslation["deleteAnyway"]) || langKey.deleteAnyway} buttonStyle="deleteanyway_btn" onClick={action} loading={loading} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteModal;