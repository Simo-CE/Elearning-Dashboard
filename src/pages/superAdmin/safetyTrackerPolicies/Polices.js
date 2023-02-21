import React from 'react'
import { addAsset, deleteAsset, editAsset, headphoneAsset, hideAsset, illustrationAsset, serviceAsset, tickAsset, whitetickAsset } from '../../../assets'
import Button from '../../../components/Button/Button'

const Polices = () => {
  return (
    <>
      <div className='container-fluid'>
        <div className='row' style={{ background: "#EAF4FF" }}>
          <div className='col-lg-12'>
            <div className='row ps-5 pe-5 align-items-center'>
              <div className='col-lg-7 col-md-7 pt-5 pb-5'>
                <div className='d-flex gap-2'>
                  <h2 className='font40 fontsize-40'><span style={{ color: "#E84E0E" }}>SafetyTracker</span> Policies</h2>
                  <div className='d-flex gap-2'>
                    <img src={editAsset} width="15px" height="15px" />
                    <img src={deleteAsset} width="15px" height="15px" />
                  </div>
                </div>
                <p className='para14 fontsize-14'>Last Revised On January 1, 2022</p>

                <div className='d-flex gap-1'>
                  <p className='para16 fontsize-16'>
                    Below are our policies, which cover legal information about the uses of our web platform in line with the EU General Data Protection
                    Regulation (“GDPR”), as well as the privacy policy of our respective clients. Additionally, our contact information in case you have
                    inquiries or questions about your privacy rights or about our services.
                  </p>
                  <div className='d-flex gap-2'>
                    <img src={editAsset} width="15px" height="15px" />
                    <img src={deleteAsset} width="15px" height="15px" />
                  </div>
                </div>
              </div>
              <div className='col-lg-5 col-md-5'>
                <img src={illustrationAsset} width="100%" height="265px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 mt-5'>
            <div className='row mt-5'>
              <div className='col-lg-3 col-md-3'>
                <ul className='policysidebar'>
                  <li className='nav-item'>
                    <img src={serviceAsset} width="18px" height="20px" />
                    <a href='#termOfService' className='nav-link' >Terms Of Service</a>
                  </li>
                  <li className='mt-3 nav-item'>
                    <img src={hideAsset} width="18px" height="20px" />
                    <a href='#privacyPolicy' className='nav-link'>Privacy Policy</a>
                  </li>
                  <li className='mt-3 nav-item'>
                    <img src={headphoneAsset} width="18px" height="18px" />
                    <a href='#contactInfo' className='nav-link'>Contact Information</a>
                  </li>
                </ul>
              </div>
              <div className='col-lg-9 col-md-9'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <input type="text" placeholder='Title' className='privacyInput  w-100' />
                  </div>
                  <div className='col-lg-8 d-flex justify-content-end'>
                    <div className='d-flex align-items-center gap-3'>
                      <Button label="cancel" buttonStyle="cancel" />
                      <Button icon={whitetickAsset} label="Save" buttonStyle="savebtnWhiteTick ps-3 pe-3" />
                    </div>
                  </div>

                  <div className='col-lg-12 mt-2'>
                    <div className='d-flex'>
                      <p className='englishTag ps-3 pe-3'>English</p>
                      <img src={addAsset} width="38px" height="38px" />
                    </div>
                  </div>
                </div>

                <div className='profileInfo-div pt-3 pb-3' id='termOfService'>
                  <h3 className='para13 para24 fontsize-24'>
                    Terms Of Service
                  </h3>
                  <p className='para14 mt-4' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Sub-Title</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Sub-Title</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Rules</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>


                <div className='profileInfo-div pt-3 pb-3 mt-5' id="privacyPolicy">
                  <h3 className='para13 para24 fontsize-24'>
                    Privacy Policy
                  </h3>
                  <p className='para14 mt-4' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Sub-Title</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Sub-Title</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Rules</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>


                <div className='profileInfo-div pt-3 pb-3 mt-5' id='contactInfo'>
                  <h3 className='para13 para24 fontsize-24'>
                    Contact Information
                  </h3>
                  <p className='para14 mt-4' style={{ lineHeight: "20px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <h3 className='para14 mt-4' style={{ fontSize: "16px" }}>Sub-Title</h3>
                  <p className='para14 mt-3' style={{ lineHeight: "20px" }}>
                    SafetyTracker, Inc. <br />
                    111 Street Nº. #1034 <br />
                    Brussels, Belgium 11111 <br />
                  </p>
                  <p className='para14 mt-3 mb-3' style={{ lineHeight: "20px" }}>
                    Or:
                  </p>

                  <a className='mt-4'> Info@safetytracker.be</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Polices