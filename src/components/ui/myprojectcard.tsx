import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardSmallProps {
  id: number;
  title: string;
  description: string;
  date: string;
  isStarred: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onStar: () => void;
  members?: { name: string; initials: string; image?: string }[];
}

export function CardSmall({ 
  id, 
  title, 
  description, 
  date, 
  isStarred, 
  onEdit, 
  onDelete, 
  onStar,
  members 
}: CardSmallProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all"
      onClick={() => navigate(`/project/${id}`)}
    >
      <CardHeader className="pb-1 pt-3 px-3">
        <CardTitle className="text-sm flex justify-between items-start gap-2">
          <span className="line-clamp-1 font-semibold">{title}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
          >
            <Star className={`h-3 w-3 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        
        {/* Date with icon */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span className="text-xs">{date}</span>
        </div>

        {/* Team Members Section */}
        {members && members.length > 0 && (
          <div className="mt-2 pt-2 border-t">
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member, idx) => (
                <div 
                  key={idx} 
                  className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-medium ring-2 ring-background"
                  title={member.name}
                >
                  {member.initials}
                </div>
              ))}
              {members.length > 3 && (
                <div 
                  className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-medium ring-2 ring-background"
                  title={`${members.length - 3} more members`}
                >
                  +{members.length - 3}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-0.5 mt-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}