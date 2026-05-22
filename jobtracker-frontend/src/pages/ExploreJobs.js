import {

  useState,
  useEffect

} from "react";

import {

  useNavigate

} from "react-router-dom";

function ExploreJobs() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // 🔥 FETCH JOBS

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res = await fetch(

        "https://jobportal13.onrender.com/jobs",

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

      setJobs(data);

    } catch {

      setError(
        "Failed to load jobs"
      );

    } finally {

      setLoading(false);
    }
  };

  // 🔄 LOAD

  useEffect(() => {

    fetchJobs();

  }, []);

  // 🔥 APPLY JOB

 const applyJob = async (
  jobId
) => {

  try {

    await fetch(

      `https://jobportal13.onrender.com/applications/${jobId}`,

      {
        method: "POST",

        headers: {
          Authorization:
            "Bearer " + token
        }
      }
    );

    // 🔥 SAVE LOCALLY

    const appliedJobs = JSON.parse(

      localStorage.getItem(
        "appliedJobs"
      ) || "[]"

    );

    const appliedJob =
      jobs.find(
        job => job.id === jobId
      );

    const alreadyApplied =
      appliedJobs.find(
        job => job.id === jobId
      );

    if (
      !alreadyApplied &&
      appliedJob
    ) {

      appliedJobs.push(appliedJob);

      localStorage.setItem(

        "appliedJobs",

        JSON.stringify(appliedJobs)

      );
    }

    fetchJobs();

  } catch {

    alert(
      "Failed to apply"
    );
  }
};

  return (

    <div className="p-4">

      {/* HEADER */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      ">

        <h2 className="fw-bold">
          Explore Jobs
        </h2>

        <button

          className="btn btn-dark"

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

        <p>Loading...</p>

      )}

      {/* JOBS */}

      <div className="row">

        {jobs.map((job) => (

          <div
            key={job.id}
            className="col-lg-6 mb-4"
          >

            <div
              className="card border-0 shadow-sm p-4 h-100"
              style={{
                borderRadius: "24px"
              }}
            >

              <h4 className="fw-bold mb-2">

                {job.title}

              </h4>

              <p className="text-muted mb-2">

                {job.company}

              </p>

              <p className="text-muted">

                📍 {job.location}

              </p>

              <span
                className="badge bg-primary mb-4"
                style={{
                  width: "fit-content"
                }}
              >

                {job.description}

              </span>

              <div className="
                d-flex
                justify-content-between
                align-items-center
              ">

                <small className="text-muted">

                  {job.applications || 0}
                  {" "}
                  applicants

                </small>

               <div className="
  d-flex
  gap-2
">

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

      onClick={() =>
        applyJob(job.id)
      }
    >
      Apply
    </button>

  )}

  <button

    className="btn btn-outline-dark"

    onClick={() => {

      const savedJobs = JSON.parse(

        localStorage.getItem(
          "savedJobs"
        ) || "[]"

      );

      const alreadySaved =
        savedJobs.find(
          j => j.id === job.id
        );

      if (!alreadySaved) {

        savedJobs.push(job);

        localStorage.setItem(

          "savedJobs",

          JSON.stringify(savedJobs)

        );

        alert("Job saved");
      }
    }}
  >
    🔖 Save
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

export default ExploreJobs;