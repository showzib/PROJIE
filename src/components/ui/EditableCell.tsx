// app/components/BacklogTab/EditableCell.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Check, X } from "lucide-react";

interface EditableCellProps {
  item: any;
  field: string;
  value: any;
  displayValue?: string;
  editingCell: { id: number | null; field: string | null };
  editValue: string;
  setEditValue: (value: string) => void;
  onStartEdit: (id: number, field: string, currentValue: any) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export function EditableCell({
  item,
  field,
  value,
  displayValue,
  editingCell,
  editValue,
  setEditValue,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}: EditableCellProps) {
  const isEditing = editingCell.id === item.id && editingCell.field === field;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSaveEdit();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-1">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="h-8 w-24"
          autoFocus
        />
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onSaveEdit}>
          <Check className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCancelEdit}>
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className="group flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5"
      onClick={() => onStartEdit(item.id, field, value)}
    >
      <span>{displayValue || value}</span>
      <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}