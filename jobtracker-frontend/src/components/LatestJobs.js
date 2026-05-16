
import { useNavigate } from "react-router-dom";
function LatestJobs({ jobs }) {
const navigate = useNavigate();
  return (

    <div
      className="card border-0 shadow-sm p-4 h-100"
      style={{
        borderRadius: "20px"
      }}
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h6 className="fw-bold">
          LATEST JOBS
        </h6>

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
    navigate("/latest-jobs")
  }
>
  View all →
</button>
        </span>

      </div>

      {jobs.slice(0, 4).map((job, index) => (

        <div
          key={job.id}
          className={`py-3 ${
            index !== 3
              ? "border-bottom"
              : ""
          }`}
        >

          <div className="d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-3">

              <div
                className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  fontWeight: "bold"
                }}
              >
                {job.company.charAt(0)}
              </div>

              <div>

                <div className="fw-bold">
                  {job.title}
                </div>

                <small className="text-muted">
                  {job.company}
                </small>

              </div>

            </div>

            <span className="badge bg-light text-dark">

              {job.location}

            </span>

          </div>

        </div>
      ))}

    </div>
  );
}

export default LatestJobs;