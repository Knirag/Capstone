import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import Analytics from "./components/Analytics/Analytics";
import Constituents from "./components/Constituent-Management/Constituents";
import FAQAdmin from "./components/FAQ-Admin/FAQ-Admin";
import FAQUser from "./components/FAQ-User/FAQ-User";
import Notifications from "./components/Notifications/Notifications";
import ContactCrw from "./components/Support-Feedback/Contact-Crw";

const MainLayout = () => {
  const location = useLocation();
  const shouldShowSidebar = !["/", "/auth"].includes(location.pathname);

  return (
    <div className="app-container">
      {shouldShowSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/dashboard-admin" element={<Dashboard />} />
          <Route path="/notification-center" element={<Notifications />} />
          <Route path="/constituent-management" element={<Constituents />} />
          <Route path="/contact-support" element={<ContactCrw />} />
          <Route path="/FAQ-A" element={<FAQAdmin />} />
          <Route path="/FAQ-U" element={<FAQUser />} />
          <Route path="/constituent-analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);
