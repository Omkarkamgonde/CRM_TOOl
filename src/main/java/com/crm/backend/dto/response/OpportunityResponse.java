package com.crm.backend.dto.response;

import com.crm.backend.model.Opportunity;
import com.crm.backend.model.OpportunityStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OpportunityResponse {
    private Long id;
    private String name;
    private String size;
    private String itHeadName;
    private LocalDateTime opportunityDate;
    private LocalDateTime quotationDate;
    private LocalDateTime convertedDate;
    private OpportunityStatus status;
    private Long leadId;

    public static OpportunityResponse fromEntity(Opportunity opportunity) {
        OpportunityResponse response = new OpportunityResponse();
        response.setId(opportunity.getId());
        response.setName(opportunity.getName());
        response.setSize(opportunity.getSize());
        response.setItHeadName(opportunity.getItHeadName());
        response.setOpportunityDate(opportunity.getOpportunityDate());
        response.setQuotationDate(opportunity.getQuotationDate());
        response.setConvertedDate(opportunity.getConvertedDate());
        response.setStatus(opportunity.getStatus());
        
        if (opportunity.getLead() != null) {
            response.setLeadId(opportunity.getLead().getId());
        }
        
        return response;
    }
}