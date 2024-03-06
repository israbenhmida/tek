import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { countries } from 'countries-list'; // Import countries object directly

// layout 
import AuthLayout from '../../../layouts/AuthLayout/AuthLayout';

// components 
import { NioButton, NioToaster, NioCard, NioBrand, NioField } from '../../../components';

export default function Signup() {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };
  const [selectedCountry, setSelectedCountry] = useState('United States'); // Default to United States





  const handlePhoneNumberChange1 = (value) => {
    setPhoneNumber1(value);
  };
  const [phoneNumber1, setPhoneNumber1] = useState('');

  const handleCountryChange1 = (value) => {
    setSelectedCountry1(value);
  };
  const [selectedCountry1, setSelectedCountry1] = useState('United States'); // Default to United States




  const handleChangeCountry = (countryName) => {
    setSelectedCountry(countryName);
  };
  const allCountryNames = Object.values(countries).map(country => country.name);
  const handleCheckboxChange = () => {
    setShowAdditionalInfo(!showAdditionalInfo);
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    'mode': 'onBlur',
    defaultValues: {
      firstname: '',
      phone: '',
      email: '',
      password: '',
      field: '',
      country : '',
      address: '',
      description: '',
      role:"company",


      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      gender: '',
      country : '',
      address: '',
      status: '',
      role:"challenged",






    }
  });




  // const onSubmit = async (data) => {
    // try {
      // Création du compte pour le rôle "company"
      // const companyData = {
      //   firstname: data.firstnameCom,
      //   phone: data.phoneCom,
      //   email: data.emailCom,
      //   password: data.passwordCom,
      //   field: "data.field",
      //   city: data.citycom,
      //   address: "data.address",
      //   need: data.need,
      //   description: data.description,
      //   role: "company"
      // };
  
      // const companyResponse = await axios.post('http://localhost:9091/user', companyData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
  
      // console.log('Response from server (company):', companyResponse.data);
  
      // // Création du compte pour le rôle "challenged"
  //     const challengedData = {
  //       firstname: data.firstname,
  //       lastname: data.lastname,
  //       phone: data.phone,
  //       email: data.email,
  //       password: data.password,
  //       gender: data.gender,
  //       city: data.city,
  //       address: data.address,
  //       status: data.status,
  //       role: "challenged"
  //     };
  
  //     const challengedResponse = await axios.post('http://localhost:9091/user', challengedData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     console.log('Response from server (challenged):', challengedResponse.data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const { register, handleSubmit, reset, formState: { errors } } = useForm({
  //   'mode': 'onBlur',
  //   defaultValues: {
  //     firstname: '',
  //     lastname: '',
  //     phone: '',
  //     email: '',
  //     password: '',
  //     gender: '',
  //     city: '',
  //     address: '',
  //     status: '',
  //     role:"challenged",
  //   }
  // });

  const onSubmit = async (data) => {
   
      // Création du compte pour le rôle "company"
      const companyData = {
        firstname: data.CompanyName,
       country:data.country= selectedCountry,
       phone:data.phone=phoneNumber,
        email: data.emailCom,
        password: data.password,
        field: "data.field",
        city: data.city,
        address: "data.address",
        description: data.descriptionCom,
        role: "company"
      };
  
      const companyResponse = await axios.post('http://localhost:9091/user', companyData, {
  headers: {
    'Content-Type': 'application/json',
  },
});

if (companyResponse.status === 201) {
  // Redirection vers la page d'accueil après une inscription réussie
  navigate('/index-company-home-page'); // Utilisation de navigate pour la redirection
} else {
  console.error('Error:', companyResponse.data);
  // Affichez un message d'erreur à l'utilisateur si nécessaire
  setError('An error occurred during sign up.');
}

      console.log('Response from server (company):', companyResponse.data);
  
      // Création du compte pour le rôle "challenged"
      const challengedData = {
        firstname: data.firstname,
        lastname: data.lastname,
       
        email: data.email,
        password: data.password,
        gender: data.gender,
        country:data.country= selectedCountry1,
        phone:data.phone=phoneNumber1,
        address: data.address,
        status: data.status,
        role: "challenged"
      };
  
      const challengedResponse = await axios.post('http://localhost:9091/user', challengedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response from server (challenged):', challengedResponse.data);
    
  };
  useEffect(() => {
    if (errors.email && errors.password) {
      // show error message
      setShowError(true);

      // hide error message after 3 seconds
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [errors.email, errors.password]);
  return (
  
  <AuthLayout>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
            <NioCard.Body>
              <div className="nk-form-card-head text-center pb-5">
                <div className="form-logo mb-3">
                <NioBrand
                logo="s2"
                variant="dark"
                imageRoot="../images/"
                size="150px"
              />                </div>
                <h3 className="title mb-2">Personal Information</h3>
                <p className="text">
                  Already a member?{" "}
                  <Link to="/auth/login" className="btn-link text-indigo">
                    Login
                  </Link>
                  .
                </p>
              </div>

              
              <Row className="gy-4">
                  <Col xs={12}   md={6}>
                    <NioField label="First Name" htmlFor="firstName">
                      <NioField.Input
                        id="firstName"
                        placeholder="Enter Your First Name"
                        errors={errors.firstName}
                        {...register("firstname", {
                          required: "Field is required"
                        })}
                      />
                    </NioField>
                  </Col>
                  <Col xs={12}   md={6}  >
                    <NioField label="Last Name" htmlFor="lastname">
                      <NioField.Input
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        errors={errors.lastName}
                        {...register("lastname")}
                      />
                    </NioField>
                  </Col>
                  <Row className="gy-4">
  <Col xs={12} md={12}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '12px' }}>
        <ReactFlagsSelect
          countries={Object.keys(countries)} // Display flags for all available countries
          customLabels={allCountryNames}
          selectedSize={20}
          optionsSize={14}
          onSelect={handleChangeCountry}
          selected={selectedCountry}
        />
      </div>
      <div style={{ width: '150px' }}>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          country={selectedCountry}
          onCountryChange={handleCountryChange}
        />
      </div>
    </div>
  </Col>
</Row>
                  <Col xs={12}   md={6}>
                    <NioField label="Gender" htmlFor="gender">
                      <Form.Control
                        as="select"
                        id="gender"
                        custom
                        {...register("gender", {
                          required: "Field is required"
                        })}
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Control>
                    </NioField>
                  </Col>
                  <Col xs={12}   md={6}>
                    <NioField label="Status" htmlFor="status">
                      <Form.Control
                        as="select"
                        id="status"
                        custom
                        {...register("status", {
                          required: "Field is required"
                        })}
                      >
                          <option value="">Select your status</option>
                        <option value="Data-Sientist">Data-Sientist</option>
                        <option value="Devoloper">Devoloper</option>
                        <option value="teacher">teacher</option> 
                        <option value="suspended">Searcher</option> 
                        <option value="student">student</option>

                      </Form.Control>
                      
                    </NioField>
                  </Col>
                 
                  <Col xs={12}   md={6}>
                    <NioField label="Email" htmlFor="email">
                      <NioField.Input
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        errors={errors.email}
                        {...register("email", {
                          required: "Field is required",
                          pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email address"
                          }
                        })}
                      />
                    </NioField>
                  </Col>
                  <Col xs={12}   md={6}>
                    <NioField label="Password" htmlFor="password">
                      <NioField.Input
                        type="password"
                        id="password"
                        placeholder="Enter Your Password"
                        errors={errors.password}
                        {...register("password", {
                          required: "Field is required",
                          minLength: {
                            value: 8,
                            message: "Password should have at least 8 characters"
                          }
                        })}
                      />
                    </NioField>
                  </Col>

            </Row>









            
              <div className="pt-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showAdditionalInfo"
                    checked={showAdditionalInfo}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="showAdditionalInfo"
                  >
                    Company Information
                  </label>
                </div>
              </div>









              
            </NioCard.Body>
          </NioCard>


          
          <div >  ‎    </div>
          <div >  ‎    </div>
          <div >  ‎    </div>


          {showAdditionalInfo && (
            <NioCard className="nk-form-card card card-gutter-md nk-auth-form-card mx-md-9 mx-xl-auto">
            <NioCard.Body>
              <div className="nk-form-card-head text-center pb-5">
                <div className="form-logo mb-3">
                <NioBrand
                logo="s2"
                variant="dark"
                imageRoot="../images/"
                size="150px"
              />                </div>
                <h3 className="title mb-2">Company Information</h3>
              </div>
              
                <Row className="gy-4">
                <Col xs={12}   >
                <NioField label="CompanyName" htmlFor="CompanyName">
                  <NioField.Input
                    id="CompanyName"
                    placeholder="Enter Your First Name"
                    errors={errors.firstname}
                    {...register("CompanyName", {
                      required: "Field is required"
                    })}
                  />
                </NioField>
              </Col>

             
              <Row className="gy-4">
  <Col xs={12} md={12}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '12px' }}>
        <ReactFlagsSelect
          countries={Object.keys(countries)} // Display flags for all available countries
          customLabels={allCountryNames}
          selectedSize={20}
          optionsSize={14}
          onSelect={handleCountryChange1} // Utilisation de handleCountryChange1 au lieu de handleChangeCountry
          selected={selectedCountry1} // Utilisation de selectedCountry1 au lieu de selectedCountry
        />
      </div>
      <div style={{ width: '150px' }}>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber1} // Utilisation de phoneNumber1 au lieu de phoneNumber
          onChange={handlePhoneNumberChange1} // Utilisation de handlePhoneNumberChange1 au lieu de handlePhoneNumberChange
          country={selectedCountry1} // Utilisation de selectedCountry1 au lieu de selectedCountry
          onCountryChange={handleCountryChange1} // Utilisation de handleCountryChange1 au lieu de handleCountryChange
        />
      </div>
    </div>
  </Col>
