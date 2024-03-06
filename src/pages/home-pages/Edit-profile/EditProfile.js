import React, { useState, useEffect } from 'react';
import AppLayout from '../../../layouts/AppLayout/AppLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import { Navigate, useNavigate } from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCardText,
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country: '',
    imageUser: 'images/team/team1.png',
  });
const navigate= useNavigate;
  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    const storedFirstname = localStorage.getItem('firstname');
    const storedLastname = localStorage.getItem('lastname');
    const storedPhone = localStorage.getItem('phone');
    const storedCountry = localStorage.getItem('country');

    setData({
      email: storedEmail || '',
      firstname: storedFirstname || '',
      lastname: storedLastname || '',
      phone: storedPhone || '',
      country: storedCountry || '',
      imageUser: data.imageUser,
    });
  }, []);

  const handleimageUserChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prevData) => ({
        ...prevData,
        imageUser: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateProfile = () => {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage

    axios.put('http://localhost:9091/user/profile', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        // Redirect to another route after successful update (e.g., home page)
        navigate('/home');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <AppLayout variant={4} title="Edit Profile" rootClass="layout-10">
      <section className="nk-banner nk-banner-collab">
        <div className="nk-banner-wrap position-relative bg-purple-100">
          <div className="nk-mask"></div>
          <div className="nk-banner-content">
            <MDBContainer className="py-5">
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <label htmlFor="profile-image-input">
                        <MDBCardImage
                          src={data.imageUser}
                          alt="avatar"
                          className="rounded-circle"
                          style={{ width: '300px', cursor: 'pointer' }}
                          fluid
                        />
                        <br />
                        <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                      </label>
                      <input
                        type="file"
                        id="profile-image-input"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleimageUserChange}
                      />
                      <p className="text-muted mb-1">Full Stack Developer</p>
                      <p className="text-muted mb-4">{data.country}</p>
                      <div className="d-flex justify-content-center mb-2">
                        <MDBBtn onClick={updateProfile}>Save</MDBBtn>
                        <MDBBtn outline className="ms-1">
                          Cancel
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>First Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your first name"
                            value={data.firstname}
                            onChange={(e) => setData({ ...data, firstname: e.target.value })}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Last Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your last name"
                            value={data.lastname}
                            onChange={(e) => setData({ ...data, lastname: e.target.value })}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter your phone number"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Country</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your country"
                            value={data.country}
                            onChange={(e) => setData({ ...data, country: e.target.value })}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}