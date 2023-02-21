import React, { useState } from 'react'
import "../WorkerArea.css"
import SaveButton from '../../../components/Button/Button'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { backarrow1Asset, dragImgAsset, infoAsset, whiteForwordArrowAsset } from '../../../assets';
const DragDropSorting = () => {
    const quizPer = 62;

    return (
        <>
            <div className='mt-5' style={{ marginLeft: "10%", marginRight: "10%" }}>
                <div className="col-12 main-div mb-5">
                    <div className="row">
                        <div className="col-lg-7 col-md-6">
                            <div className="d-flex align-items-center gap-3">
                                <img src={backarrow1Asset} width="14px" height="14.7px" />
                                <p className="working-at-height">Quiz: Working at height</p>
                                <div className='d-flex align-items-center justify-content-center' style={{
                                    background: "#47CA5B", borderRadius: "5px", height: "22px"
                                }}>
                                    <p className='fs-14 fw-500 text-white p-2'>00:45</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6">
                            <div className='d-flex align-items-center gap-2 quizprogressbar'>
                                <ProgressBar now={quizPer} className='w-100' />
                                <div className='quizpercentage fs-13 fw-500' style={{ color: "#B1B1B1" }}>
                                    {`${quizPer}%`}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-9">
                            <center>
                                <h3 className='fs-15 fw-500' style={{ color: "#6B6B6B" }}>Rank the following items, first being the most important:</h3>
                                <p className='fs-11 fw-500 mt-1' style={{ color: "#FACB16" }}>QUESTION 3 OF 10</p>
                            </center>
                        </div>
                        <div className="col-lg-8 mt-5 ">
                            <div className="row justify-content-center gap-5">
                                <div className="col-lg-3 border  pb-2 rounded">
                                    <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div>
                                    <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div>
                                    <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div>
                                    <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div>
                                    <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div> <div className='d-flex align-items-center p-2 border rounded mt-2'>
                                        <p className='fs-12 fw-500' style={{ color: "#6B6B6B" }}>Simple text</p>
                                        <img src={dragImgAsset} width="8px" height="13px" alt="" className='ml-auto' />
                                    </div>
                                </div>
                                <div className="col-lg-3 border">

                                </div>

                                <div className="col-lg-12 mt-2">
                                    <div className='border-bottom d-flex justify-content-center'></div>

                                    <div className='d-flex mt-3'>
                                        <SaveButton label="Next Question" buttonStyle="addnew_btn pl-3 pr-3 ml-auto" icon={whiteForwordArrowAsset} imgStyle="nextQuestionArrow" />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className='d-flex align-items-center gap-2' style={{ marginTop: "100px" }}>
                        <img src={infoAsset} alt="" />
                        <p className='fs-11 fw-400' style={{ color: "#9C9C9C" }}>You have only 3 attempts to pass the training, so make sure you understand everything before passing the test!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DragDropSorting