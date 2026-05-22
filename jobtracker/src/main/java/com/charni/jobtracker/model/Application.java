package com.charni.jobtracker.model;

import jakarta.persistence.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import com.charni.jobtracker.enums.ApplicationStatus;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;

    private String username;

    private String resume;

    private java.time.LocalDate interviewDate;

    private String interviewTime;

    private String interviewMode;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
    public java.time.LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(
            java.time.LocalDate interviewDate
    ) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(
            String interviewTime
    ) {
        this.interviewTime = interviewTime;
    }

    public String getInterviewMode() {
        return interviewMode;
    }

    public void setInterviewMode(
            String interviewMode
    ) {
        this.interviewMode = interviewMode;
    }
}