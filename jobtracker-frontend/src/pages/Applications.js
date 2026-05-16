

// import {

//   useState,
//   useEffect

// } from "react";

// import {

//   useNavigate

// } from "react-router-dom";

// function Applications() {

//   const navigate = useNavigate();

//   const [

//     appliedJobs,
//     setAppliedJobs

//   ] = useState([]);

//   // 🔄 LOAD

//   useEffect(() => {

//     const jobs = JSON.parse(

//       localStorage.getItem(
//         "appliedJobs"
//       ) || "[]"

//     );

//     setAppliedJobs(jobs);

//   }, []);

//   // ❌ REMOVE

//   const removeApplication =
//     (jobId) => {

//       const updatedJobs =
//         appliedJobs.filter(

//           job => job.id !== jobId
//         );

//       setAppliedJobs(updatedJobs);

//       localStorage.setItem(

//         "appliedJobs",

//         JSON.stringify(updatedJobs)

//       );
//     };

//   return (

//     <div className="p-4">

//       {/* HEADER */}

//       <div className="
//         d-flex
//         justify-content-between
//         align-items-center
//         mb-4
//       ">

//         <h2 className="fw-bold">
//           Applications
//         </h2>

//         <button

//           className="btn btn-dark"

//           onClick={() =>
//             navigate("/dashboard")
//           }
//         >
//           ← Dashboard
//         </button>

//       </div>

//       {/* EMPTY */}

//       {appliedJobs.length === 0 ? (

//         <div className="
//           card
//           border-0
//           shadow-sm
//           p-5
//           text-center
//         ">

//           <h4 className="fw-bold mb-3">

//             No Applications Yet

//           </h4>

//           <p className="text-muted">

//             Start applying for jobs.

//           </p>

//         </div>

//       ) : (

//         <div className="row">

//           {appliedJobs.map((job) => (

//             <div
//               key={job.id}
//               className="col-lg-6 mb-4"
//             >

//               <div
//                 className="
//                   card
//                   border-0
//                   shadow-sm
//                   p-4
//                   h-100
//                 "
//                 style={{
//                   borderRadius: "24px"
//                 }}
//               >

//                 <h4 className="fw-bold mb-2">

//                   {job.title}

//                 </h4>

//                 <p className="text-muted mb-2">

//                   {job.company}

//                 </p>

//                 <p className="text-muted">

//                   📍 {job.location}

//                 </p>

//                 <div className="
//                   d-flex
//                   justify-content-between
//                   align-items-center
//                   mt-4
//                 ">

//                   <span className="
//                     badge
//                     bg-success
//                   ">

//                     Applied

//                   </span>

//                   <button

//                     className="
//                       btn
//                       btn-outline-danger
//                     "

//                     onClick={() =>
//                       removeApplication(
//                         job.id
//                       )
//                     }
//                   >
//                     Remove
//                   </button>

//                 </div>

//               </div>

//             </div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }

// export default Applications;
import {

  useState,
  useEffect

} from "react";

import {

  useNavigate

} from "react-router-dom";

function Applications() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const [

    appliedJobs,
    setAppliedJobs

  ] = useState([]);

  const [

    loading,
    setLoading

  ] = useState(false);

  const [

    error,
    setError

  ] = useState("");

  // 🔥 FETCH APPLIED JOBS

  const fetchAppliedJobs =
    async () => {

      try {

        setLoading(true);

        const res = await fetch(

          "http://localhost:9090/jobs",

          {
            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        if (!res.ok) {

          throw new Error();
        }

        const data =
          await res.json();

        // 🔥 ONLY APPLIED

        const applied =
          data.filter(

            job => job.applied === true
          );

        setAppliedJobs(applied);

      } catch {

        setError(
          "Failed to load applications"
        );

      } finally {

        setLoading(false);
      }
    };

  // 🔄 LOAD

  useEffect(() => {

    fetchAppliedJobs();

  }, []);

  // ❌ REMOVE APPLICATION

  const removeApplication =
    async (jobId) => {

      try {

        await fetch(

          `http://localhost:9090/applications/${jobId}`,

          {
            method: "DELETE",

            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        fetchAppliedJobs();

      } catch {

        alert(
          "Failed to remove application"
        );
      }
    };

  return (

    <div className="p-4">

      {/* HEADER */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        mb-4
      ">

        <h2 className="fw-bold">
          Applications
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

      {/* ERROR */}

      {error && (

        <div className="alert alert-danger">

          {error}

        </div>
      )}

      {/* LOADING */}

      {loading && (

        <p>Loading...</p>

      )}

      {/* EMPTY */}

      {!loading &&
        appliedJobs.length === 0 && (

        <div className="
          card
          border-0
          shadow-sm
          p-5
          text-center
        ">

          <h4 className="fw-bold mb-3">

            No Applications Yet

          </h4>

          <p className="text-muted">

            Start applying for jobs.

          </p>

        </div>
      )}

      {/* APPLICATIONS */}

      <div className="row">

        {appliedJobs.map((job) => (

          <div
            key={job.id}
            className="col-lg-6 mb-4"
          >

            <div
              className="
                card
                border-0
                shadow-sm
                p-4
                h-100
              "
              style={{
                borderRadius: "24px"
              }}
            >

              <h4 className="fw-bold mb-2">

                {job.title}

              </h4>

              <p className="text-muted mb-2">

                {job.company}

              </p>

              <p className="text-muted">

                📍 {job.location}

              </p>

              <div className="
                d-flex
                justify-content-between
                align-items-center
                mt-4
              ">

                <span className="
                  badge
                  bg-success
                ">

                  Applied

                </span>

                <button

                  className="
                    btn
                    btn-outline-danger
                  "

                  onClick={() =>
                    removeApplication(
                      job.id
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Applications;