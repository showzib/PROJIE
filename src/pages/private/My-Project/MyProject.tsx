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
}

export default function MyProject() {
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
    const newTask: Task = {
      id: tasks.length + 1,
      title: newProject.name,
      description: newProject.company,
      date: newProject.startDate,
      isStarred: false
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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