import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2 } from "lucide-react";
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
}

export function CardSmall({ 
  id, 
  title, 
  description, 
  date, 
  isStarred, 
  onEdit, 
  onDelete, 
  onStar 
}: CardSmallProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all"
      onClick={() => navigate(`/project/${id}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-start">
          <span>{title}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
          >
            <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-muted-foreground">{date}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
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
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}