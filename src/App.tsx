import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TenantsPage from "./pages/public/tenants";
import MyProject from "./pages/private/My-Project/MyProject";
import MyBoards from "./pages/private/MyBoards";
import Activities from "./pages/private/Activities";
import TaskRequest from "./pages/private/TaskRequest";
import ProjectDetail from "./pages/private/My-Project/ProjectDetail";
import Customer from "./pages/private/Customer";
import DsmLogs from "./pages/private/DsmLogs";
import Companies from "./pages/private/Companies";
import Team from "./pages/private/Team";
import DevelopmentPage from "./pages/private/My-Project/developmentpage";
import Invoice from "./pages/private/Invoice"; // 
import { Payment } from "./pages/private/Payment";
import Product from "./pages/private/Product";
import BankAccountDetails from "./pages/private/BankAccountDetails";
import Lead from "./pages/private/Lead";
import ConvertedLead from "./pages/private/Converted.lead";
import Convertedrequest from "./pages/private/Converted.Request";
import SalesTeam from "./pages/private/SalesTeam";
import Unit from "./pages/private/Unit";
import EmailSmtp from "./pages/private/EmailSmtp";
import CrmInvoice from "./pages/private/CrmInvoice";
import ActionLogs from "./pages/private/ActionLogs";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tenants" element={<TenantsPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/my-project" replace />} />
          <Route path="/my-project" element={<MyProject />} />
          <Route path="/my-boards" element={<MyBoards />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/task-request" element={<TaskRequest />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/dsm-logs" element={<DsmLogs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/team" element={<Team />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/payment"  element={<Payment/>}/>
          <Route path="/product" element={<Product/>} />
          <Route path="/bank-account" element={<BankAccountDetails/>} />
          <Route path="/lead" element={<Lead/>} />
          <Route path="/converted-lead" element={<ConvertedLead/>} />
          <Route path="/sales-team" element={<SalesTeam/>} />
          <Route path="/unit" element={<Unit/>} />
          <Route path="/email-smtp" element={<EmailSmtp/>} />
          <Route path="/crm-invoice" element={<CrmInvoice/>} />
          <Route path="/action-logs" element={<ActionLogs/>} />
          <Route path="/converted-request" element={<Convertedrequest />} />
        </Route>
      </Routes>
    </Router>
  );
}