// app/components/BacklogTab/utils/helpers.tsx
import { BookOpen, Bug, CheckSquare, Circle, Flag } from "lucide-react";

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
    case "Medium":
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Low":
      return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "To Do":
      return <Circle className="h-4 w-4 text-gray-400" />;
    case "In Progress":
      return <Circle className="h-4 w-4 text-blue-500" />;
    case "Published":
      return <Circle className="h-4 w-4 text-purple-500" />;
    case "Done":
      return <Circle className="h-4 w-4 text-green-500" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "To Do":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "Published":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
    case "Done":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getIssueTypeIcon = (type: string) => {
  switch (type) {
    case "Story":
      return <BookOpen className="h-3 w-3" />;
    case "Bug":
      return <Bug className="h-3 w-3" />;
    case "Task":
      return <CheckSquare className="h-3 w-3" />;
    default:
      return <BookOpen className="h-3 w-3" />;
  }
};