import React from 'react';
import { profilePageAsset, aidAsset, iconAsset, } from "../../assets/index";

const BadgeBackSide = () => {
    return (
        <>
            <div className="col-12 p-1">
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <div className=''>
                            <img src={profilePageAsset} alt="profile" width="46px" height="46px" />
                        </div>
                        <div>
                            <p className='profName fontsize-13'>Fletcher LABROSSE</p>
                            <p className='proffunction fontsize-10'>Psychologist</p>
                            <p className='border'></p>
                            <p className='numbertxt fontsize-9'>06 11 00 00 00</p>
                        </div>
                    </div>

                    <div className='d-flex align-items-center' style={{ marginTop: "-20px" }}>
                        <div>
                            <img src={aidAsset} alt="" />
                        </div>
                        <div>
                            <p className='numbertxt fontsize-9'>06 11 00 00 00</p>
                            <p className='proffunction fontsize-10'>Call for help</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
                <div className="col-2 p-0 mb-2">
                    <img src={iconAsset} alt="" width="28px" height="28px" className='' />
                </div>
            </div>
        </>
    )
}

export default BadgeBackSide;