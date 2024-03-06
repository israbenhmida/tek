import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { TypeAnimation } from 'react-type-animation';
import Confetti from 'react-confetti';
// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSSubscription/TestimonialContent/TestimonialContent';
import Popup from '../../../components/Alert/Popup';
function Index() {
  
  return (
    
    <AppLayout variant={15} title="ChallengedHome" rootClass="layout-11">


    <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">

        <div className="nk-banner-wrap">
        {/* <Popup /> */}
          <Container>
          <Popup/>

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
                  <h1 className="display-6 mb-md-5" > to Your  <span className="d-lg-block"> Dashboard </span></h1>
                  <p className="fs-20 opacity-75 mb-0" >
                  Ready To Turn Challenges Into Triumphs!
                  </p>
                  <ul className="nk-btn-group justify-content-center justify-content-lg-start pt-5 pt-lg-6">
                    <li>
                      <NioButton href="#" label="VIEW CHALLENGES" className="btn btn-indigo text-nowrap" />
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
     
      <NioSection className="nk-section-testimonial py-7 py-lg-120">
      <div className="nk-banner-cover nk-frame nk-frame-three">
      <Row className="justify-content-center">
          <Col lg={10}>
            <div className="pb-5 pb-lg-7 text-center">
            <h2> Your data science   <span className="text-purple-400">skills</span>  are the  <span className="text-purple-400">key</span>   to unlocking groundbreaking solutions</h2>
            <h4>TektAI is your platform to showcase expertise, collaborate, and drive real-world impact. Every challenge is an opportunity to redefine what's possible. So, dive in, collaborate, and let's shape the future of industries together!</h4>
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

export default Index;