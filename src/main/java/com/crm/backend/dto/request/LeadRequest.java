package com.crm.backend.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class LeadRequest {
    @NotBlank
    @Size(max = 100)
    private String organizationName;

    @NotBlank
    @Size(max = 100)
    private String personName;

    @NotBlank
    @Size(max = 50)
    private String designation;

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
    private String remark;
}