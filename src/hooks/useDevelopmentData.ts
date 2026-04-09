// app/development/hooks/useDevelopmentData.ts
import { useState, useEffect } from "react";
import type { Category, Task } from "./development.type";

const initialTasks: Task[] = [
  {
    id: 1,
    summary: "Sprint Flow Including All Popups And Actions",
    issueType: "Story",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "To Do",
    priority: "High",
    assignee: "Rahul Sharma",
  },
  {
    id: 2,
    summary: "Backlog Flow Including All Popups And Actions.",
    issueType: "Bug",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "In Development",
    priority: "High",
    assignee: "Priya Patel",
  },
  {
    id: 3,
    summary: "Project Ticket Details. Including All Popups And Tabs",
    issueType: "Task",
    feature: "--",
    teams: "DESIGN",
    estimatedTime: 0,
    status: "Published",
    priority: "Medium",
    assignee: "Amit Kumar",
  },
  {
    id: 4,
    summary: "Boards Screen Including All Popups. Add New Board.",
    issueType: "Story",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 0,
    status: "To Do",
    priority: "High",
    assignee: "Neha Gupta",
  },
  {
    id: 5,
    summary: "User Authentication Flow Implementation",
    issueType: "Story",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 8,
    status: "In Development",
    priority: "High",
    assignee: "Sneha Reddy",
  },
  {
    id: 6,
    summary: "API Integration for Dashboard",
    issueType: "Task",
    feature: "--",
    teams: "DEVELOPMENT",
    estimatedTime: 5,
    status: "Development Done",
    priority: "Medium",
    assignee: "Rajesh Khanna",
  },
  {
    id: 7,
    summary: "Testing Suite Configuration",
    issueType: "Task",
    feature: "--",
    teams: "QA",
    estimatedTime: 3,
    status: "Ready for QA",
    priority: "High",
    assignee: "Vikram Singh",
  },
];

const categoryTitles = [
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

export function useDevelopmentData() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Organize tasks by category
  const categories: Category[] = categoryTitles.map((title, index) => ({
    id: `category-${index}`,
    title,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    tasks: tasks.filter((task) => task.status === title),
  }));

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return {
    categories,
    tasks,
    updateTaskStatus,
  };
}