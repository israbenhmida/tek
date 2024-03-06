import React from 'react';
import { Col, Row } from 'react-bootstrap';

import AppLayout from '../../layouts/AppLayout/AppLayout';
import { NioButton, NioSection } from '../../components';


function UnderConstruction() {
  return (
    <AppLayout variant={7} title="Under Construction" rootClass="layout-6">

      {/* Banner Section Start */}
      
      <NioSection py={false} className="nk-banner-wrap nk-banner-business-feature pb-lg-120" masks={["shape-36"]}>
        <NioSection.Head alignX="center">
          <span className="d-inline-block rounded-pill fs-14 text-uppercase text-bg-indigo text-white fw-bold py-1 px-3 mb-2">Under Construction</span>
          <h2 className="text-white text-capitalize"> Oops, Page under construction, coming soon. </h2>
          <p className="fs-20 text-white opacity-50 mb-0">
            Apologies, the site is under development. Take a detour to explore other sections or click back to return home. For captivating content, visit our website's main page, where a world of exciting discoveries and valuable information awaits your curiosity. Happy exploring!
          </p>
        </NioSection.Head>
        <NioSection.Content>
          <Row className="justify-content-center">
            <Col lg={6} xl={8}>
              <div className="pb-5 pb-lg-7">
                <ul className="nk-btn-group pt-4 justify-content-center pt-3 pt-md-5 pb-2">
                  <li>
                    <NioButton href="/index-collaboration-tool" className="btn-primary" label="Go Back Home" />
                  </li>
                </ul>
                <hr className="mt-md-6" />
              </div>
            </Col>
          </Row>
        </NioSection.Content>
      </NioSection>
      {/* Banner Section End */}
    </AppLayout>
  );
}

export default UnderConstruction;
