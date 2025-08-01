import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadService from '../services/lead.service';
import OpportunityService from '../services/opportunity.service';

const Dashboard = () => {
  const [leadCount, setLeadCount] = useState(0);
  const [opportunityCount, setOpportunityCount] = useState(0);
  const [quotationCount, setQuotationCount] = useState(0);
  const [convertedCount, setConvertedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Get all leads
      const leadsResponse = await LeadService.getAllLeads();
      setLeadCount(leadsResponse.data.length);

      // Get all opportunities
      const opportunitiesResponse = await OpportunityService.getAllOpportunities();
      setOpportunityCount(opportunitiesResponse.data.length);

      // Get opportunities by status
      const quotationResponse = await OpportunityService.getOpportunitiesByStatus('QUOTATION');
      setQuotationCount(quotationResponse.data.length);

      const convertedResponse = await OpportunityService.getOpportunitiesByStatus('CONVERTED');
      setConvertedCount(convertedResponse.data.length);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="page-header">Dashboard</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <div className="dashboard-icon text-primary">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h5 className="card-title">Leads</h5>
                <h2 className="card-text">{leadCount}</h2>
                <Link to="/leads" className="btn btn-outline-primary mt-2">
                  View Leads
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <div className="dashboard-icon text-info">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h5 className="card-title">Opportunities</h5>
                <h2 className="card-text">{opportunityCount}</h2>
                <Link to="/opportunities" className="btn btn-outline-info mt-2">
                  View Opportunities
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <div className="dashboard-icon text-warning">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <h5 className="card-title">Quotations</h5>
                <h2 className="card-text">{quotationCount}</h2>
                <Link
                  to="/opportunities?status=QUOTATION"
                  className="btn btn-outline-warning mt-2"
                >
                  View Quotations
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card dashboard-card">
              <div className="card-body text-center">
                <div className="dashboard-icon text-success">
                  <i className="bi bi-check-circle"></i>
                </div>
                <h5 className="card-title">Converted</h5>
                <h2 className="card-text">{convertedCount}</h2>
                <Link
                  to="/opportunities?status=CONVERTED"
                  className="btn btn-outline-success mt-2"
                >
                  View Converted
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Leads</h5>
            </div>
            <div className="card-body">
              <Link to="/leads/add" className="btn btn-primary mb-3">
                Add New Lead
              </Link>
              <p>View and manage your leads from the Leads section.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Opportunities</h5>
            </div>
            <div className="card-body">
              <Link to="/opportunities/add" className="btn btn-primary mb-3">
                Add New Opportunity
              </Link>
              <p>View and manage your opportunities from the Opportunities section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;