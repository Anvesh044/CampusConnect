// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import StudentDashboard from "./pages/StudentDashboard";
import TPODashboard from "./pages/TPODashboard";
import ResumeUpload from "./pages/ResumeUpload";
import SkillTagging from "./pages/SkillTagging";
import EligibilityChecker from "./pages/EligibilityChecker";
import PlacementStats from "./pages/PlacementStats";
import ViewOfferLetter from "./pages/ViewOfferLetter"; // Add at top






import Drives from "./pages/Drives";
import Notifications from "./pages/Notifications";
import AccountSettings from "./pages/AccountSettings";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Student Dashboard with nested routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route index element={
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-700">👋 Welcome to CampusConnect!</h2>
              <p className="text-gray-500 mt-2">Select an option from the sidebar.</p>
            </div>
          } />
          <Route path="resume-upload" element={<ResumeUpload />} />
          <Route path="skill-tagging" element={<SkillTagging />} />
          <Route path="eligibility-checker" element={<EligibilityChecker />} />
          <Route path="placement-stats" element={<PlacementStats />} />
          <Route path="drives" element={<Drives />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="account-settings" element={<AccountSettings />} />
          <Route path="offer-letter" element={<ViewOfferLetter />} />
        </Route>

        <Route path="/tpo-dashboard" element={<TPODashboard />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
