import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Row, Container, Spinner } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import authBg from '@images/auth-bg.jpg';
import logoImg from '@images/bitsol.png';
import Input from '@components/Input/Input';
import * as Yup from 'yup';
import { Form as FormikForm, Formik } from 'formik';
import { registerUser } from '@redux/auth/auth_actions';
import { Helmet } from 'react-helmet';
import './auth.scss';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.auth?.loading);
    const inititialValues = {
        name: '',
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Please enter a valid email').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            dispatch(registerUser(values));
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Sign Up | Template</title>
            </Helmet>
            <div className="auth-main-wrapper">
                <Container>
                    <Card className="auth-card-wrapper">
                        <Row className="justify-content-center g-0">
                            <Col xs={12} sm={4} md={6}>
                                <img className="auth-bg" src={authBg} alt="auth-background" />
                            </Col>
                            <Col xs={12} sm={8} md={6}>
                                <div className="auth-form-wrapper">
                                    <img className="auth-logo" src={logoImg} alt="auth-logo" />
                                    <h3 className="auth-form-title">Sign in to you account</h3>
                                    <Formik initialValues={inititialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                        {({ isSubmitting }) => (
                                            <FormikForm>
                                                <Input name="name" placeholder="john doe" label="Full name" type="text" />
                                                <Input name="email" placeholder="user@domain.com" label="Email" type="text" />
                                                <Input name="password" placeholder="password" label="Password" type="password" />
                                                <Button className="my-3" type="submit" disabled={loading}>
                                                    {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Register'}
                                                </Button>
                                            </FormikForm>
                                        )}
                                    </Formik>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Signup;
