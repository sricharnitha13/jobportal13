import {

  useState,
  useEffect

} from "react";

import {

  useNavigate,
  useParams

} from "react-router-dom";

function EditJob() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const token =
    localStorage.getItem("token");

  const [job, setJob] =
    useState({

      title: "",
      company: "",
      location: "",
      description: ""

    });

  // FETCH JOB

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob =
    async () => {

      try {

        const res = await fetch(

          `https://jobportal13.onrender.com/jobs/${id}`,

          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        const data =
          await res.json();

        setJob(data);

      } catch {

        alert(
          "Failed to load job"
        );
      }
    };

  // HANDLE CHANGE

  const handleChange =
    (e) => {

      setJob({

        ...job,

        [e.target.name]:
          e.target.value

      });
    };

  // UPDATE JOB

  const updateJob =
    async (e) => {

      e.preventDefault();

      try {

        await fetch(

          `https://jobportal13.onrender.com/jobs/${id}`,

          {

            method: "PUT",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                "Bearer " + token
            },

            body: JSON.stringify(job)

          }
        );

        navigate(
          "/admin/manage-jobs"
        );

      } catch {

        alert(
          "Failed to update job"
        );
      }
    };

  return (

    <div

      className="
        d-flex
        justify-content-center
        py-5
        px-3
      "

      style={{
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      <div

        className="
          bg-white
          shadow-sm
          p-4
          p-md-5
        "

        style={{

          width: "100%",

          maxWidth: "900px",

          borderRadius: "28px"

        }}
      >

        {/* HEADER */}

        <div className="mb-5">

          <h1 className="
            fw-bold
            mb-2
          ">
            Edit Job
          </h1>

          <p className="
            text-muted
            mb-0
          ">

            Update the job
            information below.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={updateJob}
        >

          {/* TITLE */}

          <div className="mb-4">

            <label className="
              fw-semibold
              mb-2
            ">
              Job Title
            </label>

            <input

              type="text"

              name="title"

              value={job.title}

              onChange={handleChange}

              className="form-control"

              style={{

                height: "60px",

                borderRadius: "16px"

              }}
            />

          </div>

          {/* COMPANY */}

          <div className="mb-4">

            <label className="
              fw-semibold
              mb-2
            ">
              Company
            </label>

            <input

              type="text"

              name="company"

              value={job.company}

              onChange={handleChange}

              className="form-control"

              style={{

                height: "60px",

                borderRadius: "16px"

              }}
            />

          </div>

          {/* LOCATION */}

          <div className="mb-4">

            <label className="
              fw-semibold
              mb-2
            ">
              Location
            </label>

            <input

              type="text"

              name="location"

              value={job.location}

              onChange={handleChange}

              className="form-control"

              style={{

                height: "60px",

                borderRadius: "16px"

              }}
            />

          </div>

          {/* DESCRIPTION */}

          <div className="mb-4">

            <label className="
              fw-semibold
              mb-2
            ">
              Description
            </label>

            <textarea

              rows="6"

              name="description"

              value={job.description}

              onChange={handleChange}

              className="form-control"

              style={{
                borderRadius: "16px"
              }}
            />

          </div>

          {/* ACTIONS */}

          <div className="
            d-flex
            justify-content-end
            gap-3
            mt-5
          ">

            <button

              type="button"

              onClick={() =>
                navigate(
                  "/admin/manage-jobs"
                )
              }

              className="
                btn
                btn-light
                px-4
              "

              style={{
                borderRadius: "14px"
              }}
            >

              Cancel

            </button>

            <button

              type="submit"

              className="
                btn
                btn-dark
                px-4
              "

              style={{
                borderRadius: "14px"
              }}
            >

              Save Changes

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditJob;