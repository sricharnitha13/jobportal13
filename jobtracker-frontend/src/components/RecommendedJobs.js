// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// function RecommendedJobs({
  
//   recommendedJobs,
//   applyJob

// }) 
// {
// const navigate = useNavigate();
//   return (
    
//     <div className="mb-5">

//       <div className="d-flex justify-content-between align-items-center mb-4">

//         <h4 className="fw-bold">
//           Recommended Jobs
//         </h4>

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
//     navigate("/recommended")
//   }
// >
//   View all →
// </button>
//         </span>

//       </div>

//       <div
//         className="d-flex flex-nowrap overflow-auto pb-2"
//         style={{
//           gap: "20px",
//           scrollbarWidth: "none"
//         }}
//       >

//         {recommendedJobs.map((job, index) => (

//           <motion.div
//             key={job.id}
//             whileHover={{ scale: 1.02 }}
//             className="card border-0 shadow-sm p-4"
//             style={{
//            width: "clamp(280px, 80vw, 350px)",
//               borderRadius: "24px",
//               border:
//                 index === 0
//                   ? "2px solid #8b5cf6"
//                   : "none"
//             }}
//           >

//             <div className="d-flex justify-content-between">

//               <div>

//                 <h5 className="fw-bold">
//                   {job.title}
//                 </h5>

//                 <p className="text-muted mb-1">
//                   {job.company}
//                 </p>

//               </div>

//               <img
//                 src={`https://logo.clearbit.com/${job.company.toLowerCase()}.com`}
//                 alt="logo"
//                 style={{
//                   width: "45px",
//                   height: "45px",
//                   borderRadius: "12px"
//                 }}
//                 onError={(e) =>
//                   e.target.style.display = "none"
//                 }
//               />

//             </div>

//             <div className="my-3">

//               <span className="badge bg-success">
//                 {job.matchScore || 85}% Match
//               </span>

//             </div>

//             <p className="text-muted">
//               📍 {job.location}
//             </p>

//             <div className="mb-4">

//               {job.skills?.split(",").map(
//                 (skill, index) => (

//                   <span
//                     key={index}
//                     className="badge bg-primary me-2 mb-2"
//                   >
//                     {skill.trim()}
//                   </span>
//                 )
//               )}

//             </div>

//             <div className="d-flex justify-content-between align-items-center">

//               <small className="text-muted">
//                 {job.applications || 0} applicants
//               </small>

//               {job.applied ? (

//                 <button
//                   className="btn btn-success"
//                   disabled
//                 >
//                   Applied
//                 </button>

//               ) : (

//                 <button
//                   className="btn btn-primary"
//                   onClick={async () => {

//       await applyJob(job.id);

//       job.applied = true;
//     }}
//                 >
//                   Apply
//                 </button>
//               )}

//             </div>

//           </motion.div>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default RecommendedJobs;

import { useNavigate } from "react-router-dom";
import { MapPin, Building2, Briefcase, ChevronRight } from "lucide-react";

function RecommendedJobs({ recommendedJobs, applyJob }) {
  const navigate = useNavigate();

  const displayJobs = recommendedJobs.slice(0, 4);

  return (
    <div className="mb-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Recommended Jobs</h5>
        <button
          className="btn btn-link text-decoration-none fw-semibold p-0 d-flex align-items-center gap-1"
          style={{ color: "#5b5df0" }}
          onClick={() => navigate("/recommended")}
        >
          View all <ChevronRight size={16} />
        </button>
      </div>

      {/* HORIZONTAL SCROLL CARDS */}
      {displayJobs.length === 0 ? (
        <div
          className="bg-white shadow-sm p-5 text-center"
          style={{ borderRadius: "20px" }}
        >
          <p className="text-muted mb-0">
            Update your profile skills to get personalized recommendations.
          </p>
        </div>
      ) : (
        <div
          className="d-flex pb-3"
          style={{
            gap: "16px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayJobs.map((job, index) => (
            <div
              key={job.id}
              className="bg-white shadow-sm flex-shrink-0"
              style={{
                width: "clamp(260px, 75vw, 300px)",
                borderRadius: "20px",
                padding: "20px",
                border: index === 0 ? "2px solid #5b5df0" : "1px solid #f0f0f0",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(91,93,240,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* TOP ROW */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div
                  className="d-flex justify-content-center align-items-center text-white fw-bold"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #5b5df0, #7a6bff)",
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {job.company?.charAt(0).toUpperCase()}
                </div>
                <div
                  className="text-white px-2 py-1"
                  style={{
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #10b981, #06b6d4)",
                    fontWeight: "700",
                    fontSize: "13px",
                  }}
                >
                  🔥 {job.matchPercentage ?? 85}%
                </div>
              </div>

              {/* JOB INFO */}
              <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>
                {job.title}
              </h6>
              <div className="d-flex align-items-center gap-1 text-muted mb-1" style={{ fontSize: "13px" }}>
                <Building2 size={13} /> {job.company}
              </div>
              <div className="d-flex align-items-center gap-1 text-muted mb-3" style={{ fontSize: "13px" }}>
                <MapPin size={13} /> {job.location}
              </div>

              {/* SKILLS */}
              <div className="d-flex flex-wrap gap-1 mb-3">
                {job.requiredSkills?.split(",").slice(0, 3).map((skill, i) => (
                  <span
                    key={i}
                    className="badge bg-light text-dark"
                    style={{ borderRadius: "8px", fontSize: "11px", fontWeight: "500" }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>

              {/* MATCH BAR */}
              <div className="progress mb-3" style={{ height: "6px", borderRadius: "10px" }}>
                <div
                  className="progress-bar"
                  style={{
                    width: `${job.matchPercentage ?? 85}%`,
                    background: "linear-gradient(to right, #10b981, #06b6d4)",
                  }}
                />
              </div>

              {/* APPLY BUTTON */}
              {job.applied ? (
                <button
                  className="btn w-100 fw-semibold"
                  disabled
                  style={{
                    borderRadius: "12px",
                    background: "#e9f7ef",
                    color: "#10b981",
                    border: "none",
                    fontSize: "14px",
                  }}
                >
                  ✓ Applied
                </button>
              ) : (
                <button
                  className="btn w-100 text-white fw-semibold"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(to right, #5b5df0, #7a6bff)",
                    border: "none",
                    fontSize: "14px",
                  }}
                  onClick={() => applyJob(job.id)}
                >
                  <Briefcase size={14} className="me-1" />
                  Apply Now
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedJobs;