package com.crm.backend.service.impl;

import com.crm.backend.dto.request.LeadRequest;
import com.crm.backend.dto.response.LeadResponse;
import com.crm.backend.exception.ResourceNotFoundException;
import com.crm.backend.model.Lead;
import com.crm.backend.repository.LeadRepository;
import com.crm.backend.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadServiceImpl implements LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Override
    public List<LeadResponse> getAllLeads() {
        return leadRepository.findAll().stream()
                .map(LeadResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public LeadResponse getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
        return LeadResponse.fromEntity(lead);
    }

    @Override
    public LeadResponse createLead(LeadRequest leadRequest) {
        Lead lead = new Lead();
        mapRequestToEntity(leadRequest, lead);
        
        // Generate lead ID (e.g., LEAD001, LEAD002, etc.)
        Integer maxLeadIdNumber = leadRepository.findMaxLeadIdNumber();
        int nextLeadIdNumber = (maxLeadIdNumber != null) ? maxLeadIdNumber + 1 : 1;
        String leadId = String.format("LEAD%03d", nextLeadIdNumber);
        lead.setLeadId(leadId);
        
        Lead savedLead = leadRepository.save(lead);
        return LeadResponse.fromEntity(savedLead);
    }

    @Override
    public LeadResponse updateLead(Long id, LeadRequest leadRequest) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
        
        mapRequestToEntity(leadRequest, lead);
        Lead updatedLead = leadRepository.save(lead);
        return LeadResponse.fromEntity(updatedLead);
    }

    @Override
    public void deleteLead(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lead not found with id: " + id));
        leadRepository.delete(lead);
    }

    @Override
    public List<LeadResponse> findByOrganizationName(String organizationName) {
        return leadRepository.findByOrganizationNameContainingIgnoreCase(organizationName).stream()
                .map(LeadResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeadResponse> findByStdCode(String stdCode) {
        return leadRepository.findByStdCodeContainingIgnoreCase(stdCode).stream()
                .map(LeadResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeadResponse> findByLocation(String location) {
        return leadRepository.findByLocationContainingIgnoreCase(location).stream()
                .map(LeadResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<LeadResponse> findByPersonName(String personName) {
        return leadRepository.findByPersonNameContainingIgnoreCase(personName).stream()
                .map(LeadResponse::fromEntity)
                .collect(Collectors.toList());
    }
    
    private void mapRequestToEntity(LeadRequest request, Lead lead) {
        lead.setOrganizationName(request.getOrganizationName());
        lead.setPersonName(request.getPersonName());
        lead.setDesignation(request.getDesignation());
        lead.setOtherDesignation(request.getOtherDesignation());
        lead.setLocation(request.getLocation());
        lead.setStdCode(request.getStdCode());
        lead.setLandline(request.getLandline());
        lead.setContactNumber(request.getContactNumber());
        lead.setEmail(request.getEmail());
        lead.setIndustryType(request.getIndustryType());
        lead.setRemark(request.getRemark());
    }
}