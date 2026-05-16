
package com.charni.jobtracker.dto;

public class JobWithCountDTO {

    private Long id;
    private String title;
    private String company;
    private String location;
    private String description;
    private long applications;

    public JobWithCountDTO(Long id, String title, String company,
                           String location, String description,
                           long applications) {
        this.id = id;
        this.title = title;
        this.company = company;
        this.location = location;
        this.description = description;
        this.applications = applications;
    }

    // getters
}