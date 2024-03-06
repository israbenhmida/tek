import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { Col, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';
import { NioBrand, NioButton, NioCard } from '../../../components';
import NioField from '../../../components/NioField/NioField';
import {  useNavigate } from 'react-router-dom'; 
import {useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();
 
  // Utilisation de la fonction useGoogleLogin
  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Retrieve user information from Google
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
  
        // Extract relevant data from the Google response
        const { email } = res.data;
  
        // Check if the user already exists in your backend
        const userExistsResponse = await axios.get(
          `http://localhost:9091/user/check-google-existence?email=${email}`
        );
  
        if (userExistsResponse.data.exists) {
          // User exists, perform login action
          navigate('/index-challenged-home-page');
        } else {
          // User doesn't exist, redirect to registration page or handle differently
          console.error('User does not exist. Redirecting to registration page.');
          navigate('/registration-page');
        }
      } catch (err) {
        console.error('Error during Google sign-in:', err);
        // Handle error
      }
    },
    onError: () => {
      console.log('Sign-in with Google Failed');
    },
  });
  


  useEffect(() => {
    const fieldErrors = Object.entries(errors).map(([field, error]) => ({
      field,
      message: error.message,
    }));
    setFormErrors(fieldErrors);
  }, [errors]);

  async function onSubmit(data) {
    try {
      const response = await axios.post('http://localhost:9091/user/login', data);
      
      // Log the entire response to check its structure
      console.log('Login Response:', response);
  
      // Attempt to get the accessToken
      const accessToken = response.data.accessToken;
  
      // Log the accessToken to check if it's undefined
      console.log('Token during login:', accessToken);
  
      // Save the token in localStorage
      if (localStorage) {
        localStorage.setItem('token', accessToken);
      } else {
        console.error('localStorage is not supported. Unable to save token.');
      }
      
  
      // Log the role received from the server
      console.log(response.data.role);
  
      // Redirect based on the role
      if (response.data.role === 'company') {
        navigate('/index-company-home-page');
      } else if (response.data.role === 'challenged') {
        navigate('/index-challenged-home-page');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Log more details about the error
      console.error('Detailed Error:', error);
    }
  }
  
  

  
  return (
    
    
    <AuthLayout title="Login" rootClass="layout-1">
      <NioCard className="nk-form-card rounded-3 card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body className="p-5">
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-3" >
              <NioBrand
                logo="s2"
                variant="dark"
                imageRoot="../images/"
                size="150px"
              />
            </div>
            <h3 className="title mb-2">Login to your account</h3>
          </div>
          <FormProvider>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="gy-4">
                <Col xs={12}>
                  <NioField htmlFor="email" label="Email">
                    <NioField.Input
                      id="email"
                      type="email"
                      htmlFor="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid Email Address"
                        }
                      })}
                    />
                  </NioField>
                </Col>
                <Col xs={12}>
                  <NioField htmlFor="password" label="Password">
                    <NioField.Input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password Is Required"
                      })}
                      icon="eye-fill after text-indigo"
                      placeholder="Enter your password"
                    />
                  </NioField>
                </Col>
                <Col xs={12}>
                  <div className="d-flex flex-wrap align-items-center  justify-content-between text-center">
                    <NioField.Check id="check1" {...register("check1")}>
                      Remember Me
                    </NioField.Check>
                    <Link to="/auth/answers" className="d-inline-block fs-16 text-indigo">Forgot Password?</Link>
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="form-group">
                    <NioButton
                      type="submit"
                      label="Login to Your Account"
                      className="btn-block btn-indigo"
                    />
                  </div>
                </Col>
              </Row>
            </form>
          </FormProvider>
          <div className="pt-4 text-center">
            <div className="small overline-title-sep">
              <span className="bg-white px-2 text-uppercase text-base">or login with</span>
            </div>
          </div>
          <div className="pt-4">
            <NioButton
              href="#"
              label="Login With Google"
              img="../images/icon/a.png"
              className="border border-lighter text-nowrap text-dark w-100"
            />
          </div>
        </NioCard.Body>
      </NioCard>
    </AuthLayout >
  )
}