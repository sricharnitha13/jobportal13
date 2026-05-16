import {
  useNavigate
} from "react-router-dom";

function RecommendedJobsPage() {

  const navigate = useNavigate();

  return (

    <div className="p-4">

      <div className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      ">

        <h2 className="fw-bold">
          Recommended Jobs
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

      <div className="
        card
        border-0
        shadow-sm
        p-5
      ">

        <h4 className="fw-bold mb-3">
          AI Based Recommendations
        </h4>

        <p className="text-muted">

          Jobs matched using
          your profile, skills,
          resume, and interests.

        </p>

      </div>

    </div>
  );
}

export default RecommendedJobsPage;