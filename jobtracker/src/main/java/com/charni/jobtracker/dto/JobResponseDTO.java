package com.charni.jobtracker.dto;
import com.charni.jobtracker.enums.ApplicationStatus;
public class JobResponseDTO {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String description;
    private long applications;
    private ApplicationStatus status;

    public JobResponseDTO(
            Long id,
            String title,
            String company,
            String location,
            String description,
            long count,
            ApplicationStatus status
    ) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.applications = applications;
        this.status = status;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }
    public long getApplications() { return applications; }
    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
}