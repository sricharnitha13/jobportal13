import { useNavigate } from "react-router-dom";
function TrendingCompanies({

  companies

}) {
  const navigate = useNavigate();
  return (

    <div
      className="card border-0 shadow-sm p-4 h-100"
      style={{
        borderRadius: "20px"
      }}
    >

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h6 className="fw-bold">
          TRENDING COMPANIES
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
    navigate("/companies")
  }
>
  Explore →
</button>
        </span>

      </div>

      {companies.slice(0, 4).map(
        (company, index) => (

          <div
            key={index}
            className={`py-3 ${
              index !== 3
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
                  {company.charAt(0)}
                </div>

                <div>

                  <div className="fw-bold">
                    {company}
                  </div>

                  <small className="text-muted">
                    Hiring now
                  </small>

                </div>

              </div>

              <span className="badge bg-warning text-dark">
                Active
              </span>

            </div>

          </div>
        )
      )}

    </div>
  );
}

export default TrendingCompanies;