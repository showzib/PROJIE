import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, RefreshCw, Edit, Trash2, Eye } from "lucide-react";

// Demo data with proper typing
const demoData = [
  {
    id: "SPR-001",
    name: "Sprint 1 - Foundation",
    startDate: "2024-01-15",
    endDate: "2024-01-29",
    description: "Initial setup and basic features",
    status: "Active" as const,
  },
  {
    id: "SPR-002",
    name: "Sprint 2 - Core Features",
    startDate: "2024-01-30",
    endDate: "2024-02-13",
    description: "Implementation of core functionality",
    status: "Completed" as const,
  },
  {
    id: "SPR-003",
    name: "Sprint 3 - Testing & Bug Fixes",
    startDate: "2024-02-14",
    endDate: "2024-02-28",
    description: "Quality assurance and bug resolution",
    status: "In Progress" as const,
  },
  {
    id: "SPR-004",
    name: "Sprint 4 - Deployment",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    description: "Production deployment and monitoring",
    status: "Planning" as const,
  },
];

interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "Active" | "Completed" | "In Progress" | "Planning";
}

export default function SprintsTab({ projectId }: { projectId?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sprints, setSprints] = useState<Sprint[]>(demoData);

  // Filter sprints based on search term
  const filteredSprints = sprints.filter(
    (sprint) =>
      sprint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sprint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status color
  const getStatusColor = (status: Sprint["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Planning":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleGitHubClick = () => {
    console.log("GitHub clicked for project:", projectId);
    // GitHub integration logic here
  };

  const handleGitLabClick = () => {
    console.log("GitLab clicked for project:", projectId);
    // GitLab integration logic here
  };

 

  const handleRefresh = () => {
    console.log("Refresh sprints");
    // Refresh logic here
  };

  const handleEdit = (sprintId: string) => {
    console.log("Edit sprint:", sprintId);
    // Edit logic here
  };

  const handleDelete = (sprintId: string) => {
    console.log("Delete sprint:", sprintId);
    // Delete logic here
  };

  const handleView = (sprintId: string) => {
    console.log("View sprint:", sprintId);
    // View logic here
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Buttons */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleGitHubClick}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
            GitHub
          </Button>
          
          <Button variant="outline" onClick={handleGitLabClick}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.6 9.59L12.04 21.13 9.4 13.57 2.17 9.59l6.09-4.52 3.78 5.07 3.78-5.07 6.09 4.52-4.31 3.98 2.99 7.63 4.2-13.14z" />
            </svg>
            GitLab
          </Button>

       

          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sprint ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSprints.length > 0 ? (
              filteredSprints.map((sprint) => (
                <TableRow key={sprint.id}>
                  <TableCell className="font-medium">{sprint.id}</TableCell>
                  <TableCell>{sprint.name}</TableCell>
                  <TableCell>{sprint.startDate}</TableCell>
                  <TableCell>{sprint.endDate}</TableCell>
                  <TableCell>{sprint.description}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                        sprint.status
                      )}`}
                    >
                      {sprint.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(sprint.id)}
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(sprint.id)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(sprint.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  No sprints found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}