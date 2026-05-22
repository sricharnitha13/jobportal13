package com.charni.jobtracker.repository;

import com.charni.jobtracker.enums.ApplicationStatus;
import com.charni.jobtracker.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUsername(String name);

    long countByJobId(Long jobId);

    Optional<Application> findByUsernameAndJobId(
            String username,
            Long jobId
    );
    long countByUsername(String username);

    long countByUsernameAndStatus(
            String username,
            ApplicationStatus status
    );
    long countByStatus(
            ApplicationStatus status
    );

    @Transactional
    @Modifying
    void deleteByUsernameAndJobId(String username, Long jobId);
}