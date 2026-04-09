// src/pages/private/OverviewTab.tsx
import Timeline from "@/components/ui/timeline";

interface OverviewTabProps {
  projectId?: string;
  description?: string;
  date?: string;
  name?: string;
}

export default function OverviewTab({ 
  projectId, 
  description, 
  date, 
  name 
}: OverviewTabProps) {
  // Hardcoded data for now - baad mein API se aayega
  const projectInfo = {
    department: "Software Development",
    createdOn: "2024-01-15",
    dueDate: "2024-03-30",
    lastWork: "2024-01-22",
    status: "In Progress",
    summary: "This project aims to deliver a complete web application with modern tech stack including React, Node.js, and PostgreSQL."
  };

  return (
    <div className="space-y-6">
      {/* First Card - Summary and Information */}
      <div className="rounded-lg border p-6">
        {/* Project Summary */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Project Summary</h3>
          <p className="text-muted-foreground leading-relaxed">
            {projectInfo.summary}
          </p>
        </div>

        {/* Project Details - Dynamic data from props */}
        <div className="mb-6 pt-4 border-t">
          <h3 className="font-semibold mb-3">Project Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <p><strong>Project Name:</strong> {name}</p>
            <p><strong>Project ID:</strong> {projectId}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Start Date:</strong> {date}</p>
          </div>
        </div>

        {/* Project Information - 4 Columns */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-4">Project Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{projectInfo.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Created On</p>
              <p className="font-medium">{projectInfo.createdOn}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{projectInfo.dueDate}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Work</p>
              <p className="font-medium">{projectInfo.lastWork}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Card - Timeline */}
      <div className="rounded-lg border p-6">
        <h3 className="font-semibold mb-8">Project Timeline</h3>
        <Timeline />
      </div>
    </div>
  );
}