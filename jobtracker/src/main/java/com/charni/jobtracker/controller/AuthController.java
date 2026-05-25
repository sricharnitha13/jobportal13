package com.charni.jobtracker.controller;

import com.charni.jobtracker.dto.UserDTO;
import com.charni.jobtracker.model.User;
import com.charni.jobtracker.repository.UserRepository;
import com.charni.jobtracker.security.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = {"http://localhost:3000",
//        "https://jobportal13-dpfd.vercel.app"})
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil = new JwtUtil();

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔥 REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password required");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // 🔥 LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existing = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(user.getPassword(), existing.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return jwtUtil.generateToken(existing.getUsername(), existing.getRole());
    }

    // 🔥 PROFILE (SAFE)
    @GetMapping("/profile")
    public UserDTO getProfile(Authentication auth) {

        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }

    // 🔥 FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody User user) {

        User existing = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existing.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(existing);

        return "Password updated successfully";
    }
}