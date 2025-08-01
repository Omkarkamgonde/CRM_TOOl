package com.crm.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "opportunities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 100)
    private String size;

    @Size(max = 100)
    private String itHeadName;

    private LocalDateTime opportunityDate;
    private LocalDateTime quotationDate;
    private LocalDateTime convertedDate;

    @Enumerated(EnumType.STRING)
    private OpportunityStatus status = OpportunityStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    private Lead lead;

    @PrePersist
    protected void onCreate() {
        opportunityDate = LocalDateTime.now();
    }
}