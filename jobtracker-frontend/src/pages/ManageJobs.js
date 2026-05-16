// import {

//   useEffect,
//   useState

// } from "react";

// function ManageJobs() {

//   const token =
//     localStorage.getItem("token");

//   const [jobs, setJobs] =
//     useState([]);

//   useEffect(() => {

//     fetchJobs();

//   }, []);

//   const fetchJobs =
//     async () => {

//       try {

//         const res = await fetch(

//           "http://localhost:9090/jobs",

//           {
//             headers: {
//               Authorization:
//                 "Bearer " + token
//             }
//           }
//         );

//         const data =
//           await res.json();

//         setJobs(data);

//       } catch {

//         alert(
//           "Failed to load jobs"
//         );
//       }
//     };

//   // DELETE JOB

//   const deleteJob =
//     async (id) => {

//       const confirmDelete =
//         window.confirm(

//           "Delete this job?"
//         );

//       if (!confirmDelete)
//         return;

//       try {

//         await fetch(

//           `http://localhost:9090/jobs/${id}`,

//           {

//             method: "DELETE",

//             headers: {
//               Authorization:
//                 "Bearer " + token
//             }
//           }
//         );

//         fetchJobs();

//       } catch {

//         alert(
//           "Failed to delete"
//         );
//       }
//     };

//   return (

//     <div className="
//       container
//       py-4
//     ">

//       <div

//         className="
//           bg-white
//           shadow-sm
//           p-4
//         "

//         style={{
//           borderRadius: "24px"
//         }}
//       >

//         <div className="
//           d-flex
//           justify-content-between
//           align-items-center
//           mb-4
//         ">

//           <div>

//             <h2 className="
//               fw-bold
//               mb-1
//             ">
//               Manage Jobs
//             </h2>

//             <p className="
//               text-muted
//               mb-0
//             ">

//               Edit or remove
//               job listings.

//             </p>

//           </div>

//         </div>

//         <div className="
//           table-responsive
//         ">

//           <table className="
//             table
//             align-middle
//           ">

//             <thead>

//               <tr>

//                 <th>Title</th>

//                 <th>Company</th>

//                 <th>Location</th>

//                 <th>Actions</th>

//               </tr>

//             </thead>

//             <tbody>

//               {jobs.map(job => (

//                 <tr key={job.id}>

//                   <td>
//                     {job.title}
//                   </td>

//                   <td>
//                     {job.company}
//                   </td>

//                   <td>
//                     {job.location}
//                   </td>

//                   <td>

//                     <div className="
//                       d-flex
//                       gap-2
//                     ">

//                       {/* EDIT */}

//                       <button

//                         className="
//                           btn
//                           btn-primary
//                           btn-sm
//                         "
//                       >

//                         Edit

//                       </button>

//                       {/* DELETE */}

//                       <button

//                         onClick={() =>
//                           deleteJob(job.id)
//                         }

//                         className="
//                           btn
//                           btn-danger
//                           btn-sm
//                         "
//                       >

//                         Delete

//                       </button>

//                     </div>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManageJobs;


