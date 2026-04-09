// app/development/types/index.ts
export interface Task {
  id: number;
  summary: string;
  issueType: "Story" | "Bug" | "Task";
  feature: string;
  teams: "DESIGN" | "DEVELOPMENT" | "QA";
  estimatedTime: number;
  status: string;
  priority: "High" | "Medium" | "Low";
  assignee: string;
}

export interface Category {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  tasks: Task[];
}