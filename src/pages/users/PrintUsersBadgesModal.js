import Button from '../../components/Button/Button'
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModelComponent from '../../components/Model/Model';

import {
    totalUsersAsset
} from '../../assets';
import langKey from "../../localization/locale.json";

const PrintUsersBadgesModal = (props) => {
    const { keywordTranslation, language_direction } = useSelector((state) => state.localization?.selectedLanguage);
    return (
        <>
            <ModelComponent size="sm"
                show={true}
                handleClose={props.handleCloseUserBadgeModal}
                title={(keywordTranslation && keywordTranslation["printUsersBadges"]) || langKey.printUsersBadges}
                icon={totalUsersAsset}
            >
                <Modal.Body>

                    <div className='row  mr-0'>
                        <div className='col-12 pr-0'>
                            <label className='modalLabel'>{(keywordTranslation && keywordTranslation["users"]) || langKey.users}</label><br />
                            <select className='typetext mr-2 w-100'>
                                <option value=""><b>{keywordTranslation && keywordTranslation["Only active users"] || "Only active users"}</b></option>
                            </select>
                        </div>
                        <div className='col-6 pr-0 mt-2'>
                            <div className='d-flex align-items-center'>
                                <label className='modalLabel'>{keywordTranslation && keywordTranslation["FROM"] || "FROM"}</label>
                                <p className='optional ml-auto'>{keywordTranslation && keywordTranslation["optional"] || "optional"}</p>
                            </div>
                            <input type="date" className='typetext mr-2 form-control' placeholder='Select a date' />
                        </div>
                        <div className='col-6 pr-0 mt-2'>
                            <div className='d-flex align-items-center'>
                                <label className='modalLabel'>{keywordTranslation && keywordTranslation["TO"] || "TO"}</label>
                                <p className='optional ml-auto'>{keywordTranslation && keywordTranslation["optional"] || "optional"}</p>
                            </div>
                            <input type="date" className='typetext mr-2 form-control' placeholder='Select a date' />
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <div className='m-0 p-0'>
                        <Button label={(keywordTranslation && keywordTranslation["cancel"]) || langKey.cancel} buttonStyle="cancel mr-2" onClick={props.handleCloseUserBadgeModal} />
                        <Button label={(keywordTranslation && keywordTranslation["print"]) || langKey.print} buttonStyle="createbtn" />
                    </div>
                </Modal.Footer>
            </ModelComponent>
        </>
    )
}

export default PrintUsersBadgesModal