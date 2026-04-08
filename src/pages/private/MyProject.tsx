"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Folder } from "lucide-react";
import { CardSmall } from "@/components/ui/myprojectcard";
import { AddProjectModal } from "@/components/ui/AddProjectModal"; // Import the new component

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isStarred: boolean;
}

export default function TaskRequest() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design Review",
      description: "spliseit",
      date: "2024-01-20",
      isStarred: false
    },
    {
      id: 2,
      title: "API Integration",
      description: "spliseit",
      date: "2024-01-21",
      isStarred: true
    },
    {
      id: 3,
      title: "Bug Fixing",
      description: "spliseit",
      date: "2024-01-22",
      isStarred: false
    }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleStar = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const handleSaveEdit = () => {
    if (selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? selectedTask : task
      ));
      setIsEditModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleProjectCreate = (newProject: any) => {
    // Convert project to task format
    const newTask: Task = {
      id: tasks.length + 1,
      title: newProject.name,
      description: newProject.company,
      date: newProject.startDate,
      isStarred: false
    };
    setTasks([...tasks, newTask]);
    console.log("New Project Created:", newProject);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Project</h1>
          <p className="text-muted-foreground">Your task requests will appear here.</p>
        </div>
        <Button onClick={() => setIsAddProjectModalOpen(true)}>
          <Folder className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <CardSmall
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isStarred={task.isStarred}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDelete(task.id)}
            onStar={() => handleStar(task.id)}
          />
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here.
            </DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={selectedTask.date}
                  onChange={(e) => setSelectedTask({ ...selectedTask, date: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Project Modal - Separate Component */}
      <AddProjectModal
        open={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        onProjectCreate={handleProjectCreate}
      />
    </div>
  );
}