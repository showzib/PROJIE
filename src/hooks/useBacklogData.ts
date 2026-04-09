// app/components/BacklogTab/hooks/useBacklogData.ts
import { useState } from "react";

interface Filters {
  selectedStatus: string;
  selectedPriority: string;
  selectedTeam: string;
  selectedIssueType: string;
}

export function useBacklogData(searchTerm: string, filters: Filters, items?: any[]) {
  // Use provided items or fallback to empty array
  const [backlogItems, setBacklogItems] = useState(items || []);
  const [editingCell, setEditingCell] = useState<{ id: number | null; field: string | null }>({
    id: null,
    field: null,
  });
  const [editValue, setEditValue] = useState("");

  // Filter logic
  const filteredBacklog = backlogItems.filter((item) => {
    const matchesSearch = item.summary
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = filters.selectedStatus === "all" || item.status === filters.selectedStatus;
    const matchesPriority = filters.selectedPriority === "all" || item.priority === filters.selectedPriority;
    const matchesTeam = filters.selectedTeam === "all" || item.teams === filters.selectedTeam;
    const matchesIssueType = filters.selectedIssueType === "all" || item.issueType === filters.selectedIssueType;

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
    if (editingCell.id !== null && editingCell.field !== null) {
      setBacklogItems(prevItems =>
        prevItems.map(item => {
          if (item.id === editingCell.id) {
            if (editingCell.field === 'estimatedTime') {
              return { ...item, estimatedTime: parseInt(editValue) || 0 };
            }
            if (editingCell.field === 'feature') {
              return { ...item, feature: editValue };
            }
            if (editingCell.field === 'teams') {
              return { ...item, teams: editValue };
            }
            return item;
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

  return {
    backlogItems,
    filteredBacklog,
    updateIssueType,
    startEditing,
    saveEdit,
    cancelEdit,
    editingCell,
    editValue,
    setEditValue,
  };
}