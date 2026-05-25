package com.charni.jobtracker.controller;
import com.charni.jobtracker.dto.*;
import com.charni.jobtracker.model.Notification;
import com.charni.jobtracker.repository.NotificationRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.charni.jobtracker.model.Application;
import com.charni.jobtracker.model.Job;
import com.charni.jobtracker.repository.ApplicationRepository;
import com.charni.jobtracker.repository.JobRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.charni.jobtracker.model.UserProfile;
import com.charni.jobtracker.repository.UserProfileRepository;
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
import com.charni.jobtracker.enums.ApplicationStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/applications")
//@CrossOrigin(origins = {"http://localhost:3000",
//        "https://jobportal13-dpfd.vercel.app"})
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final NotificationRepository notificationRepository;
    private final UserProfileRepository userProfileRepository;
    public ApplicationController(ApplicationRepository applicationRepository,
                                 JobRepository jobRepository, NotificationRepository notificationRepository,
                                 UserProfileRepository userProfileRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.notificationRepository =
                notificationRepository;

        this.userProfileRepository =
                userProfileRepository;
    }

    // 🔥 APPLY JOB
    @PostMapping("/{jobId}")
    public String apply(

            @PathVariable Long jobId,
            Authentication auth

    ) {

        String username = auth.getName();
        UserProfile profile =

                userProfileRepository
                        .findByUsername(username)
                        .orElse(null);
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
        app.setStatus(ApplicationStatus.APPLIED);
        if (profile != null) {

            app.setResume(
                    profile.getResume()
            );
        }
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
    public List<JobWithCountDTO> getUserApplications(
            Authentication auth
    ) {

        // 🔥 SAFETY CHECK

        if (auth == null) {
            return java.util.Collections.emptyList();
        }

        List<Application> apps =

                applicationRepository
                        .findByUsername(
                                auth.getName()
                        );

        return apps.stream().map(app -> {

                    Job job =
                            jobRepository
                                    .findById(app.getJobId())
                                    .orElse(null);

                    if (job == null) {
                        return null;
                    }

                    long count =

                            applicationRepository
                                    .countByJobId(
                                            app.getJobId()
                                    );
                    int matchPercentage = 85;
                    return new JobWithCountDTO(

                            job.getId(),

                            job.getTitle(),

                            job.getCompany(),

                            job.getLocation(),

                            job.getDescription(),

                            count,

                            app.getStatus(),

                            matchPercentage,

                            app.getInterviewDate(),

                            app.getInterviewTime(),

                            app.getInterviewMode()

                    );

                })

                .filter(java.util.Objects::nonNull)

                .toList();
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

        Path path =

                Paths.get("uploads")
                        .resolve(fileName);

        Resource resource =

                new UrlResource(
                        path.toUri()
                );

        return ResponseEntity.ok()

                .contentType(

                        org.springframework.http.MediaType
                                .APPLICATION_PDF
                )

                .header(

                        HttpHeaders
                                .CONTENT_DISPOSITION,

                        "inline; filename=\""
                                + fileName
                                + "\""

                )

                .body(resource);
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {

        Application app =
                applicationRepository
                        .findById(id)
                        .orElseThrow();

        app.setStatus(status);
        Notification notification =
                new Notification();

        notification.setUsername(
                app.getUsername()
        );

        notification.setMessage(
                "Your application status changed to "
                        + status
        );

        notificationRepository.save(notification);

        applicationRepository.save(app);

        return ResponseEntity.ok("Status updated");
    }
    @GetMapping("/all")
    public List<Application> getAllApplications() {

        return applicationRepository.findAll();
    }

    @GetMapping("/stats")
    public DashboardStatsDTO getStats(
            Authentication auth
    ) {

        String username =
                auth.getName();

        long applied =
                applicationRepository
                        .countByUsername(username);

        long inReview =
                applicationRepository
                        .countByUsernameAndStatus(
                                username,
                                ApplicationStatus.IN_REVIEW
                        );

        long interviews =
                applicationRepository
                        .countByUsernameAndStatus(
                                username,
                                ApplicationStatus.INTERVIEW
                        );

        long selected =
                applicationRepository
                        .countByUsernameAndStatus(
                                username,
                                ApplicationStatus.SELECTED
                        );

        return new DashboardStatsDTO(
                applied,
                inReview,
                interviews,
                selected
        );


    }
    @PutMapping("/{id}/schedule")

    public ResponseEntity<?> scheduleInterview(

            @PathVariable Long id,

            @RequestParam String date,

            @RequestParam String time,

            @RequestParam String mode

    ) {

        Application app =

                applicationRepository
                        .findById(id)
                        .orElseThrow();

        // 🔥 SAVE INTERVIEW INFO

        app.setInterviewDate(
                java.time.LocalDate.parse(date)
        );

        app.setInterviewTime(time);

        app.setInterviewMode(mode);

        // 🔥 UPDATE STATUS

        app.setStatus(
                ApplicationStatus.INTERVIEW
        );

        // 🔥 SAVE

        applicationRepository.save(app);

        // 🔥 NOTIFICATION

        Notification notification =
                new Notification();

        notification.setUsername(
                app.getUsername()
        );

        notification.setMessage(

                "Interview scheduled on "
                        + date
                        + " at "
                        + time
                        + " via "
                        + mode

        );

        notificationRepository.save(notification);

        return ResponseEntity.ok(
                "Interview scheduled"
        );
    }
    @GetMapping("/analytics")

    public DashboardStatsDTO getAnalytics() {

        long applied =

                applicationRepository
                        .countByStatus(
                                ApplicationStatus.APPLIED
                        );

        long review =

                applicationRepository
                        .countByStatus(
                                ApplicationStatus.IN_REVIEW
                        );

        long interviews =

                applicationRepository
                        .countByStatus(
                                ApplicationStatus.INTERVIEW
                        );

        long selected =

                applicationRepository
                        .countByStatus(
                                ApplicationStatus.SELECTED
                        );

        return new DashboardStatsDTO(

                applied,

                review,

                interviews,

                selected
        );
    }
}