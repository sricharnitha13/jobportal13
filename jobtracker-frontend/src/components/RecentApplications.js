import { useNavigate } from "react-router-dom";
function RecentApplications({

  appliedJobs

}) {
const navigate = useNavigate();
  const statuses = [

    "Interview",
    "In Review",
    "Rejected"

  ];

  const badgeClasses = {

    Interview:
      "bg-success-subtle text-success",

    "In Review":
      "bg-warning-subtle text-warning",

    Rejected:
      "bg-danger-subtle text-danger"
  };

  return (

    <div
      className="card border-0 shadow-sm p-4 mt-5"
      style={{
        borderRadius: "20px"
      }}
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h6 className="fw-bold">
          RECENT APPLICATIONS
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
    navigate("/applications")
  }
>
  See all →
</button>
        </span>

      </div>

      {appliedJobs.length === 0 ? (

        <p className="text-muted">
          No applications yet
        </p>

      ) : (

        appliedJobs.map((job, index) => {

          const status =
            statuses[
              index % statuses.length
            ];

          return (

            <div
              key={job.id}
              className={`py-3 ${
                index !== appliedJobs.length - 1
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
                      Applied recently
                    </small>

                  </div>

                </div>

                <span
                  className={`badge ${badgeClasses[status]}`}
                >
                  {status}
                </span>

              </div>

            </div>
          );
        })
      )}

    </div>
  );
}

export default RecentApplications;