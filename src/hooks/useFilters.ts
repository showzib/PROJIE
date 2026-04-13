// app/components/BacklogTab/hooks/useFilters.ts
import { useState } from "react";

export function useFilters() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [selectedIssueType, setSelectedIssueType] = useState<string>("all");

  const activeFiltersCount = [
    selectedStatus !== "all",
    selectedPriority !== "all",
    selectedTeam !== "all",
    selectedIssueType !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedStatus("all");
    setSelectedPriority("all");
    setSelectedTeam("all");
    setSelectedIssueType("all");
  };

  return {
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
  };
}