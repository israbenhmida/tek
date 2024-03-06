import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row ,Table} from 'react-bootstrap';
import  { useState ,useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {chart as chartJS} from 'chart.js/auto';
import axios from "axios";
import { faTrash , faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Form } from 'react-bootstrap';

import {Bar,Doughnut,Line} from 'react-chartjs-2';


// layout 

// layout
import AppLayout from '../../../layouts/AppLayout/AppLayout';

// components
import { NioCount, NioMedia, NioButton, NioSection, NioCard, NioSubscribeField } from '../../../components';

// section content
import TestimonialContent from '../../../components/PageComponents/Homepages/CollaborationTool/TestimonialContent/TestimonialContent';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function UserManagementAdmin() {
  const columns = [
    {
      name: '', // Nom de la nouvelle colonne
      cell: row => (
          <div style={{ textAlign: 'center' }}>
              <FontAwesomeIcon
                  icon={faTrash}
                  /*onClick={() => deleteUser(row.id, row.firstname)}*/
                  style={{ cursor: 'pointer' }}
                  size="lg"
              />
              <FontAwesomeIcon className='mx-2'
    icon={faEdit}
   /* onClick={() => handleEdit(row.id)}*/// Assurez-vous de définir une fonction handleEdit appropriée
    style={{ cursor: 'pointer' }}
    size="lg"
  />
          </div>
      ),
      ignoreRowClick: true, // Ignorer le clic de la ligne pour éviter de déclencher la sélection de la ligne
      allowOverflow: true,
      button: true, // Afficher comme un bouton pour une meilleure accessibilité
  },


    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Id</span>, 

      selector: row => row.id,
      cell: row => <div style={{ fontSize: '16px '}}>{row.id}</div> 
     
     
    },
    {
      name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}>First Name</span>, 
      selector: row => row.firstname,
      
      cell: row => <div style={{ fontSize: '15px ' }}>{row.firstname}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Last Name</span>, 
      selector: row => row.lastName,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.lastname}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Email</span>, 
      selector: row => row.email,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.email}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Address</span>, 
      selector: row => row.address,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.address}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>City</span>, 
      selector: row => row.city,
      cell: row => <div style={{fontSize: '15px ' }}>{row.city}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Gender</span>, 
      selector: row => row.gender,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.gender}</div> 

    },
    {
      name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>phone</span>, 
      selector: row => row.status,
      cell: row => <div style={{ fontSize: '15px ' }}>{row.phone}</div> 

    }
  ];


 

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    role: '',
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9091/user/', formData);
      console.log('User added successfully:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

 

//company: 
const columnn = [
  {
    name: '', // Nom de la nouvelle colonne
    cell: row => (
        <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon
                icon={faTrash}
                /*onClick={() => deleteUser(row.id, row.firstname)}*/
                style={{ cursor: 'pointer' }}
                size="lg"
            />
            <FontAwesomeIcon className='mx-2'
  icon={faEdit}
 /* onClick={() => handleEdit(row.id)}*/// Assurez-vous de définir une fonction handleEdit appropriée
  style={{ cursor: 'pointer' }}
  size="lg"
/>
        </div>
    ),
    ignoreRowClick: true, // Ignorer le clic de la ligne pour éviter de déclencher la sélection de la ligne
    allowOverflow: true,
    button: true, // Afficher comme un bouton pour une meilleure accessibilité
},
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Id</span>, 

    selector: row => row.id,
    cell: row => <div style={{ fontSize: '16px '}}>{row.id}</div> 
   
   
  },
  {
    name: <span style={{ fontWeight: 'bold',color: 'darkblue' ,fontSize: '16px '}}> Name</span>, 
    selector: row => row.name,
    
    cell: row => <div style={{ fontSize: '15px ' }}>{row.name}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>phone</span>, 
    selector: row => row.lastName,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.phone}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Email</span>, 
    selector: row => row.email,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.email}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Address</span>, 
    selector: row => row.address,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.address}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>field</span>, 
    selector: row => row.city,
    cell: row => <div style={{fontSize: '15px ' }}>{row.field}</div> 

  },
  
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>city</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.city}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Need</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.need}</div> 

  },
  {
    name: <span style={{fontWeight: 'bold', color: 'darkblue' ,fontSize: '16px '}}>Description</span>, 
    selector: row => row.status,
    cell: row => <div style={{ fontSize: '15px ' }}>{row.description}</div> 

  }
];



  /*
  const [dataaa, setdataaa] = useState(dataa);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newDataa = data.filter(row => {
      return row.firstName.toLowerCase().includes(searchTerm);
    });
    setRecords(newDataa);
  }








  const [records, setRecords] = useState(data);

  function handleFilter(event) {
    const searchTerm = event.target.value.toLowerCase();
    const newData = data.filter(row => {
      return row.firstName.toLowerCase().includes(searchTerm);
    });
    setRecords(newData);
  }
*/
const [users, setUsers] = useState([]);


function handleFilter(event) {
  const searchTerm = event.target.value.toLowerCase();
  const newData = Challenged.filter(row => {
    return row.firstname.toLowerCase().includes(searchTerm);
  });
  setUsers(newData);
}


const [userss, setUserss] = useState([]);


function handleFilterr(event) {
  const searchTerm = event.target.value.toLowerCase();
  const newData = company.filter(row => {
    return row.name.toLowerCase().includes(searchTerm);
  });
  setUserss(newData);
}







  
const [company, setCompany] = useState([]);
const [Challenged, setChallenged] = useState([]);
const [selectedRows, setSelectedRows] = useState([]);



