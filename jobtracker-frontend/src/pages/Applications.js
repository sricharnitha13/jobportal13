

import {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Applications() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [
    appliedJobs,
    setAppliedJobs
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  // 🔥 FETCH APPLIED JOBS

  const fetchAppliedJobs = async () => {

    try {

      setLoading(true);

      const res = await fetch(

        "http://localhost:9090/jobs",

        {
          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      if (!res.ok) {

        throw new Error();
      }

      const data =
        await res.json();

      // 🔥 ONLY APPLIED JOBS
      // NOW FILTER USING STATUS

      const applied =
        data.filter(
          job => job.status 
        );

      setAppliedJobs(applied);

    } catch {

      setError(
        "Failed to load applications"
      );

    } finally {

      setLoading(false);
    }
  };

  // 🔄 LOAD APPLICATIONS

  useEffect(() => {

    fetchAppliedJobs();

  }, []);

  // ❌ REMOVE APPLICATION

  const removeApplication =
    async (jobId) => {

      try {

        await fetch(

          `http://localhost:9090/applications/${jobId}`,

          {
            method: "DELETE",

            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        fetchAppliedJobs();

      } catch {

        alert(
          "Failed to remove application"
        );
      }
    };

  // 🎨 STATUS COLORS

  const getStatusClass = (status) => {

    switch (status) {

      case "APPLIED":
        return "bg-primary";

      case "IN_REVIEW":
        return "bg-warning text-dark";

      case "INTERVIEW":
        return "bg-info text-dark";

      case "SELECTED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (

    <div className="container py-4">

      {/* HEADER */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      ">

        <div>

          <h2 className="fw-bold mb-1">
            My Applications
          </h2>

          <p className="text-muted mb-0">
            Track your job application progress
          </p>

        </div>

        <button

          className="btn btn-dark px-4"

          onClick={() =>
            navigate("/dashboard")
          }
        >
          ← Dashboard
        </button>

      </div>

      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>
      )}

      {/* LOADING */}

      {loading && (

        <div className="text-center py-5">

          <div
            className="
              spinner-border
              text-primary
            "
            role="status"
          />

          <p className="mt-3">
            Loading applications...
          </p>

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        appliedJobs.length === 0 && (

        <div className="
          card
          border-0
          shadow-sm
          p-5
          text-center
        ">

          <h4 className="fw-bold mb-3">

            No Applications Yet

          </h4>

          <p className="text-muted mb-4">

            Start applying for jobs
            to track them here.

          </p>

          <button

            className="btn btn-dark"

            onClick={() =>
              navigate("/explore-jobs")
            }
          >
            Explore Jobs
          </button>

        </div>
      )}

      {/* APPLICATIONS */}

      <div className="row">

        {appliedJobs.map((job) => (

          <div
            key={job.id}
            className="col-lg-6 mb-4"
          >

            <div
              className="
                card
                border-0
                shadow-sm
                h-100
              "
              style={{
                borderRadius: "24px"
              }}
            >

              <div className="card-body p-4">

                {/* TOP */}

                <div className="
                  d-flex
                  justify-content-between
                  align-items-start
                  mb-3
                ">

                  <div>

                    <h4 className="fw-bold mb-2">

                      {job.title}

                    </h4>

                    <p className="text-muted mb-1">

                      {job.company}

                    </p>

                    <p className="text-muted mb-0">

                      📍 {job.location}

                    </p>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`
                      badge
                      ${getStatusClass(job.status)}
                    `}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "20px",
                      fontSize: "12px"
                    }}
                  >
                    {job.status}
                  </span>

                </div>

                {/* DESCRIPTION */}

                <p
                  className="text-muted mt-3"
                  style={{
                    minHeight: "72px"
                  }}
                >

                  {job.description}

                </p>

                {/* FOOTER */}

                <div className="
                  d-flex
                  justify-content-between
                  align-items-center
                  mt-4
                ">

                  <small className="text-muted">

                    👥 Applicants:
                    {" "}
                    {job.count}

                  </small>

                  <button

                    className="
                      btn
                      btn-outline-danger
                    "

                    onClick={() =>
                      removeApplication(
                        job.id
                      )
                    }
                  >
                    Withdraw
                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Applications;