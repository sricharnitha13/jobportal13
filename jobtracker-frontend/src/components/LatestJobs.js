
// import { useNavigate } from "react-router-dom";
// function LatestJobs({ jobs }) {
// const navigate = useNavigate();
//   return (

//     <div
//       className="card border-0 shadow-sm p-4 h-100"
//       style={{
//         borderRadius: "20px"
//       }}
//     >

//       <div className="d-flex justify-content-between align-items-center mb-4">

//         <h6 className="fw-bold">
//           LATEST JOBS
//         </h6>

//         <span
//           className="text-primary"
//           style={{
//             cursor: "pointer"
//           }}
//         >
//           <button

//   className="
//     btn
//     btn-link
//     text-decoration-none
//     fw-semibold
//     p-0
//   "

//   onClick={() =>
//     navigate("/latest-jobs")
//   }
// >
//   View all →
// </button>
//         </span>

//       </div>

//       {jobs.slice(0, 4).map((job, index) => (

//         <div
//           key={job.id}
//           className={`py-3 ${
//             index !== 3
//               ? "border-bottom"
//               : ""
//           }`}
//         >

//           <div className="d-flex justify-content-between align-items-center">

//             <div className="d-flex align-items-center gap-3">

//               <div
//                 className="bg-light rounded-circle d-flex justify-content-center align-items-center"
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   fontWeight: "bold"
//                 }}
//               >
//                 {job.company.charAt(0)}
//               </div>

//               <div>

//                 <div className="fw-bold">
//                   {job.title}
//                 </div>

//                 <small className="text-muted">
//                   {job.company}
//                 </small>

//               </div>

//             </div>

//             <span className="badge bg-light text-dark">

//               {job.location}

//             </span>

//           </div>

//         </div>
//       ))}

//     </div>
//   );
// }

// export default LatestJobs;


import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function LatestJobs({ jobs }) {
  const navigate = useNavigate();

  const displayJobs = jobs.slice(0, 4);

  return (
    <div
      className="card border-0 shadow-sm p-4 h-100"
      style={{ borderRadius: "20px" }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold mb-0">LATEST JOBS</h6>
        <button
          className="btn btn-link text-decoration-none fw-semibold p-0 d-flex align-items-center gap-1"
          style={{ color: "#5b5df0", fontSize: "14px" }}
          onClick={() => navigate("/latest-jobs")}
        >
          View all <ChevronRight size={15} />
        </button>
      </div>

      {/* JOB LIST */}
      {displayJobs.length === 0 ? (
        <p className="text-muted">No jobs available</p>
      ) : (
        displayJobs.map((job, index) => (
          <div
            key={job.id}
            className={`py-3 ${index !== displayJobs.length - 1 ? "border-bottom" : ""}`}
            style={{ transition: "background 0.15s", cursor: "default" }}
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
                    background: "linear-gradient(135deg, #5b5df0, #7a6bff)",
                    fontSize: "15px",
                  }}
                >
                  {job.company?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="fw-semibold" style={{ fontSize: "14px" }}>
                    {job.title}
                  </div>
                  <small className="text-muted">{job.company}</small>
                </div>
              </div>

              {/* LOCATION BADGE */}
              <span
                className="badge bg-light text-dark"
                style={{ borderRadius: "10px", fontSize: "12px", fontWeight: "500" }}
              >
                {job.location}
              </span>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LatestJobs;