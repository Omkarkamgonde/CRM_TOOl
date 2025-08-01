import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadService from '../services/lead.service';
import Swal from 'sweetalert2';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = () => {
    setLoading(true);
    LeadService.getAllLeads()
      .then((response) => {
        setLeads(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching leads:', error);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      fetchLeads();
      return;
    }

    setLoading(true);
    LeadService.searchLeads(searchTerm)
      .then((response) => {
        setLeads(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error searching leads:', error);
        setLoading(false);
      });
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
        LeadService.deleteLead(id)
          .then(() => {
            Swal.fire('Deleted!', 'Lead has been deleted.', 'success');
            fetchLeads();
          })
          .catch((error) => {
            console.error('Error deleting lead:', error);
            Swal.fire('Error!', 'Failed to delete lead.', 'error');
          });
      }
    });
  };

  return (
    <div className="lead-list-container">
      <h2 className="page-header">Leads</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <Link to="/leads/add" className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i> Add New Lead
          </Link>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : leads.length === 0 ? (
        <div className="alert alert-info">No leads found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Lead ID</th>
                <th>Organization</th>
                <th>Person Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Industry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.leadId}</td>
                  <td>{lead.organizationName}</td>
                  <td>{lead.personName}</td>
                  <td>{lead.location}</td>
                  <td>{lead.contactNumber}</td>
                  <td>{lead.industryType}</td>
                  <td className="action-buttons">
                    <Link
                      to={`/leads/edit/${lead.id}`}
                      className="btn btn-sm btn-primary me-1"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <Link
                      to={`/opportunities?leadId=${lead.id}`}
                      className="btn btn-sm btn-info"
                    >
                      <i className="bi bi-graph-up"></i>
                    </Link>
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

export default LeadList;