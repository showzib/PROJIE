// app/components/BacklogTab.tsx
import { useState, useEffect } from "react";
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
import { Search, Filter, Download, LayoutGrid, User, Flag, Circle, BookOpen, Bug, CheckSquare, Edit2, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Demo data with proper structure
const backlogData = [
  {
    id: 1,
    summary: "Sprint Flow Including All Popups And Actions",
    issueType: "Story",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "To Do",
    priority: "High",
    assignee: "Rahul Sharma",
  },
  {
    id: 2,
    summary: "Backlog Flow Including All Popups And Actions.",
    issueType: "Bug",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "In Progress",
    priority: "High",
    assignee: "Priya Patel",
  },
  {
    id: 3,
    summary: "Project Ticket Details. Including All Popups And Tabs",
    issueType: "Task",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "Published",
    priority: "Medium",
    assignee: "Amit Kumar",
  },
  {
    id: 4,
    summary: "Boards Screen Including All Popups. Add New Board.",
    issueType: "Story",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 0,
    status: "To Do",
    priority: "High",
    assignee: "Neha Gupta",
  },
  {
    id: 5,
    summary: "Project Screen > Backlog Screen Including All Popups And Actions.",
    issueType: "Bug",
    feature: "--",
    teams: "QA",
    estimatedTime: 0,
    status: "Done",
    priority: "Low",
    assignee: "Vikram Singh",
  },
  {
    id: 6,
    summary: "User Authentication Flow Implementation",
    issueType: "Story",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 8,
    status: "In Progress",
    priority: "High",
    assignee: "Sneha Reddy",
  },
  {
    id: 7,
    summary: "API Integration for Dashboard",
    issueType: "Task",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 5,
    status: "To Do",
    priority: "Medium",
    assignee: "Rajesh Khanna",
  },
];

interface BacklogItem {
  id: number;
  summary: string;
  issueType: string;
  feature: string;
  teams: string;
  estimatedTime: number;
  status: string;
  priority: string;
  assignee: string;
}

interface EditingCell {
  id: number | null;
  field: string | null;
}

export default function BacklogTab({ projectId }: { projectId?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedIssueType, setSelectedIssueType] = useState<string>("all");
  const [isMobile, setIsMobile] = useState(false);
  const [backlogItems, setBacklogItems] = useState(backlogData);
  const [editingCell, setEditingCell] = useState<EditingCell>({ id: null, field: null });
  const [editValue, setEditValue] = useState("");

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter logic
  const filteredBacklog = backlogItems.filter((item) => {
    const matchesSearch = item.summary
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || item.priority === selectedPriority;
    const matchesTeam = selectedTeam === "all" || item.teams === selectedTeam;
    const matchesIssueType = selectedIssueType === "all" || item.issueType === selectedIssueType;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTeam && matchesIssueType;
  });

  // Update issue type
  const updateIssueType = (id: number, newType: string) => {
    setBacklogItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, issueType: newType } : item
      )
    );
  };

  // Start editing
  const startEditing = (id: number, field: string, currentValue: any) => {
    setEditingCell({ id, field });
    setEditValue(currentValue.toString());
  };

  // Save edit
  const saveEdit = () => {
    if (editingCell.id && editingCell.field) {
      setBacklogItems(prevItems =>
        prevItems.map(item => {
          if (item.id === editingCell.id) {
            if (editingCell.field === 'estimatedTime') {
              return { ...item, [editingCell.field]: parseInt(editValue) || 0 };
            }
            return { ...item, [editingCell.field]: editValue };
          }
          return item;
        })
      );
    }
    setEditingCell({ id: null, field: null });
    setEditValue("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingCell({ id: null, field: null });
    setEditValue("");
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Low":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "To Do":
        return <Circle className="h-4 w-4 text-gray-400" />;
      case "In Progress":
        return <Circle className="h-4 w-4 text-blue-500" />;
      case "Published":
        return <Circle className="h-4 w-4 text-purple-500" />;
      case "Done":
        return <Circle className="h-4 w-4 text-green-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Published":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Done":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case "Story":
        return <BookOpen className="h-3 w-3" />;
      case "Bug":
        return <Bug className="h-3 w-3" />;
      case "Task":
        return <CheckSquare className="h-3 w-3" />;
      default:
        return <BookOpen className="h-3 w-3" />;
    }
  };

  const handleExport = () => {
    console.log("Export backlog");
  };

  const handleOpenBoard = () => {
    console.log("Open board");
  };

  const handleApplyFilters = () => {
    console.log("Filters applied");
    setFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedStatus("all");
    setSelectedPriority("all");
    setSelectedTeam("all");
    setSelectedIssueType("all");
  };

  // Get active filters count
  const activeFiltersCount = [
    selectedStatus !== "all",
    selectedPriority !== "all",
    selectedTeam !== "all",
    selectedIssueType !== "all",
  ].filter(Boolean).length;

  // Render editable cell
  const renderEditableCell = (item: any, field: string, value: any, displayValue?: string) => {
    const isEditing = editingCell.id === item.id && editingCell.field === field;
    
    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="h-8 w-24"
            autoFocus
          />
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={saveEdit}>
            <Check className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={cancelEdit}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      );
    }
    
    return (
      <div 
        className="group flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5"
        onClick={() => startEditing(item.id, field, value)}
      >
        <span>{displayValue || value}</span>
        <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  // Mobile Card View
  const MobileCardView = () => (
    <div className="space-y-3">
      {filteredBacklog.map((item) => (
        <div key={item.id} className="rounded-lg border bg-card p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2 flex-1">
              {getIssueTypeIcon(item.issueType)}
              <p className="font-medium text-sm flex-1">{item.summary}</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Issue Type</p>
              <Select
                value={item.issueType}
                onValueChange={(value) => updateIssueType(item.id, value)}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue>
                    <div className="flex items-center gap-1">
                      {getIssueTypeIcon(item.issueType)}
                      <span>{item.issueType}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Status</p>
              <div className="flex items-center gap-1 mt-1">
                {getStatusIcon(item.status)}
                <span className="text-sm">{item.status}</span>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Feature</p>
              {renderEditableCell(item, 'feature', item.feature)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Teams</p>
              {renderEditableCell(item, 'teams', item.teams)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Est Time</p>
              {renderEditableCell(item, 'estimatedTime', item.estimatedTime, `${item.estimatedTime}h`)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Priority</p>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs mt-1 ${getPriorityColor(item.priority)}`}>
                <Flag className="mr-1 h-3 w-3" />
                {item.priority}
              </span>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">Assignee</p>
              <div className="flex items-center gap-1 mt-1">
                <User className="h-3 w-3" />
                <span className="text-sm">{item.assignee}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 px-2 sm:px-4">
      {/* Header with Search and Filter Button - Responsive */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {activeFiltersCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] w-[95%] rounded-lg">
              <DialogHeader>
                <DialogTitle>Filter Tasks</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="team">Team</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="DESIGN">DESIGN</SelectItem>
                      <SelectItem value="DEVELOPMENT">DEVELOPMENT</SelectItem>
                      <SelectItem value="QA">QA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="issueType">Issue Type</Label>
                  <Select value={selectedIssueType} onValueChange={setSelectedIssueType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                      <SelectItem value="Bug">Bug</SelectItem>
                      <SelectItem value="Task">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All
                </Button>
                <Button onClick={handleApplyFilters}>Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleExport} size="sm" className="sm:size-default">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          <Button onClick={handleOpenBoard} size="sm" className="sm:size-default">
            <LayoutGrid className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Open Board</span>
          </Button>
        </div>
      </div>

      {/* Active Filters Display - Responsive */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/50 p-2 sm:p-3">
          <span className="text-xs sm:text-sm font-medium">Active Filters:</span>
          {selectedStatus !== "all" && (
            <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs">
              Status: {selectedStatus}
            </span>
          )}
          {selectedPriority !== "all" && (
            <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs">
              Priority: {selectedPriority}
            </span>
          )}
          {selectedTeam !== "all" && (
            <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs">
              Team: {selectedTeam}
            </span>
          )}
          {selectedIssueType !== "all" && (
            <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs">
              Type: {selectedIssueType}
            </span>
          )}
        </div>
      )}

      {/* Sprint Header - Responsive */}
      <div className="rounded-lg border bg-card p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold">
              Projei Sprint (PRP-Sprint 2){" "}
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                Active
              </span>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              2025-10-17 - 2025-10-24
            </p>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {filteredBacklog.length} tasks
          </div>
        </div>
      </div>

      {/* Responsive Table/Card View */}
      {isMobile ? (
        <MobileCardView />
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border">
          <div className="min-w-[1000px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Summary</TableHead>
                  <TableHead className="w-[110px]">Issue Type</TableHead>
                  <TableHead className="w-[100px]">Feature</TableHead>
                  <TableHead className="w-[100px]">Teams</TableHead>
                  <TableHead className="w-[80px]">Est Time</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[90px]">Priority</TableHead>
                  <TableHead className="w-[130px]">Assignee</TableHead>
                  <TableHead className="w-[70px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBacklog.length > 0 ? (
                  filteredBacklog.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getIssueTypeIcon(item.issueType)}
                          <span className="line-clamp-2 text-sm">{item.summary}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.issueType}
                          onValueChange={(value) => updateIssueType(item.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[90px]">
                            <SelectValue>
                              <div className="flex items-center gap-1">
                                {getIssueTypeIcon(item.issueType)}
                                <span className="text-xs">{item.issueType}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Story">Story</SelectItem>
                            <SelectItem value="Bug">Bug</SelectItem>
                            <SelectItem value="Task">Task</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {renderEditableCell(item, 'feature', item.feature)}
                      </TableCell>
                      <TableCell>
                        {renderEditableCell(item, 'teams', item.teams)}
                      </TableCell>
                      <TableCell>
                        {renderEditableCell(item, 'estimatedTime', item.estimatedTime, `${item.estimatedTime}h`)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(item.status)}
                          <span className="text-xs">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${getPriorityColor(item.priority)}`}>
                          <Flag className="mr-1 h-2.5 w-2.5" />
                          {item.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm truncate">{item.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Filter className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No tasks found with selected filters.</p>
                        <Button variant="outline" size="sm" onClick={handleClearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}