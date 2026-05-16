import { useNavigate } from "react-router-dom";

function LandingPage() {

  const navigate =
    useNavigate();
  const token =
  localStorage.getItem("token");
  const featuredJobs = [

    {

      title:
        "Frontend Developer",

      company: "Google",

      location: "Remote"

    },

    {

      title:
        "Backend Engineer",

      company: "Microsoft",

      location: "Hyderabad"

    },

    {

      title:
        "UI/UX Designer",

      company: "Amazon",

      location: "Bangalore"

    }

  ];

  const companies = [

    "Google",

    "Microsoft",

    "Amazon",

    "Netflix",

    "Adobe",

    "Meta"

  ];

  return (

    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >

      {/* NAVBAR */}

      <nav

        className="
          d-flex
          justify-content-between
          align-items-center
          px-4
          px-md-5
          py-4
          bg-white
          shadow-sm
        "
      >

        {/* LOGO */}

        <h2
          className="
            fw-bold
            mb-0
          "
          style={{
            color: "#5b5df0"
          }}
        >

          JobPortal

        </h2>

        {/* BUTTONS */}

        <div className="
          d-flex
          gap-3
        ">

          <button

            onClick={() =>
              navigate("/login")
            }

            className="
              btn
              btn-light
              border
              px-4
            "

            style={{
              borderRadius: "14px"
            }}
          >

            Login

          </button>

          <button

            onClick={() =>
              navigate("/register")
            }

            className="
              btn
              text-white
              px-4
            "

            style={{

              borderRadius: "14px",

              background:
                "#5b5df0"

            }}
          >

            Register

          </button>

        </div>

      </nav>

      {/* HERO SECTION */}

      <section
        className="
          container
          py-5
        "
      >

        <div className="
          row
          align-items-center
          g-5
        ">

          {/* LEFT */}

          <div className="
            col-lg-6
          ">

            <span

              className="
                badge
                px-3
                py-2
                mb-4
              "

              style={{

                background:
                  "#ebe9ff",

                color:
                  "#5b5df0",

                borderRadius:
                  "999px"

              }}
            >

              🚀 Find Your Dream Job

            </span>

            <h1

              className="
                fw-bold
                mb-4
              "

              style={{

                fontSize:
                  "clamp(42px, 6vw, 72px)",

                lineHeight: "1.1"

              }}
            >

              Discover
              Opportunities
              That Shape
              Your Future.

            </h1>

            <p

              className="
                text-muted
                mb-4
              "

              style={{
                fontSize: "20px"
              }}
            >

              Explore thousands of
              jobs from top companies
              and build your career
              with confidence.

            </p>

            <div className="
              d-flex
              gap-3
              flex-wrap
            ">

              <button

                onClick={() =>
                  navigate("/register")
                }

                className="
                  btn
                  text-white
                  px-4
                  py-3
                  fw-semibold
                "

                style={{

                  borderRadius: "16px",

                  background:
                    "#5b5df0"

                }}
              >

                Get Started

              </button>

              <button

                onClick={() =>
                  navigate("/login")
                }

                className="
                  btn
                  btn-light
                  border
                  px-4
                  py-3
                  fw-semibold
                "

                style={{
                  borderRadius: "16px"
                }}
              >

                Explore Jobs

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="
            col-lg-6
          ">

            <div

              className="
                bg-white
                shadow-sm
                p-4
              "

              style={{
                borderRadius: "28px"
              }}
            >

              <h4 className="
                fw-bold
                mb-4
              ">
                Featured Jobs
              </h4>

              <div className="
                d-flex
                flex-column
                gap-3
              ">

                {featuredJobs.map(
                  (job, index) => (

                    <div

                      key={index}

                      className="
                        border
                        p-4
                      "

                      style={{
                        borderRadius: "20px"
                      }}
                    >

                      <div className="
                        d-flex
                        justify-content-between
                        align-items-center
                        flex-wrap
                        gap-3
                      ">

                        <div>

                          <h5 className="
                            fw-semibold
                            mb-1
                          ">
                            {job.title}
                          </h5>

                          <p className="
                            text-muted
                            mb-0
                          ">

                            {job.company}
                            {" • "}
                            {job.location}

                          </p>

                        </div>

                        <button

                          onClick={() =>
                            navigate("/login")
                          }

                          className="
                            btn
                            btn-dark
                          "

                          style={{
                            borderRadius: "12px"
                          }}
                        >

                          Apply

                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* COMPANIES */}

      <section
        className="
          container
          py-5
        "
      >

        <div className="
          text-center
          mb-5
        ">

          <h2 className="
            fw-bold
          ">
            Trusted by Top Companies
          </h2>

          <p className="
            text-muted
            mt-2
          ">

            Join opportunities from
            leading organizations.

          </p>

        </div>

        <div className="
          row
          g-4
        ">

          {companies.map(
            (company, index) => (

              <div
                key={index}
                className="
                  col-6
                  col-md-4
                  col-lg-2
                "
              >

                <div

                  className="
                    bg-white
                    shadow-sm
                    text-center
                    p-4
                    h-100
                  "

                  style={{
                    borderRadius: "20px"
                  }}
                >

                  <h5 className="
                    fw-semibold
                    mb-0
                  ">

                    {company}

                  </h5>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      {/* CTA */}

      <section
        className="
          container
          py-5
        "
      >

        <div

          className="
            text-center
            text-white
            p-5
          "

          style={{

            borderRadius: "32px",

            background:
              "linear-gradient(to right, #5b5df0, #7a6bff)"

          }}
        >

          <h2 className="
            fw-bold
            mb-3
          ">

            Ready to Start
            Your Career Journey?

          </h2>

          <p
            className="mb-4"
            style={{
              fontSize: "18px"
            }}
          >

            Create your account
            and unlock personalized
            job opportunities.

          </p>

          <button

            onClick={() =>
              navigate("/register")
            }

            className="
              btn
              btn-light
              px-4
              py-3
              fw-semibold
            "

            style={{
              borderRadius: "16px"
            }}
          >

            Create Account

          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer
        className="
          text-center
          py-4
          text-muted
        "
      >

        © 2026 JobPortal.
        All rights reserved.

      </footer>

    </div>
  );
}

export default LandingPage;