import React from 'react';
import { appLogoAsset, tbmMainImgAsset, tbmStatusLightAsset, totalDepartmetsAsset } from '../../assets';
import "./ToolBoxMeetingCards.css";

const ToolBoxMeetingCards = () => {
    return (
        <>
            <div className='cardMainDivStyling'>

                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <h6 className='deadlineText'>
                            Deadline •
                        </h6>

                        <h6 className='dateText ml-1'>
                            30/07/2021
                        </h6>
                    </div>

                    <div className='d-flex align-items-center'>
                        <h6 className='hoursAgo'>
                            3 hours ago
                        </h6>

                        <img src={tbmStatusLightAsset} alt="" height="23px" width="23px" className='ml-2' />
                    </div>
                </div>


                <h5 className='tbmTitle'>
                    Lorem ipsum dolor sit amet consectetur Lorem ipsum
                </h5>

                <div className='d-flex align-items-center justify-content-between'>
                    <h6 className='daysLeftNA'>
                        N/A
                    </h6>

                    <div className='d-flex align-items-center justify-content-between'>
                        <h6 className='tbmId mr-2'>
                            #365
                        </h6>

                        <div className='d-flex align-items-center'>
                            <img src={totalDepartmetsAsset} className="rounded-circle userImg1" alt="" height="22px" width="22px" />
                            <img src={totalDepartmetsAsset} className="rounded-circle userImg2" alt="" height="22px" width="22px" />
                            <img src={totalDepartmetsAsset} className="rounded-circle userImg3" alt="" height="22px" width="22px" />
                            <img src={totalDepartmetsAsset} className="rounded-circle userImg4" alt="" height="22px" width="22px" />
                            <span className='otherUsersCount'>
                                60+
                            </span>
                        </div>
                    </div>
                </div>

                <div className='tbmMainImg'>
                    <img src={tbmMainImgAsset} alt="" className='img-fluid' />
                </div>

                <div className='d-flex align-items-center mt-2'>
                    <img src={appLogoAsset} alt="" width="50px" height="16px" />

                    <h6 className='dateText ml-1'>
                        • Site
                    </h6>

                    <h6 className='tbmProjectName ml-1'>
                        • Project Lorem ipsum dolor
                    </h6>
                </div>

            </div>
        </>
    )
}

export default ToolBoxMeetingCards;