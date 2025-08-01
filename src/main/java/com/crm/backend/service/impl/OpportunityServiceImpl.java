package com.crm.backend.service.impl;

import com.crm.backend.dto.request.OpportunityRequest;
import com.crm.backend.dto.response.OpportunityResponse;
import com.crm.backend.exception.ResourceNotFoundException;
import com.crm.backend.model.Lead;
import com.crm.backend.model.Opportunity;
import com.crm.backend.model.OpportunityStatus;
import com.crm.backend.repository.LeadRepository;
import com.crm.backend.repository.OpportunityRepository;
import com.crm.backend.service.OpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpportunityServiceImpl implements OpportunityService {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Override
    public List<OpportunityResponse> getAllOpportunities() {
        return opportunityRepository.findAll().stream()
                .map(OpportunityResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public OpportunityResponse getOpportunityById(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        return OpportunityResponse.fromEntity(opportunity);
    }

    @Override
    public List<OpportunityResponse> getOpportunitiesByLeadId(Long leadId) {
        return opportunityRepository.findByLeadId(leadId).stream()
                .map(OpportunityResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<OpportunityResponse> getOpportunitiesByStatus(OpportunityStatus status) {
        return opportunityRepository.findByStatus(status).stream()
                .map(OpportunityResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public OpportunityResponse createOpportunity(OpportunityRequest opportunityRequest) {
        Lead lead = leadRepository.findById(opportunityRequest.getLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + opportunityRequest.getLeadId()));
        
        Opportunity opportunity = new Opportunity();
        opportunity.setName(opportunityRequest.getName());
        opportunity.setSize(opportunityRequest.getSize());
        opportunity.setItHeadName(opportunityRequest.getItHeadName());
        opportunity.setLead(lead);
        opportunity.setStatus(OpportunityStatus.ACTIVE);
        
        Opportunity savedOpportunity = opportunityRepository.save(opportunity);
        return OpportunityResponse.fromEntity(savedOpportunity);
    }

    @Override
    public OpportunityResponse updateOpportunity(Long id, OpportunityRequest opportunityRequest) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        
        Lead lead = leadRepository.findById(opportunityRequest.getLeadId())
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + opportunityRequest.getLeadId()));
        
        opportunity.setName(opportunityRequest.getName());
        opportunity.setSize(opportunityRequest.getSize());
        opportunity.setItHeadName(opportunityRequest.getItHeadName());
        opportunity.setLead(lead);
        
        Opportunity updatedOpportunity = opportunityRepository.save(opportunity);
        return OpportunityResponse.fromEntity(updatedOpportunity);
    }

    @Override
    public OpportunityResponse createQuotation(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        
        opportunity.setQuotationDate(LocalDateTime.now());
        opportunity.setStatus(OpportunityStatus.QUOTATION);
        
        Opportunity updatedOpportunity = opportunityRepository.save(opportunity);
        return OpportunityResponse.fromEntity(updatedOpportunity);
    }

    @Override
    public OpportunityResponse convertOpportunity(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        
        opportunity.setConvertedDate(LocalDateTime.now());
        opportunity.setStatus(OpportunityStatus.CONVERTED);
        
        Opportunity updatedOpportunity = opportunityRepository.save(opportunity);
        return OpportunityResponse.fromEntity(updatedOpportunity);
    }

    @Override
    public void deleteOpportunity(Long id) {
        Opportunity opportunity = opportunityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Opportunity not found with id: " + id));
        opportunityRepository.delete(opportunity);
    }
}