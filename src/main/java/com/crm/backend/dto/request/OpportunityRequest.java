package com.crm.backend.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class OpportunityRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 100)
    private String size;

    @Size(max = 100)
    private String itHeadName;

    @NotNull
    private Long leadId;
}