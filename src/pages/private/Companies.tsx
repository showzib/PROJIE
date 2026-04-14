// app/components/Companies.tsx
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";

interface Company {
  id: number;
  name: string;
  email: string;
  general: string;
  lastUpdated: string;
  members: number;
}

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: "#general",
      email: "",
      general: "-",
      lastUpdated: "Jan 8, 2026",
      members: 0,
    },
    {
      id: 2,
      name: "Splise It",
      email: "sabiksalik22@gmail.com",
      general: "-",
      lastUpdated: "Jan 6, 2026",
      members: 0,
    },
  ]);

  // Safe filter
  const filteredCompanies = companies?.filter((company) => {
    if (!company) return false;
    return (
      company.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "") ||
      company.email?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
    );
  }) || [];

  const handleAddCompany = (data: any) => {
    console.log("Data received:", data);
    
    const companyName = data.title || data.name;
    const companyEmail = data.people || data.email || "";
    
    const newCompany: Company = {
      id: Date.now(),
      name: companyName || "New Company",
      email: companyEmail,
      general: "-",
      lastUpdated: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      members: 0,
    };
    
    setCompanies([...companies, newCompany]);
    setModalType(null);
  };

  const handleEditCompany = (updatedCompany: Company) => {
    setCompanies(companies.map(c => c.id === updatedCompany.id ? updatedCompany : c));
  };

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Companies</h1>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => setModalType("addTask")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </div>

      {/* Category Card - Companies Grid */}
      <CategoryCard
        variant="company"
        companies={filteredCompanies}
        onEditCompany={handleEditCompany}
        onDeleteCompany={handleDeleteCompany}
        title="All Companies"
      />

      {/* Add Company Modal */}
      <CommonModal
        open={modalType === "addTask"}
        onOpenChange={() => setModalType(null)}
        type="addTask"
        onConfirm={handleAddCompany}
      />
    </div>
  );
}