import {

  useEffect,
  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

function ManageJobs() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const [jobs, setJobs] =
    useState([]);

  const [

    loading,
    setLoading

  ] = useState(false);

  const [

    showDeleteModal,
    setShowDeleteModal

  ] = useState(false);

  const [

    selectedJobId,
    setSelectedJobId

  ] = useState(null);

  // FETCH JOBS

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs =
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

        const data =
          await res.json();

        setJobs(data);

      } catch {

        alert(
          "Failed to load jobs"
        );

      } finally {

        setLoading(false);
      }
    };

  // DELETE JOB

  const deleteJob =
    async () => {

      try {

        await fetch(

          `http://localhost:9090/jobs/${selectedJobId}`,

          {

            method: "DELETE",

            headers: {
              Authorization:
                "Bearer " + token
            }
          }
        );

        setShowDeleteModal(false);

        fetchJobs();

      } catch {

        alert(
          "Failed to delete job"
        );
      }
    };

  return (

    <div

      className="
        container-fluid
        py-4
        px-3
        px-md-4
      "

      style={{
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}

      <div className="
        d-flex
        justify-content-between
        align-items-center
        flex-wrap
        gap-3
        mb-4
      ">

        <div>

          <h1 className="
            fw-bold
            mb-1
          ">
            Manage Jobs
          </h1>

          <p className="
            text-muted
            mb-0
          ">

            Edit, manage,
            and remove job
            listings.

          </p>

        </div>

        {/* ADD JOB */}

        <button

          onClick={() =>
            navigate(
              "/admin/post-job"
            )
          }

          className="
            btn
            btn-dark
            px-4
            py-2
            fw-semibold
          "

          style={{
            borderRadius: "14px"
          }}
        >

          ➕ Add New Job

        </button>

      </div>

      {/* MAIN CARD */}

      <div

        className="
          bg-white
          shadow-sm
          overflow-hidden
        "

        style={{
          borderRadius: "24px"
        }}
      >

        {/* TABLE */}

        <div className="
          table-responsive
        ">

          <table className="
            table
            align-middle
            mb-0
          ">

            <thead
              style={{
                background: "#f8f9fc"
              }}
            >

              <tr>

                <th className="p-4">
                  Job Title
                </th>

                <th className="p-4">
                  Company
                </th>

                <th className="p-4">
                  Location
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      text-center
                      p-5
                    "
                  >

                    Loading...

                  </td>

                </tr>

              ) : jobs.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="
                      text-center
                      p-5
                    "
                  >

                    No jobs found.

                  </td>

                </tr>

              ) : (

                jobs.map(job => (

                  <tr key={job.id}>

                    {/* TITLE */}

                    <td className="p-4">

                      <div>

                        <h6 className="
                          fw-semibold
                          mb-1
                        ">
                          {job.title}
                        </h6>

                        <small className="
                          text-muted
                        ">
                          Job ID:
                          {" "}
                          {job.id}
                        </small>

                      </div>

                    </td>

                    {/* COMPANY */}

                    <td className="p-4">

                      {job.company}

                    </td>

                    {/* LOCATION */}

                    <td className="p-4">

                      {job.location}

                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">

                      <div className="
                        d-flex
                        gap-2
                        flex-wrap
                      ">

                        {/* EDIT */}

                        <button

                          onClick={() =>

                            navigate(
                              `/admin/post-job/${job.id}`
                            )

                          }

                          className="
                            btn
                            btn-primary
                            btn-sm
                            px-3
                          "

                          style={{
                            borderRadius: "10px"
                          }}
                        >

                          ✏ Edit

                        </button>

                        {/* DELETE */}

                        <button

                          onClick={() => {

                            setSelectedJobId(
                              job.id
                            );

                            setShowDeleteModal(
                              true
                            );
                          }}

                          className="
                            btn
                            btn-danger
                            btn-sm
                            px-3
                          "

                          style={{
                            borderRadius: "10px"
                          }}
                        >

                          🗑 Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* DELETE MODAL */}

      {showDeleteModal && (

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
              "rgba(0,0,0,0.45)",

            zIndex: 3000

          }}
        >

          <div

            className="
              bg-white
              p-4
            "

            style={{

              width: "100%",

              maxWidth: "420px",

              borderRadius: "24px"

            }}
          >

            <h3 className="
              fw-bold
              mb-3
            ">
              Delete Job
            </h3>

            <p className="
              text-muted
              mb-4
            ">

              Are you sure you want
              to permanently remove
              this job listing?

            </p>

            <div className="
              d-flex
              justify-content-end
              gap-3
            ">

              {/* CANCEL */}

              <button

                onClick={() =>
                  setShowDeleteModal(false)
                }

                className="
                  btn
                  btn-light
                  px-4
                "

                style={{
                  borderRadius: "12px"
                }}
              >

                Cancel

              </button>

              {/* DELETE */}

              <button

                onClick={deleteJob}

                className="
                  btn
                  btn-danger
                  px-4
                "

                style={{
                  borderRadius: "12px"
                }}
              >

                Delete

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default ManageJobs;