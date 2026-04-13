import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layout/MainLayout";

// Public Pages
import TenantsPage from "./pages/public/tenants";

// Private Pages (Existing)
import MyProject from "./pages/private/My-Project/MyProject";
import MyBoards from "./pages/private/MyBoards";
import Activities from "./pages/private/Activities";
import TaskRequest from "./pages/private/TaskRequest";
import ProjectDetail from "./pages/private/My-Project/ProjectDetail";

// New Pages - Customer, DSM Logs, Companies, Team
import Customer from "./pages/private/Customer";
import DsmLogs from "./pages/private/DsmLogs";
import Companies from "./pages/private/Companies";
import Team from "./pages/private/Team";

// ✅ Import DevelopmentPage
import DevelopmentPage from "./pages/private/My-Project/developmentpage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/tenants" element={<TenantsPage />} />

        {/* Private Routes (With MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/my-project" replace />} />

          {/* Existing Routes */}
          <Route path="/my-project" element={<MyProject />} />
          <Route path="/my-boards" element={<MyBoards />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/task-request" element={<TaskRequest />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/dsm-logs" element={<DsmLogs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/team" element={<Team />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/project/:projectId/development" element={<DevelopmentPage />} />
        </Route>
      </Routes>
    </Router>
  );
}