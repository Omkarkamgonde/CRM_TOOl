package com.crm.backend.controller;

import com.crm.backend.dto.request.LeadRequest;
import com.crm.backend.dto.response.LeadResponse;
import com.crm.backend.dto.response.MessageResponse;
import com.crm.backend.model.Lead;
import com.crm.backend.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<LeadResponse>> getAllLeads() {
        List<LeadResponse> leads = leadService.getAllLeads();
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<LeadResponse> getLeadById(@PathVariable Long id) {
        LeadResponse lead = leadService.getLeadById(id);
        return ResponseEntity.ok(lead);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<LeadResponse> createLead(@Valid @RequestBody LeadRequest leadRequest) {
        LeadResponse createdLead = leadService.createLead(leadRequest);
        return ResponseEntity.ok(createdLead);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<LeadResponse> updateLead(@PathVariable Long id, @Valid @RequestBody LeadRequest leadRequest) {
        LeadResponse updatedLead = leadService.updateLead(id, leadRequest);
        return ResponseEntity.ok(updatedLead);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MessageResponse> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.ok(new MessageResponse("Lead deleted successfully"));
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<LeadResponse>> searchLeads(
            @RequestParam(required = false) String organizationName,
            @RequestParam(required = false) String stdCode,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String personName) {
        
        List<LeadResponse> leads;
        
        if (organizationName != null && !organizationName.isEmpty()) {
            leads = leadService.findByOrganizationName(organizationName);
        } else if (stdCode != null && !stdCode.isEmpty()) {
            leads = leadService.findByStdCode(stdCode);
        } else if (location != null && !location.isEmpty()) {
            leads = leadService.findByLocation(location);
        } else if (personName != null && !personName.isEmpty()) {
            leads = leadService.findByPersonName(personName);
        } else {
            leads = leadService.getAllLeads();
        }
        
        return ResponseEntity.ok(leads);
    }
}