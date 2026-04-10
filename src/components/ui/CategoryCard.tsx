// app/development/components/CategoryCard.tsx
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Category, Task } from "@/hooks/development.type";
import { TaskCard } from "./TaskCard";
import DevelopmentCardDetailModal from "./developmentcarddetailModal"; 

interface CategoryCardProps {
  category: Category;
  onTaskStatusChange: (taskId: number, newStatus: string) => void;
}

export function CategoryCard({ category, onTaskStatusChange }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle task click to open modal
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Color mapping for categories
  const getCategoryColor = (title: string) => {
    const colors: Record<string, string> = {
      "To Do": "border-gray-200 bg-gray-50 dark:bg-gray-900/20",
      "In Development": "border-blue-200 bg-blue-50 dark:bg-blue-900/20",
      "Development Done": "border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20",
      "Ready for QA": "border-purple-200 bg-purple-50 dark:bg-purple-900/20",
      "QA In Progress": "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20",
      "QA Verified": "border-green-200 bg-green-50 dark:bg-green-900/20",
      "Discussion": "border-orange-200 bg-orange-50 dark:bg-orange-900/20",
      "Deferred": "border-red-200 bg-red-50 dark:bg-red-900/20",
      "Published": "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20",
    };
    return colors[title] || "border-gray-200 bg-gray-50";
  };

  const getTitleColor = (title: string) => {
    const colors: Record<string, string> = {
      "To Do": "text-gray-700",
      "In Development": "text-blue-700",
      "Development Done": "text-indigo-700",
      "Ready for QA": "text-purple-700",
      "QA In Progress": "text-yellow-700",
      "QA Verified": "text-green-700",
      "Discussion": "text-orange-700",
      "Deferred": "text-red-700",
      "Published": "text-emerald-700",
    };
    return colors[title] || "text-gray-700";
  };

  return (
    <>
      <div className={`rounded-lg border-2 ${getCategoryColor(category.title)} p-4 h-full flex flex-col`}>
        {/* Category Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div>
            <h3 className={`text-lg font-semibold ${getTitleColor(category.title)}`}>
              {category.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {category.tasks.length} tasks
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Vertical Carousel for Tasks */}
        {isExpanded && (
          <div className="flex-1 min-h-0">
            {category.tasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No tasks in {category.title}
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {category.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onStatusChange={onTaskStatusChange}
                    onClick={handleTaskClick} // Pass click handler
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal - Make sure this matches your modal component name */}
      <DevelopmentCardDetailModal
        task={selectedTask}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}