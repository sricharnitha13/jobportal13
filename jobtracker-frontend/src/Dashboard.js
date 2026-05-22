
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import StatsCards from "./components/StatsCards";
import RecommendedJobs from "./components/RecommendedJobs";
import LatestJobs from "./components/LatestJobs";
import TrendingCompanies from "./components/TrendingCompanies";
import RecentApplications from "./components/RecentApplications";
import Footer from "./components/Footer";
import AnalyticsCharts from "./components/AnalyticsCharts";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const [

  searchTerm,

  setSearchTerm

] = useState("");

const [

  selectedLocation,

  setSelectedLocation

] = useState("");

const [

  selectedSkill,

  setSelectedSkill

] = useState("");
  // User-level stats (applied, inReview, interviews, selected)
  const [stats, setStats] = useState({
    applied: 0,
    inReview: 0,
    interviews: 0,
    selected: 0,
  });
 
  // ✅ NEW: Admin-level aggregate stats for charts
  const [adminStats, setAdminStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalCompanies: 0,
    statusCounts: {
      APPLIED: 0,
      IN_REVIEW: 0,
      INTERVIEW: 0,
      SELECTED: 0,
      REJECTED: 0,
    },
    // Applications per company for bar chart
    applicationsByCompany: [],
  });

  const [recentApplications, setRecentApplications] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);

  // ─── USER: fetch personal stats ───────────────────────────────────────────
  const fetchStats = async () => {
    try {
      const res = await fetch("https://jobportal13.onrender.com/applications/stats", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ─── USER: recent 3 applications ──────────────────────────────────────────
  const fetchRecentApplications = async () => {
    try {
      const res = await fetch("https://jobportal13.onrender.com/applications", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setRecentApplications(data.slice(0, 3));
    } catch (err) {
      console.log(err);
    }
  };

  // ─── USER: upcoming interviews ────────────────────────────────────────────
  const fetchUpcomingInterviews = async () => {
    try {
      const res = await fetch("https://jobportal13.onrender.com/applications", {
        headers: { Authorization: "Bearer " + token },
      });
      const data = await res.json();
      setUpcomingInterviews(data.filter((app) => app.status === "INTERVIEW"));
    } catch (err) {
      console.log(err);
    }
  };

  // ─── JOBS (used by both roles) ────────────────────────────────────────────
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jobportal13.onrender.com/jobs", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      const data = await res.json();
      setJobs(data);

      // User: filter applied jobs
      const applied = data.filter((job) => job.applied);
      setAppliedJobs(applied);

      // Recommended jobs
      const recRes = await fetch("https://jobportal13.onrender.com/jobs/recommended", {
        headers: token ? { Authorization: "Bearer " + token } : {},
      });
      const recData = await recRes.json();
      setRecommendedJobs(recData);

      // Trending companies
      const uniqueCompanies = [...new Set(data.map((job) => job.company))];
      setCompanies(uniqueCompanies);
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // ─── ✅ ADMIN: fetch ALL applications and build aggregate stats ────────────
  const fetchAdminStats = async () => {
    try {
      // Fetch both in parallel
      const [appsRes, jobsRes] = await Promise.all([
        fetch("https://jobportal13.onrender.com/applications/all", {
          headers: { Authorization: "Bearer " + token },
        }),
        fetch("https://jobportal13.onrender.com/jobs", {
          headers: { Authorization: "Bearer " + token },
        }),
      ]);

      const data = await appsRes.json();   // all applications
      const jobsList = await jobsRes.json(); // all jobs

      // ✅ Build a jobId → company lookup map from the jobs list
      const jobMap = {};
      jobsList.forEach((job) => {
        jobMap[job.id] = job.company || job.companyName || "Unknown";
      });

      // Status breakdown for pie chart
      const statusCounts = {
        APPLIED: 0,
        IN_REVIEW: 0,
        INTERVIEW: 0,
        SELECTED: 0,
        REJECTED: 0,
      };
      data.forEach((app) => {
        if (statusCounts[app.status] !== undefined) {
          statusCounts[app.status]++;
        }
      });

      // ✅ Resolve company via jobId → jobMap lookup
      const companyMap = {};
      data.forEach((app) => {
        const company = jobMap[app.jobId];
        if (!company || company === "Unknown") return;
        companyMap[company] = (companyMap[company] || 0) + 1;
      });

      const applicationsByCompany = Object.entries(companyMap).map(
        ([company, count]) => ({ company, count })
      );

      const uniqueCompanies = Object.keys(companyMap);

      setAdminStats({
        totalApplications: data.length,
        totalCompanies: uniqueCompanies.length,
        statusCounts,
        applicationsByCompany,
      });
    } catch (err) {
      console.log("Admin stats fetch failed:", err);
    }
  };

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchJobs();
    if (role === "USER") {
      fetchStats();
      fetchRecentApplications();
      fetchUpcomingInterviews();
    }
    if (role === "ADMIN") {
      fetchAdminStats(); // ✅ fetch real admin data for charts
    }
  }, []);

  // ─── Apply job (user action) ───────────────────────────────────────────────
  const applyJob = async (jobId) => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    try {
      await fetch(`https://jobportal13.onrender.com/applications/${jobId}`, {
        method: "POST",
        headers: { Authorization: "Bearer " + token },
      });
      setRecommendedJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, applied: true } : job))
      );
      fetchJobs();
    } catch {
      alert("Failed to apply");
    }
  };

  return (
    <div className="d-flex" style={{ background: "#f5f7fb", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN */}
      <div
        className="flex-grow-1 p-3 p-md-4"
        style={{
          marginLeft: window.innerWidth >= 992 ? "280px" : "0",
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        {/* MOBILE MENU */}
        <button
          className="btn btn-dark d-lg-none mb-3"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>

        {/* NAVBAR */}
        <Navbar />

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <p>Loading...</p>}

        {/* ── USER DASHBOARD ── */}
        {role === "USER" && (
          <>
            <StatsCards stats={stats} />
            <RecommendedJobs recommendedJobs={recommendedJobs} applyJob={applyJob} />
            <div className="row">
              <div className="col-lg-7 mb-4">
                <LatestJobs jobs={jobs} />
              </div>
              <div className="col-lg-5 mb-4">
                <TrendingCompanies companies={companies} />
              </div>
            </div>
            <RecentApplications appliedJobs={recentApplications} />

            {/* UPCOMING INTERVIEWS */}
            <div
              className="card border-0 shadow-sm p-4 mt-4"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="fw-bold mb-4">📅 Upcoming Interviews</h5>
              {upcomingInterviews.length === 0 ? (
                <p className="text-muted">No upcoming interviews</p>
              ) : (
                upcomingInterviews.map((app) => (
                  <div key={app.id} className="border-bottom py-3">
                    <div className="fw-bold">{app.company}</div>
                    <small className="text-muted d-block">{app.location}</small>
                    <div className="mt-2 small fw-semibold">📅 {app.interviewDate}</div>
                    <div className="small">⏰ {app.interviewTime}</div>
                    <div className="small">💻 {app.interviewMode}</div>
                  </div>
                ))
              )}
            </div>
            <Footer />
          </>
        )}

        {/* ── ADMIN DASHBOARD ── */}
        {role === "ADMIN" && (
          <>
            {/*
              ✅ Pass adminStats (real aggregate data) to AnalyticsCharts.
              adminStats contains:
                - statusCounts       → for Pie chart
                - applicationsByCompany → for Bar chart
                - totalApplications  → summary number
                - totalCompanies     → summary number
            */}
            <AnalyticsCharts
              stats={adminStats.statusCounts}
              applicationsByCompany={adminStats.applicationsByCompany}
              totalJobs={jobs.length}
              totalApplications={adminStats.totalApplications}
              totalCompanies={adminStats.totalCompanies}
            />

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="fw-bold mb-1">Admin Dashboard</h2>
                <p className="text-muted mb-0">Manage jobs, users, and applications.</p>
              </div>
            </div>

            {/* STATS ROW */}
            <div className="row mb-4">
              <div className="col-4 mb-3">
                <div className="bg-white shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
                  <p className="text-muted mb-2">Total Jobs</p>
                  <h1 className="fw-bold">{jobs.length}</h1>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div className="bg-white shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
                  <p className="text-muted mb-2">Applications</p>
                  {/* ✅ Now uses real admin total, not filtered user jobs */}
                  <h1 className="fw-bold">{adminStats.totalApplications}</h1>
                </div>
              </div>
              <div className="col-4 mb-3">
                <div className="bg-white shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
                  <p className="text-muted mb-2">Companies</p>
                  {/* ✅ Unique companies from applications */}
                  <h1 className="fw-bold">{adminStats.totalCompanies || companies.length}</h1>
                </div>
              </div>
            </div>
           {/* 🔍 SEARCH + FILTERS */}

    {/* ACTIONS */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <button
                  className="btn btn-dark w-100 py-4 fw-semibold"
                  style={{ borderRadius: "20px" }}
                  onClick={() => navigate("/admin/post-job")}
                >
                  ➕ Post Job
                </button>
              </div>
              
              <div className="col-md-4 mb-3">
                <button
                  onClick={() => navigate("/admin/manage-jobs")}
                  className="btn btn-warning w-100 py-4 fw-semibold"
                  style={{ borderRadius: "20px" }}
                >
                  🛠 Manage Jobs
                </button>
              </div>
              <div className="col-md-4 mb-3">
                <button
                  className="btn btn-primary w-100 py-4 fw-semibold"
                  style={{ borderRadius: "20px" }}
                  onClick={() => navigate("/admin/users")}
                >
                  👥 Manage Users
                </button>
              </div>
              <div className="col-md-4 mb-3">
                <button
                  className="btn btn-warning w-100 py-4 fw-semibold"
                  style={{ borderRadius: "20px" }}
                  onClick={() => navigate("/admin/applications")}
                >
                  📄 Applications
                </button>
              </div>
            </div>
          </>
        )}

        {/* AUTH MODAL */}
        {showAuthModal && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 3000 }}
          >
            <div
              className="bg-white p-4 text-center"
              style={{ width: "100%", maxWidth: "420px", borderRadius: "28px" }}
            >
              <div style={{ fontSize: "64px" }}>🔒</div>
              <h2 className="fw-bold mt-3">Login Required</h2>
              <p className="text-muted mt-2">
                Create an account or login to continue using JobPortal.
              </p>
              <div className="d-flex gap-3 mt-4">
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="btn btn-dark w-100 py-3"
                  style={{ borderRadius: "16px" }}
                >
                  Login
                </button>
                <button
                  onClick={() => (window.location.href = "/register")}
                  className="btn btn-light border w-100 py-3"
                  style={{ borderRadius: "16px" }}
                >
                  Register
                </button>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="btn btn-link mt-3 text-decoration-none"
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
