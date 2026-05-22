package com.charni.jobtracker.controller;

import com.charni.jobtracker.dto.ApiResponse;
import com.charni.jobtracker.dto.JobDTO;
import com.charni.jobtracker.dto.JobResponseDTO;
import com.charni.jobtracker.dto.JobWithCountDTO;
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
import com.charni.jobtracker.enums.ApplicationStatus;

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

        String username =
                auth.getName();

        UserProfile profile =

                userProfileRepository
                        .findByUsername(username)
                        .orElse(null);

        List<Job> jobs =
                jobService.getAllJobs();

        // 🚀 NO PROFILE

        if (profile == null) {

            for (Job job : jobs) {

                job.setMatchPercentage(0);
            }

            return jobs;
        }

        // 🚀 AI MATCHING

        int match;
        for (Job job : jobs) {

            match = calculateMatchPercentage(

                    profile.getSkills(),

                    job.getRequiredSkills()
            );


            job.setMatchPercentage(match);

            System.out.println(

                    job.getTitle()

                            + " -> "

                            + match
            );
        }

        // 🚀 SORT HIGHEST MATCH FIRST

        jobs.sort(

                (a, b) ->

                        b.getMatchPercentage()

                                - a.getMatchPercentage()
        );

        return jobs;


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
                    applicationRepository.countByJobId(job.getId());

            ApplicationStatus status = null;

            if (!username.isEmpty()) {

                var optionalApplication =
                        applicationRepository.findByUsernameAndJobId(
                                username,
                                job.getId()
                        );

                if (optionalApplication.isPresent()) {

                    status =
                            optionalApplication
                                    .get()
                                    .getStatus();
                }
            }

            return new JobResponseDTO(
                    job.getId(),
                    job.getTitle(),
                    job.getCompany(),
                    job.getLocation(),
                    job.getDescription(),
                    count,
                    status
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
    private int calculateMatchPercentage(

            String userSkills,

            String requiredSkills

    ) {

        if (

                userSkills == null ||

                        requiredSkills == null ||

                        userSkills.isEmpty() ||

                        requiredSkills.isEmpty()
        ) {

            return 0;
        }

        String[] userArray =

                userSkills
                        .toLowerCase()
                        .split(",");

        String[] requiredArray =

                requiredSkills
                        .toLowerCase()
                        .split(",");

        int matched = 0;

        for (String required :
                requiredArray) {

            for (String user :
                    userArray) {

                if (

                        user.trim()
                                .equals(

                                        required.trim()
                                )
                ) {

                    matched++;

                    break;
                }
            }
        }

        return (int)

                (((double) matched /

                        requiredArray.length)

                        * 100);
    }
}