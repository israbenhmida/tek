import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import  { useState , useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components 
import { NioButton, NioCount, NioIcon, NioMedia, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content 
import FaqContent from '../../../components/PageComponents/Homepages/BSSubscription/FaqContent/FaqContent';
import PricingContent from '../../../components/PageComponents/Homepages/BSSubscription/PricingContent/PricingContent';
import TestimonialContent from '../../../components/PageComponents/Homepages/BSSubscription/TestimonialContent/TestimonialContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const ExportButton = () => {
  const exportExcel = async () => {
    try {
      const response = await axios.get("http://localhost:9091/user/xls", {}, {
        responseType: 'blob' // Spécifiez le type de réponse comme un blob
      });
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };

  return (
    <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase btn-danger text-white fw-semibold mb-2" onClick={exportExcel}>
      <FontAwesomeIcon icon={faDownload} /> Export Excel
    </button>
  );
};


  

const SuperAdminInterface = () => {

  
const navigate = useNavigate();



  return (
    <AppLayout variant={12} title="Subscriptions" rootClass="layout-11">

      {/*  Banner Section Start   */}
      <section className="nk-banner nk-banner-bs-subscription  is-theme is-theme-bg">
        <div className="nk-banner-wrap">

          <Container>
       
          <Row className="gy-5 gy-lg-7 mt-5 ">
  <Col md={6} lg={3}>
    <button className="w-100 text-center bg-white border-0 rounded-4" onClick={() => {
      navigate("/index-user-management-admin");
    }}>
      <NioCard.Body className="p-0">
        <NioMedia />
        <div className="mb-4">
          <h4 className="text-danger">liste users</h4>
          <p className="fs-16 text-black line-clamp-2">voir la liste des users.</p>
        </div>
      </NioCard.Body>
    </button>
  </Col> 
  <Col md={6} lg={3}>
    <button className="w-100 text-center bg-white border-0 rounded-4"  onClick={() => {
      navigate("/statistiques");
    }} >
      <NioCard.Body className="p-0">
        <NioMedia  />
        <div className="mb-4 ">
          <h4 className="text-danger">Statistiques</h4>
          <p className="fs-16 text-black line-clamp-2">voir les statistiques des users</p>
          
        </div>
      </NioCard.Body>
    </button>
  </Col>
  <Col md={6} lg={3}>
    <button className="w-100 text-center bg-white border-0 rounded-4"  onClick={() => {
      navigate("/listeAdmin");
    }}  >
      <NioCard.Body className="p-0">
        <NioMedia />
        <div className="mb-4">
          <h4 className="text-danger">liste admin</h4>
          <p className="fs-16 text-black line-clamp-2"> voi la liste des admins </p>
        </div>
      </NioCard.Body>
    </button>
  </Col>   
  <Col md={6} lg={3}>
    <button className="w-100 text-center bg-white border-0 rounded-4" >
      <NioCard.Body className="p-0">
        <NioMedia />
        <div className="mb-4">
          <h4 className="text-danger">Edit</h4>
          <p className="fs-16 text-black line-clamp-2"> editer des pages </p>
        </div>
      </NioCard.Body>
    </button>
  </Col>
</Row>

<div className='text-end mt-9  '>        <ExportButton  />
</div>
          </Container>

        </div>

      </section>
    </AppLayout >
  )
}

export default  SuperAdminInterface 
  
