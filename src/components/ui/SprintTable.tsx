import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Flag, Edit2, Trash2, ArrowDown, Check, X } from "lucide-react";
import { getIssueTypeIcon, getPriorityColor, getStatusIcon } from "../../../src/hooks/helpers";
import { EditableCell } from "./EditableCell";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SprintTableProps {
  items: any[];
  selectedItems: number[];
  onSelectItem: (id: number) => void;
  onSelectAll: () => void;
  updateIssueType: (id: number, newType: string) => void;
  editingCell: { id: number | null; field: string | null };
  editValue: string;
  setEditValue: (value: string) => void;
  onStartEdit: (id: number, field: string, currentValue: any) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditItem: (item: any) => void;
  onDeleteItem: (id: number) => void;
  onSendToBacklog: (items: any[]) => void;
}

export function SprintTable({
  items,
  selectedItems,
  onSelectItem,
  onSelectAll,
  updateIssueType,
  editingCell,
  editValue,
  setEditValue,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditItem,
  onDeleteItem,
  onSendToBacklog,
}: SprintTableProps) {
  const allSelected = items.length > 0 && selectedItems.length === items.length;
  
  // State for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      onDeleteItem(itemToDelete);
      setItemToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const renderEditableCell = (item: any, field: string, value: any, displayValue?: string) => (
    <EditableCell
      item={item}
      field={field}
      value={value}
      displayValue={displayValue}
      editingCell={editingCell}
      editValue={editValue}
      setEditValue={setEditValue}
      onStartEdit={onStartEdit}
      onSaveEdit={onSaveEdit}
      onCancelEdit={onCancelEdit}
    />
  );

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onSelectAll}
                  />
                </TableHead>
                <TableHead className="w-[350px]">Summary</TableHead>
                <TableHead className="w-[110px]">Issue Type</TableHead>
                <TableHead className="w-[100px]">Feature</TableHead>
                <TableHead className="w-[100px]">Teams</TableHead>
                <TableHead className="w-[80px]">Est Time</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[90px]">Priority</TableHead>
                <TableHead className="w-[130px]">Assignee</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => onSelectItem(item.id)}
                    />
                  </TableCell>
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
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => onEditItem(item)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {selectedItems.length > 0 && (
          <div className="border-t p-3 bg-muted/30 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {selectedItems.length} item(s) selected
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSendToBacklog(items.filter(item => selectedItems.includes(item.id)))}
            >
              <ArrowDown className="mr-2 h-3 w-3" />
              Send to Backlog ({selectedItems.length})
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}