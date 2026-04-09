// app/development/components/DevelopmentFilterDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DevelopmentFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedPriority: string;
  setSelectedPriority: (value: string) => void;
  selectedTeam: string;
  setSelectedTeam: (value: string) => void;
  selectedIssueType: string;
  setSelectedIssueType: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function DevelopmentFilterDialog({
  open,
  onOpenChange,
  selectedStatus,
  setSelectedStatus,
  selectedPriority,
  setSelectedPriority,
  selectedTeam,
  setSelectedTeam,
  selectedIssueType,
  setSelectedIssueType,
  onApplyFilters,
  onClearFilters,
  activeFiltersCount,
}: DevelopmentFilterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95%] rounded-lg">
        <DialogHeader>
          <DialogTitle>Filter Tasks</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Development">In Development</SelectItem>
                <SelectItem value="Development Done">Development Done</SelectItem>
                <SelectItem value="Ready for QA">Ready for QA</SelectItem>
                <SelectItem value="QA In Progress">QA In Progress</SelectItem>
                <SelectItem value="QA Verified">QA Verified</SelectItem>
                <SelectItem value="Discussion">Discussion</SelectItem>
                <SelectItem value="Deferred">Deferred</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Priority</Label>
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
            <Label>Team</Label>
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
            <Label>Issue Type</Label>
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
          <Button variant="outline" onClick={onClearFilters}>
            Clear All
          </Button>
          <Button onClick={onApplyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}