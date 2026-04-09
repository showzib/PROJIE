// app/development/components/TaskCard.tsx
import { User, Flag, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/hooks/development.type";
import { getIssueTypeIcon, getPriorityColor } from "@/hooks/helpers";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: number, newStatus: string) => void;
}

const statusOptions = [
  "To Do",
  "In Development",
  "Development Done",
  "Ready for QA",
  "QA In Progress",
  "QA Verified",
  "Discussion",
  "Deferred",
  "Published",
];

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-950 p-3 hover:shadow-md transition-shadow">
      {/* Task Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1">
          {getIssueTypeIcon(task.issueType)}
          <p className="text-sm font-medium line-clamp-2 flex-1">{task.summary}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {statusOptions.map((status) => (
              <DropdownMenuItem
                key={status}
                onClick={() => onStatusChange(task.id, status)}
                className={task.status === status ? "bg-muted" : ""}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task Details */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{task.estimatedTime}h</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${getPriorityColor(task.priority)}`}>
            <Flag className="mr-1 h-2 w-2" />
            {task.priority}
          </span>
          <span className="text-xs text-muted-foreground">{task.teams}</span>
        </div>
      </div>
    </div>
  );
}