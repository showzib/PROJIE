import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { CardSmall } from "@/components/ui/myprojectcard";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";

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
      return [allMembers[0]];
    case 2:
      return [allMembers[0], allMembers[1]];
    case 3:
      return [allMembers[0], allMembers[1], allMembers[2]];
    case 4:
      return [allMembers[0], allMembers[1], allMembers[2], allMembers[3]];
    case 5:
      return [allMembers[0], allMembers[1], allMembers[2], allMembers[3], allMembers[4]];
    case 6:
      return allMembers;
    case 7:
      return [allMembers[0], allMembers[1]];
    case 8:
      return [allMembers[2], allMembers[3]];
    case 9:
      return [allMembers[4], allMembers[5]];
    case 10:
      return [allMembers[0], allMembers[2], allMembers[4]];
    case 11:
      return [allMembers[1], allMembers[3], allMembers[5]];
    default:
      return [allMembers[0], allMembers[1]];
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

  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalType("editTask");
  };

  const handleSaveEdit = (data: any) => {
    if (selectedTask) {
      setTasks(tasks.map(task =>
        task.id === selectedTask.id
          ? {
              ...task,
              title: data.title || task.title,
              description: data.description || task.description,
              date: data.date || task.date
            }
          : task
      ));
      setModalType(null);
      setSelectedTask(null);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setModalType("deleteConfirm");
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setModalType(null);
      setSelectedTask(null);
    }
  };

  const handleStar = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, isStarred: !task.isStarred } : task
    ));
  };

  const handleAddProject = () => {
    setModalType("addProject");
  };

  const handleAddProjectConfirm = (data: any) => {
    const newId = tasks.length + 1;
    const newTask: Task = {
      id: newId,
      title: data.name,
      description: data.company,
      date: data.startDate,
      isStarred: false,
      members: getMembersForCard(newId)
    };
    setTasks([...tasks, newTask]);
    setModalType(null);
  };

  // Get data for edit modal
  const getEditModalData = () => {
    if (selectedTask) {
      return {
        title: selectedTask.title,
        description: selectedTask.description,
        date: selectedTask.date,
      };
    }
    return {};
  };

  // Get data for delete modal
  const getDeleteModalData = () => {
    if (selectedTask) {
      return { title: selectedTask.title };
    }
    return {};
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">My Project</h1>
          <p className="text-muted-foreground">Your projects will appear here.</p>
        </div>
        <Button onClick={handleAddProject}>
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
            onDelete={() => handleDeleteClick(task)}
            onStar={() => handleStar(task.id)}
            members={task.members}
          />
        ))}
      </div>

      {/* Add Project Modal */}
      <CommonModal
        open={modalType === "addProject"}
        onOpenChange={() => setModalType(null)}
        type="addProject"
        onConfirm={handleAddProjectConfirm}
      />

      {/* Edit Task Modal */}
      <CommonModal
        open={modalType === "editTask"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedTask(null);
        }}
        type="editTask"
        data={getEditModalData()}
        onConfirm={handleSaveEdit}
      />

      {/* Delete Confirm Modal */}
      <CommonModal
        open={modalType === "deleteConfirm"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedTask(null);
        }}
        type="deleteConfirm"
        data={getDeleteModalData()}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}