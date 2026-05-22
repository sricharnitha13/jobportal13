/* eslint-disable react-hooks/exhaustive-deps */
import {

  useEffect,
  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import {

  Sparkles,
  MapPin,
  Building2,
  Briefcase,
  ArrowLeft

} from "lucide-react";

function RecommendedJobsPage() {

  const navigate =
    useNavigate();

  const [jobs, setJobs] =
    useState([]);

  const token =
    localStorage.getItem("token");

  // 🚀 FETCH AI JOBS

  useEffect(() => {

    fetchRecommendedJobs();

  }, [fetchRecommendedJobs]);

  const fetchRecommendedJobs =
    async () => {

      try {

        const res = await fetch(

          "https://jobportal13.onrender.com/jobs/recommended",

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

      } catch (err) {

        console.log(err);
      }
    };

  return (

    <div
      className="p-4 p-md-5"
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
        mb-5
        flex-wrap
        gap-3
      ">

        <div>

          <h1
            className="fw-bold mb-2"
            style={{
              fontSize: "42px"
            }}
          >

            AI Recommended Jobs

          </h1>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: "18px"
            }}
          >

            Personalized opportunities
            based on your skills,
            interests, and profile.

          </p>

        </div>

        <button

          className="
            btn
            btn-dark
            d-flex
            align-items-center
            gap-2
            px-4
          "

          style={{
            height: "54px",
            borderRadius: "16px"
          }}

          onClick={() =>
            navigate("/dashboard")
          }
        >

          <ArrowLeft size={18} />

          Dashboard

        </button>

      </div>

      {/* JOBS */}

      <div className="row">

        {jobs.length === 0 ? (

          <div className="col-12">

            <div

              className="
                bg-white
                shadow-sm
                p-5
                text-center
              "

              style={{
                borderRadius: "24px"
              }}
            >

              <Sparkles
                size={48}
                color="#6c63ff"
              />

              <h4 className="
                fw-bold
                mt-4
              ">

                No Recommendations Yet

              </h4>

              <p className="
                text-muted
                mt-2
              ">

                Update your profile
                skills to receive
                personalized AI job
                recommendations.

              </p>

            </div>

          </div>

        ) : (

          jobs.map((job) => (

            <div
              className="
                col-lg-6
                mb-4
              "
              key={job.id}
            >

              <div

                className="
                  bg-white
                  shadow-sm
                  p-4
                  h-100
                "

                style={{
                  borderRadius: "24px"
                }}
              >

                {/* TOP */}

                <div className="
                  d-flex
                  justify-content-between
                  align-items-start
                  mb-4
                ">

                  <div>

                    <h4 className="
                      fw-bold
                      mb-2
                    ">

                      {job.title}

                    </h4>

                    <div className="
                      d-flex
                      align-items-center
                      gap-2
                      text-muted
                      mb-2
                    ">

                      <Building2
                        size={16}
                      />

                      {job.company}

                    </div>

                    <div className="
                      d-flex
                      align-items-center
                      gap-2
                      text-muted
                    ">

                      <MapPin
                        size={16}
                      />

                      {job.location}

                    </div>

                  </div>

                  {/* MATCH */}

                  <div
                    className="
                      text-white
                      px-3
                      py-2
                    "
                    style={{

                      borderRadius:
                        "14px",

                      background:
                        "linear-gradient(to right, #10b981, #06b6d4)",

                      fontWeight:
                        "600"
                    }}
                  >

                    🔥 {
                      job.matchPercentage
                    }%

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p
                  className="text-muted"
                  style={{
                    minHeight: "70px"
                  }}
                >

                  {job.description}

                </p>

                {/* SKILLS */}

                <div className="mt-4">

                  <small className="
                    fw-semibold
                    text-muted
                  ">

                    Required Skills

                  </small>

                  <div className="
                    d-flex
                    flex-wrap
                    gap-2
                    mt-2
                  ">

                    {job.requiredSkills
                      ?.split(",")
                      .map((skill, i) => (

                        <span

                          key={i}

                          className="
                            badge
                            bg-light
                            text-dark
                            px-3
                            py-2
                          "

                          style={{
                            borderRadius:
                              "12px"
                          }}
                        >

                          {skill.trim()}

                        </span>
                      ))}

                  </div>

                </div>

                {/* MATCH BAR */}

                <div className="mt-4">

                  <div className="
                    progress
                  "
                  style={{
                    height: "12px",
                    borderRadius: "20px"
                  }}
                  >

                    <div

                      className="
                        progress-bar
                      "

                      style={{

                        width:
                          `${job.matchPercentage}%`,

                        background:
                          "linear-gradient(to right, #10b981, #06b6d4)"
                      }}
                    />

                  </div>

                </div>

                {/* BUTTON */}

                <button

                  className="
                    btn
                    w-100
                    mt-4
                    text-white
                  "

                  style={{

                    height: "54px",

                    borderRadius:
                      "16px",

                    fontWeight:
                      "600",

                    background:
                      "linear-gradient(to right, #5b5df0, #6c63ff)",

                    border: "none"
                  }}
                >

                  <Briefcase
                    size={18}
                    className="me-2"
                  />

                  Apply Now

                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default RecommendedJobsPage;