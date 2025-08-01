package com.crm.backend.service;

import com.crm.backend.dto.request.OpportunityRequest;
import com.crm.backend.dto.response.OpportunityResponse;
import com.crm.backend.model.OpportunityStatus;

import java.util.List;

public interface OpportunityService {
    List<OpportunityResponse> getAllOpportunities();
    
    OpportunityResponse getOpportunityById(Long id);
    
    List<OpportunityResponse> getOpportunitiesByLeadId(Long leadId);
    
    List<OpportunityResponse> getOpportunitiesByStatus(OpportunityStatus status);
    
    OpportunityResponse createOpportunity(OpportunityRequest opportunityRequest);
    
    OpportunityResponse updateOpportunity(Long id, OpportunityRequest opportunityRequest);
    
    OpportunityResponse createQuotation(Long id);
    
    OpportunityResponse convertOpportunity(Long id);
    
    void deleteOpportunity(Long id);
}