import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';

import {Bar,Doughnut,Line} from 'react-chartjs-2';


// layout 

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';

export default function UserManagementSuperAdmin() {

  return (

    <AppLayout variant={4} title="UserManagementSuperAdmin" rootClass="layout-3">

      <section className="nk-banner nk-banner-collab">
      
        <div className="nk-banner-wrap position-relative bg-purple-100">

          <div className="nk-banner-content">
      <div className='container bg-purple-100' style={{ width: '50%', float: 'left' }}>
      <div className="border p-1 bg-gradient-18 mt-5 rounded-4">

      <div className='card' style={{ width: '100%', padding: '10px' }}>
        <Bar data={ {labels:['Janvier', 'février','mars' ,'avril'],
    datasets:[
      {
        label:"nombre d'utilisateur par mois",
        data:[150, 200 ,175 , 220],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }
         />
      </div>
   </div>
   <div className="border p-1 bg-gradient-18 mt-5 rounded-4 ">

      <div className='card ' style={{ width: '100%', padding: '10px' }}>
        <Line data={ {labels:['Janvier', 'février','mars' ,'avril','mai','juin','juillet','aout'],
    datasets:[
      {
        label:"nombre d'utilisateur par mois",
        data:[150, 200 ,175 , 220,500,130,146,210,320],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1},],}
  }   
         />
      </div>
   </div>
      </div>
      <div className='container bg-purple-100' style={{ width: '50%', float: 'left' }}>
      <div className="border p-1 bg-gradient-18 mt-5 rounded-4">

      <div className='card' style={{ width: '100%', padding: '15px' }}>
        <Doughnut data={ {labels:['company', 'challenged'],
    datasets:[
      {
        label:"company and challenged",
        data:[250, 500 ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', 
          'rgba(153, 102, 255, 0.2)',
        
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(153, 102, 255)',
       
        ],
        borderWidth: 1}, ], }
      }
         />
      </div>
      
   </div>
      </div>
      </div>
    

             
        
        
        
         </div>

       
    

       
          
      </section>
     

    </AppLayout >
  )
}

