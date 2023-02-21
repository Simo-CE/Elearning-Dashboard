import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { aidAsset, allAsset, bluestatusAsset, cartIconAsset, certipinkstatusAsset, certiyellowstatusAsset, discountFrameAsset, envoirmentAsset, healthAsset, img1Asset, img2Asset, maintenanceAsset, quality1Asset, qualityAsset, security1Asset, securityAsset, statusGreenAsset } from '../../assets'
import Button from '../../components/Button/Button'
import paths from '../../routes/paths'
import "./WorkerArea.css"
const MyTranings = () => {
  return (
    <>
      <div className='sideMargin'>
        <div className="row mt-4">
          <div className="col-lg-12 p-0">
            <div className='d-flex gap-2 align-items-end'>
              <p className='pageHeading'>Categories</p> 

              <div className='d-flex gap-2 overflow'>
                <div className='allCategory'>
                  <img src={allAsset} width="18px" height="18px" alt="" />
                  <p>All</p>
                </div>
                <div className='allCategory'>
                  <img src={security1Asset} width="17px" height="21px" alt="" />
                  <p>Security</p>
                </div>
                
                
                <div className='allCategory'>
                  <img src={maintenanceAsset} width="17px" height="17px" alt="" />
                  <p>Maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-lg-12 p-0">
            <div className='d-flex align-items-center justify-content-between'>
              <h3 className='pageHeading'>My Trainings <span style={{ color: "#2C8EFF" }}>“All Categories”</span></h3>

              <div>
                <ul className="nav  traningstabs">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">All</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">New</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Certified</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="#">Expired</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="#">Nearly expired</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <div className="col-lg-12 mt-3">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <Card className='p-0'>
                  <Card.Body className='p-2'>
                    <img src={img1Asset} width="100%" height="150px" alt="" className='cover rounded' />
                    <div className='d-flex mt-3 align-items-center'>
                      <Card.Subtitle className=" fs-10 fw-600" style={{ color: "#D9D9D9" }}>SECURITY</Card.Subtitle>
                      <img src={statusGreenAsset} width="20px" height="20px" alt="" className='ms-auto' />
                    </div>
                    <Card.Title className='para14' style={{ color: "#6B6B6B" }} >Working at height</Card.Title>
                    <p className='blueborder'></p>
                    <Card.Text className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna...
                    </Card.Text>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                      <p className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>Purchased on <br />
                        20/02/2022</p>
                      <NavLink to={paths.safetyCertificate} >
                        <Button label="Get certificate" buttonStyle="download-btn ps-3 pe-3" />
                      </NavLink>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-3 col-md-4">
                <Card className='p-0'>
                  <Card.Body className='p-2'>
                    <div className='discountframe'>
                      <img src={discountFrameAsset} width="38px" height="28px" alt="" />
                      <p className='fs-12 fw-400 text-white discount-text'>- 40%</p>
                    </div>
                    <img src={img2Asset} width="100%" height="150px" alt="" className='cover rounded' />
                    <div className='d-flex mt-3 align-items-center'>
                      <Card.Subtitle className=" fs-10 fw-600" style={{ color: "#D9D9D9" }}>SECURITY</Card.Subtitle>
                      <img src={bluestatusAsset} width="20px" height="20px" alt="" className='ms-auto' />
                    </div>
                    <Card.Title className='para14' style={{ color: "#6B6B6B" }} >Working at height</Card.Title>
                    <p className='blueborder'></p>
                    <Card.Text className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna...
                    </Card.Text>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                      <p className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>€ 29.99 <br />
                        <span style={{ color: "#ED4C5C" }}>€ 19.99</span></p>
                      <Button label=" ADD TO CART" buttonStyle="addtocart-btn ps-3 pe-3"
                        iconPrev={cartIconAsset}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-3 col-md-4">
                <Card className='p-0'>
                  <Card.Body className='p-2'>
                    <img src={img1Asset} width="100%" height="150px" alt="" className='cover rounded' />
                    <div className='d-flex mt-3 align-items-center'>
                      <Card.Subtitle className=" fs-10 fw-600" style={{ color: "#D9D9D9" }}>SECURITY</Card.Subtitle>
                      <img src={certiyellowstatusAsset} width="20px" height="20px" alt="" className='ms-auto' />
                    </div>
                    <Card.Title className='para14' style={{ color: "#6B6B6B" }} >Working at height</Card.Title>
                    <p className='blueborder'></p>
                    <Card.Text className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna...
                    </Card.Text>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                      <p className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>Purchased on <br />
                        20/02/2022</p>
                      <Button label="Get certificate" buttonStyle="download-btn ps-3 pe-3" />
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-lg-3 col-md-4">
                <Card className='p-0'>
                  <Card.Body className='p-2'>
                    <div className='discountframe'>
                      <img src={discountFrameAsset} width="38px" height="28px" alt="" />
                      <p className='fs-12 fw-400 text-white discount-text'>- 98%</p>
                    </div>
                    <img src={img2Asset} width="100%" height="150px" alt="" className='cover rounded' />
                    <div className='d-flex mt-3 align-items-center'>
                      <Card.Subtitle className=" fs-10 fw-600" style={{ color: "#D9D9D9" }}>SECURITY</Card.Subtitle>
                      <img src={certipinkstatusAsset} width="20px" height="20px" alt="" className='ms-auto' />
                    </div>
                    <Card.Title className='para14' style={{ color: "#6B6B6B" }} >Working at height</Card.Title>
                    <p className='blueborder'></p>
                    <Card.Text className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>
                      Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna...
                    </Card.Text>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                      <p className='fs-12 fw-400' style={{ color: "#A0A0A0" }}>€ 29.99 <br />
                        <span style={{ color: "#ED4C5C" }}>€ 19.99</span></p>
                      <Button label=" Renew your certification" buttonStyle="renew-btn" />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyTranings