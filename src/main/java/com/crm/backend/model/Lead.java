package com.crm.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String leadId; // Auto-generated like LEAD040

    @NotBlank
    @Size(max = 100)
    private String organizationName;

    @NotBlank
    @Size(max = 100)
    private String personName;

    @NotBlank
    @Size(max = 50)
    private String designation;

    @Column(length = 100)
    private String otherDesignation;

    @NotBlank
    @Size(max = 100)
    private String location;

    @Size(max = 10)
    private String stdCode;

    @Size(max = 20)
    private String landline;

    @NotBlank
    @Size(max = 20)
    private String contactNumber;

    @NotBlank
    @Size(max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String industryType;

    @Size(max = 300)
    @Column(length = 300)
    private String remark;

    private LocalDateTime createdDate;

    @OneToMany(mappedBy = "lead", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Opportunity> opportunities = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}