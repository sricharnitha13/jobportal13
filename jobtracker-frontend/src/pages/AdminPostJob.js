

import { useState } from "react";
import {
  Briefcase,
  Building2,
  MapPin,
  FileText,
  Send,
  X
} from "lucide-react";

import {
  useNavigate,useParams
} from "react-router-dom";
function AdminPostJob() {

  const token =
    localStorage.getItem("token");
  const navigate = useNavigate();

  const { id } = useParams();
  const [job, setJob] =
    useState({

      title: "",
      company: "",
      location: "",
      description: ""

    });

  const handleChange = (e) => {

    setJob({

      ...job,

      [e.target.name]:
        e.target.value

    });
  };

  const [requiredSkills,
setRequiredSkills]

= useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res = await fetch(

          "https://jobportal13.onrender.com/jobs",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                "Bearer " + token
            },

            body: JSON.stringify({

  ...job,

  requiredSkills

})

          }
        );

        if (!res.ok) {

          throw new Error(
            "Failed to post job"
          );
        }

        alert(
          "Job posted successfully"
        );

        setJob({

          title: "",
          company: "",
          location: "",
          description: ""

        });

      } catch {

        alert(
          "Error posting job"
        );
      }
    };

  return (
     
     
    <div
      className="
        d-flex
        justify-content-center
        align-items-start
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
          overflow-hidden
        "

        style={{

          width: "100%",

          maxWidth: "1100px",

          borderRadius: "28px"

        }}
      >

        {/* HEADER */}

        <div className="p-4 p-md-5">

          <div className="
            d-flex
            align-items-start
            gap-4
          ">

            <div

              className="
                d-flex
                justify-content-center
                align-items-center
              "

              style={{

                width: "84px",

                height: "84px",

                borderRadius: "20px",

                background: "#f1efff"

              }}
            >

              <Briefcase
                size={40}
                color="#5b5df0"
              />

            </div>

            <div>

              <h1 className="
                fw-bold
                mb-2
              "
              style={{
                fontSize: "48px"
              }}
              >
                Post New Job
              </h1>

              <p
                className="text-muted mb-0"
                style={{
                  fontSize: "22px"
                }}
              >

                Fill in the details
                to create a new
                job listing.

              </p>

            </div>

          </div>

        </div>

        <hr className="m-0" />

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
        >

          <div className="p-4 p-md-5">

            {/* JOB TITLE */}

            <div className="mb-5">

              <label
                className="
                  fw-semibold
                  d-flex
                  align-items-center
                  gap-2
                  mb-3
                "
                style={{
                  fontSize: "22px"
                }}
              >

                <Briefcase
                  size={22}
                  color="#5b5df0"
                />

                Job Title

              </label>

              <input

                type="text"

                name="title"

                value={job.title}

                onChange={handleChange}

                placeholder="Enter job title"

                className="form-control"

                required

                style={{

                  height: "72px",

                  borderRadius: "18px",

                  fontSize: "20px",

                  padding: "20px"

                }}
              />

            </div>

            {/* COMPANY */}

            <div className="mb-5">

              <label
                className="
                  fw-semibold
                  d-flex
                  align-items-center
                  gap-2
                  mb-3
                "
                style={{
                  fontSize: "22px"
                }}
              >

                <Building2
                  size={22}
                  color="#5b5df0"
                />

                Company

              </label>

              <input

                type="text"

                name="company"

                value={job.company}

                onChange={handleChange}

                placeholder="Enter company name"

                className="form-control"

                required

                style={{

                  height: "72px",

                  borderRadius: "18px",

                  fontSize: "20px",

                  padding: "20px"

                }}
              />

            </div>

            {/* LOCATION */}

            <div className="mb-5">

              <label
                className="
                  fw-semibold
                  d-flex
                  align-items-center
                  gap-2
                  mb-3
                "
                style={{
                  fontSize: "22px"
                }}
              >

                <MapPin
                  size={22}
                  color="#5b5df0"
                />

                Location

              </label>

              <input

                type="text"

                name="location"

                value={job.location}

                onChange={handleChange}

                placeholder="Remote, Hyderabad, Bangalore..."

                className="form-control"

                required

                style={{

                  height: "72px",

                  borderRadius: "18px",

                  fontSize: "20px",

                  padding: "20px"

                }}
              />

            </div>
     {/* REQUIRED SKILLS */}

<div className="mb-5">

  <label
    className="
      fw-semibold
      d-flex
      align-items-center
      gap-2
      mb-3
    "
    style={{
      fontSize: "22px"
    }}
  >

    <Briefcase
      size={22}
      color="#5b5df0"
    />

    Required Skills

  </label>

  <input

    type="text"

    className="form-control"

    placeholder="
      React, Java, MySQL
    "

    value={requiredSkills}

    onChange={(e) =>
      setRequiredSkills(
        e.target.value
      )
    }

    style={{

      height: "72px",

      borderRadius: "18px",

      fontSize: "20px",

      padding: "20px"

    }}
  />

</div>
            {/* DESCRIPTION */}

            <div className="mb-2">

              <label
                className="
                  fw-semibold
                  d-flex
                  align-items-center
                  gap-2
                  mb-3
                "
                style={{
                  fontSize: "22px"
                }}
              >

                <FileText
                  size={22}
                  color="#5b5df0"
                />

                Description

              </label>

              <textarea

                rows="7"

                name="description"

                value={job.description}

                onChange={handleChange}

                placeholder="Enter job description, requirements, responsibilities..."

                className="form-control"

                required

                style={{

                  borderRadius: "18px",

                  fontSize: "20px",

                  padding: "20px",

                  resize: "none"

                }}
              />

            </div>

          </div>

          {/* FOOTER */}

          <div
            className="
              d-flex
              justify-content-end
              gap-3
              p-4
              p-md-5
            "
            style={{
              borderTop:
                "1px solid #eee"
            }}
          >

            {/* CANCEL */}

            <button

              type="button"

              className="
                btn
                bg-white
                border
                d-flex
                align-items-center
                gap-2
                px-4
              "

              style={{

                height: "64px",

                borderRadius: "18px",

                fontSize: "20px",

                fontWeight: "600"

              }}
              onClick={() =>
    navigate("/dashboard")
  }
            >

              <X size={20} />

              Cancel

            </button>

            {/* POST BUTTON */}

            <button

              type="submit"

              className="
                btn
                text-white
                d-flex
                align-items-center
                gap-2
                px-5
              "

              style={{

                height: "64px",

                borderRadius: "18px",

                fontSize: "20px",

                fontWeight: "600",

                background:
                  "linear-gradient(to right, #5b5df0, #6c63ff)",

                border: "none"

              }}
            >

              <Send size={20} />

              Post Job

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AdminPostJob;