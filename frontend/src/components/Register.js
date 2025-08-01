import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val) => val && val.length >= 3 && val.length <= 20
      )
      .required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val) => val && val.length >= 6 && val.length <= 40
      )
      .required('This field is required!')
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setMessage('');
    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Sign Up</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          {!successful && (
            <div>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mb-3">
                <button type="submit" className="btn btn-primary btn-block w-100">
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Register;