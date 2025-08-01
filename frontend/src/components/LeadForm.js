import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LeadService from '../services/lead.service';
import Swal from 'sweetalert2';

const LeadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    organizationName: '',
    personName: '',
    designation: '',
    location: '',
    contactNumber: '',
    email: '',
    industryType: '',
    remark: ''
  });

  const isAddMode = !id;

  useEffect(() => {
    if (!isAddMode) {
      setLoading(true);
      LeadService.getLeadById(id)
        .then((response) => {
          const lead = response.data;
          setInitialValues({
            organizationName: lead.organizationName,
            personName: lead.personName,
            designation: lead.designation,
            location: lead.location,
            contactNumber: lead.contactNumber,
            email: lead.email,
            industryType: lead.industryType,
            remark: lead.remark || ''
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching lead:', error);
          setLoading(false);
          Swal.fire('Error!', 'Failed to fetch lead details.', 'error');
          navigate('/leads');
        });
    }
  }, [id, isAddMode, navigate]);

  const validationSchema = Yup.object().shape({
    organizationName: Yup.string().required('Organization name is required'),
    personName: Yup.string().required('Person name is required'),
    designation: Yup.string().required('Designation is required'),
    location: Yup.string().required('Location is required'),
    contactNumber: Yup.string()
      .required('Contact number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    industryType: Yup.string().required('Industry type is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    if (isAddMode) {
      createLead(values, setSubmitting);
    } else {
      updateLead(id, values, setSubmitting);
    }
  };

  const createLead = (values, setSubmitting) => {
    LeadService.createLead(values)
      .then(() => {
        setSubmitting(false);
        Swal.fire('Success!', 'Lead created successfully.', 'success');
        navigate('/leads');
      })
      .catch((error) => {
        console.error('Error creating lead:', error);
        setSubmitting(false);
        Swal.fire('Error!', 'Failed to create lead.', 'error');
      });
  };

  const updateLead = (id, values, setSubmitting) => {
    LeadService.updateLead(id, values)
      .then(() => {
        setSubmitting(false);
        Swal.fire('Success!', 'Lead updated successfully.', 'success');
        navigate('/leads');
      })
      .catch((error) => {
        console.error('Error updating lead:', error);
        setSubmitting(false);
        Swal.fire('Error!', 'Failed to update lead.', 'error');
      });
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="page-header">{isAddMode ? 'Add Lead' : 'Edit Lead'}</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="organizationName" className="form-label">
                  Organization Name
                </label>
                <Field
                  name="organizationName"
                  type="text"
                  className="form-control"
                  placeholder="Enter organization name"
                />
                <ErrorMessage
                  name="organizationName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="personName" className="form-label">
                  Person Name
                </label>
                <Field
                  name="personName"
                  type="text"
                  className="form-control"
                  placeholder="Enter person name"
                />
                <ErrorMessage
                  name="personName"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <Field
                  name="designation"
                  type="text"
                  className="form-control"
                  placeholder="Enter designation"
                />
                <ErrorMessage
                  name="designation"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number
                </label>
                <Field
                  name="contactNumber"
                  type="text"
                  className="form-control"
                  placeholder="Enter contact number"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
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
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="industryType" className="form-label">
                  Industry Type
                </label>
                <Field
                  as="select"
                  name="industryType"
                  className="form-select"
                >
                  <option value="">Select Industry Type</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="industryType"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="remark" className="form-label">
                  Remark
                </label>
                <Field
                  as="textarea"
                  name="remark"
                  className="form-control"
                  placeholder="Enter remark"
                  rows="3"
                />
              </div>
            </div>

            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                {isAddMode ? 'Create' : 'Update'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/leads')}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LeadForm;