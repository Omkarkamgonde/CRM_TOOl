import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import OpportunityService from '../services/opportunity.service';
import LeadService from '../services/lead.service';
import Swal from 'sweetalert2';

const OpportunityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    size: '',
    itHeadName: '',
    leadId: ''
  });

  const isAddMode = !id;

  useEffect(() => {
    // Fetch all leads for the dropdown
    LeadService.getAllLeads()
      .then((response) => {
        setLeads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leads:', error);
        Swal.fire('Error!', 'Failed to fetch leads.', 'error');
      });

    // If editing, fetch the opportunity details
    if (!isAddMode) {
      setLoading(true);
      OpportunityService.getOpportunityById(id)
        .then((response) => {
          const opportunity = response.data;
          setInitialValues({
            name: opportunity.name,
            size: opportunity.size,
            itHeadName: opportunity.itHeadName,
            leadId: opportunity.leadId.toString()
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching opportunity:', error);
          setLoading(false);
          Swal.fire('Error!', 'Failed to fetch opportunity details.', 'error');
          navigate('/opportunities');
        });
    }
  }, [id, isAddMode, navigate]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    size: Yup.string().required('Size is required'),
    itHeadName: Yup.string().required('IT Head Name is required'),
    leadId: Yup.string().required('Lead is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    // Convert leadId to number
    const opportunityData = {
      ...values,
      leadId: parseInt(values.leadId, 10)
    };

    if (isAddMode) {
      createOpportunity(opportunityData, setSubmitting);
    } else {
      updateOpportunity(id, opportunityData, setSubmitting);
    }
  };

  const createOpportunity = (values, setSubmitting) => {
    OpportunityService.createOpportunity(values)
      .then(() => {
        setSubmitting(false);
        Swal.fire('Success!', 'Opportunity created successfully.', 'success');
        navigate('/opportunities');
      })
      .catch((error) => {
        console.error('Error creating opportunity:', error);
        setSubmitting(false);
        Swal.fire('Error!', 'Failed to create opportunity.', 'error');
      });
  };

  const updateOpportunity = (id, values, setSubmitting) => {
    OpportunityService.updateOpportunity(id, values)
      .then(() => {
        setSubmitting(false);
        Swal.fire('Success!', 'Opportunity updated successfully.', 'success');
        navigate('/opportunities');
      })
      .catch((error) => {
        console.error('Error updating opportunity:', error);
        setSubmitting(false);
        Swal.fire('Error!', 'Failed to update opportunity.', 'error');
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
      <h2 className="page-header">
        {isAddMode ? 'Add Opportunity' : 'Edit Opportunity'}
      </h2>

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
                <label htmlFor="name" className="form-label">
                  Opportunity Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Enter opportunity name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <Field
                  name="size"
                  type="text"
                  className="form-control"
                  placeholder="Enter size"
                />
                <ErrorMessage
                  name="size"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="itHeadName" className="form-label">
                  IT Head Name
                </label>
                <Field
                  name="itHeadName"
                  type="text"
                  className="form-control"
                  placeholder="Enter IT head name"
                />
                <ErrorMessage
                  name="itHeadName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="leadId" className="form-label">
                  Lead
                </label>
                <Field as="select" name="leadId" className="form-select">
                  <option value="">Select Lead</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {lead.leadId} - {lead.organizationName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="leadId"
                  component="div"
                  className="text-danger"
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
                onClick={() => navigate('/opportunities')}
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

export default OpportunityForm;