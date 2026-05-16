import {

  useState,
  useEffect

} from "react";

import {

  useNavigate

} from "react-router-dom";

function SavedJobs() {

  const navigate = useNavigate();

  const [savedJobs,
    setSavedJobs] =
    useState([]);

  // 🔄 LOAD SAVED JOBS

  useEffect(() => {

    const jobs = JSON.parse(

      localStorage.getItem(
        "savedJobs"
      ) || "[]"

    );

    setSavedJobs(jobs);

  }, []);

  // ❌ REMOVE SAVED JOB

  const removeSavedJob =
    (jobId) => {

      const updatedJobs =
        savedJobs.filter(

          job => job.id !== jobId
        );

      setSavedJobs(updatedJobs);

      localStorage.setItem(

        "savedJobs",

        JSON.stringify(updatedJobs)

      );
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
          Saved Jobs
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

      {/* EMPTY */}

      {savedJobs.length === 0 ? (

        <div className="
          card
          border-0
          shadow-sm
          p-5
          text-center
        ">

          <h4 className="fw-bold mb-3">

            No Saved Jobs

          </h4>

          <p className="text-muted">

            Save jobs to view later.

          </p>

        </div>

      ) : (

        <div className="row">

          {savedJobs.map((job) => (

            <div
              key={job.id}
              className="col-lg-6 mb-4"
            >

              <div
                className="
                  card
                  border-0
                  shadow-sm
                  p-4
                  h-100
                "
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

                <div className="
                  d-flex
                  justify-content-between
                  align-items-center
                  mt-4
                ">

                  <span className="
                    badge
                    bg-warning
                    text-dark
                  ">

                    Saved

                  </span>

                  <button

                    className="
                      btn
                      btn-outline-danger
                    "

                    onClick={() =>
                      removeSavedJob(
                        job.id
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default SavedJobs;