import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

// layouts
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';

// components
import { NioButton, NioField, NioToaster, NioBrand, NioCard } from '../../../components';

export default function VerifPassword() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      codeForget: '',
    },
  });
  
  const onSubmit = async (data) => {
    try {
      // Send a POST request to your backend endpoint to verify the code
      const response = await axios.post('http://localhost:9091/user/reset', {
        codeForget: data.codeForget,
        email: localStorage.getItem('resetEmail') || '', // Include the email from local storage
      });
  
      // If request is successful (status code 200), navigate to reset password page
      if (response.status === 200) {
        localStorage.setItem('codeForget', data.codeForget);
        navigate('/auth/reset-password');
      } else {
        // Handle other status codes if needed
        console.error('Verification code request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Verification code request failed:', error);
      // Handle error appropriately, e.g., show error message to user
    }
  };

  return (
    <AuthLayout title="Forgot Password" rootClass="layout-1">
      {showSuccess && (
        <NioToaster variant="success" title="Success" message="Your Password sent it to your email" />
      )}

      <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
        <NioCard.Body>
          <div className="nk-form-card-head text-center pb-5">
            <div className="form-logo mb-1 pb-1">
            <NioBrand
                logo="s2"
                variant="dark"
                imageRoot="../images/"
                size="150px"
              />            </div>
            <h3 className="title mb-2">Password Forgotten?</h3>
            <p className="text">
              Shouldn't Be Here <Link to="/auth/login" className="btn-link text-indigo">Login</Link>.
            </p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
              <Col xs={12}>
                <NioField label="Verification Code" htmlFor="verificationCode">
                  <NioField.Input
                    type="text"
                    id="verificationCode"
                    placeholder="Enter verification code"
                    errors={errors.codeForget}
                    {...register('codeForget', {
                      required: 'Verification code is required',
                      minLength: {
                        value: 4,
                        message: 'Verification code must be at least 4 characters long',
                      },
                    })}
                  />
                </NioField>
              </Col>
              <Col xs={12}>
                <div className="form-group">
                  <NioButton type="submit" className="btn-indigo btn-block" label="Verify Code" />
                </div>
              </Col>
            </Row>
          </Form>
        </NioCard.Body>
      </NioCard>
    </AuthLayout>
  );
}