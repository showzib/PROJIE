// app/components/BacklogTab.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Download, LayoutGrid, Inbox, ChevronLeft, ChevronRight, User, Flag, Circle, BookOpen, Bug, CheckSquare, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActiveFilters } from "@/components/ui/backlogActiveFilters";
import { SprintHeader } from "@/components/ui/backlogSprintHeader";
import { SprintTable } from "@/components/ui/SprintTable";
import { BacklogTable } from "@/components/ui/BacklogTable";
import { useFilters } from "@/components/ui/hooks/useFilters";
import { useBacklogData } from "@/hooks/useBacklogData";

// Initial Sprint Data
const initialSprintData = [
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

// Initial Backlog Data
const initialBacklogData: any[] = [];

// Helper functions for icons
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

interface BacklogTabProps {
  projectId?: string;
  onOpenBoard?: () => void;
}

export default function BacklogTab({ projectId, onOpenBoard }: BacklogTabProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSprintItems, setSelectedSprintItems] = useState<number[]>([]);
  
  // Modal states
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  
  // Sprint data state
  const [sprintItems, setSprintItems] = useState(initialSprintData);
  // Backlog data state
  const [backlogItems, setBacklogItems] = useState(initialBacklogData);

  const {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedTeam,
    setSelectedTeam,
    selectedIssueType,
    setSelectedIssueType,
    activeFiltersCount,
    clearFilters,
  } = useFilters();

  const {
    filteredBacklog: filteredSprint,
    updateIssueType,
    startEditing,
    saveEdit,
    cancelEdit,
    editingCell,
    editValue,
    setEditValue,
  } = useBacklogData(searchTerm, {
    selectedStatus,
    selectedPriority,
    selectedTeam,
    selectedIssueType,
  }, sprintItems);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExport = () => {
    console.log("Export backlog");
  };

  const handleOpenBoard = () => {
    navigate(`/project/${projectId}/development`);
  };

  const handleApplyFilters = () => {
    setModalType(null);
  };

  // Select/Deselect sprint items
  const handleSelectSprintItem = (id: number) => {
    setSelectedSprintItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAllSprint = () => {
    if (selectedSprintItems.length === filteredSprint.length) {
      setSelectedSprintItems([]);
    } else {
      setSelectedSprintItems(filteredSprint.map(item => item.id));
    }
  };

  // Edit item
  const handleEditItem = (item: any) => {
    setCurrentItem(item);
    setEditFormData({
      title: item.summary,
      people: item.assignee,
      projectName: item.feature,
      estimates: `${item.estimatedTime}h`,
      issueType: item.issueType,
      priority: item.priority,
      status: item.status,
      teams: item.teams,
    });
    setModalType("editTask");
  };

  const handleSaveEdit = (data: any) => {
    if (currentItem) {
      setSprintItems(prev =>
        prev.map(item =>
          item.id === currentItem.id
            ? {
                ...item,
                summary: data.title || item.summary,
                assignee: data.people || item.assignee,
                feature: data.projectName || item.feature,
                estimatedTime: parseInt(data.estimates) || item.estimatedTime,
                issueType: data.issueType || item.issueType,
                priority: data.priority || item.priority,
                status: data.status || item.status,
                teams: data.teams || item.teams,
              }
            : item
        )
      );
    }
    setModalType(null);
    setCurrentItem(null);
  };

  // Delete item
  const handleDeleteItem = (id: number) => {
    const itemToDelete = sprintItems.find(item => item.id === id);
    setCurrentItem(itemToDelete);
    setModalType("deleteConfirm");
  };

  const handleConfirmDelete = () => {
    if (currentItem) {
      setSprintItems(prev => prev.filter(item => item.id !== currentItem.id));
      setSelectedSprintItems(prev => prev.filter(id => id !== currentItem.id));
    }
    setModalType(null);
    setCurrentItem(null);
  };

  // Send to backlog
  const handleSendToBacklog = (items: any[]) => {
    const newBacklogItems = [...backlogItems, ...items];
    setBacklogItems(newBacklogItems);
    setSprintItems(prev => prev.filter(item => !items.some(i => i.id === item.id)));
    setSelectedSprintItems([]);
  };

  const handleConfirmSendToBacklog = (item: any) => {
    setBacklogItems(prev => [...prev, item]);
    setSprintItems(prev => prev.filter(i => i.id !== item.id));
    setModalType(null);
  };

  // Backlog actions
  const handleDeleteFromBacklog = (id: number) => {
    const itemToDelete = backlogItems.find(item => item.id === id);
    setCurrentItem(itemToDelete);
    setModalType("deleteConfirm");
  };

  const handleConfirmBacklogDelete = () => {
    if (currentItem) {
      setBacklogItems(prev => prev.filter(item => item.id !== currentItem.id));
    }
    setModalType(null);
    setCurrentItem(null);
  };

  const handleSendToSprint = (item: any) => {
    const newId = Math.max(...sprintItems.map(i => i.id), 0) + 1;
    const itemWithNewId = { ...item, id: newId };
    setSprintItems(prev => [...prev, itemWithNewId]);
    setBacklogItems(prev => prev.filter(i => i.id !== item.id));
  };

  // Open filter modal
  const handleOpenFilter = () => {
    setModalType("backlogFilter");
  };

  // Mobile Card View for Sprint Items
  const MobileSprintCardView = () => (
    <div className="space-y-3">
      {filteredSprint.map((item) => (
        <div key={item.id} className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2 flex-1">
              <input
                type="checkbox"
                checked={selectedSprintItems.includes(item.id)}
                onChange={() => handleSelectSprintItem(item.id)}
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getIssueTypeIcon(item.issueType)}
                  <p className="font-medium text-sm flex-1">{item.summary}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleEditItem(item)}>
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(item.id)}>
                <X className="h-3 w-3 text-red-500" />
              </Button>
            </div>
          </div>

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
              <p className="text-sm mt-1">{item.feature}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Teams</p>
              <p className="text-sm mt-1">{item.teams}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Est Time</p>
              <p className="text-sm mt-1">{item.estimatedTime}h</p>
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

          <div className="flex gap-2 pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => handleSendToBacklog([item])}
            >
              Send to Backlog
            </Button>
          </div>
        </div>
      ))}
      
      {selectedSprintItems.length > 0 && (
        <div className="sticky bottom-4 rounded-lg bg-primary p-3 text-primary-foreground flex justify-between items-center">
          <span className="text-sm">{selectedSprintItems.length} selected</span>
          <Button 
            size="sm" 
            variant="secondary"
            onClick={() => handleSendToBacklog(filteredSprint.filter(item => selectedSprintItems.includes(item.id)))}
          >
            Send to Backlog ({selectedSprintItems.length})
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile Card View for Backlog Items
  const MobileBacklogCardView = () => (
    <div className="space-y-3">
      {backlogItems.length === 0 ? (
        <div className="rounded-lg border bg-muted/20 p-8 text-center">
          <Inbox className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No items in backlog</p>
        </div>
      ) : (
        backlogItems.map((item) => (
          <div key={item.id} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2 flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getIssueTypeIcon(item.issueType)}
                    <p className="font-medium text-sm flex-1">{item.summary}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleSendToSprint(item)}>
                  Send to Sprint
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteFromBacklog(item.id)}>
                  <X className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Issue Type</p>
                <div className="flex items-center gap-1 mt-1">
                  {getIssueTypeIcon(item.issueType)}
                  <span>{item.issueType}</span>
                </div>
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
                <p className="text-sm mt-1">{item.feature}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">Teams</p>
                <p className="text-sm mt-1">{item.teams}</p>
              </div>

              <div>
                <p className="text-muted-foreground text-xs">Est Time</p>
                <p className="text-sm mt-1">{item.estimatedTime}h</p>
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
        ))
      )}
    </div>
  );

  // Filter data for CommonModal
  const filterData = {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedTeam,
    setSelectedTeam,
    selectedIssueType,
    setSelectedIssueType,
    onApplyFilters: handleApplyFilters,
    onClearFilters: clearFilters,
    activeFiltersCount,
  };

  return (
    <div className="space-y-4 px-2 sm:px-4">
      {/* Header with Search and Filter Button */}
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
          <Button variant="outline" onClick={handleOpenFilter} className="relative">
            <Filter className="mr-2 h-4 w-4" />
            Filter
            {activeFiltersCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>

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

      {/* Active Filters Display */}
      <ActiveFilters
        activeFiltersCount={activeFiltersCount}
        selectedStatus={selectedStatus}
        selectedPriority={selectedPriority}
        selectedTeam={selectedTeam}
        selectedIssueType={selectedIssueType}
        onClearFilters={clearFilters}
      />

      {/* Sprint Section */}
      <div className="space-y-3">
        <SprintHeader taskCount={filteredSprint.length} />
        
        {isMobile ? (
          <MobileSprintCardView />
        ) : (
          <div className="w-full overflow-x-auto rounded-lg border">
            <div className="min-w-[800px] lg:min-w-0">
              <SprintTable
                items={filteredSprint}
                selectedItems={selectedSprintItems}
                onSelectItem={handleSelectSprintItem}
                onSelectAll={handleSelectAllSprint}
                updateIssueType={updateIssueType}
                editingCell={editingCell}
                editValue={editValue}
                setEditValue={setEditValue}
                onStartEdit={startEditing}
                onSaveEdit={saveEdit}
                onCancelEdit={cancelEdit}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                onSendToBacklog={handleSendToBacklog}
              />
            </div>
          </div>
        )}
      </div>

      {/* Backlog Section */}
      <div className="space-y-3">
        <div className="rounded-lg border bg-card p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-base sm:text-lg font-semibold">
                Backlog
              </h3>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {backlogItems.length} items
            </div>
          </div>
        </div>

        {isMobile ? (
          <MobileBacklogCardView />
        ) : (
          <div className="w-full overflow-x-auto rounded-lg border">
            <div className="min-w-[800px] lg:min-w-0">
              <BacklogTable
                items={backlogItems}
                onDelete={handleDeleteFromBacklog}
                onSendToSprint={handleSendToSprint}
              />
            </div>
          </div>
        )}
      </div>

      {/* Edit Task Modal */}
      <CommonModal
        open={modalType === "editTask"}
        onOpenChange={() => {
          setModalType(null);
          setCurrentItem(null);
        }}
        type="editTask"
        data={editFormData}
        onConfirm={handleSaveEdit}
      />

      {/* Delete Confirm Modal */}
      <CommonModal
        open={modalType === "deleteConfirm"}
        onOpenChange={() => {
          setModalType(null);
          setCurrentItem(null);
        }}
        type="deleteConfirm"
        data={{ title: currentItem?.summary }}
        onConfirm={() => {
          if (currentItem) {
            if (sprintItems.some(i => i.id === currentItem.id)) {
              handleConfirmDelete();
            } else {
              handleConfirmBacklogDelete();
            }
          }
        }}
      />

      {/* Filter Modal */}
      <CommonModal
        open={modalType === "backlogFilter"}
        onOpenChange={() => setModalType(null)}
        type="backlogFilter"
        data={filterData}
      />
    </div>
  );
}