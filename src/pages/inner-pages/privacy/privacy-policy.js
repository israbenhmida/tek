import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// layout 
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// section content 
import { NioButton, NioSection, NioSubscribeField } from '../../../components';

function index() {
  return (
    <AppLayout variant={2} title="Terms and Conditions" rootClass="layout-1">

      {/*  Terms Section Start  */}
      <NioSection className="pt-120 pt-lg-180" masks={["blur-1 left top", "blur-1 right bottom"]}>
        <div className="nk-block-head md">
          <div className="nk-section-head pb-0">
            <nav>
              <ol className="breadcrumb mb-3 mb-md-4">
                <li className="breadcrumb-item">
                  <a href="/index-collaboration-tool">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Terms &amp; Conditions</li>
              </ol>
            </nav>
            <h2>Terms &amp; Conditions</h2>
          </div>
          <hr className="mt-5 mb-0" />
        </div>
        <NioSection.Content>
          <Row className="g-gs pt-3">
            <Col lg={3}>
              <div className="nk-entry-sidebar">
                <ul className="nk-list-link nk-list-link-page flush">
                  <li className="active">
                    <Link to="#" className="fs-16">Term &amp; Conditions</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={9}>
              <div className="nk-entry-wrap pt-3 ps-lg-5">
                <div className="nk-entry">
                  <div className="pb-5" id="terms">
                    <h5>Acceptance of Terms</h5>
                    <p className="fs-16">By using our Service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these Terms and Conditions, you must not use the Service.</p>
                  
                  </div>
                  <div className="pb-5">
                    <h5>User Eligibility</h5>
                    <p className="fs-16">You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that you have the right, authority, and capacity to enter into this Agreement.</p>
                  </div>
                  <div className="pb-5">
                    <h5>User Account</h5>
                    <p className="fs-16">To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                  
                  </div>
                  <div className="pb-5">
                    <h5>Content</h5>
                    <p className="fs-16">You are solely responsible for any data, text, graphics, photos, and other content that you upload, post. You agree not to upload or share Content that violates any applicable laws or regulations.</p>
                  </div>
                  <div className="pb-5">
                    <h5>Intellectual Property</h5>
                    <p className="fs-16">The Service and its original content, features, and functionality are owned by TektAI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                  </div>
                </div>
                {/*  .nk-entry  */}
              </div>
              {/*  .nk-entry-wrap  */}
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  Terms Section End  */}

    </AppLayout>
  )
}

export default index;