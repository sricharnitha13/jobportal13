package com.charni.jobtracker.dto;

public class JobResponseDTO {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String description;
    private long applications;
    private boolean applied;

    public JobResponseDTO(Long id, String title, String company,
                          String location, String description,
                          long applications, boolean applied) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.applications = applications;
        this.applied = applied;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getDescription() { return description; }
    public long getApplications() { return applications; }
    public boolean isApplied() { return applied; }
}