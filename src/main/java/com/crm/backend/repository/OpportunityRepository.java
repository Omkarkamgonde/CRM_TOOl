package com.crm.backend.repository;

import com.crm.backend.model.Opportunity;
import com.crm.backend.model.OpportunityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
    List<Opportunity> findByLeadId(Long leadId);
    
    List<Opportunity> findByStatus(OpportunityStatus status);
    
    List<Opportunity> findByLeadIdAndStatus(Long leadId, OpportunityStatus status);
}