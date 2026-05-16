

import { useState, useEffect } from "react";
import { useNavigate }
from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import RecommendedJobs from "./components/RecommendedJobs";
import LatestJobs from "./components/LatestJobs";
import TrendingCompanies from "./components/TrendingCompanies";
import RecentApplications from "./components/RecentApplications";
import Footer from "./components/Footer";

function Dashboard() {

  const [

    sidebarOpen,
    setSidebarOpen

  ] = useState(false);

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");
  const navigate =
  useNavigate();

  const [showAuthModal, setShowAuthModal] =
  useState(false);

  const [jobs, setJobs] =
    useState([]);

  const [

    recommendedJobs,
    setRecommendedJobs

  ] = useState([]);

  const [

    companies,
    setCompanies

  ] = useState([]);

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

  // FETCH JOBS

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res = await fetch(

        "http://localhost:9090/jobs",

        {
         headers: token
  ? {
      Authorization:
        "Bearer " + token
    }
  : {}
        }
      );

      const data =
        await res.json();

      setJobs(data);

      // APPLIED JOBS

      const applied =
        data.filter(
          job => job.applied
        );

      setAppliedJobs(applied);
      
      const applyJob = async (jobId) => {

  if (!token) {

    setShowAuthModal(true);

    return;
  }

  try {

    await fetch(
      `http://localhost:9090/applications/${jobId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchJobs();

  } catch {

    alert("Failed to apply");
  }
};
      // RECOMMENDED JOBS

      const recRes =
        await fetch(

          "http://localhost:9090/jobs/recommended",

          {
           headers: token
  ? {
      Authorization:
        "Bearer " + token
    }
  : {}
          }
        );

      const recData =
        await recRes.json();

      setRecommendedJobs(
        recData
      );

      // TRENDING COMPANIES

      const uniqueCompanies = [

        ...new Set(

          data.map(
            job => job.company
          )

        )

      ];

      setCompanies(
        uniqueCompanies
      );

    } catch {

      setError(
        "Failed to load jobs"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  // APPLY JOB

  const applyJob = async (
    jobId
  ) => {

    try {

      await fetch(

        `http://localhost:9090/applications/${jobId}`,

        {
          method: "POST",

          headers: {
            Authorization:
              "Bearer " + token
          }
        }
      );

      // UPDATE UI

      setRecommendedJobs(prev =>

        prev.map(job =>

          job.id === jobId

            ? {
                ...job,
                applied: true
              }

            : job
        )
      );

      fetchJobs();

    } catch {

      alert(
        "Failed to apply"
      );
    }
  };

  return (

    <div

      className="d-flex"

      style={{

        background: "#f5f7fb",

        minHeight: "100vh"

      }}
    >

      {/* SIDEBAR */}

      <Sidebar

        sidebarOpen={sidebarOpen}

        setSidebarOpen={
          setSidebarOpen
        }

      />

      {/* MAIN */}

      <div

        className="
          flex-grow-1
          p-3
          p-md-4
        "

        style={{

          marginLeft:

            window.innerWidth >= 992

              ? "260px"

              : "0",

          minWidth: 0,

          overflowX: "hidden"

        }}
      >

        {/* MOBILE MENU */}

        <button

          className="
            btn
            btn-dark
            d-lg-none
            mb-3
          "

          onClick={() =>
            setSidebarOpen(true)
          }
        >
          ☰ Menu
        </button>

        {/* NAVBAR */}

        <Navbar />

        {/* ERROR */}

        {error && (

          <div className="
            alert
            alert-danger
          ">
            {error}
          </div>

        )}

        {/* LOADING */}

        {loading && (
          <p>Loading...</p>
        )}

        {/* USER DASHBOARD */}

        {role === "USER" && (

          <>

            <StatsCards />

            <RecommendedJobs

              recommendedJobs={
                recommendedJobs
              }

              applyJob={applyJob}

            />

            <div className="row">

              {/* LATEST JOBS */}

              <div className="
                col-lg-7
                mb-4
              ">

                <LatestJobs
                  jobs={jobs}
                />

              </div>

              {/* TRENDING */}

              <div className="
                col-lg-5
                mb-4
              ">

                <TrendingCompanies
                  companies={companies}
                />

              </div>

            </div>

            {/* RECENT APPLICATIONS */}

            <RecentApplications
              appliedJobs={appliedJobs}
            />

            <Footer />

          </>

        )}

       {/* ADMIN DASHBOARD */}

{role === "ADMIN" && (

  <>

    <div className="
      d-flex
      justify-content-between
      align-items-center
      mb-4
    ">

      <div>

        <h2 className="fw-bold mb-1">
          Admin Dashboard
        </h2>

        <p className="text-muted mb-0">

          Manage jobs,
          users, and applications.

        </p>

      </div>

    </div>

    {/* STATS ROW */}

    <div className="row mb-4">

      {/* TOTAL JOBS */}

      <div className="
        col-4
        mb-3
      ">

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

          <p className="
            text-muted
            mb-2
          ">
            Total Jobs
          </p>

          <h1 className="fw-bold">
            {jobs.length}
          </h1>

        </div>

      </div>

      {/* APPLICATIONS */}

      <div className="
        col-4
        mb-3
      ">

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

          <p className="
            text-muted
            mb-2
          ">
            Applications
          </p>

          <h1 className="fw-bold">
            {appliedJobs.length}
          </h1>

        </div>

      </div>

      {/* COMPANIES */}

      <div className="
        col-4
        mb-3
      ">

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

          <p className="
            text-muted
            mb-2
          ">
            Companies
          </p>

          <h1 className="fw-bold">
            {companies.length}
          </h1>

        </div>

      </div>

    </div>

    {/* ACTIONS */}

    <div className="row">

      {/* POST JOB */}

      <div className="
        col-md-4
        mb-3
      ">

        <button

          className="
            btn
            btn-dark
            w-100
            py-4
            fw-semibold
          "

          style={{
            borderRadius: "20px"
          }}

  onClick={() =>
    navigate("/admin/post-job")
  }
        >

          ➕ Post Job

        </button>

      </div>

      {/* MANAGE JOBS */}

<div className="
  col-md-4
  mb-3
">

  <button

    onClick={() =>
      navigate(
        "/admin/manage-jobs"
      )
    }

    className="
      btn
      btn-warning
      w-100
      py-4
      fw-semibold
    "

    style={{
      borderRadius: "20px"
    }}
  >

    🛠 Manage Jobs

  </button>

</div>

      {/* MANAGE USERS */}

      <div className="
        col-md-4
        mb-3
      ">

        <button

          className="
            btn
            btn-primary
            w-100
            py-4
            fw-semibold
          "

          style={{
            borderRadius: "20px"
          }}
          onClick={() =>
  navigate("/admin/users")
}
        >

          👥 Manage Users

        </button>

      </div>

      {/* APPLICATIONS */}

      <div className="
        col-md-4
        mb-3
      ">

        <button

          className="
            btn
            btn-warning
            w-100
            py-4
            fw-semibold
          "

          style={{
            borderRadius: "20px"
          }}
          onClick={() =>
  navigate("/admin/applications")
}
        >

          📄 Applications

        </button>

      </div>

    </div>

  </>

)}

{showAuthModal && (

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
        "rgba(0,0,0,0.5)",

      backdropFilter:
        "blur(6px)",

      zIndex: 3000
    }}
  >

    <div

      className="
        bg-white
        p-4
        text-center
      "

      style={{

        width: "100%",

        maxWidth: "420px",

        borderRadius: "28px"
      }}
    >

      <div
        style={{
          fontSize: "64px"
        }}
      >
        🔒
      </div>

      <h2 className="fw-bold mt-3">
        Login Required
      </h2>

      <p className="text-muted mt-2">

        Create an account or login
        to continue using JobPortal.

      </p>

      <div className="
        d-flex
        gap-3
        mt-4
      ">

        <button

          onClick={() =>
            window.location.href = "/login"
          }

          className="
            btn
            btn-dark
            w-100
            py-3
          "

          style={{
            borderRadius: "16px"
          }}
        >

          Login

        </button>

        <button

          onClick={() =>
            window.location.href = "/register"
          }

          className="
            btn
            btn-light
            border
            w-100
            py-3
          "

          style={{
            borderRadius: "16px"
          }}
        >

          Register

        </button>

      </div>

      <button

        onClick={() =>
          setShowAuthModal(false)
        }

        className="
          btn
          btn-link
          mt-3
          text-decoration-none
        "
      >

        Continue Browsing

      </button>

    </div>

  </div>

)}


      </div>

    </div>
  );
}

export default Dashboard;