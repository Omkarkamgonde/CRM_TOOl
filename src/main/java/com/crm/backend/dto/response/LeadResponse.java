package com.crm.backend.dto.response;

import com.crm.backend.model.Lead;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class LeadResponse {
    private Long id;
    private String leadId;
    private String organizationName;
    private String personName;
    private String designation;
    private String otherDesignation;
    private String location;
    private String stdCode;
    private String landline;
    private String contactNumber;
    private String email;
    private String industryType;
    private String remark;
    private LocalDateTime createdDate;
    private List<OpportunityResponse> opportunities;

    public static LeadResponse fromEntity(Lead lead) {
        LeadResponse response = new LeadResponse();
        response.setId(lead.getId());
        response.setLeadId(lead.getLeadId());
        response.setOrganizationName(lead.getOrganizationName());
        response.setPersonName(lead.getPersonName());
        response.setDesignation(lead.getDesignation());
        response.setOtherDesignation(lead.getOtherDesignation());
        response.setLocation(lead.getLocation());
        response.setStdCode(lead.getStdCode());
        response.setLandline(lead.getLandline());
        response.setContactNumber(lead.getContactNumber());
        response.setEmail(lead.getEmail());
        response.setIndustryType(lead.getIndustryType());
        response.setRemark(lead.getRemark());
        response.setCreatedDate(lead.getCreatedDate());
        
        if (lead.getOpportunities() != null) {
            response.setOpportunities(lead.getOpportunities().stream()
                    .map(OpportunityResponse::fromEntity)
                    .collect(Collectors.toList()));
        }
        
        return response;
    }
}