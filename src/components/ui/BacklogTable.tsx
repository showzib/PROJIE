import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUp } from "lucide-react";
import { getIssueTypeIcon, getPriorityColor, getStatusIcon } from "../..//hooks/helpers";

interface BacklogTableProps {
  items: any[];
  onDelete: (id: number) => void;
  onSendToSprint: (item: any) => void;
}

export function BacklogTable({ items, onDelete, onSendToSprint }: BacklogTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/20 p-8 text-center">
        <p className="text-muted-foreground">No items in backlog</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <div className="min-w-[1000px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead className="w-[350px]">Summary</TableHead>
              <TableHead className="w-[110px]">Issue Type</TableHead>
              <TableHead className="w-[100px]">Feature</TableHead>
              <TableHead className="w-[100px]">Teams</TableHead>
              <TableHead className="w-[80px]">Est Time</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[90px]">Priority</TableHead>
              <TableHead className="w-[130px]">Assignee</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getIssueTypeIcon(item.issueType)}
                    <span className="line-clamp-2 text-sm">{item.summary}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getIssueTypeIcon(item.issueType)}
                    <span className="text-xs">{item.issueType}</span>
                  </div>
                </TableCell>
                <TableCell>{item.feature}</TableCell>
                <TableCell>{item.teams}</TableCell>
                <TableCell>{item.estimatedTime}h</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className="text-xs">{item.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm truncate">{item.assignee}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSendToSprint(item)}
                      className="h-7 px-2"
                    >
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Send
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                      className="h-7 px-2 text-red-600 hover:text-red-700"
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
    </div>
  );
}