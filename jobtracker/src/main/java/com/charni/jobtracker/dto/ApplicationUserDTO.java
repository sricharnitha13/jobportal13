package com.charni.jobtracker.dto;

public class ApplicationUserDTO {

    private String username;
    private String resume;

    public ApplicationUserDTO(
            String username,
            String resume
    ) {
        this.username = username;
        this.resume = resume;
    }

    public String getUsername() {
        return username;
    }

    public String getResume() {
        return resume;
    }
}