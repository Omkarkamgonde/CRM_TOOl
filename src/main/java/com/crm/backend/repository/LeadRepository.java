package com.crm.backend.repository;

import com.crm.backend.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    boolean existsByLeadId(String leadId);
    
    @Query("SELECT MAX(CAST(SUBSTRING(l.leadId, 5) AS int)) FROM Lead l")
    Integer findMaxLeadIdNumber();
    
    List<Lead> findByOrganizationNameContainingIgnoreCase(String organizationName);
    
    List<Lead> findByStdCodeContainingIgnoreCase(String stdCode);
    
    List<Lead> findByLocationContainingIgnoreCase(String location);
    
    List<Lead> findByPersonNameContainingIgnoreCase(String personName);
}