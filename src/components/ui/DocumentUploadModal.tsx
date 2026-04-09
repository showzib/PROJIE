// src/components/ui/DocumentUploadModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (document: {
    name: string;
    file?: File | null;
    description?: string;
  }) => void;
}

export function DocumentUploadModal({ 
  open, 
  onOpenChange, 
  onSave 
}: DocumentUploadModalProps) {
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setDocumentName(e.target.files[0].name);
    }
  };

  const handleSave = () => {
    // ✅ Validation with toasts - No disabled button
    if (!documentName.trim()) {
      toast.error("Document name required", {
        description: "Please enter a document name.",
        duration: 3000,
      });
      return;
    }

    if (!selectedFile) {
      toast.error("File required", {
        description: "Please select a file to upload.",
        duration: 3000,
      });
      return;
    }

    // ✅ All validations passed
    onSave({
      name: documentName,
      file: selectedFile,
      description: description,
    });
    
    // Show success toast
    toast.success("Document uploaded successfully!", {
      description: `${documentName} has been added to the project.`,
      duration: 3000,
    });
    
    // Reset form
    setDocumentName("");
    setDescription("");
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Document Name */}
          <div>
            <Label htmlFor="name">Document Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              placeholder="Enter document name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
            />
            {!documentName.trim() && (
              <p className="text-xs text-red-500 mt-1">Document name is required</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <Label>Choose File <span className="text-red-500">*</span></Label>
            <div className="mt-2">
              <Input
                type="file"
                onChange={handleFileChange}
                className="flex-1"
              />
              {selectedFile ? (
                <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  <span>{selectedFile.name}</span>
                  <span>({(selectedFile.size / 1024).toFixed(2)} KB)</span>
                </div>
              ) : (
                <p className="text-xs text-red-500 mt-1">Please select a file</p>
              )}
            </div>
          </div>

          {/* Description (Optional) */}
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}