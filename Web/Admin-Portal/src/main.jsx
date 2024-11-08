import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
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

const App = () => {
  const location = useLocation();
  const shouldShowSidebar = !["/", "/auth"].includes(location.pathname); // Hide Sidebar on / and /auth

  return (
    <div className="app-container">
      {shouldShowSidebar && <Sidebar />} {/* Conditionally render Sidebar */}
      <Outlet />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route index element={<Login />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/dashboard-admin" element={<Dashboard />} />
        <Route path="/notification-center" element={<Notifications />} />
        <Route path="/constituent-management" element={<Constituents />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/contact-support" element={<ContactCrw />} />
        <Route path="/FAQ-A" element={<FAQAdmin />} />
        <Route path="/FAQ-U" element={<FAQUser />} />
      </Routes>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
