import React from 'react'
import "./EmailTemplate.css"
import SaveButton from '../../components/Button/Button'
import { addiconAsset } from '../../assets'

const AddNewEmailTemplate = () => {
    return (
        <>
            <div className='sideMargin'>
                <div className='row mt-4'>
                    <div className='col-lg-6'>
                        <h4 className='email_heading'>Add new email template</h4>
                    </div>
                    <div className='col-lg-6 d-flex justify-content-end align-items-center'>
                        <div className='d-flex gap-3'>
                            <SaveButton label="Cancel" buttonStyle="cancel" />
                            <SaveButton label="Save" buttonStyle="save_btn pl-4 pr-4" />
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-2'></div>
                    <div className='col-lg-6'>
                        <div className='d-flex align-items-center' style={{ gap: "10px" }}>
                            <label className='email_labels'>Template name</label>
                            <input type="text" className='email_input' placeholder='Welcome email' />
                        </div>
                        <div className='d-flex align-items-center mt-2' style={{ gap: "10px" }}>
                            <label className='email_labels'>Email for</label>
                            <input type="text" className='email_input' placeholder='User email confirmed' />
                        </div>
                        <div className='d-flex align-items-center mt-2' style={{ gap: "10px" }}>
                            <label className='email_labels'>Subject</label>
                            <input type="text" className='email_input' placeholder='Welcome to SafetyTracker ' />
                        </div>
                        <div className='d-flex align-items-center mt-2' style={{ gap: "10px" }}>
                            <label className='email_labels'>Message body</label>
                            <div>
                                <input type="text" className='email_input' placeholder='English' style={{ width: "30%" }} />
                                <img src={addiconAsset} width="35px" height="35px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewEmailTemplate