// components/ui/MembersModal.tsx
"use client";

import { Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// ✅ Export as type for type-only import
export type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  team: string;
};

interface MembersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members?: Member[]; // Optional, so you can pass data from parent
  onMemberClick?: (member: Member) => void; // Optional callback for member click
}

// Default mock data (can be overridden by props)
const defaultMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Frontend Developer",
    avatar: "",
    status: "online",
    team: "Development",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Backend Developer",
    avatar: "",
    status: "online",
    team: "Development",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "UI/UX Designer",
    avatar: "",
    status: "away",
    team: "Design",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Project Manager",
    avatar: "",
    status: "offline",
    team: "Management",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    role: "QA Engineer",
    avatar: "",
    status: "online",
    team: "QA",
  },
];

export function MembersModal({ 
  open, 
  onOpenChange, 
  members = defaultMembers,
  onMemberClick 
}: MembersModalProps) {
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle member click
  const handleMemberClick = (member: Member) => {
    if (onMemberClick) {
      onMemberClick(member);
    } else {
      // Default action: open email
      window.location.href = `mailto:${member.email}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
            <Badge variant="secondary" className="ml-2">
              {members.length} members
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
            >
              {/* Avatar with status indicator */}
              <div className="relative">
                <Avatar className="h-10 w-10">
                  {member.avatar ? (
                    <AvatarImage src={member.avatar} alt={member.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(member.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                    member.status
                  )}`}
                />
              </div>
              
              {/* Member info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.team}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.email}
                </p>
              </div>
              
              {/* Action buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleMemberClick(member)}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        {/* Footer with member stats */}
        <div className="flex justify-between items-center pt-4 border-t mt-2">
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Online: {members.filter(m => m.status === "online").length}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              Away: {members.filter(m => m.status === "away").length}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-gray-400"></span>
              Offline: {members.filter(m => m.status === "offline").length}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}