import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OpportunityService from '../services/opportunity.service';
import Swal from 'sweetalert2';

const OpportunityList = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const leadId = queryParams.get('leadId');

    if (status) {
      setStatusFilter(status);
      fetchOpportunitiesByStatus(status);
    } else if (leadId) {
      fetchOpportunitiesByLeadId(leadId);
    } else {
      fetchAllOpportunities();
    }
  }, [location.search]);

  const fetchAllOpportunities = () => {
    setLoading(true);
    OpportunityService.getAllOpportunities()
      .then((response) => {
        setOpportunities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching opportunities:', error);
        setLoading(false);
      });
  };

  const fetchOpportunitiesByStatus = (status) => {
    setLoading(true);
    OpportunityService.getOpportunitiesByStatus(status)
      .then((response) => {
        setOpportunities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching opportunities by status:', error);
        setLoading(false);
      });
  };

  const fetchOpportunitiesByLeadId = (leadId) => {
    setLoading(true);
    OpportunityService.getOpportunitiesByLeadId(leadId)
      .then((response) => {
        setOpportunities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching opportunities by lead ID:', error);
        setLoading(false);
      });
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);

    if (status === '') {
      fetchAllOpportunities();
    } else {
      fetchOpportunitiesByStatus(status);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        OpportunityService.deleteOpportunity(id)
          .then(() => {
            Swal.fire('Deleted!', 'Opportunity has been deleted.', 'success');
            if (statusFilter) {
              fetchOpportunitiesByStatus(statusFilter);
            } else {
              fetchAllOpportunities();
            }
          })
          .catch((error) => {
            console.error('Error deleting opportunity:', error);
            Swal.fire('Error!', 'Failed to delete opportunity.', 'error');
          });
      }
    });
  };

  const handleCreateQuotation = (id) => {
    Swal.fire({
      title: 'Create Quotation',
      text: 'Are you sure you want to create a quotation for this opportunity?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create quotation!'
    }).then((result) => {
      if (result.isConfirmed) {
        OpportunityService.createQuotation(id)
          .then(() => {
            Swal.fire('Success!', 'Quotation created successfully.', 'success');
            if (statusFilter) {
              fetchOpportunitiesByStatus(statusFilter);
            } else {
              fetchAllOpportunities();
            }
          })
          .catch((error) => {
            console.error('Error creating quotation:', error);
            Swal.fire('Error!', 'Failed to create quotation.', 'error');
          });
      }
    });
  };

  const handleConvertOpportunity = (id) => {
    Swal.fire({
      title: 'Convert Opportunity',
      text: 'Are you sure you want to convert this opportunity?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, convert it!'
    }).then((result) => {
      if (result.isConfirmed) {
        OpportunityService.convertOpportunity(id)
          .then(() => {
            Swal.fire('Success!', 'Opportunity converted successfully.', 'success');
            if (statusFilter) {
              fetchOpportunitiesByStatus(statusFilter);
            } else {
              fetchAllOpportunities();
            }
          })
          .catch((error) => {
            console.error('Error converting opportunity:', error);
            Swal.fire('Error!', 'Failed to convert opportunity.', 'error');
          });
      }
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'status-badge status-active';
      case 'QUOTATION':
        return 'status-badge status-quotation';
      case 'CONVERTED':
        return 'status-badge status-converted';
      default:
        return 'status-badge';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="opportunity-list-container">
      <h2 className="page-header">
        {statusFilter === 'QUOTATION'
          ? 'Quotations'
          : statusFilter === 'CONVERTED'
          ? 'Converted Opportunities'
          : 'Opportunities'}
      </h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <Link to="/opportunities/add" className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i> Add New Opportunity
          </Link>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="">All Opportunities</option>
            <option value="ACTIVE">Active</option>
            <option value="QUOTATION">Quotation</option>
            <option value="CONVERTED">Converted</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : opportunities.length === 0 ? (
        <div className="alert alert-info">No opportunities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>IT Head</th>
                <th>Lead ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id}>
                  <td>{opportunity.name}</td>
                  <td>{opportunity.size}</td>
                  <td>{opportunity.itHeadName}</td>
                  <td>{opportunity.leadId}</td>
                  <td>
                    {opportunity.status === 'ACTIVE'
                      ? formatDate(opportunity.opportunityDate)
                      : opportunity.status === 'QUOTATION'
                      ? formatDate(opportunity.quotationDate)
                      : formatDate(opportunity.convertedDate)}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(opportunity.status)}>
                      {opportunity.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <Link
                      to={`/opportunities/edit/${opportunity.id}`}
                      className="btn btn-sm btn-primary me-1"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => handleDelete(opportunity.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    {opportunity.status === 'ACTIVE' && (
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => handleCreateQuotation(opportunity.id)}
                        title="Create Quotation"
                      >
                        <i className="bi bi-file-earmark-text"></i>
                      </button>
                    )}
                    {opportunity.status === 'QUOTATION' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleConvertOpportunity(opportunity.id)}
                        title="Convert Opportunity"
                      >
                        <i className="bi bi-check-circle"></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OpportunityList;