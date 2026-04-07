import { useNavigate } from "react-router-dom";
import TenantCard from "@/components/ui/InfoCard"; // ✅ default import
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";

const TENANTS_DATA = [
  {
    id: "1",
    name: "Neksoft",
    pmo: "Neksoft PMO",
    email: "muhammad.hoti@gmail.com",
    phone: "+92-345-2396338",
    contactPerson: "Muhammad Hoti",
    website: "neksoft",
    createdOn: "19/10/23",
  },
];

export default function TenantsPage() {
  const navigate = useNavigate();

  const handleDetails = (id: string) => {
    navigate("/my-project"); // route to MyProject page
  };

  return (
    <div className="flex min-h-screen flex-col bg-bground-500">
        <Navbar/>
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 sm:p-8">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-secondary-500">
            Tenants Management
          </h1>
          <p className="text-sm sm:text-base text-small-500">
            Manage and view all your registered tenants here.
          </p>
        </div>
        <Button className="bg-bgbtn-500 h-11 px-6 hover:bg-hoverbtn-500 text-white shadow-sm w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </header>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-4 sm:p-8">
        {TENANTS_DATA.map((tenant) => (
          <TenantCard
            key={tenant.id}
            {...tenant}
            onAction={() => handleDetails(tenant.id)}
          />
        ))}
      </div>
    </div>
  );
}