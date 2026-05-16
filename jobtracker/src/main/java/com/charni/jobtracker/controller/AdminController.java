package com.charni.jobtracker.controller;

import com.charni.jobtracker.model.User;
import com.charni.jobtracker.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/admin")

@CrossOrigin("*")

public class AdminController {

    private final UserRepository userRepository;

    public AdminController(
            UserRepository userRepository
    ) {
        this.userRepository =
                userRepository;
    }

    // GET ALL USERS

    @GetMapping("/users")

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}