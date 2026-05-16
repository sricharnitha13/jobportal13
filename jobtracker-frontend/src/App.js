
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ExploreJobs from "./pages/ExploreJobs";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import RecommendedJobsPage from "./pages/RecommendedJobsPage";
import LatestJobsPage from "./pages/LatestJobsPage";
import CompaniesPage from "./pages/CompaniesPage";
import AdminPostJob from "./pages/AdminPostJob";
import ManageUsers from "./pages/ManageUsers";
import AdminApplications from "./pages/AdminApplications";
import ManageJobs from "./pages/ManageJobs";
import EditJob
from "./pages/EditJob";
import LandingPage
from "./pages/LandingPage";

function App() {
  const token =
  localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route

  path="/dashboard"

  element={

    token

    ? <Dashboard />

    : <Navigate to="/login" />

  }

/>
        <Route path="/profile" element={<Profile />} />
        <Route
  path="/explore"
  element={<ExploreJobs />}
/>

<Route
  path="/applications"
  element={<Applications />}
/>

<Route
  path="/saved"
  element={<SavedJobs />}
/><Route
  path="/recommended"
  element={<RecommendedJobsPage />}
/>

<Route
  path="/latest-jobs"
  element={<LatestJobsPage />}
/>

<Route
  path="/companies"
  element={<CompaniesPage />}
/>

<Route
  path="/admin/post-job"
  element={<AdminPostJob />}
/>

<Route
  path="/admin/users"
  element={<ManageUsers />}
/>

<Route
  path="/admin/applications"
  element={<AdminApplications />}
/>
<Route

  path="/admin/manage-jobs"

  element={<ManageJobs />}

/>
<Route

  path="/admin/post-job/:id"

  element={<EditJob />}

/>
<Route

  path="/landing"

  element={<LandingPage />}

/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;