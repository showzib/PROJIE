// app/components/BacklogTab/BacklogMobileView.tsx
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Flag } from "lucide-react";
import { getIssueTypeIcon, getPriorityColor, getStatusIcon } from "../../hooks/helpers";

interface BacklogMobileViewProps {
  items: any[];
  updateIssueType: (id: number, newType: string) => void;
  renderEditableCell: (item: any, field: string, value: any, displayValue?: string) => React.ReactNode;
}

export function BacklogMobileView({
  items,
  updateIssueType,
  renderEditableCell,
}: BacklogMobileViewProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border bg-card p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2 flex-1">
              {getIssueTypeIcon(item.issueType)}
              <p className="font-medium text-sm flex-1">{item.summary}</p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Issue Type</p>
              <Select
                value={item.issueType}
                onValueChange={(value) => updateIssueType(item.id, value)}
              >
                <SelectTrigger className="h-8 mt-1">
                  <SelectValue>
                    <div className="flex items-center gap-1">
                      {getIssueTypeIcon(item.issueType)}
                      <span>{item.issueType}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Story">Story</SelectItem>
                  <SelectItem value="Bug">Bug</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Status</p>
              <div className="flex items-center gap-1 mt-1">
                {getStatusIcon(item.status)}
                <span className="text-sm">{item.status}</span>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Feature</p>
              {renderEditableCell(item, 'feature', item.feature)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Teams</p>
              {renderEditableCell(item, 'teams', item.teams)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Est Time</p>
              {renderEditableCell(item, 'estimatedTime', item.estimatedTime, `${item.estimatedTime}h`)}
            </div>

            <div>
              <p className="text-muted-foreground text-xs">Priority</p>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs mt-1 ${getPriorityColor(item.priority)}`}>
                <Flag className="mr-1 h-3 w-3" />
                {item.priority}
              </span>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">Assignee</p>
              <div className="flex items-center gap-1 mt-1">
                <User className="h-3 w-3" />
                <span className="text-sm">{item.assignee}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}