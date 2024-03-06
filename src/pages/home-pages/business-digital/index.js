import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// layouts
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { NioCard } from '../../../components';

// component 


// section content 

function index() {

  return (
    <AppLayout title="Digital Business" variant={9} rootClass="layout-8" >

      <Container  >

      {/*  Banner Section Start  */}
      <section className="nk-banner nk-banner-dg-business ">
        <div className="nk-banner-wrap pb-0 ">
          <Container>
            <div className="nk-banner-content is-theme px-5 px-md-7 px-lg-0 bg-gradient-16 py-7 py-md-120 position-relative  rounded-3 ">
              <div className="nk-mask"  ></div>
              <Row className="align-items-center justify-content-center pb-xl-3">
                <Col lg={8} xl={6}>
                <div className="nk-frame nk-frame-top" style={{ display: "flex", justifyContent: "center" ,alignItems: "center" }} >
                    <img src="images/avatar/5.png" alt="banner-cover" style={{ borderRadius: "10%", width: "500px", height: "170px"  , position: "absolute" , top:"-190px"}}  />

                  </div>
                  <div className="text-center">
                    <div className="nk-section-head text-center">
                    <span className="d-inline-block rounded-pill fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >email</span>

                      <span className="d-inline-block rounded-pill fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >field</span>
                      <span className="d-inline-block rounded-pill fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2" >address</span>

                      <h1 className="text-capitalize mb-2" >Company Profile</h1>
                      <p className="fs-18 opacity-75" >
                      Ecole Sup Privée d'Ingénierie et de Technologies</p>
                                        <p>need</p>
                
    
                    </div>
                   
      
   
            
             
             
                    
                    <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold mb-2  " >Modifier</button>
</div>
                    
                  </div>
               
                </Col>
         
              </Row>
          
            </div>
            <div>
     
    </div>
          </Container>
        </div>
      </section>
      {/*  Banner Section End   */}

      {/*  Brands Section Start  */}
      <Container>
      <Row className="gy-5 mt-5 rounded-4" >
            <Col md={6} lg={4}   >
              <NioCard className="rounded-2 bg-gradient-16">
                <NioCard.Body>
                  <div className="mb-4"style={{ color: '#fff' }}>
                    <h4 className="mb-2"style={{ color:'lightgreen' }}>challenge 1</h4>
                    <p className="fs-16  line-clamp-3"> Yes, we prioritize the security of your credit card information with advanced encryption technology and strict data protection measures. Your sensitive data is kept secure and confidential throughout the entire transaction process, giving you peace of mind when making payments with us. </p>
                    <div className='text-center' >
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white  fw-semibold my-2  "  style={{ backgroundColor: 'grey' }}>Voir le Résultat</button>
</div>
                  </div>
                 

                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="rounded-2 bg-gradient-16" >
                <NioCard.Body>
                  <div className="mb-4"style={{ color: '#fff' }}>
                    <h4 className="mb-2"style={{ color:'lightgreen' }}>challenge 2</h4>
                    <p className="fs-16  line-clamp-3"> We accept various payment methods, including major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and bank transfers. We strive to offer convenient and secure payment options to ensure a seamless checkout experience for our customers. </p>
                    <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white text-green fw-semibold my-2  " >Voir le Résultat</button>
</div>
                  </div>
                 
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="rounded-2 bg-gradient-16" >
                <NioCard.Body>
                  <div className="mb-4"style={{ color: '#fff' }}>
                    <h4 className="mb-2"style={{ color:'lightgreen' }}>challenge 3</h4>
                    <p className="fs-16  line-clamp-3"> The shipping time for your order may vary depending on several factors such as the shipping method selected, your location, and the availability of the product. Generally, we aim to process and ship orders within 1-3 business days. You will receive a shipping confirmation email with tracking details once your order is on its way. </p>
                    <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white text-green fw-semibold my-2  " >Voir le Résultat</button>
</div>
                  </div>
                 
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="rounded-2 bg-gradient-16">
                <NioCard.Body>
                  <div className="mb-4"style={{ color: '#fff' }}>
                    <h4 className="mb-2" style={{ color:'lightgreen' }}>challenge 4</h4>
                    <p className="fs-16  line-clamp-3"> Yes, we offer discounts and promotions from time to time, including special offers for those in need. Please check our website or contact our customer support for more information on current discounts and eligibility criteria. We strive to make our products accessible to as many people as possible. </p>
                    <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white text-green fw-semibold my-2  " >Voir le Résultat</button>
</div>
                  </div>
                 
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="rounded-2 bg-gradient-16" >
                <NioCard.Body>
                  <div className="mb-4"style={{ color: '#fff' }}>
                    <h4 className="mb-2"style={{ color:'lightgreen' }}>challenge 5</h4>
                    
                  <p className="fs-16  line-clamp-3"> Yes, we provide a convenient feature that allows you to download your bill receipt. Simply log in to your account, navigate to the billing section, and select the option to download your receipt. You can save it for your records or print it if needed. This feature ensures easy access to your bill receipts whenever required. </p>
                  <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white text-green fw-semibold my-2  " >Voir le Résultat</button>
</div>
                  </div>
                 
                </NioCard.Body>
              </NioCard>
            </Col>
            <Col md={6} lg={4} >
              <NioCard className="rounded-2 bg-gradient-16" >
                <NioCard.Body>
               
                  <div className="mb-4  " style={{ color: '#fff' }}>
                    <h4 className="mb-2  " style={{ color:'lightgreen' }}>challenge 6</h4>
                    <p className="fs-16  line-clamp-3"> To reset your account and recover your wallet, simply follow the "Forgot Password" process on our platform. You'll receive instructions via email to set a new password and regain access to your wallet. If you need additional support, our customer service team is here to help. </p>
                    <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success bg-white text-green fw-semibold my-2  " >Voir le Résultat</button>
</div>
                  </div>
                 
                </NioCard.Body>
              </NioCard>
            </Col>
          </Row>
          </Container>

          <div className='text-center'>
              <button className="d-inline-block rounded-4 fs-12 py-1 px-3 text-uppercase text-bg-success text-white fw-semibold my-5  " >Ajouter un challenge</button>
</div>
</Container>
    </AppLayout >
  )
}

export default index;