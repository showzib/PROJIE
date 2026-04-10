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
import { Folder } from "lucide-react";
import { CardSmall } from "@/components/ui/myprojectcard";
import { AddProjectModal } from "@/components/ui/AddProjectModal";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  isStarred: boolean;
  members?: { name: string; initials: string; image?: string }[];
}

// Helper function to get members for each card
const getMembersForCard = (id: number) => {
  const allMembers = [
    { name: "Rahul Sharma", initials: "RS", image: "" },
    { name: "Priya Patel", initials: "PP", image: "" },
    { name: "Amit Kumar", initials: "AK", image: "" },
    { name: "Neha Gupta", initials: "NG", image: "" },
    { name: "Vikram Singh", initials: "VS", image: "" },
    { name: "Sneha Reddy", initials: "SR", image: "" },
  ];

  switch (id) {
    case 1:
      return [allMembers[0]]; // 1 member
    case 2:
      return [allMembers[0], allMembers[1]]; // 2 members
    case 3:
      return [allMembers[0], allMembers[1], allMembers[2]]; // 3 members
    case 4:
      return [allMembers[0], allMembers[1], allMembers[2], allMembers[3]]; // 4 members
    case 5:
      return [allMembers[0], allMembers[1], allMembers[2], allMembers[3], allMembers[4]]; // 5 members
    case 6:
      return allMembers; // 6 members
    case 7:
      return [allMembers[0], allMembers[1]]; // 2 members
    case 8:
      return [allMembers[2], allMembers[3]]; // 2 members
    case 9:
      return [allMembers[4], allMembers[5]]; // 2 members
    case 10:
      return [allMembers[0], allMembers[2], allMembers[4]]; // 3 members
    case 11:
      return [allMembers[1], allMembers[3], allMembers[5]]; // 3 members
    default:
      return [allMembers[0], allMembers[1]]; // default 2 members
  }
};

export default function MyProject() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design Review",
      description: "UI/UX design review and feedback",
      date: "2024-01-20",
      isStarred: false,
      members: getMembersForCard(1)
    },
    {
      id: 2,
      title: "API Integration",
      description: "REST API integration with backend",
      date: "2024-01-21",
      isStarred: true,
      members: getMembersForCard(2)
    },
    {
      id: 3,
      title: "Bug Fixing",
      description: "Fix critical bugs in production",
      date: "2024-01-22",
      isStarred: false,
      members: getMembersForCard(3)
    },
    {
      id: 4,
      title: "Frontend Development",
      description: "Build responsive UI components",
      date: "2024-01-23",
      isStarred: false,
      members: getMembersForCard(4)
    },
    {
      id: 5,
      title: "Backend Integration",
      description: "Database connection setup",
      date: "2024-01-24",
      isStarred: false,
      members: getMembersForCard(5)
    },
    {
      id: 6,
      title: "Database Setup",
      description: "Configure and optimize database",
      date: "2024-01-25",
      isStarred: true,
      members: getMembersForCard(6)
    },
    {
      id: 7,
      title: "UI/UX Testing",
      description: "User acceptance testing",
      date: "2024-01-26",
      isStarred: false,
      members: getMembersForCard(7)
    },
    {
      id: 8,
      title: "Performance Optimization",
      description: "Improve app loading speed",
      date: "2024-01-27",
      isStarred: false,
      members: getMembersForCard(8)
    },
    {
      id: 9,
      title: "Security Audit",
      description: "Security vulnerability assessment",
      date: "2024-01-28",
      isStarred: true,
      members: getMembersForCard(9)
    },
    {
      id: 10,
      title: "Documentation",
      description: "Write technical documentation",
      date: "2024-01-29",
      isStarred: false,
      members: getMembersForCard(10)
    },
    {
      id: 11,
      title: "Deployment Setup",
      description: "CI/CD pipeline configuration",
      date: "2024-01-30",
      isStarred: false,
      members: getMembersForCard(11)
    }
  ]);

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  
  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      setIsEditModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteClick = (taskId: number) => {
    setDeletingTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      setTasks(tasks.filter(task => task.id !== deletingTaskId));
      setIsDeleteModalOpen(false);
      setDeletingTaskId(null);
    }
  };

  const handleStar = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const handleProjectCreate = (newProject: any) => {
    const newId = tasks.length + 1;
    const newTask: Task = {
      id: newId,
      title: newProject.name,
      description: newProject.company,
      date: newProject.startDate,
      isStarred: false,
      members: getMembersForCard(newId)
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Project</h1>
          <p className="text-muted-foreground">Your projects will appear here.</p>
        </div>
        <Button onClick={() => setIsAddProjectModalOpen(true)}>
          <Folder className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Grid for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tasks.map((task) => (
          <CardSmall
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isStarred={task.isStarred}
            onEdit={() => handleEdit(task)}
            onDelete={() => handleDeleteClick(task.id)}
            onStar={() => handleStar(task.id)}
            members={task.members}
          />
        ))}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        open={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        onProjectCreate={handleProjectCreate}
      />

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingTask.date}
                  onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}