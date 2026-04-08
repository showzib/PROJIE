import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layout/MainLayout";

// Pages
import TenantsPage from "./pages/public/tenants";
import MyProject from "./pages/private/MyProject";
import MyBoards from "./pages/private/MyBoards";
import Activities from "./pages/private/Activities";
import TaskRequest from "./pages/private/TaskRequest";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tenants" replace />} />
        <Route path="/tenants" element={<TenantsPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="my-project" element={<MyProject />} />
          <Route path="/my-boards" element={<MyBoards />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/task-request" element={<TaskRequest />} />
        </Route>
      </Routes>
    </Router>
  );
}