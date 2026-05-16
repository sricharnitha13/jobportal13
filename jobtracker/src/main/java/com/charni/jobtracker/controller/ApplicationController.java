package com.charni.jobtracker.controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.charni.jobtracker.model.Application;
import com.charni.jobtracker.model.Job;
import com.charni.jobtracker.repository.ApplicationRepository;
import com.charni.jobtracker.repository.JobRepository;
import com.charni.jobtracker.dto.JobWithCountDTO;   // ✅ IMPORTANT

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.charni.jobtracker.dto.ApplicationUserDTO;
import com.charni.jobtracker.dto.ApplicationUserDTO;
import com.charni.jobtracker.dto.ApplicationUserDTO;
import java.util.stream.Collectors;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    public ApplicationController(ApplicationRepository applicationRepository,
                                 JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
    }

    // 🔥 APPLY JOB
    @PostMapping("/{jobId}")
    public String apply(

            @PathVariable Long jobId,
            Authentication auth

    ) {

        String username = auth.getName();

        // 🔥 CHECK ALREADY APPLIED
        if (
                applicationRepository
                        .findByUsernameAndJobId(
                                username,
                                jobId
                        )
                        .isPresent()
        ) {

            return "Already applied";
        }

        Application app = new Application();

        app.setJobId(jobId);
        app.setUsername(username);

        applicationRepository.save(app);

        return "Applied successfully";
    }
    @DeleteMapping("/{jobId}")
    public String withdraw(
            @PathVariable Long jobId,
            Authentication auth
    ) {

        String username = auth.getName();

        Application application =
                applicationRepository
                        .findByUsernameAndJobId(username, jobId)
                        .get();

        applicationRepository.delete(application);

        return "Application withdrawn";
    }
    @GetMapping
    public List<JobWithCountDTO> getUserApplications(Authentication auth) {

        List<Application> apps =
                applicationRepository.findByUsername(auth.getName());

        return apps.stream().map(app -> {

            Job job = jobRepository.findById(app.getJobId())
                    .orElse(null);

            long count =
                    applicationRepository.countByJobId(app.getJobId());

            return new JobWithCountDTO(
                    job.getId(),
                    job.getTitle(),
                    job.getCompany(),
                    job.getLocation(),
                    job.getDescription(),
                    count
            );

        }).toList();
    }
    @GetMapping("/job/{jobId}")
    public List<ApplicationUserDTO> getApplicants(
            @PathVariable Long jobId
    ) {

        return applicationRepository.findAll()
                .stream()
                .filter(app -> app.getJobId().equals(jobId))
                .map(app -> new ApplicationUserDTO(
                        app.getUsername(),
                        app.getResume()
                ))
                .collect(java.util.stream.Collectors.toList());
    }
    @GetMapping("/resume/{fileName}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable String fileName
    ) throws Exception {

        Path path = Paths.get("uploads").resolve(fileName);

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + fileName
                )
                .body(resource);
    }
}