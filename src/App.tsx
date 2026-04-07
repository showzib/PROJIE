import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layout/Mainlayout";

// Pages
import TenantsPage from "./pages/public/tenants";
import { MyProject } from "./pages/private/MyProject";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root URL to /tenants */}
        <Route path="/" element={<Navigate to="/tenants" replace />} />

        {/* Tenants page rendered independently */}
        <Route path="/tenants" element={<TenantsPage />} />

        {/* Layout wrapper for other pages */}
        <Route path="/" element={<MainLayout />}>
          <Route path="my-project" element={<MyProject />} />
          
          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="p-6 text-center text-red-500 font-bold">
                Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}