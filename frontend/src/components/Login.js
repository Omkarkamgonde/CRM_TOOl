import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';

const Login = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!')
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;

    setMessage('');
    setLoading(true);

    AuthService.login(username, password).then(
      (data) => {
        setCurrentUser(data);
        navigate('/dashboard');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="auth-form-container">
      <h2 className="auth-form-title">Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
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
            <button
              type="submit"
              className="btn btn-primary btn-block w-100"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default Login;