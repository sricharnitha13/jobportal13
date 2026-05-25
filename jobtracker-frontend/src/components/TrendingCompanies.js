// import { useNavigate } from "react-router-dom";
// function TrendingCompanies({

//   companies

// }) {
//   const navigate = useNavigate();
//   return (

//     <div
//       className="card border-0 shadow-sm p-4 h-100"
//       style={{
//         borderRadius: "20px"
//       }}
//     >

//       <div className="d-flex justify-content-between align-items-center mb-4">

//         <h6 className="fw-bold">
//           TRENDING COMPANIES
//         </h6>

//         <span
//           className="text-primary"
//           style={{
//             cursor: "pointer"
//           }}
//         >
//            <button

//   className="
//     btn
//     btn-link
//     text-decoration-none
//     fw-semibold
//     p-0
//   "

//   onClick={() =>
//     navigate("/companies")
//   }
// >
//   Explore →
// </button>
//         </span>

//       </div>

//       {companies.slice(0, 4).map(
//         (company, index) => (

//           <div
//             key={index}
//             className={`py-3 ${
//               index !== 3
//                 ? "border-bottom"
//                 : ""
//             }`}
//           >

//             <div className="d-flex justify-content-between align-items-center">

//               <div className="d-flex align-items-center gap-3">

//                 <div
//                   className="bg-light rounded-circle d-flex justify-content-center align-items-center"
//                   style={{
//                     width: "40px",
//                     height: "40px",
//                     fontWeight: "bold"
//                   }}
//                 >
//                   {company.charAt(0)}
//                 </div>

//                 <div>

//                   <div className="fw-bold">
//                     {company}
//                   </div>

//                   <small className="text-muted">
//                     Hiring now
//                   </small>

//                 </div>

//               </div>

//               <span className="badge bg-warning text-dark">
//                 Active
//               </span>

//             </div>

//           </div>
//         )
//       )}

//     </div>
//   );
// }

// export default TrendingCompanies;

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function TrendingCompanies({ companies }) {
  const navigate = useNavigate();

  const displayCompanies = companies.slice(0, 4);

  return (
    <div
      className="card border-0 shadow-sm p-4 h-100"
      style={{ borderRadius: "20px" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold mb-0">TRENDING COMPANIES</h6>
        <button
          className="btn btn-link text-decoration-none fw-semibold p-0 d-flex align-items-center gap-1"
          style={{ color: "#5b5df0", fontSize: "14px" }}
          onClick={() => navigate("/companies")}
        >
          Explore <ChevronRight size={15} />
        </button>
      </div>

      {/* COMPANY LIST */}
      {displayCompanies.length === 0 ? (
        <p className="text-muted">No companies available</p>
      ) : (
        displayCompanies.map((company, index) => (
          <div
            key={index}
            className={`py-3 ${index !== displayCompanies.length - 1 ? "border-bottom" : ""}`}
          >
            <div className="d-flex justify-content-between align-items-center">

              {/* LEFT */}
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex justify-content-center align-items-center text-white fw-bold flex-shrink-0"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #f59e0b, #f97316)",
                    fontSize: "15px",
                  }}
                >
                  {company?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold" style={{ fontSize: "14px" }}>
                    {company}
                  </div>
                  <small className="text-muted">Hiring now</small>
                </div>
              </div>

              {/* BADGE */}
              <span
                className="badge"
                style={{
                  borderRadius: "10px",
                  fontSize: "12px",
                  fontWeight: "600",
                  background: "#fff7ed",
                  color: "#f97316",
                }}
              >
                Active
              </span>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TrendingCompanies;