package com.crm.backend.controller;

import com.crm.backend.dto.request.OpportunityRequest;
import com.crm.backend.dto.response.MessageResponse;
import com.crm.backend.dto.response.OpportunityResponse;
import com.crm.backend.model.OpportunityStatus;
import com.crm.backend.service.OpportunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    @Autowired
    private OpportunityService opportunityService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<OpportunityResponse>> getAllOpportunities() {
        List<OpportunityResponse> opportunities = opportunityService.getAllOpportunities();
        return ResponseEntity.ok(opportunities);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OpportunityResponse> getOpportunityById(@PathVariable Long id) {
        OpportunityResponse opportunity = opportunityService.getOpportunityById(id);
        return ResponseEntity.ok(opportunity);
    }

    @GetMapping("/lead/{leadId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<OpportunityResponse>> getOpportunitiesByLeadId(@PathVariable Long leadId) {
        List<OpportunityResponse> opportunities = opportunityService.getOpportunitiesByLeadId(leadId);
        return ResponseEntity.ok(opportunities);
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<OpportunityResponse>> getOpportunitiesByStatus(@PathVariable OpportunityStatus status) {
        List<OpportunityResponse> opportunities = opportunityService.getOpportunitiesByStatus(status);
        return ResponseEntity.ok(opportunities);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OpportunityResponse> createOpportunity(@Valid @RequestBody OpportunityRequest opportunityRequest) {
        OpportunityResponse createdOpportunity = opportunityService.createOpportunity(opportunityRequest);
        return ResponseEntity.ok(createdOpportunity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OpportunityResponse> updateOpportunity(@PathVariable Long id, @Valid @RequestBody OpportunityRequest opportunityRequest) {
        OpportunityResponse updatedOpportunity = opportunityService.updateOpportunity(id, opportunityRequest);
        return ResponseEntity.ok(updatedOpportunity);
    }

    @PutMapping("/{id}/quotation")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OpportunityResponse> createQuotation(@PathVariable Long id) {
        OpportunityResponse opportunity = opportunityService.createQuotation(id);
        return ResponseEntity.ok(opportunity);
    }

    @PutMapping("/{id}/convert")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<OpportunityResponse> convertOpportunity(@PathVariable Long id) {
        OpportunityResponse opportunity = opportunityService.convertOpportunity(id);
        return ResponseEntity.ok(opportunity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteOpportunity(@PathVariable Long id) {
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.ok(new MessageResponse("Opportunity deleted successfully"));
    }
}