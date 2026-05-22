package com.charni.jobtracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotBlank(message = "Company cannot be empty")
    private String company;

    @NotBlank(message = "Location cannot be empty")
    private String location;

    @Size(min = 5, message = "Description must be at least 5 characters")
    private String description;
    @Transient
    private int matchScore;
    @Transient
    private long applications;
    private String skills;
    private String requiredSkills;
    @Transient
    private int matchPercentage;

    public Job() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }


    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }
    public long getApplications() {
        return applications;
    }

    public void setApplications(long applications) {
        this.applications = applications;
    }
    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }
    public int getMatchPercentage() {
        return matchPercentage;
    }
    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setMatchPercentage(
            int matchPercentage
    ) {
        this.matchPercentage =
                matchPercentage;
    }
}