import {
  useEffect,
  useState
} from "react";

function AdminApplications() {

  // 🔥 INTERVIEW STATES

  const [
    selectedApp,
    setSelectedApp
  ] = useState(null);

  const [
    interviewDate,
    setInterviewDate
  ] = useState("");

  const [
    interviewTime,
    setInterviewTime
  ] = useState("");

  const [
    interviewMode,
    setInterviewMode
  ] = useState("");

  // 🔥 APPLICATIONS

  const [
    applications,
    setApplications
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(false);

  const token =
    localStorage.getItem("token");

  // 🔥 FETCH APPLICATIONS

  const fetchApplications =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(

          "https://jobportal13.onrender.com/applications/all",

          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        const data =
          await res.json();

        setApplications(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // 🔄 LOAD

  useEffect(() => {

    fetchApplications();

  }, []);

  // 🔥 UPDATE STATUS

  const updateStatus =
    async (id, status) => {

      try {

        await fetch(

          `https://jobportal13.onrender.com/applications/${id}/status?status=${status}`,

          {
            method: "PUT",

            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        fetchApplications();

      } catch (err) {

        console.log(err);
      }
    };

  // 🔥 SCHEDULE INTERVIEW

  const scheduleInterview =
    async () => {

      try {

        await fetch(

`https://jobportal13.onrender.com/applications/${selectedApp.id}/schedule?date=${interviewDate}&time=${interviewTime}&mode=${interviewMode}`,

          {
            method: "PUT",

            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        alert(
          "Interview scheduled"
        );

        setSelectedApp(null);

        setInterviewDate("");
        setInterviewTime("");
        setInterviewMode("");

        fetchApplications();

      } catch {

        alert(
          "Failed to schedule"
        );
      }
    };

  // 🎨 STATUS COLORS

  const getStatusClass =
    (status) => {

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

    <div className="
      container
      py-4
    ">

      {/* HEADER */}

      <div
        className="
          bg-white
          shadow-sm
          p-4
          mb-4
        "
        style={{
          borderRadius: "24px"
        }}
      >

        <h2 className="fw-bold">

          All Applications

        </h2>

        <p className="text-muted mb-0">

          Manage candidate applications

        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <p>Loading applications...</p>

      )}

      {/* EMPTY */}

      {!loading &&
        applications.length === 0 && (

        <div className="
          card
          border-0
          shadow-sm
          p-5
          text-center
        ">

          <h4 className="fw-bold">

            No Applications Found

          </h4>

        </div>
      )}

      {/* APPLICATIONS */}

      <div className="row">

        {applications.map((app) => (

          <div
            key={app.id}
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

                {/* USER */}

                <div className="
                  d-flex
                  justify-content-between
                  align-items-start
                  mb-3
                ">

                  <div>

                    <h4 className="fw-bold mb-2">

                      {app.title || "Application"}

                    </h4>

                    <p className="text-muted mb-1">

                      👤 {app.username}

                    </p>

                    <p className="text-muted">

                      🏢 {app.company || "Company"}

                    </p>


                    {app.resume && (

  <div className="mt-3 d-flex gap-2">

    {/* VIEW */}

    <a

      href={`https://jobportal13.onrender.com/applications/resume/${app.resume}`}

      target="_blank"

      rel="noreferrer"

      className="
        btn
        btn-sm
        btn-outline-dark
      "
    >

      📄 View Resume

    </a>

    {/* DOWNLOAD */}

    <a

      href={`https://jobportal13.onrender.com/applications/resume/${app.resume}`}

      download

      className="
        btn
        btn-sm
        btn-dark
      "
    >

      ⬇ Download

    </a>

  </div>
)}
                  </div>

                  {/* STATUS */}

                  <span
                    className={`
                      badge
                      ${getStatusClass(app.status)}
                    `}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "20px"
                    }}
                  >
                    {app.status}
                  </span>

                </div>

                {/* STATUS UPDATE */}

                <div className="mt-4">

                  <label className="
                    form-label
                    fw-semibold
                  ">

                    Update Status

                  </label>

                  <select

                    className="form-select mb-3"

                    value={app.status}

                    onChange={(e) =>
                      updateStatus(
                        app.id,
                        e.target.value
                      )
                    }
                  >

                    <option value="APPLIED">
                      APPLIED
                    </option>

                    <option value="IN_REVIEW">
                      IN REVIEW
                    </option>

                    <option value="INTERVIEW">
                      INTERVIEW
                    </option>

                    <option value="SELECTED">
                      SELECTED
                    </option>

                    <option value="REJECTED">
                      REJECTED
                    </option>

                  </select>

                  {/* SCHEDULE BUTTON */}

                  <button

                    className="
                      btn
                      btn-dark
                      w-100
                    "

                    onClick={() =>
                      setSelectedApp(app)
                    }
                  >

                    📅 Schedule Interview

                  </button>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}

      {selectedApp && (

        <div

          className="
            position-fixed
            top-0
            start-0
            w-100
            h-100
            d-flex
            justify-content-center
            align-items-center
          "

          style={{
            background:
              "rgba(0,0,0,0.5)",
            zIndex: 3000
          }}
        >

          <div

            className="
              bg-white
              p-4
            "

            style={{
              width: "420px",
              borderRadius: "24px"
            }}
          >

            <h4 className="fw-bold mb-4">

              Schedule Interview

            </h4>

            {/* DATE */}

            <input

              type="date"

              className="
                form-control
                mb-3
              "

              value={interviewDate}

              onChange={(e) =>
                setInterviewDate(
                  e.target.value
                )
              }
            />

            {/* TIME */}

            <input

              type="text"

              placeholder="2:30 PM"

              className="
                form-control
                mb-3
              "

              value={interviewTime}

              onChange={(e) =>
                setInterviewTime(
                  e.target.value
                )
              }
            />

            {/* MODE */}

            <input

              type="text"

              placeholder="Google Meet"

              className="
                form-control
                mb-4
              "

              value={interviewMode}

              onChange={(e) =>
                setInterviewMode(
                  e.target.value
                )
              }
            />

            {/* BUTTONS */}

            <div className="
              d-flex
              gap-3
            ">

              <button

                className="
                  btn
                  btn-dark
                  w-100
                "

                onClick={scheduleInterview}
              >

                Save

              </button>

              <button

                className="
                  btn
                  btn-light
                  border
                  w-100
                "

                onClick={() =>
                  setSelectedApp(null)
                }
              >

                Cancel

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminApplications;