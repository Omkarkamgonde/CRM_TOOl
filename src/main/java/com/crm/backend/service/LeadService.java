package com.crm.backend.service;

import com.crm.backend.dto.request.LeadRequest;
import com.crm.backend.dto.response.LeadResponse;

import java.util.List;

public interface LeadService {
    List<LeadResponse> getAllLeads();
    
    LeadResponse getLeadById(Long id);
    
    LeadResponse createLead(LeadRequest leadRequest);
    
    LeadResponse updateLead(Long id, LeadRequest leadRequest);
    
    void deleteLead(Long id);
    
    List<LeadResponse> findByOrganizationName(String organizationName);
    
    List<LeadResponse> findByStdCode(String stdCode);
    
    List<LeadResponse> findByLocation(String location);
    
    List<LeadResponse> findByPersonName(String personName);
}