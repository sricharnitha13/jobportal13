package com.charni.jobtracker.controller;

import com.charni.jobtracker.dto.ApiResponse;
import com.charni.jobtracker.dto.JobDTO;
import com.charni.jobtracker.dto.JobResponseDTO;
import com.charni.jobtracker.model.Job;
import com.charni.jobtracker.repository.ApplicationRepository;
import com.charni.jobtracker.repository.JobRepository;
import com.charni.jobtracker.service.JobService;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.List;
import com.charni.jobtracker.repository.UserProfileRepository;
import com.charni.jobtracker.model.UserProfile;
@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    private final JobService jobService;
    private final ApplicationRepository applicationRepository;
    private final UserProfileRepository userProfileRepository;

    private final JobRepository jobRepository;
    // ✅ CONSTRUCTOR
    public JobController(
            JobService jobService,
            ApplicationRepository applicationRepository,
            UserProfileRepository userProfileRepository, JobRepository jobRepository
    ) {

        this.jobService = jobService;
        this.applicationRepository = applicationRepository;
        this.userProfileRepository = userProfileRepository;
        this.jobRepository = jobRepository;
    }
    @GetMapping("/recommended")
    public List<Job> getRecommendedJobs(
            Authentication auth
    ) {

        if (auth == null) {
            return jobService.getAllJobs();
        }

        String username = auth.getName();

        UserProfile profile =
                userProfileRepository
                        .findByUsername(username)
                        .orElse(null);

        List<Job> jobs = jobService.getAllJobs();

        if (profile == null) {
            return jobs;
        }

        String skills =
                profile.getSkills() == null
                        ? ""
                        : profile.getSkills().toLowerCase();

        String preferredRole =
                profile.getPreferredRole() == null
                        ? ""
                        : profile.getPreferredRole().toLowerCase();

        return jobs.stream()

                .map(job -> {

                    int score = 0;

                    String title =
                            job.getTitle().toLowerCase();

                    String desc =
                            job.getDescription().toLowerCase();

                    if (
                            title.contains(preferredRole)
                    ) {
                        score += 50;
                    }

                    if (
                            skills.contains("react")
                                    &&
                                    desc.contains("react")
                    ) {
                        score += 20;
                    }

                    if (
                            skills.contains("java")
                                    &&
                                    desc.contains("java")
                    ) {
                        score += 20;
                    }

                    if (
                            skills.contains("spring")
                                    &&
                                    desc.contains("spring")
                    ) {
                        score += 20;
                    }

                    if (score > 100) {
                        score = 100;
                    }

                    job.setMatchScore(score);

                    return job;
                })

                .sorted((a, b) ->
                        b.getMatchScore()
                                - a.getMatchScore()
                )

                .toList();
    }


    @PostMapping
    public ApiResponse<Job> createJob(@RequestBody JobDTO jobDTO) {

        Job job = jobService.saveJob(jobDTO);

        return new ApiResponse<>(
                "Job created successfully",
                job
        );
    }

    // 🔥 UPDATE JOB
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job job) {

        return jobService.updateJob(id, job);
    }

    // 🔥 GET ALL JOBS WITH APPLY STATUS + COUNT
    @GetMapping
    public List<JobResponseDTO> getAllJobs(
            Authentication auth
    ) {

        final String username;
        if (auth != null) {
            username = auth.getName();
        } else {
            username = "";
        }

        List<Job> jobs = jobService.getAllJobs();

        return jobs.stream().map(job -> {

            long count =
                    applicationRepository
                            .countByJobId(job.getId());

            boolean applied = false;

            if (!username.isEmpty()) {

                applied =
                        applicationRepository
                                .findByUsernameAndJobId(
                                        username,
                                        job.getId()
                                )
                                .isPresent();
            }

            return new JobResponseDTO(
                    job.getId(),
                    job.getTitle(),
                    job.getCompany(),
                    job.getLocation(),
                    job.getDescription(),
                    count,
                    applied
            );

        }).collect(java.util.stream.Collectors.toList());
    }
    // 🔥 DELETE JOB
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return "Job deleted successfully";
    }
    @GetMapping("/{id}")

    public Job getJobById(

            @PathVariable Long id

    ) {

        return jobRepository

                .findById(id)

                .orElseThrow();
    }
}