useEffect(() => {
  const fetchUsers = async () => {
    getALLAd();

  };
  
  fetchUsers();
}, []);
const getALLAd =() => {
  const fetchUsers = async () => {
try {
  const response = await axios.get("http://localhost:9091/user/getallsuperadmin");
  setChallenged(response.data);
} catch (error) {
  console.error("Error fetching users:", error);
}}}


 // Suppression d'un utilisateur côté client
 const deleteUser = (id, name) => {
  if (window.confirm(`Are you sure you want to delete ${name}`)) {
    fetch("http://localhost:9091/user/deleteUser", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.data);
        getALLAd();
      });
  } else {
  }
};
  













const handleCheckboxChange = (selectedId) => {
  const updatedSelection = selectedRows.includes(selectedId)
    ? selectedRows.filter((id) => id !== selectedId)
    : [...selectedRows, selectedId];

  setSelectedRows(updatedSelection);
};


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:9091/user/getallthenya");
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  fetchUsers();
}, []);


function handleFilter(event) {
  const searchTerm = event.target.value.toLowerCase();
  const newData = Challenged.filter(row => {
    return row.firstname.toLowerCase().includes(searchTerm);
  });
  setUsers(newData);
}




function handleFilterr(event) {
  const searchTerm = event.target.value.toLowerCase();
  const newData = company.filter(row => {
    return row.name.toLowerCase().includes(searchTerm);
  });
  setUserss(newData);
}

const [deletedUserId, setDeletedUserId] = useState(null);
const [userId, setUserId] = useState(null);  // Ajout de la déclaration de userId
const [ischecked, setischecked] = useState();  // Ajout de la déclaration de userId

const [showModal, setShowModal] = useState(false);

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


const handleDeleteSelected = async () => {
  try {
    await axios.delete(`http://localhost:9091/user/:id`, { data: { ids: selectedRows } });
    // Rest of the code...
  } catch (error) {
    console.log(error);
  }
};




  
  return (

    <AppLayout variant={4} title="UserManagementAdmin" rootClass="layout-3">

      <section className="nk-banner nk-banner-collab">
      
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-banner-content">
      <div className='container' style={{ width: '50%', float: 'left' }}>
    


      </div>
  
      </div>
      <div className='container ' style={{ width: '50%', float: 'right' }}>
      <div className='row'>
        
      <div className='col-12 '>

        
            <div className=' mt-5' >
       
          <div className=' mt-3 text-left'>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase  text-white fw-semibold mb-2 mx-5" style={{ background: 'hsl(120, 70%, 80%)', border: '1px solid #4CAF50' }} onClick={handleOpenModal}>Add</button>
          <input type="text  mx-1 " className='mx-8 ' onChange={handleFilter} style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>

        </div>
          <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
            
            <div className="table-responsive rounded-4 ">
              <DataTable
                columns={columns}
                data={Challenged}
                className="table table-bordered"
                fixedHeader
                pagination={paginationFactory()}

              />
            </div>
          </div>
        </div>
          </div>
          </div>
</div>

               <div className='col-6'>
            .
                 <div className=' '>
        
                    <div className='container text-left '>
                     <div className=' mt-3'>
          <button className="d-inline-block rounded-2 fs-12 py-1 px-3 text-uppercase  text-white fw-semibold mb-2 mx-5" style={{ background: 'hsl(120, 70%, 80%)', border: '1px solid #4CAF50' }} onClick={handleOpenModal}>Add</button>
           <input type="text mx-1 " className='mx-8' onChange={handleFilterr}  style={{ border: '2px solid darkblue', borderRadius: '5px', fontWeight: 'bold'  }}/>
 
         </div>
         </div>
           <div className="border p-1 bg-gradient-18 rounded-4 mt-5 ">
             
             <div className="table-responsive rounded-4 ">
               <DataTable
                 columns={columnn}
                 data={company}
                 pagination={paginationFactory()}
                 className="table table-bordered"
                 fixedHeader
               />
             </div>
               
           </div>
         </div> 
         </div>
        
        
         </div>

       
         <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Formulaire de création d'utilisateur */}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="form-control-sm"
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter first name"
                  name="lastname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                className="form-control-sm" />
              </Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>phone</Form.Label>
                <Form.Control type="text"
                  placeholder="Enter first name"
                  name="phone"
                  value={formData.firstname}
                  onChange={handleInputChange}
                className="form-control-sm" />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>email</Form.Label>
                <Form.Control type="text"
                  placeholder="Enter first name"
                  name="email"
                  value={formData.firstname}
                  onChange={handleInputChange}
                className="form-control-sm"/>
              </Form.Group>
              <Form.Group controlId="formPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Enter password" name="password" className="form-control-sm" />
</Form.Group>
              <Form.Group controlId="formFirstName">
                <Form.Label>Role</Form.Label>
                <Form.Control  type="text"
                  placeholder="Enter first name"
                  name="role"
                  value={formData.firstname}
                  onChange={handleInputChange}
                className="form-control-sm" />
              </Form.Group>
              







              {/* Ajoutez d'autres champs de formulaire selon vos besoins */}
            <div className='text-center mt-5'>
              <Button className='mx-1' variant="success" type="submit"  size="sm">
                Add
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}  size="sm">
                Cancel
              </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

       
          
      </section>
     

    </AppLayout >
  )
}