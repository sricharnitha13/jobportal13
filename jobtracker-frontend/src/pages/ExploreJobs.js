import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import { motion } from "framer-motion";

function ExploreJobs() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAPI("/jobs");
      setJobs(data);
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const applyJob = async (jobId) => {
    try {
      await fetchAPI(`/applications/${jobId}`, { method: "POST" });

      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      const appliedJob = jobs.find(job => job.id === jobId);
      const alreadyApplied = appliedJobs.find(job => job.id === jobId);

      if (!alreadyApplied && appliedJob) {
        appliedJobs.push(appliedJob);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
      }

      fetchJobs();
    } catch {
      alert("Failed to apply");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--text-main)' }}>Explore Jobs</h2>
        <button className="btn btn-dark rounded-pill px-4" onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </div>

      {error && <div className="alert alert-danger rounded-pill">{error}</div>}

      {loading ? (
        <div className="row">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-lg-6 mb-4">
              <div className="card glass-card p-4 h-100 skeleton">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text-short mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {jobs.map((job, index) => (
            <motion.div 
              key={job.id} 
              className="col-lg-6 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card glass-card p-4 h-100">
                <h4 className="fw-bold mb-2">{job.title}</h4>
                <p className="text-muted mb-2">{job.company}</p>
                <p className="text-muted">📍 {job.location}</p>
                <span className="badge bg-primary mb-4" style={{ width: "fit-content", padding: '8px 12px', borderRadius: '12px' }}>
                  {job.description}
                </span>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <small className="text-muted fw-medium">{job.applications || 0} applicants</small>
                  <div className="d-flex gap-2">
                    {job.applied ? (
                      <button className="btn btn-success rounded-pill px-4" disabled>Applied</button>
                    ) : (
                      <button className="btn btn-primary rounded-pill px-4" onClick={() => applyJob(job.id)}>
                        Apply
                      </button>
                    )}

                    <button
                      className="btn btn-outline-dark rounded-pill px-4"
                      onClick={() => {
                        const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
                        const alreadySaved = savedJobs.find(j => j.id === job.id);
                        if (!alreadySaved) {
                          savedJobs.push(job);
                          localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
                          alert("Job saved");
                        }
                      }}
                    >
                      🔖 Save
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExploreJobs;