import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader";

// Lazy loaded components
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Dashboard = lazy(() => import("./Dashboard"));
const Profile = lazy(() => import("./Profile"));
const ExploreJobs = lazy(() => import("./pages/ExploreJobs"));
const Applications = lazy(() => import("./pages/Applications"));
const SavedJobs = lazy(() => import("./pages/SavedJobs"));
const RecommendedJobsPage = lazy(() => import("./pages/RecommendedJobsPage"));
const LatestJobsPage = lazy(() => import("./pages/LatestJobsPage"));
const CompaniesPage = lazy(() => import("./pages/CompaniesPage"));
const AdminPostJob = lazy(() => import("./pages/AdminPostJob"));
const ManageUsers = lazy(() => import("./pages/ManageUsers"));
const AdminApplications = lazy(() => import("./pages/AdminApplications"));
const ManageJobs = lazy(() => import("./pages/ManageJobs"));
const EditJob = lazy(() => import("./pages/EditJob"));
const LandingPage = lazy(() => import("./pages/LandingPage"));

function App() {
  const token = localStorage.getItem("token");
  
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<ExploreJobs />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/recommended" element={<RecommendedJobsPage />} />
          <Route path="/latest-jobs" element={<LatestJobsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/admin/post-job" element={<AdminPostJob />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/manage-jobs" element={<ManageJobs />} />
          <Route path="/admin/post-job/:id" element={<EditJob />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;