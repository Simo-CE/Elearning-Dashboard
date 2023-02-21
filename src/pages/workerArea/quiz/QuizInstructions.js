import React from 'react'
import "../WorkerArea.css"
import { backarrow1Asset, expectedTimeAsset } from '../../../assets'

const QuizInstructions = () => {
    return (
        <>
            <div className='mt-5' style={{ marginLeft: "10%", marginRight: "10%" }}>
                <div className="col-12 main-div">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <img src={backarrow1Asset} width="14px" height="14.7px" />
                            <p className="ml-3 working-at-height">Training: Working at height</p>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <img src={expectedTimeAsset} alt="" width="18px" height="18px" />
                            <p className='fs-12 fw-500 mb-0' style={{ color: "#6B6B6B" }}>Expected time: <span className='fs-12 fw-500' style={{ color: "#313131" }}>35 minutes</span> </p>
                        </div>
                    </div>

                    <div className='mt-5'>

                        <ul className='quizInstructionPoints'>
                            <h3 className='fs-12 fw-550' style={{ color: "#C4C4C4" }}>INSTRUCTIONS</h3>
                            <p className='fs-12 fw-500 mb-4 mt-3' style={{ color: "#606060",width:"80%" }}>
                                This test will cover the material presented in the training you are supposed to have just finished learning. Please make sure you understand most of the information included in the training.
                                To pass this test and get a better grade, please remember the following points:
                            </p>
                            <li>The expected time to complete the test is 35 minutes.</li>
                            <li>Each question has a specific time. When it ends, you will be taken to the next question automatically. You can also move to the next question if you answer the question before
                                the countdown ends by pressing the "next question" button.</li>
                            <li>If the question contains radio buttons, it means there is only one correct answer. If the question contains square buttons, it means there could be multiple correct answers.</li>
                            <li>Read the question carefully and avoid answering quickly.</li>
                            <li>You have only three attempts to pass the training. After that, you won't be able to do so without the approval of your direct manager.</li>
                            <li>If the question contains free text, it means that you won't see your score immediately until the instructor has corrected your answer.</li>
                            <li>You will be prompted to enter your PIN Code after the last question.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizInstructions