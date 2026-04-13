// app/components/TaskRequest.tsx
import { useState } from "react";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal"; // ✅ Type-only import

const initialTaskRequests = [
  {
    id: 1,
    people: "John Doe",
    title: "Design Review",
    projectName: "Website Redesign",
    estimates: "5 days",
    createdOn: "2024-01-15",
  },
  {
    id: 2,
    people: "Jane Smith",
    title: "Bug Fixes",
    projectName: "Mobile App",
    estimates: "2 days",
    createdOn: "2024-01-14",
  },
];

export default function TaskRequest() {
  const [taskRequests, setTaskRequests] = useState(initialTaskRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    people: "",
    title: "",
    projectName: "",
    estimates: "",
  });

  const filteredTasks = taskRequests.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.people.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTask = (data: any) => {
    const newTask = {
      id: Date.now(),
      ...data,
      createdOn: new Date().toISOString().split("T")[0],
    };
    setTaskRequests([...taskRequests, newTask]);
    setModalType(null);
    setFormData({ people: "", title: "", projectName: "", estimates: "" });
  };

  const handleEditTask = (data: any) => {
    setTaskRequests(
      taskRequests.map((task) =>
        task.id === selectedTask.id ? { ...selectedTask, ...data } : task
      )
    );
    setModalType(null);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    setTaskRequests(taskRequests.filter((task) => task.id !== selectedTask.id));
    setModalType(null);
    setSelectedTask(null);
  };

  const openEditModal = (task: any) => {
    setSelectedTask(task);
    setModalType("editTask");
  };

  const openDeleteModal = (task: any) => {
    setSelectedTask(task);
    setModalType("deleteConfirm");
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Task Request ({taskRequests.length})</h1>

      {/* Search Bar and Add Button */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => {
          setFormData({ people: "", title: "", projectName: "", estimates: "" });
          setModalType("addTask");
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>People</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Estimates</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No task requests found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.people}</TableCell>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.projectName}</TableCell>
                    <TableCell>{task.estimates}</TableCell>
                    <TableCell>{task.createdOn}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(task)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(task)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Common Modal */}
      <CommonModal
        open={modalType !== null}
        onOpenChange={() => setModalType(null)}
        type={modalType || "addTask"}
        data={modalType === "editTask" ? selectedTask : formData}
        onConfirm={(data) => {
          if (modalType === "addTask") {
            handleAddTask(data);
          } else if (modalType === "editTask") {
            handleEditTask(data);
          } else if (modalType === "deleteConfirm") {
            handleDeleteTask();
          }
        }}
      />
    </div>
  );
}