</Row>
              
             
              <Col xs={12}   md={6}>
                <NioField label="Description" htmlFor="description">
                  <NioField.Input
                    id="description"
                    placeholder="Enter Your description"
                    errors={errors.description  }
                    {...register("description")}
                  />
                </NioField>
              </Col>

              <Col xs={12}   md={6}>
                <NioField label="Email" htmlFor="emailCom">
                  <NioField.Input
                    type="emailCom"
                    id="emailCom"
                    placeholder="Enter Your Email"
                    errors={errors.email}
                    {...register("emailCom", {
                      required: "Field is required",
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </NioField>
              </Col>
             

          
           
                  <Col xs={12}   >
                    <div className="form-group">
                      <NioButton label="Sign Up To Your Account" className="btn-block btn-indigo" type="submit" />
                    </div>
                  </Col>
                </Row>
          
              <div className="pt-4 text-center">
                <div className="small overline-title-sep">
                  <span className="bg-white px-2 text-uppercase text-base">or register with</span>
                </div>
              </div>
              <div className="pt-4">
                <NioButton href="#" img="/images/icon/a.png" label="Sign Up with Google" className="border border-lighter text-nowrap text-dark w-100 " />
              </div>
            </NioCard.Body>
          </NioCard>
          )}
        </div>
      </div>
    </Form>
  </AuthLayout>
  )
}