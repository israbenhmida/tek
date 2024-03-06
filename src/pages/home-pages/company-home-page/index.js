import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSSubscription/TestimonialContent/TestimonialContent';

function index() {
  return (
    <AppLayout variant={15} title="CompanyHome" rootClass="layout-11">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
        <div className="nk-banner-wrap">
          <Container>
            <Row className="align-items-center justify-content-lg-between position-relative">
              <Col lg={6} >
                <div className="nk-section-head text-center text-lg-start pb-5 pb-sm-7 pb-lg-0">
                <TypeAnimation
      sequence={[
        'Welcome ',
        2000,
        ' عسلامة',
        2000
      ]}
      wrapper="h5"
      speed={30}
      style={{ fontSize: '4em', display: 'inline-block' }}
      repeat={Infinity}
    />
                  <h1 className="display-6 mb-md-5" > to Your  <span className="d-lg-block"> Company Dashboard </span></h1>
                  <p className="fs-20 opacity-75 mb-0" >
                  Ready to Drive Innovation? Start Creating Challenges Now!
                  </p>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-6">
                    <li>
                      <NioButton href="#" label="CREAT A CHALLENGE" className="btn btn-indigo text-nowrap" />
                    </li>
                    <li>
                      <NioButton href="/auth/sign-up" label="View As Challenger" className="btn btn-white text-dark text-nowrap" />
                    </li>
                  </ul>
                  <Row className="justify-content-center justify-content-lg-start pt-5 pt-lg-7">
                    <Col md={10} lg={12}>
                      <div>
                        <h5 className="mb-2 fw-medium" >Trusted by</h5>
                        <Row className="justify-content-center justify-content-lg-start gy-2 gy-md-0">
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/a-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/b-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/c-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                          <Col xs={4} sm={3} >
                            <Link to="#" className="nk-brand">
                              <img src="images/brands/d-light.png" alt="brand" className="opacity-75" />
                            </Link>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={5}>
                <div className="nk-banner-cover nk-frame nk-frame-three">
                  <img src="images/business-subscription/banner-cover-1.jpg" alt="banner-cover" className="rounded-5 overflow-hidden" />
                  <div className="nk-frame-children nk-frame-children-one">
                    <img src="images/business-subscription/mask-circle-1.png" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}
      {/* Process Section Start */}
      <NioSection className="nk-how-it-work-section  overflow-hidden">
        <Row className="justify-content-center">
          <Col lg={8} xl={7}>
            <div className="nk-section-head text-center pb-7">
              <span className="d-inline-block fs-14 fw-bold text-uppercase text-indigo mb-2">our process</span>
              <h2>Let’s See How it Works</h2>
            </div>
          </Col>
        </Row>
        <NioSection.Content>
          <Row className="flex-row-reverse align-items-center justify-content-between">
            <Col lg={5} >
              <div className="nk-video nk-video-s1 mb-5 mb-md-7 mb-lg-0 ">
                <div className="nk-mask shape-28 d-none d-md-block"></div>
                <div className="nk-video-inner">
                  <div className="nk-video-content">
                    <div className="nk-video-img">
                      <img src="images/business-digital/section-cover-1.jpg" alt="" className="rounded-2 w-100" />
                    </div>
                    <div className="nk-video-btn">
                      <NioMedia
                        size="lg"
                        rounded
                        icon="play-fill text-white"
                        lightboxSrc="https://www.youtube.com/watch?v=pVE92TNDwUk"
                        className="text-bg-danger shadow-xl animate animate-infinite animate-pulse animate-duration-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={5}>
              <ul className="nk-schedule d-flex flex-column gap-5 nk-schedule-s2">
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 1</span>
                      <div>
                        <h3 className="mb-2"> Craft Your Challenge</h3>
                        <p className="fs-16 "> Press the Button "Create Challenge" .
Fill in details about your challenge, specifying objectives, industry context, and desired outcomes. </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 2</span>
                      <div>
                        <h3 className="mb-2">Set Performance Metrics</h3>
                        <p className="fs-16 "> Define key metrics for automated performance evaluation.
Ensure clear criteria for fair and efficient assessment.Specify the reward .</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nk-schedule-item p-0">
                  <div className="nk-schedule-item-inner">
                    <div className="nk-schedule-symbol">
                      <NioMedia size="md" rounded icon="check" variant="indigo-soft" />
                    </div>
                    <div className="nk-schedule-content">
                      <span className="fs-14 fw-semibold text-uppercase  mb-3">step 3</span>
                      <div>
                        <h3 className="mb-2"> Launch Your Challenge</h3>
                        <p className="fs-16 ">  With just a click, make your challenge visible to a global pool of talented data science developers.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Process Section End */}
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
      <div className="nk-banner-cover nk-frame nk-frame-three">
      <Row className="justify-content-center">
          <Col lg={8}>
            <div className="pb-5 pb-lg-7 text-center">
            <h2> Your  <span className="text-purple-400"> Challenges</span> ,your <span className="text-purple-400">  Impact!</span></h2>
            <h4>Every challenge you create on TektAI has the potential to transform industries and push the boundaries of innovation. Join the league of companies driving change through collaborative data science. Start your journey now!</h4>
              <ul className="nk-btn-group justify-content-center pt-5">
              
              </ul>
            </div>
          </Col>
        </Row>
                  <div className="nk-frame-children nk-frame-children-one">
                  <img src="images/business-subscription/mask-circle-1.png" className="animate animate-shake animate-duration-10" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-two">
                    <img src="images/business-subscription/mask-dot-1.png" className="animate animate-shakeY animate-duration-12" alt="mask-circle" />
                  </div>
                  <div className="nk-frame-children nk-frame-children-three">
                  </div>
                </div>
        <NioSection.Content>
        </NioSection.Content>
      </NioSection>
      

     

     

    </AppLayout >
  )
}

export default index;