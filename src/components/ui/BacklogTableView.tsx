// app/components/BacklogTab/BacklogTableView.tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, User, Flag, Circle } from "lucide-react";
import { EditableCell } from "./EditableCell";
import { getIssueTypeIcon, getPriorityColor, getStatusIcon } from "../../hooks/helpers";

interface BacklogTableViewProps {
  items: any[];
  updateIssueType: (id: number, newType: string) => void;
  editingCell: { id: number | null; field: string | null };
  editValue: string;
  setEditValue: (value: string) => void;
  onStartEdit: (id: number, field: string, currentValue: any) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onClearFilters: () => void;
}

export function BacklogTableView({
  items,
  updateIssueType,
  editingCell,
  editValue,
  setEditValue,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onClearFilters,
}: BacklogTableViewProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border">
        <div className="flex flex-col items-center gap-2 p-8 text-center">
          <Filter className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No tasks found with selected filters.</p>
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
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
            {items.map((item) => (
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
                  <EditableCell
                    item={item}
                    field="feature"
                    value={item.feature}
                    editingCell={editingCell}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onStartEdit={onStartEdit}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    item={item}
                    field="teams"
                    value={item.teams}
                    editingCell={editingCell}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onStartEdit={onStartEdit}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                  />
                </TableCell>
                <TableCell>
                  <EditableCell
                    item={item}
                    field="estimatedTime"
                    value={item.estimatedTime}
                    displayValue={`${item.estimatedTime}h`}
                    editingCell={editingCell}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    onStartEdit={onStartEdit}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                  />
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}