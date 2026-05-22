import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
  async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      const res = await fetch(

        "https://jobportal13.onrender.com/auth/login",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            email,
            password

          })
        }
      );

      // ❌ LOGIN FAILED

      if (!res.ok) {

        throw new Error(
          "Invalid email or password"
        );
      }

      // ✅ GET TOKEN

      const token =
        await res.text();

      // ✅ SAVE TOKEN

      localStorage.setItem(
        "token",
        token
      );

      // ✅ TEMP ROLE

      if (
  email === "admin@gmail.com"
) {

  localStorage.setItem(
    "role",
    "ADMIN"
  );

} else {

  localStorage.setItem(
    "role",
    "USER"
  );
}

      // ✅ NAVIGATE

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
        d-flex
        min-vh-100
      "
      style={{
        background: "#f5f7fb"
      }}
    >

      {/* LEFT SIDE */}

      <div
        className="
          d-none
          d-lg-flex
          flex-column
          justify-content-center
          text-white
          p-5
        "
        style={{
          width: "50%",
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)"
        }}
      >

        <h1
          className="fw-bold mb-4"
          style={{
            fontSize: "58px",
            lineHeight: "1.1"
          }}
        >
          Find Your
          Dream Job.
        </h1>

        <p
          style={{
            fontSize: "18px",
            maxWidth: "500px",
            color:
              "rgba(255,255,255,0.8)"
          }}
        >

          Discover opportunities,
          connect with top companies,
          and build your future
          with JobPortal.

        </p>

        <div className="mt-5">

          <div className="mb-3">
            ✅ AI Based Recommendations
          </div>

          <div className="mb-3">
            ✅ Track Applications
          </div>

          <div className="mb-3">
            ✅ Save Jobs For Later
          </div>

          <div>
            ✅ Discover Hiring Companies
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div
        className="
          d-flex
          justify-content-center
          align-items-center
          w-100
          p-4
        "
      >

        <div
          className="
            bg-white
            shadow-sm
            p-4
            p-md-5
          "
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "28px"
          }}
        >

          {/* MOBILE LOGO */}

          <div className="
            d-lg-none
            text-center
            mb-4
          ">

            <h1
              className="
                fw-bold
                text-primary
              "
            >
              JobPortal
            </h1>

          </div>

          <h2
            className="
              fw-bold
              mb-2
            "
          >
            Welcome Back
          </h2>

          <p
            className="
              text-muted
              mb-4
            "
          >
            Login to continue
            your career journey.
          </p>

          {/* ERROR */}

          {error && (

            <div
              className="
                alert
                alert-danger
                py-2
                small
              "
              style={{
                borderRadius: "12px"
              }}
            >
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <div className="mb-3">

              <label
                className="
                  form-label
                  fw-semibold
                "
              >
                Email
              </label>

              <input
                type="email"
                className="
                  form-control
                  py-3
                "
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                style={{
                  borderRadius: "14px"
                }}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-4">

              <label
                className="
                  form-label
                  fw-semibold
                "
              >
                Password
              </label>

              <input
                type="password"
                className="
                  form-control
                  py-3
                "
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                style={{
                  borderRadius: "14px"
                }}
                required
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                btn
                btn-primary
                w-100
                py-3
                fw-semibold
              "
              style={{
                borderRadius: "14px",
                fontSize: "16px"
              }}
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>

          {/* REGISTER */}

          <div
            className="
              text-center
              mt-4
            "
          >

            <span className="text-muted">

              New user?

            </span>

            {" "}

            <Link
              to="/register"
              className="
                fw-semibold
                text-decoration-none
              "
            >
              Create account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;