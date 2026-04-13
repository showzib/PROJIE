// app/development/components/CategoryCard.tsx
import { useState } from "react";
import { ChevronUp, ChevronDown, Building2, Mail, Calendar, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category, Task } from "@/hooks/development.type";
import { TaskCard } from "./TaskCard";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";

interface CategoryCardProps {
  category?: Category;  // ✅ Made optional
  onTaskStatusChange?: (taskId: number, newStatus: string) => void;
  variant?: "task" | "company";
  companies?: Company[];
  onEditCompany?: (company: Company) => void;
  onDeleteCompany?: (id: number) => void;
  title?: string;  // ✅ For company variant
}

interface Company {
  id: number;
  name: string;
  email: string;
  general: string;
  lastUpdated: string;
  members: number;
}

export function CategoryCard({ 
  category, 
  onTaskStatusChange, 
  variant = "task",
  companies = [],
  onEditCompany,
  onDeleteCompany,
  title = "Companies",
}: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  // Handle task click to open modal
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalType("developmentDetail");
  };

  // Handle save from modal
  const handleSaveTask = (data: any) => {
    console.log("Task updated:", data);
    setModalType(null);
    setSelectedTask(null);
  };

  // Handle company edit
  const handleCompanyEdit = (company: Company) => {
    setSelectedCompany(company);
    setModalType("editTask");
  };

  // Handle company delete
  const handleCompanyDelete = (company: Company) => {
    setSelectedCompany(company);
    setModalType("deleteConfirm");
  };

  // Handle save company edit
  const handleSaveCompanyEdit = (data: any) => {
    if (selectedCompany && onEditCompany) {
      onEditCompany({
        ...selectedCompany,
        name: data.name || selectedCompany.name,
        email: data.email || selectedCompany.email,
        general: data.general || selectedCompany.general,
      });
    }
    setModalType(null);
    setSelectedCompany(null);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedCompany && onDeleteCompany) {
      onDeleteCompany(selectedCompany.id);
    }
    setModalType(null);
    setSelectedCompany(null);
  };

  // Color mapping for categories
  const getCategoryColor = (title: string) => {
    const colors: Record<string, string> = {
      "To Do": "border-gray-200 bg-gray-50 dark:bg-gray-900/20",
      "In Development": "border-blue-200 bg-blue-50 dark:bg-blue-900/20",
      "Development Done": "border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20",
      "Ready for QA": "border-purple-200 bg-purple-50 dark:bg-purple-900/20",
      "QA In Progress": "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20",
      "QA Verified": "border-green-200 bg-green-50 dark:bg-green-900/20",
      "Discussion": "border-orange-200 bg-orange-50 dark:bg-orange-900/20",
      "Deferred": "border-red-200 bg-red-50 dark:bg-red-900/20",
      "Published": "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20",
      "All Companies": "border-purple-200 bg-purple-50 dark:bg-purple-900/20",
      "Active": "border-green-200 bg-green-50 dark:bg-green-900/20",
      "Archived": "border-gray-200 bg-gray-50 dark:bg-gray-900/20",
    };
    return colors[title] || "border-gray-200 bg-gray-50";
  };

  const getTitleColor = (title: string) => {
    const colors: Record<string, string> = {
      "To Do": "text-gray-700",
      "In Development": "text-blue-700",
      "Development Done": "text-indigo-700",
      "Ready for QA": "text-purple-700",
      "QA In Progress": "text-yellow-700",
      "QA Verified": "text-green-700",
      "Discussion": "text-orange-700",
      "Deferred": "text-red-700",
      "Published": "text-emerald-700",
      "All Companies": "text-purple-700",
      "Active": "text-green-700",
      "Archived": "text-gray-700",
    };
    return colors[title] || "text-gray-700";
  };

  // Get company card color based on name
  const getCompanyCardColor = (name: string) => {
    if (name === "#general") {
      return "border-gray-200 bg-gray-50 dark:bg-gray-900/20";
    }
    return "border-blue-200 bg-blue-50 dark:bg-blue-900/20";
  };

  // Render Company Card
  const renderCompanyCard = (company: Company) => (
    <div
      key={company.id}
      className={`rounded-lg border-2 ${getCompanyCardColor(company.name)} p-4 hover:shadow-lg transition-all`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <h4 className="font-semibold text-base">{company.name}</h4>
        </div>
        {/* ✅ Icons always visible */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCompanyEdit(company)}
            className="h-7 w-7 p-0"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCompanyDelete(company)}
            className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">General:</span>
          <span>{company.general || "-"}</span>
        </div>
        {company.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Email:</span>
            <span className="text-xs">{company.email}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Last Updated:</span>
          <span className="text-xs">{company.lastUpdated}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Members:</span>
          <span className="text-xs">{company.members}</span>
        </div>
      </div>
    </div>
  );

  // Prepare data for modal
  const getModalData = () => {
    if (variant === "company" && selectedCompany) {
      return {
        name: selectedCompany.name,
        email: selectedCompany.email,
        general: selectedCompany.general,
      };
    }
    if (selectedTask) {
      return {
        title: selectedTask.summary,
        summary: selectedTask.summary,
        assignee: selectedTask.assignee,
        priority: selectedTask.priority,
        status: selectedTask.status,
        estimatedTime: selectedTask.estimatedTime,
        teams: selectedTask.teams,
        feature: selectedTask.feature,
        issueType: selectedTask.issueType,
      };
    }
    return {};
  };

  const handleModalConfirm = (data: any) => {
    if (variant === "company") {
      if (modalType === "editTask") {
        handleSaveCompanyEdit(data);
      } else if (modalType === "deleteConfirm") {
        handleConfirmDelete();
      }
    } else {
      handleSaveTask(data);
    }
  };

  // Get display title
  const displayTitle = variant === "company" ? title : category?.title || "Tasks";
  const itemCount = variant === "company" ? companies.length : category?.tasks?.length || 0;

  return (
    <>
      <div className={`rounded-lg border-2 ${getCategoryColor(displayTitle)} p-4 h-full flex flex-col`}>
        {/* Category Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div>
            <h3 className={`text-lg font-semibold ${getTitleColor(displayTitle)}`}>
              {displayTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {itemCount} items
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Content */}
        {isExpanded && (
          <div className="flex-1 min-h-0">
            {variant === "company" ? (
              <>
                {companies.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No companies found
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {companies.map((company) => renderCompanyCard(company))}
                  </div>
                )}
              </>
            ) : (
              <>
                {!category?.tasks?.length ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No tasks in {category?.title}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {category?.tasks?.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={onTaskStatusChange!}
                        onClick={handleTaskClick}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <CommonModal
        open={modalType !== null}
        onOpenChange={() => {
          setModalType(null);
          setSelectedTask(null);
          setSelectedCompany(null);
        }}
        type={modalType || (variant === "company" ? "editTask" : "developmentDetail")}
        data={getModalData()}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}