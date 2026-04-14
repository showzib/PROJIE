import { useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FolderOpen, Activity, ClipboardList, Plus, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";

interface Board {
  id: number;
  title: string;
  description: string;
  taskCount: number;
  date: string;
  icon: JSX.Element;
  bgColor: string;
}

export default function MyBoards() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: "Development",
      description: "Development sprint planning and tracking",
      taskCount: 78,
      date: "Nov 15 2023",
      icon: <Activity className="h-4 w-4" />,
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      id: 2,
      title: "Teamwork",
      description: "Team collaboration and task management",
      taskCount: 22,
      date: "Nov 3 2023",
      icon: <Users className="h-4 w-4" />,
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      id: 3,
      title: "PMO",
      description: "Project management office tasks",
      taskCount: 19,
      date: "Nov 21 2023",
      icon: <Activity className="h-4 w-4" />,
      bgColor: "bg-purple-50 dark:bg-purple-950"
    }
  ]);

  // Navigate to development page
  const handleBoardClick = (boardId: number) => {
    navigate(`/project/${boardId}/development`);
  };

  // Handle new board creation
  const handleAddBoard = (newProject: any) => {
    // Get random color for new board
    const colors = [
      "bg-blue-50 dark:bg-blue-950",
      "bg-green-50 dark:bg-green-950", 
      "bg-purple-50 dark:bg-purple-950",
      "bg-orange-50 dark:bg-orange-950",
      "bg-pink-50 dark:bg-pink-950",
      "bg-indigo-50 dark:bg-indigo-950",
      "bg-teal-50 dark:bg-teal-950"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Strip HTML tags from description
    const plainDescription = newProject.description?.replace(/<[^>]*>/g, '').substring(0, 100) || newProject.company;
    
    const newBoard: Board = {
      id: boards.length + 1,
      title: newProject.name,
      description: plainDescription,
      taskCount: 0,
      date: new Date(newProject.startDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      icon: <FolderOpen className="h-4 w-4" />,
      bgColor: randomColor
    };
    
    setBoards([...boards, newBoard]);
    
    toast.success(`${newProject.name} board created! 🎉`, {
      description: "Your new board has been added",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">My Boards</h1>
        </div>
        <Button onClick={() => setModalType("addProject")} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Board
        </Button>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {boards.map((board) => (
          <Card 
            key={board.id}
            className="cursor-pointer hover:shadow-lg transition-all group"
            onClick={() => handleBoardClick(board.id)}
          >
            <CardHeader className="pb-1 pt-3 px-3">
              <CardTitle className="text-sm flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded ${board.bgColor}`}>
                    {board.icon}
                  </div>
                  <span className="line-clamp-1 font-semibold">{board.title}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xs text-muted-foreground line-clamp-2">
                {board.description}
              </p>
              
              <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>{board.taskCount} tasks</span>
              </div>
              
              <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{board.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Board Modal */}
      <CommonModal
        open={modalType === "addProject"}
        onOpenChange={() => setModalType(null)}
        type="addProject"
        onConfirm={handleAddBoard}
      />
    </div>
  );
}