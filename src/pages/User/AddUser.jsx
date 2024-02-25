import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import { Form as FormikForm, Formik } from 'formik';
import Input from '@components/Input/Input';
import * as Yup from 'yup';

import './user.scss';
import axiosWrapper from '../../utils/api';
const UserDetail = () => {
    const initialValues = {
        name: '',
        email: '',
        role: '',
        phoneNo: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        city: '',
        country: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name  is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        role: Yup.string().required('Role is required'),
        phoneNo: Yup.string().required('Phone number is required').matches(/^\d+$/, 'Phone number must contain only digits'),
        addressLine1: Yup.string().required('Address Line 1 is required'),
        addressLine2: Yup.string().required('Address Line 2 is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        country: Yup.string().required('Country is required')
    });
    const roles = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
        // Add more countries with their states
    ];
    const handleAddUser = async (values, { setSubmitting }) => {
        console.log(values);
        debugger;
        // const data = {
        //     ...values,
        //     adresses: [
        //         {
        //             addressLine1: values.addressLine1,
        //             addressLine2: values.addressLine2,
        //             state: values.state,
        //             country: values.country,
        //             city: values.city
        //         }
        //     ]
        // };
        // delete data.addressLine1;
        // delete data.addressLine2;
        // delete data.city;
        // delete data.country;
        // delete data.state;
        // const response = await axiosWrapper('post', `${import.meta.env.VITE_API_URL}/user`, data);
        // console.log({ response });
    };
    return (
        <Container fluid className="add-campaign">
            <Card className="p-5">
                <h4>Add User</h4>
                <Row>
                    <Col sm={12} lg={12} md={12}>
                        <div className="add-detail">
                            <p> PLEASE ADD DETAILS</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddUser();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <Col lg={6} sm={12}>
                                        <Input name="name" placeholder=" " label="User Name" type="text" />
                                    </Col>
                                    <Col lg={6} sm={12}>
                                        <Input name="email" placeholder=" " label="User Email" type="text" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={6}>
                                        <Input name="role" placeholder=" " label="User Role" options={roles} type="select" />
                                    </Col>
                                    <Col lg={6}>
                                        <Input name="phoneNo" placeholder=" " label="Email" type="text" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Input name="addressLine1" placeholder=" " label="AddressLine1" type="text" />
                                    </Col>
                                    <Col lg={6}>
                                        <Input name="addressLine2" label="Address Line 2" type="text" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6}>
                                        <Input name="city" placeholder=" " label="City" type="text" />
                                    </Col>
                                    <Col lg={6}>
                                        <Input name="state" label="State" type="text" />
                                    </Col>
                                </Row>
                                <Col>
                                    <Input name="country" placeholder="" label="Country" type="text" />
                                </Col>
                                <Col lg={5}>
                                    <div className=" publish-btn">
                                        <button type="submit">{isSubmitting ? <Spinner animation="border" size="sm" /> : 'Add User'}</button>
                                    </div>
                                </Col>
                            </FormikForm>
                        )}
                    </Formik>
                </Row>
            </Card>
        </Container>
    );
};

export default UserDetail;
