package com.charni.jobtracker.dto;

public class DashboardStatsDTO {

    private long applied;
    private long inReview;
    private long interviews;
    private long selected;

    public DashboardStatsDTO(
            long applied,
            long inReview,
            long interviews,
            long selected
    ) {
        this.applied = applied;
        this.inReview = inReview;
        this.interviews = interviews;
        this.selected = selected;
    }

    public long getApplied() {
        return applied;
    }

    public long getInReview() {
        return inReview;
    }

    public long getInterviews() {
        return interviews;
    }

    public long getSelected() {
        return selected;
    }
}