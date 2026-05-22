package com.charni.jobtracker.dto;

import com.charni.jobtracker.enums.ApplicationStatus;

import java.time.LocalDate;

public class JobWithCountDTO {

    private Long id;

    private String title;

    private String company;

    private String location;

    private String description;

    private long applicantCount;

    private ApplicationStatus status;

    private int matchPercentage;

    private LocalDate interviewDate;

    private String interviewTime;

    private String interviewMode;

    public JobWithCountDTO(

            Long id,

            String title,

            String company,

            String location,

            String description,

            long applicantCount,

            ApplicationStatus status,

            int matchPercentage,
            LocalDate interviewDate,

            String interviewTime,

            String interviewMode

    ) {

        this.id = id;

        this.title = title;

        this.company = company;

        this.location = location;

        this.description = description;

        this.applicantCount = applicantCount;

        this.status = status;
        this.matchPercentage = matchPercentage;
        this.interviewDate = interviewDate;

        this.interviewTime = interviewTime;

        this.interviewMode = interviewMode;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCompany() {
        return company;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public long getApplicantCount() {
        return applicantCount;
    }

    public ApplicationStatus getStatus() {
        return status;
    }
    public int getMatchPercentage() {
        return matchPercentage;
    }public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public String getInterviewTime() {
        return interviewTime;
    }

    public String getInterviewMode() {
        return interviewMode;
    }


}