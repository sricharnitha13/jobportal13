package com.charni.jobtracker.controller;

import com.charni.jobtracker.model.UserProfile;
import com.charni.jobtracker.repository.UserProfileRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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
@RequestMapping("/profile")
@CrossOrigin(origins = {"http://localhost:3000", "https://jobportal13-dpfd.vercel.app"})
public class ProfileController {

    private final UserProfileRepository userProfileRepository;

    public ProfileController(
            UserProfileRepository userProfileRepository
    ) {
        this.userProfileRepository = userProfileRepository;
    }

    // 🔥 SAVE PROFILE
    @PostMapping(consumes = "multipart/form-data")
    public String saveProfile(

            @RequestParam String bio,
            @RequestParam String skills,
            @RequestParam String interests,
            @RequestParam String preferredRole,
            @RequestParam String preferredLocation,
            @RequestParam String experience,

            @RequestParam(
                    value = "resume",
                    required = false
            )
            MultipartFile resume,

            Authentication auth

    ) {

        try {

            String username = "";

            if (auth != null) {
                username = auth.getName();
            }

            String fileName = "";

            // 🔥 ONLY IF RESUME EXISTS
            if (resume != null && !resume.isEmpty()) {

                fileName =
                        System.currentTimeMillis()
                                + "_"
                                + resume.getOriginalFilename();

                Path uploadPath = Paths.get("uploads");

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                Files.copy(
                        resume.getInputStream(),
                        uploadPath.resolve(fileName),
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            UserProfile profile =
                    userProfileRepository
                            .findByUsername(username)
                            .orElse(new UserProfile());

            profile.setUsername(username);
            profile.setBio(bio);
            profile.setSkills(skills);
            profile.setInterests(interests);
            profile.setPreferredRole(preferredRole);
            profile.setPreferredLocation(preferredLocation);
            profile.setExperience(experience);

            // 🔥 SAVE ONLY IF FILE EXISTS

                profile.setResume(fileName);


            userProfileRepository.save(profile);

            return "Profile saved successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return "Profile save failed";
        }
    }

    // 🔥 GET PROFILE
    @GetMapping
    public UserProfile getProfile(
            Authentication auth
    ) {

        return userProfileRepository
                .findByUsername(auth.getName())
                .orElse(new UserProfile());
    }

    @GetMapping("/resume/{fileName}")

    public ResponseEntity<Resource> getResume(

            @PathVariable String fileName

    ) throws Exception {

        Path path = Paths.get(
                "uploads"
        ).resolve(fileName);

        Resource resource =
                new UrlResource(
                        path.toUri()
                );

        return ResponseEntity.ok()

                .header(

                        HttpHeaders
                                .CONTENT_DISPOSITION,

                        "inline; filename=\""
                                + fileName
                                + "\""

                )

                .body(resource);
    }
}