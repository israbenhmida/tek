import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBCardText } from 'mdb-react-ui-kit';
import { Col, Container, Row } from 'react-bootstrap'; // Import de React Bootstrap

// Import de la deuxième template
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioSection, NioButton, NioMedia, NioCount, NioCard, NioSubscribeField, NioIcon, NioField } from '../../../components';
import FaqContent from '../../../components/PageComponents/Homepages/BSManagement/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSManagement/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSManagement/TestimonialContent/TestimonialContent';
import { Link } from 'react-router-dom';

// Fonction principale de la page
export default function profile() {
  return (
    <AppLayout variant={4} title="Profile" rootClass="layout-10">

      {/* Intégration du contenu de la deuxième template */}
   
      <section className="nk-banner nk-banner-collab">
  <div className="nk-banner-wrap position-relative bg-purple-100">
    <div className="nk-mask"></div>
    <div className="nk-banner-content">
      <Container fluid>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard style={{ backgroundColor: 'transparent' }}>
                <div className="rounded-top text-white d-flex flex-row " style={{ height: '200px' }}>
                  <div className="ms-0 mt-5 d-flex flex-column" style={{ width: '300px' }}>
                    <MDBCardImage
                      src="images/team/team1.png"
                      alt="Generic placeholder image"
                      className="img-fluid rounded-circle border border-dark border-3"
                      fluid
                      style={{ width: '300px', zIndex: '1', marginRight: '-50px' }}
                    />
                  </div>
                  <div className="ms-5" style={{ marginTop: '130px', zIndex: '2' }}>
                    <MDBTypography tag="h1">Hi, I'm Mariem</MDBTypography>
                    <MDBCardText className='text-black'>Tunisia</MDBCardText>
                    <NioButton href="/EditProfile" className="btn-indigo" label="Edit profile" />


                  </div>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Container>
    </div>
  </div>
</section>




  
      
  



      {/*  features Section Start   */}
      <NioSection className="pb-7 pb-lg-120">
        <NioSection.Content>
          <Row className="justify-content-center justify-content-xxl-start">
            <Col lg={8} xl={4}>
              <div className="nk-section-head text-center text-xxl-start pb-5 pb-md-7 pb-xxl-0">
                <span className="d-inline-block text-bg-danger text-white fs-14 rounded-pill text-uppercase fw-semibold py-1 px-3 mb-4"></span>
                <h2 className="mb-3">User state</h2>
                <p className="fs-18 mb-0"> Harness the Power of Our Feature-rich Platform to Drive Growth and Success. </p>
                <ul className="nk-btn-group justify-content-center justify-content-xxl-start pt-6">
                  <li>
                    <NioButton
                      href="/auth/sign-up"
                      label="Competition"
                      className="btn-indigo"
                    />
                  </li>
                  <li>
                    <NioButton
                      href="/contact-us-solution"
                      label="Social"
                      className="btn-outline-indigo"
                    />
                  </li>
                </ul>
              </div>
            </Col>
            <Col xl={8}>
              <Row className="gy-5 gy-xl-7">
                <Col sm={6} lg={4} xl={6}>
                  <NioCard className="bg-transparent border-0" >
                    <NioCard.Body className="p-0">
                      <NioMedia size="lg" rounded icon="layers" variant="info-soft" className="mb-4" />
                      <div className="mb-5">
                        <h4>Learn how to compete</h4>
                        <p className="fs-16 mb-0 line-clamp-2">Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in one.</p>
                      </div>
                      <Link to="#" className="btn-link">
                        <span>Learn More</span>
                        <NioIcon name="arrow-right" />
                      </Link>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col sm={6} lg={4} xl={6} >
                  <NioCard className="bg-transparent border-0" >
                    <NioCard.Body className="p-0">
                      <NioMedia size="lg" rounded icon="users" variant="warning-soft" className="mb-4" />
                      <div className="mb-5">
                        <h4>Ranking</h4>
                        <p className="fs-16 mb-0 line-clamp-2"> Not yet ranked </p>
                      </div>
                      <Link to="#" className="btn-link">
                        <span>Compete</span>
                        <NioIcon name="arrow-right" />
                      </Link>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col sm={6} lg={4} xl={6} >
                  <NioCard className="bg-transparent border-0" >
                    <NioCard.Body className="p-0">
                      <NioMedia size="lg" rounded icon="edit-alt" variant="danger-soft" className="mb-4" />
                      <div className="mb-5">
                        <h4>Competitions</h4>
                        <p className="fs-16 mb-0 line-clamp-2">A tool that lets you build a dream website even if you know nothing about web design.</p>
                      </div>
                      <Link to="#" className="btn-link">
                        <span>Learn More</span>
                        <NioIcon name="arrow-right" />
                      </Link>
                    </NioCard.Body>
                  </NioCard>
                </Col>
                <Col sm={6} lg={4} xl={6} >
                  <NioCard className="bg-transparent border-0" >
                    <NioCard.Body className="p-0">
                      <NioMedia size="lg" rounded icon="emails" variant="success-soft" className="mb-4" />
                      <div className="mb-5">
                        <h4>Discussions</h4>
                        <p className="fs-16 mb-0 line-clamp-2"> Stay connected with your team and make quick decisions wherever you are. </p>
                      </div>
                      <Link to="#" className="btn-link">
                        <span>Learn More</span>
                        <NioIcon name="arrow-right" />
                      </Link>
                    </NioCard.Body>
                  </NioCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/*  features Section End   */}
     
    </AppLayout>
  )
}

