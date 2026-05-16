package com.charni.jobtracker.service;

import com.charni.jobtracker.dto.JobDTO;
import com.charni.jobtracker.model.Job;
import com.charni.jobtracker.repository.JobRepository;
import org.springframework.stereotype.Service;
import com.charni.jobtracker.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.charni.jobtracker.repository.ApplicationRepository;
@Service
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    public JobService(
            JobRepository jobRepository,
            ApplicationRepository applicationRepository
    ) {

        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }
    public Job saveJob(JobDTO jobDTO) {
        Job job = new Job();

        job.setTitle(jobDTO.getTitle());
        job.setCompany(jobDTO.getCompany());
        job.setLocation(jobDTO.getLocation());
        job.setDescription(jobDTO.getDescription());

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {

        List<Job> jobs =
                jobRepository.findAll();

        for (Job job : jobs) {

            long count =
                    applicationRepository
                            .countByJobId(job.getId());

            job.setApplications(count);
        }

        return jobs;
    }
    public Job updateJob(Long id, Job updatedJob) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + id));

        job.setTitle(updatedJob.getTitle());
        job.setCompany(updatedJob.getCompany());
        job.setLocation(updatedJob.getLocation());
        job.setDescription(updatedJob.getDescription());

        return jobRepository.save(job);
    }public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public Page<Job> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }
}