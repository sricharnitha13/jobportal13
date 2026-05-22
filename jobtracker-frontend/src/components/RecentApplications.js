import { useNavigate } from "react-router-dom";

function RecentApplications({

  appliedJobs

}) {

  const navigate = useNavigate();

  const badgeClasses = {

    APPLIED:
      "bg-primary-subtle text-primary",

    IN_REVIEW:
      "bg-warning-subtle text-warning",

    INTERVIEW:
      "bg-success-subtle text-success",

    REJECTED:
      "bg-danger-subtle text-danger",

    SELECTED:
      "bg-info-subtle text-info"
  };

  return (

    <div
      className="
        card
        border-0
        shadow-sm
        p-4
        mt-5
      "
      style={{
        borderRadius: "20px"
      }}
    >

      {/* HEADER */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      ">

        <h6 className="fw-bold">

          RECENT APPLICATIONS

        </h6>

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

      </div>

      {/* EMPTY */}

      {appliedJobs.length === 0 ? (

        <p className="text-muted">

          No applications yet

        </p>

      ) : (

        appliedJobs
          .slice(0, 3)
          .map((job, index) => (

            <div

              key={job.id}

              className={`py-3 ${
                index !==
                appliedJobs.length - 1
                  ? "border-bottom"
                  : ""
              }`}
            >

              <div className="
                d-flex
                justify-content-between
                align-items-center
              ">

                {/* LEFT */}

                <div className="
                  d-flex
                  align-items-center
                  gap-3
                ">

                  {/* COMPANY ICON */}

                  <div

                    className="
                      bg-light
                      rounded-circle
                      d-flex
                      justify-content-center
                      align-items-center
                    "

                    style={{
                      width: "42px",
                      height: "42px",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}
                  >

                    {(
                      job.company ||
                      job.title ||
                      "A"
                    )
                      .charAt(0)
                      .toUpperCase()}

                  </div>

                  {/* INFO */}

                  <div>

                    {/* COMPANY */}

                    <div className="fw-bold">

                      {job.company || "Company"}

                    </div>

                    {/* LOCATION */}

                    <small className="text-muted d-block">

                      {job.location || "Location"}

                    </small>

                    {/* MATCH PERCENTAGE */}

                    <div
                      className="
                        small
                        text-success
                        fw-semibold
                        mt-1
                      "
                    >

                      ⭐ {job.matchPercentage || 85}% Match

                    </div>

                  </div>

                </div>

                {/* STATUS */}

                <span

                  className={`
                    badge
                    ${
                      badgeClasses[
                        job.status
                      ] ||
                      "bg-secondary"
                    }
                  `}
                >

                  {job.status || "APPLIED"}

                </span>

              </div>

            </div>
          ))
      )}

    </div>

  );
}

export default RecentApplications;