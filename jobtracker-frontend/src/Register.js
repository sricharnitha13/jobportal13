import {

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      username: "",

      email: "",

      password: ""

    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });
  };

  // REGISTER

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const res = await fetch(

          "https://jobportal13.onrender.com/auth/register",

          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

              username:
                formData.username,

              email:
                formData.email,

              password:
                formData.password

            })

          }
        );

        if (!res.ok) {

          throw new Error(
            "Registration failed"
          );
        }

        alert(
          "Account created successfully"
        );

        navigate("/login");

      } catch {

        setError(
          "Unable to register. Try again."
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div

      className="
        d-flex
        justify-content-center
        align-items-center
        px-3
      "

      style={{

        minHeight: "100vh",

        background:
          "#f5f7fb"

      }}
    >

      <div

        className="
          bg-white
          shadow-sm
          overflow-hidden
        "

        style={{

          width: "100%",

          maxWidth: "1100px",

          borderRadius: "32px"

        }}
      >

        <div className="row g-0">

          {/* LEFT SIDE */}

          <div

            className="
              col-lg-6
              d-none
              d-lg-flex
              flex-column
              justify-content-center
              p-5
              text-white
            "

            style={{

              background:
                "linear-gradient(to bottom right, #5b5df0, #7a6bff)",

              minHeight: "720px"

            }}
          >

            <div>

              <h1

                className="
                  fw-bold
                  mb-4
                "

                style={{
                  fontSize: "64px"
                }}
              >

                Start Your
                Career Journey

              </h1>

              <p

                style={{
                  fontSize: "22px",
                  opacity: 0.9
                }}
              >

                Join thousands of
                professionals discovering
                opportunities from
                top companies.

              </p>

            </div>

            {/* FEATURES */}

            <div className="
              mt-5
              d-flex
              flex-column
              gap-4
            ">

              <div>

                <h5 className="
                  fw-semibold
                ">
                  🚀 Smart Job Matching
                </h5>

                <p
                  style={{
                    opacity: 0.8
                  }}
                >

                  Personalized
                  recommendations based
                  on your skills.

                </p>

              </div>

              <div>

                <h5 className="
                  fw-semibold
                ">
                  💼 Top Companies
                </h5>

                <p
                  style={{
                    opacity: 0.8
                  }}
                >

                  Explore opportunities
                  from industry leaders.

                </p>

              </div>

              <div>

                <h5 className="
                  fw-semibold
                ">
                  📈 Career Growth
                </h5>

                <p
                  style={{
                    opacity: 0.8
                  }}
                >

                  Track applications
                  and grow professionally.

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div
            className="
              col-lg-6
              p-4
              p-md-5
            "
          >

            {/* LOGO */}

            <h2

              className="
                fw-bold
                mb-5
              "

              style={{
                color: "#5b5df0"
              }}
            >

              JobPortal

            </h2>

            {/* TITLE */}

            <div className="mb-4">

              <h1 className="
                fw-bold
                mb-2
              ">
                Create Account
              </h1>

              <p className="
                text-muted
              ">

                Join JobPortal and
                discover your next
                opportunity.

              </p>

            </div>

            {/* ERROR */}

            {error && (

              <div className="
                alert
                alert-danger
                mb-4
              ">

                {error}

              </div>

            )}

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
            >

              {/* USERNAME */}

              <div className="mb-4">

                <label className="
                  fw-semibold
                  mb-2
                ">
                  Username
                </label>

                <input

                  type="text"

                  name="username"

                  value={formData.username}

                  onChange={handleChange}

                  placeholder="Enter username"

                  className="form-control"

                  required

                  style={{

                    height: "62px",

                    borderRadius: "16px",

                    fontSize: "16px"

                  }}
                />

              </div>

              {/* EMAIL */}

              <div className="mb-4">

                <label className="
                  fw-semibold
                  mb-2
                ">
                  Email
                </label>

                <input

                  type="email"

                  name="email"

                  value={formData.email}

                  onChange={handleChange}

                  placeholder="Enter email"

                  className="form-control"

                  required

                  style={{

                    height: "62px",

                    borderRadius: "16px",

                    fontSize: "16px"

                  }}
                />

              </div>

              {/* PASSWORD */}

              <div className="mb-4">

                <label className="
                  fw-semibold
                  mb-2
                ">
                  Password
                </label>

                <input

                  type="password"

                  name="password"

                  value={formData.password}

                  onChange={handleChange}

                  placeholder="Create password"

                  className="form-control"

                  required

                  style={{

                    height: "62px",

                    borderRadius: "16px",

                    fontSize: "16px"

                  }}
                />

              </div>

              {/* BUTTON */}

              <button

                type="submit"

                disabled={loading}

                className="
                  btn
                  text-white
                  w-100
                  py-3
                  fw-semibold
                  mt-2
                "

                style={{

                  borderRadius: "16px",

                  background:
                    "#5b5df0",

                  border: "none",

                  fontSize: "18px"

                }}
              >

                {loading

                  ? "Creating Account..."

                  : "Create Account"

                }

              </button>

            </form>

            {/* LOGIN */}

            <div className="
              text-center
              mt-4
            ">

              <span className="
                text-muted
              ">

                Already have
                an account?

              </span>

              <button

                onClick={() =>
                  navigate("/login")
                }

                className="
                  btn
                  btn-link
                  text-decoration-none
                  fw-semibold
                "

                style={{
                  color: "#5b5df0"
                }}
              >

                Login

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;