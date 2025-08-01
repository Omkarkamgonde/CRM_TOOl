import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/opportunities';

class OpportunityService {
  getAllOpportunities() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getOpportunityById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  getOpportunitiesByLeadId(leadId) {
    return axios.get(`${API_URL}/lead/${leadId}`, { headers: authHeader() });
  }

  getOpportunitiesByStatus(status) {
    return axios.get(`${API_URL}/status/${status}`, { headers: authHeader() });
  }

  createOpportunity(opportunity) {
    return axios.post(API_URL, opportunity, { headers: authHeader() });
  }

  updateOpportunity(id, opportunity) {
    return axios.put(`${API_URL}/${id}`, opportunity, { headers: authHeader() });
  }

  createQuotation(id) {
    return axios.put(`${API_URL}/${id}/quotation`, {}, { headers: authHeader() });
  }

  convertOpportunity(id) {
    return axios.put(`${API_URL}/${id}/convert`, {}, { headers: authHeader() });
  }

  deleteOpportunity(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new OpportunityService();