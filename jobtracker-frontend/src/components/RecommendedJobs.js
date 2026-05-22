import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function RecommendedJobs({
  
  recommendedJobs,
  applyJob

}) 
{
const navigate = useNavigate();
  return (
    
    <div className="mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h4 className="fw-bold">
          Recommended Jobs
        </h4>

        <span
          className="text-primary"
          style={{
            cursor: "pointer"
          }}
        >
          <button

  className="
    btn
    btn-link
    text-decoration-none
    fw-semibold
    p-0
  "

  onClick={() =>
    navigate("/recommended")
  }
>
  View all →
</button>
        </span>

      </div>

      <div
        className="d-flex flex-nowrap overflow-auto pb-2"
        style={{
          gap: "20px",
          scrollbarWidth: "none"
        }}
      >

        {recommendedJobs.map((job, index) => (

          <motion.div
            key={job.id}
            whileHover={{ scale: 1.02 }}
            className="card border-0 shadow-sm p-4"
            style={{
           width: "clamp(280px, 80vw, 350px)",
              borderRadius: "24px",
              border:
                index === 0
                  ? "2px solid #8b5cf6"
                  : "none"
            }}
          >

            <div className="d-flex justify-content-between">

              <div>

                <h5 className="fw-bold">
                  {job.title}
                </h5>

                <p className="text-muted mb-1">
                  {job.company}
                </p>

              </div>

              <img
                src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
                alt="logo"
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "12px"
                }}
                onError={(e) =>
                  e.target.style.display = "none"
                }
              />

            </div>

            <div className="my-3">

              <span className="badge bg-success">
                {job.matchScore || 85}% Match
              </span>

            </div>

            <p className="text-muted">
              📍 {job.location}
            </p>

            <div className="mb-4">

              {job.skills?.split(",").map(
                (skill, index) => (

                  <span
                    key={index}
                    className="badge bg-primary me-2 mb-2"
                  >
                    {skill.trim()}
                  </span>
                )
              )}

            </div>

            <div className="d-flex justify-content-between align-items-center">

              <small className="text-muted">
                {job.applications || 0} applicants
              </small>

              {job.applied ? (

                <button
                  className="btn btn-success"
                  disabled
                >
                  Applied
                </button>

              ) : (

                <button
                  className="btn btn-primary"
                  onClick={async () => {

      await applyJob(job.id);

      job.applied = true;
    }}
                >
                  Apply
                </button>
              )}

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default RecommendedJobs;