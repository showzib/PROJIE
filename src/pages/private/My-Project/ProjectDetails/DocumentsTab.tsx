// src/pages/private/project-detail/DocumentsTab.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Download, Trash2 } from "lucide-react";
import { DocumentUploadModal } from "@/components/ui/documentUploadModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  date: string;
}

interface DocumentsTabProps {
  projectId?: string;
}

export default function DocumentsTab({ projectId }: DocumentsTabProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, name: "Project Proposal.pdf", type: "PDF", size: "2.4 MB", uploadedBy: "John Doe", date: "2024-01-20" },
    { id: 2, name: "Requirements.docx", type: "DOCX", size: "1.2 MB", uploadedBy: "Jane Smith", date: "2024-01-21" },
    { id: 3, name: "Design Mockup.fig", type: "FIGMA", size: "5.6 MB", uploadedBy: "Alice Johnson", date: "2024-01-22" },
  ]);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingDocument, setDeletingDocument] = useState<Document | null>(null);

  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };

  const handleSaveDocument = (data: { name: string; file?: File | null; description?: string }) => {
    // Create new document
    const newDocument: Document = {
      id: documents.length + 1,
      name: data.name,
      type: data.file?.name?.split('.').pop()?.toUpperCase() || "FILE",
      size: data.file ? `${(data.file.size / 1024 / 1024).toFixed(2)} MB` : "0 MB",
      uploadedBy: "Current User",
      date: new Date().toLocaleDateString(),
    };
    
    setDocuments([newDocument, ...documents]);
    
    // Success toast
    toast.success("Document uploaded!", {
      description: `${data.name} has been added successfully.`,
      duration: 3000,
    });
    
    console.log("Document saved:", data);
  };

  const handleDownload = (doc: Document) => {
    // Download toast
    toast.info("Download started", {
      description: `${doc.name} is being downloaded.`,
      duration: 2000,
    });
    console.log("Download:", doc.name);
  };

  const handleDeleteClick = (doc: Document) => {
    setDeletingDocument(doc);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingDocument) {
      setDocuments(documents.filter(doc => doc.id !== deletingDocument.id));
      
      // Delete toast
      toast.success("Document deleted", {
        description: `${deletingDocument.name} has been removed.`,
        duration: 3000,
      });
      
      setIsDeleteModalOpen(false);
      setDeletingDocument(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documents</h3>
        <Button onClick={handleUpload} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-2">
        {documents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded-lg">
            <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
            <p>No documents yet</p>
            <p className="text-sm">Click "Upload Document" to add files</p>
          </div>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.size} • Uploaded by {doc.uploadedBy} on {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownload(doc)}
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteClick(doc)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onSave={handleSaveDocument}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingDocument?.name}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
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