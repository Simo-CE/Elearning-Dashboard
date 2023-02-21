import React from 'react';
import { profilePageAsset, qrcodeAsset, englishAsset, faranceAsset, netherlandAsset, companyLogoAsset, iconAsset, } from "../../assets/index";

const BadgeFrontSide = () => {
    return (
        <>
            <div className='col-12 pl-0'>
                <div className='d-flex align-items-center'>
                    <img src={profilePageAsset} alt="profile" width="71px" height="64px" />
                    <div>
                        <p className='profName fontsize-13'>Blaise DEFLOO</p>
                        <p className='proffunction fontsize-10'>Electrician</p>
                        <p className='border'></p>
                    </div>
                    <div className='ml-auto' style={{ marginTop: "-35px" }}>
                        <img src={companyLogoAsset} alt="" width="80px" height="24.85px" />
                    </div>
                </div>
            </div>
            <div className='col-12 mt-4 pl-0'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <img src={qrcodeAsset} alt="profile" width="71px" height="64px" className='mt-1' />
                        <div >
                            <p className='numbertxt fontsize-9'>+32 4 227 18 08 </p>
                            <p className='numbertxt fontsize-9'>info@newelec.be</p>
                            <p className='numbertxt fontsize-9'>Site: Hainaut</p>

                            <div className='langflags mt-1 d-flex'>
                                <img src={englishAsset} alt="" width="18px" height="18px" className='mr-2' />
                                <img src={faranceAsset} alt="" width="18px" height="18px" className='mr-2' />
                                <img src={netherlandAsset} alt="" width="18px" height="18px" className='mr-2' />
                            </div>
                        </div>
                    </div>

                    <div className="row mr-0" style={{ marginTop: "-25px" }}>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                        <div className="col-4 p-0">
                            <img src={iconAsset} alt="" width="28px" height="28px" className='float-right' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BadgeFrontSide;