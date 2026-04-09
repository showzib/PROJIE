// app/components/BacklogTab/ActiveFilters.tsx
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
  activeFiltersCount: number;
  selectedStatus: string;
  selectedPriority: string;
  selectedTeam: string;
  selectedIssueType: string;
  onClearFilters: () => void;
}

export function ActiveFilters({
  activeFiltersCount,
  selectedStatus,
  selectedPriority,
  selectedTeam,
  selectedIssueType,
  onClearFilters,
}: ActiveFiltersProps) {
  if (activeFiltersCount === 0) return null;

  return (
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
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-2 text-xs"
        onClick={onClearFilters}
      >
        Clear all
      </Button>
    </div>
  );
}