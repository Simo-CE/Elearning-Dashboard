import React, { useState } from 'react'
import { backArrowAsset, backAsset, newlecLogoAsset, newleclogoAsset, settingAsset, settingGreyAsset, smallBorderAsset, smallborderAsset } from '../../../assets'
import "../SuperAdmin.css"
import Toggle from '../../../components/ToggleSlide/ToggleSlide'
import ManageWorkerBadge from './ManageWorkerBadgeModal'

const FieldManagement = () => {
    const [showManageWorker, setShowManageWorker] = useState(false);

    const manageWorkerModalHandler = () => {
        setShowManageWorker((prev) => !prev);
    };
    return (
        <>
            <div className='mb-3'>
                <div className='row mt-4'>
                    <div className='col-lg-7'>
                        <div className='d-flex gap-2'>
                            <h3 className='pageHeading fontsize-20'>
                                Fields Management
                            </h3>
                            <img src={newlecLogoAsset} width="90px" height="27px" />
                        </div>
                    </div>

                    <div className='col-lg-5'>
                        <div className='d-flex align-items-center gap-4'>
                            <div className='d-flex align-items-center gap-2 ml-auto'>
                                <p className='fs-12 fw-550 black'>Re-selling trainings option</p>
                                <Toggle />
                            </div>

                            <div className='d-flex align-items-center gap-2' onClick={() => manageWorkerModalHandler()}>
                                <p className='fs-12 fw-550 black'>Worker badge settings</p>
                                <img src={settingGreyAsset} width="14px" height="14px" />
                            </div>
                            {showManageWorker && <ManageWorkerBadge
                                manageWorkerModalHandler={manageWorkerModalHandler} />}

                            <div className='d-flex align-items-center gap-2'>
                                <img src={smallBorderAsset} width="1px" height="22px" />
                            </div>

                            <div className='d-flex align-items-center gap-2'>
                                <img src={backArrowAsset} width="10px" height="10px" />
                                <p className='fs-12 fw-550 gray' style={{ color: "#B5B5B5" }}>Back</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FieldManagement