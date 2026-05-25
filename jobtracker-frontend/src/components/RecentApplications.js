// import { useNavigate } from "react-router-dom";

// function RecentApplications({

//   appliedJobs

// }) {

//   const navigate = useNavigate();

//   const badgeClasses = {

//     APPLIED:
//       "bg-primary-subtle text-primary",

//     IN_REVIEW:
//       "bg-warning-subtle text-warning",

//     INTERVIEW:
//       "bg-success-subtle text-success",

//     REJECTED:
//       "bg-danger-subtle text-danger",

//     SELECTED:
//       "bg-info-subtle text-info"
//   };

//   return (

//     <div
//       className="
//         card
//         border-0
//         shadow-sm
//         p-4
//         mt-5
//       "
//       style={{
//         borderRadius: "20px"
//       }}
//     >

//       {/* HEADER */}

//       <div className="
//         d-flex
//         justify-content-between
//         align-items-center
//         mb-4
//       ">

//         <h6 className="fw-bold">

//           RECENT APPLICATIONS

//         </h6>

//         <button

//           className="
//             btn
//             btn-link
//             text-decoration-none
//             fw-semibold
//             p-0
//           "

//           onClick={() =>
//             navigate("/applications")
//           }
//         >

//           See all →

//         </button>

//       </div>

//       {/* EMPTY */}

//       {appliedJobs.length === 0 ? (

//         <p className="text-muted">

//           No applications yet

//         </p>

//       ) : (

//         appliedJobs
//           .slice(0, 3)
//           .map((job, index) => (

//             <div

//               key={job.id}

//               className={`py-3 ${
//                 index !==
//                 appliedJobs.length - 1
//                   ? "border-bottom"
//                   : ""
//               }`}
//             >

//               <div className="
//                 d-flex
//                 justify-content-between
//                 align-items-center
//               ">

//                 {/* LEFT */}

//                 <div className="
//                   d-flex
//                   align-items-center
//                   gap-3
//                 ">

//                   {/* COMPANY ICON */}

//                   <div

//                     className="
//                       bg-light
//                       rounded-circle
//                       d-flex
//                       justify-content-center
//                       align-items-center
//                     "

//                     style={{
//                       width: "42px",
//                       height: "42px",
//                       fontWeight: "bold",
//                       fontSize: "16px"
//                     }}
//                   >

//                     {(
//                       job.company ||
//                       job.title ||
//                       "A"
//                     )
//                       .charAt(0)
//                       .toUpperCase()}

//                   </div>

//                   {/* INFO */}

//                   <div>

//                     {/* COMPANY */}

//                     <div className="fw-bold">

//                       {job.company || "Company"}

//                     </div>

//                     {/* LOCATION */}

//                     <small className="text-muted d-block">

//                       {job.location || "Location"}

//                     </small>

//                     {/* MATCH PERCENTAGE */}

//                     <div
//                       className="
//                         small
//                         text-success
//                         fw-semibold
//                         mt-1
//                       "
//                     >

//                       ⭐ {job.matchPercentage || 85}% Match

//                     </div>

//                   </div>

//                 </div>

//                 {/* STATUS */}

//                 <span

//                   className={`
//                     badge
//                     ${
//                       badgeClasses[
//                         job.status
//                       ] ||
//                       "bg-secondary"
//                     }
//                   `}
//                 >

//                   {job.status || "APPLIED"}

//                 </span>

//               </div>

//             </div>
//           ))
//       )}

//     </div>

//   );
// }

// export default RecentApplications;

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function RecentApplications({ appliedJobs }) {
  const navigate = useNavigate();

  const displayJobs = appliedJobs.slice(0, 3);

  const statusStyles = {
    APPLIED:    { bg: "#eff6ff", color: "#3b82f6", label: "Applied" },
    IN_REVIEW:  { bg: "#fffbeb", color: "#f59e0b", label: "In Review" },
    INTERVIEW:  { bg: "#f0fdf4", color: "#10b981", label: "Interview" },
    SELECTED:   { bg: "#f0f9ff", color: "#06b6d4", label: "Selected" },
    REJECTED:   { bg: "#fef2f2", color: "#ef4444", label: "Rejected" },
  };

  return (
    <div
      className="card border-0 shadow-sm p-4 mt-4"
      style={{ borderRadius: "20px" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold mb-0">RECENT APPLICATIONS</h6>
        <button
          className="btn btn-link text-decoration-none fw-semibold p-0 d-flex align-items-center gap-1"
          style={{ color: "#5b5df0", fontSize: "14px" }}
          onClick={() => navigate("/applications")}
        >
          See all <ChevronRight size={15} />
        </button>
      </div>

      {/* LIST */}
      {displayJobs.length === 0 ? (
        <p className="text-muted mb-0">No applications yet</p>
      ) : (
        displayJobs.map((job, index) => {
          const style = statusStyles[job.status] || { bg: "#f3f4f6", color: "#6b7280", label: job.status || "Applied" };
          return (
            <div
              key={job.id}
              className={`py-3 ${index !== displayJobs.length - 1 ? "border-bottom" : ""}`}
            >
              <div className="d-flex justify-content-between align-items-center">

                {/* LEFT */}
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="d-flex justify-content-center align-items-center text-white fw-bold flex-shrink-0"
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #5b5df0, #7a6bff)",
                      fontSize: "15px",
                    }}
                  >
                    {(job.company || job.title || "A").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-semibold" style={{ fontSize: "14px" }}>
                      {job.company || "Company"}
                    </div>
                    <small className="text-muted d-block">{job.location || "Location"}</small>
                    <small className="fw-semibold" style={{ color: "#10b981" }}>
                      ⭐ {job.matchPercentage ?? 85}% Match
                    </small>
                  </div>
                </div>

                {/* STATUS BADGE */}
                <span
                  className="badge"
                  style={{
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background: style.bg,
                    color: style.color,
                  }}
                >
                  {style.label}
                </span>

              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecentApplications;