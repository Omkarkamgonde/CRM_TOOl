import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/leads';

class LeadService {
  getAllLeads() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getLeadById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  createLead(lead) {
    return axios.post(API_URL, lead, { headers: authHeader() });
  }

  updateLead(id, lead) {
    return axios.put(`${API_URL}/${id}`, lead, { headers: authHeader() });
  }

  deleteLead(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }

  searchLeads(searchTerm) {
    return axios.get(`${API_URL}/search?term=${searchTerm}`, { headers: authHeader() });
  }
}

export default new LeadService();