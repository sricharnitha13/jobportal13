package com.charni.jobtracker.controller;

import com.charni.jobtracker.model.Notification;
import com.charni.jobtracker.repository.NotificationRepository;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    private final NotificationRepository
            notificationRepository;

    public NotificationController(
            NotificationRepository notificationRepository
    ) {

        this.notificationRepository =
                notificationRepository;
    }

    // 🔔 GET USER NOTIFICATIONS

    @GetMapping
    public List<Notification> getNotifications(
            Authentication auth
    ) {

        return notificationRepository
                .findByUsernameOrderByCreatedAtDesc(
                        auth.getName()
                );
    }

    @PutMapping("/read/{id}")
    public Notification markAsRead(
            @PathVariable Long id
    ) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElseThrow();

        notification.setRead(true);

        return notificationRepository
                .save(notification);
    }
}