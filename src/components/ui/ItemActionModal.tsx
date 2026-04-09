// app/components/BacklogTab/ItemActionModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ItemActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
  onSave: (updatedItem: any) => void;
  onSendToBacklog: (item: any) => void;
  mode: "edit" | "send";
}

export function ItemActionModal({
  open,
  onOpenChange,
  item,
  onSave,
  onSendToBacklog,
  mode,
}: ItemActionModalProps) {
  const [formData, setFormData] = useState<any>(null);

  // Reset form data when item changes or modal opens
  useEffect(() => {
    if (item && open) {
      setFormData({ ...item });
    }
  }, [item, open]);

  const handleChange = (field: string, value: any) => {
    if (formData) {
      setFormData((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    if (!formData) return;
    
    if (mode === "edit") {
      onSave(formData);
    } else {
      onSendToBacklog(formData);
    }
    onOpenChange(false);
  };

  // Don't render modal if no item or formData
  if (!item || !formData) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] w-[95%] rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Task" : "Send to Backlog"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <Input
              id="summary"
              value={formData.summary || ""}
              onChange={(e) => handleChange("summary", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="issueType">Issue Type</Label>
            <Select
              value={formData.issueType || "Story"}
              onValueChange={(value) => handleChange("issueType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Story">Story</SelectItem>
                <SelectItem value="Bug">Bug</SelectItem>
                <SelectItem value="Task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="feature">Feature</Label>
            <Input
              id="feature"
              value={formData.feature || ""}
              onChange={(e) => handleChange("feature", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="teams">Teams</Label>
            <Select
              value={formData.teams || "DEVELOPMENT"}
              onValueChange={(value) => handleChange("teams", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DESIGN">DESIGN</SelectItem>
                <SelectItem value="DEVELOPMENT">DEVELOPMENT</SelectItem>
                <SelectItem value="QA">QA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="estimatedTime">Estimated Time (hours)</Label>
            <Input
              id="estimatedTime"
              type="number"
              value={formData.estimatedTime || 0}
              onChange={(e) => handleChange("estimatedTime", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status || "To Do"}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority || "Medium"}
              onValueChange={(value) => handleChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={formData.assignee || ""}
              onChange={(e) => handleChange("assignee", e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "edit" ? "Save Changes" : "Send to Backlog"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}