"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Star } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskCardProps {
  id?: number;
  title: string;
  description: string;
  date?: string;
  isStarred?: boolean;
  reviewers?: Array<{ name: string; image?: string; rating?: number }>;
  onEdit?: () => void;
  onDelete?: () => void;
  onStar?: () => void;
}

export function CardSmall({ 
  title = "Sample Task", 
  description = "spliseit",
  date = "2024-01-20",
  isStarred = false,
  reviewers = [
    { name: "John Doe", rating: 5 },
    { name: "Jane Smith", rating: 4 },
    { name: "Mike Johnson", rating: 3 }
  ],
  onEdit,
  onDelete,
  onStar 
}: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (onDelete) onDelete();
    setShowDeleteDialog(false);
  };

 

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-sm relative">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <button 
                  onClick={onStar}
                  className="focus:outline-none"
                >
                  <Star 
                    className={`h-4 w-4 ${isStarred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <CardDescription className="text-sm mt-1">
                {description}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDeleteClick}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Date */}
          <p className="text-xs text-muted-foreground">{date}</p>
          
      

          {/* Alternative: Simple dot indicators like GitHub PR reviews */}
          <div className="flex items-center gap-2 border-t pt-3">
            <div className="flex -space-x-2">
              {reviewers.slice(0, 3).map((reviewer, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={reviewer.image} />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(reviewer.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {reviewers.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{reviewers.length - 3} more
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              {reviewers.length} reviewer{reviewers.length > 1 ? 's' : ''}
            </span>
          </div>
        </CardContent>
        
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              "{title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}