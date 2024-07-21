import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { AuthContext } from '../context/AuthContext';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';
import "./Form.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            password: Yup.string().min(5, 'Password must be at least 5 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await login(values.username, values.password);
                navigate('/');
            } catch (error) {
                formik.setFieldError('general', 'Invalid credentials');
            }
        },
    });

    return (
        <Container className="mt-5">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        isInvalid={formik.touched.username && !!formik.errors.username}
                        autoComplete="username"
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                        autoComplete="current-password"
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                
                {formik.errors.general && (
                    <div className="text-danger mb-3">{formik.errors.general}</div>
                )}
                <div className='form-button'>
                    <Button type="submit" disabled={formik.isSubmitting}>
                        Log In
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default LoginForm;
