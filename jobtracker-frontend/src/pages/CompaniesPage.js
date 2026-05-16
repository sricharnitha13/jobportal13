import {
  useNavigate
} from "react-router-dom";

function CompaniesPage() {

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
          Trending Companies
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
          Top Hiring Companies
        </h4>

        <p className="text-muted">

          Discover companies
          actively hiring now.

        </p>

      </div>

    </div>
  );
}

export default CompaniesPage;