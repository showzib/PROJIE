// app/development/components/DevelopmentHeader.tsx
import { Button } from "@/components/ui/button";
import { Users, Star, Bell, Filter } from "lucide-react";

interface DevelopmentHeaderProps {
  onMembersClick: () => void;
  onStarClick: () => void;
  onReadAllNotifications: () => void;
  onFilterClick: () => void;
  activeFilterCount: number;
}

export function DevelopmentHeader({
  onMembersClick,
  onStarClick,
  onReadAllNotifications,
  onFilterClick,
  activeFilterCount,
}: DevelopmentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Development</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your development progress across different stages
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onMembersClick}
          className="gap-2"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Members</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onStarClick}
          className="gap-2"
        >
          <Star className="h-4 w-4" />
          <span className="hidden sm:inline">Star</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onReadAllNotifications}
          className="gap-2"
        >
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Read All</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onFilterClick}
          className="relative gap-2"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter</span>
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}