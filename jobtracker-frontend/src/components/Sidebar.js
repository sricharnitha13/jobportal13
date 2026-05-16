import { useNavigate } from "react-router-dom";

function Sidebar({

  sidebarOpen,
  setSidebarOpen

}) {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  return (

    <div

      className="
        position-fixed
        top-0
        start-0
        h-100
      "

      style={{

        width:

          window.innerWidth < 992
            ? "220px"
            : "260px",

        background:
          "linear-gradient(to bottom, #0f172a, #111827)",

        zIndex: 1050,

        transition: "0.3s",

        transform:

          window.innerWidth < 992

            ? sidebarOpen
              ? "translateX(0)"
              : "translateX(-100%)"

            : "translateX(0)"

      }}
    >

      <div
        className="
          text-white
          d-flex
          flex-column
          justify-content-between
          p-4
          h-100
        "
      >

        {/* TOP */}

        <div>

          {/* MOBILE CLOSE */}

          <div className="
            d-flex
            justify-content-end
            d-lg-none
            mb-3
          ">

            <button
              className="btn btn-sm btn-light"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              ✕
            </button>

          </div>

          {/* LOGO */}

          <h2 className="
            fw-bold
            text-info
            mb-4
          ">
            JobPortal
          </h2>

          {/* MAIN */}

          <div className="mb-4">

            <small className="
              text-secondary
              text-uppercase
            ">
              Main
            </small>

            <div className="
              d-flex
              flex-column
              gap-2
              mt-3
            ">

              {/* DASHBOARD */}

              <button

                onClick={() => {

                  navigate("/dashboard");

                  if (
                    window.innerWidth < 992
                  ) {

                    setSidebarOpen(false);
                  }
                }}

                className="
                  btn
                  text-start
                  py-2
                  rounded-3
                  border-0
                  text-white
                "

                style={{
                  background: "#1f2937"
                }}
              >
                🏠 Dashboard
              </button>

              {/* EXPLORE */}

              {role === "USER" && (

                <button

                  onClick={() => {

                    navigate("/explore");

                    if (
                      window.innerWidth < 992
                    ) {

                      setSidebarOpen(false);
                    }
                  }}

                  className="
                    btn
                    text-start
                    py-2
                    rounded-3
                    border-0
                    text-white
                  "

                  style={{
                    background: "#1f2937"
                  }}
                >
                  💼 Explore Jobs
                </button>

              )}

            </div>

          </div>

          {/* USER ACTIVITY */}

          {role === "USER" && (

            <div className="mb-4">

              <small className="
                text-secondary
                text-uppercase
              ">
                My Activity
              </small>

              <div className="
                d-flex
                flex-column
                gap-2
                mt-3
              ">

                {/* APPLICATIONS */}

                <button

                  onClick={() => {

                    navigate("/applications");

                    if (
                      window.innerWidth < 992
                    ) {

                      setSidebarOpen(false);
                    }
                  }}

                  className="
                    btn
                    text-start
                    py-2
                    rounded-3
                    border-0
                    text-white
                  "

                  style={{
                    background: "#1f2937"
                  }}
                >
                  📄 Applications
                </button>

                {/* SAVED */}

                <button

                  onClick={() => {

                    navigate("/saved");

                    if (
                      window.innerWidth < 992
                    ) {

                      setSidebarOpen(false);
                    }
                  }}

                  className="
                    btn
                    text-start
                    py-2
                    rounded-3
                    border-0
                    text-white
                  "

                  style={{
                    background: "#1f2937"
                  }}
                >
                  🔖 Saved Jobs
                </button>

              </div>

            </div>

          )}

          {/* ADMIN */}

          {role === "ADMIN" && (

            <div className="mb-4">

              <small className="
                text-secondary
                text-uppercase
              ">
                Admin
              </small>

              <div className="
                d-flex
                flex-column
                gap-2
                mt-3
              ">

                <button

                  className="
                    btn
                    text-start
                    py-2
                    rounded-3
                    border-0
                    text-white
                  "

                  style={{
                    background: "#1f2937"
                  }}
                >
                  ➕ Post Jobs
                </button>

                <button

                  className="
                    btn
                    text-start
                    py-2
                    rounded-3
                    border-0
                    text-white
                  "

                  style={{
                    background: "#1f2937"
                  }}
                >
                  👥 Manage Users
                </button>

              </div>

            </div>

          )}

          {/* ACCOUNT */}

          <div>

            <small className="
              text-secondary
              text-uppercase
            ">
              Account
            </small>

            <div className="
              d-flex
              flex-column
              gap-2
              mt-3
            ">

              <button

                onClick={() => {

                  navigate("/profile");

                  if (
                    window.innerWidth < 992
                  ) {

                    setSidebarOpen(false);
                  }
                }}

                className="
                  btn
                  text-start
                  py-2
                  rounded-3
                  border-0
                  text-white
                "

                style={{
                  background: "#1f2937"
                }}
              >
                👤 Profile
              </button>

            </div>

          </div>

        </div>

        {/* LOGOUT */}

        <button

          className="
            btn
            btn-light
            py-2
            rounded-3
            fw-semibold
          "

          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;