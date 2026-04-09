// app/components/BacklogTab/index.tsx
import { useState, useEffect } from "react";
import { Search, Filter, Download, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterDialog } from "./backlogFilterDialog";
import { ActiveFilters } from "./backlogActiveFilters";
import { SprintHeader } from "./backlogSprintHeader";
import { BacklogTableView } from "./BacklogTableView";
import { BacklogMobileView } from "./BacklogMobileView";
import { useBacklogData } from "../../hooks/useBacklogData";
import { useFilters } from "./hooks/useFilters";
import { EditableCell } from "./EditableCell";

interface BacklogTabProps {
  projectId?: string;
}

export default function BacklogTab({ projectId }: BacklogTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  
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
    backlogItems,
    filteredBacklog,
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
  });

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
    console.log("Open board");
  };

  const handleApplyFilters = () => {
    console.log("Filters applied");
    setFilterOpen(false);
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
          <FilterDialog
            open={filterOpen}
            onOpenChange={setFilterOpen}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            selectedIssueType={selectedIssueType}
            setSelectedIssueType={setSelectedIssueType}
            onApplyFilters={handleApplyFilters}
            onClearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

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

      {/* Sprint Header */}
      <SprintHeader taskCount={filteredBacklog.length} />

      {/* Responsive Table/Card View */}
      {isMobile ? (
        <BacklogMobileView
          items={filteredBacklog}
          updateIssueType={updateIssueType}
          renderEditableCell={(item, field, value, displayValue) => (
            <EditableCell
              item={item}
              field={field}
              value={value}
              displayValue={displayValue}
              editingCell={editingCell}
              editValue={editValue}
              setEditValue={setEditValue}
              onStartEdit={startEditing}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
            />
          )}
        />
      ) : (
        <BacklogTableView
          items={filteredBacklog}
          updateIssueType={updateIssueType}
          editingCell={editingCell}
          editValue={editValue}
          setEditValue={setEditValue}
          onStartEdit={startEditing}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onClearFilters={clearFilters}
        />
      )}
    </div>
  );
}