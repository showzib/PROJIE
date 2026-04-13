// src/pages/private/ProjectDetail.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, Edit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OverviewTab from "./OverviewTab";
import DocumentsTab from "./Documenttab";
import EmailThreadsTab from "./emailthreadstab";
import CommentsTab from "./CommentsTab";
import SprintsTab from "./SprintsTab";
import { ComposeMessageModal } from "@/components/ui/ComposeMessageModal";
import type { MessageData } from "@/components/ui/ComposeMessageModal";
import BacklogTab from "./BacklogTab";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // ✅ Get tab from URL or default to 'overview'
  const searchParams = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  
  const [isStarred, setIsStarred] = useState(false);
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Messages state - EmailThreads ke liye
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: "1",
      subject: "Project Kickoff Meeting",
      to: ["john@example.com", "jane@example.com"],
      message: "<p>Let's schedule a meeting to discuss the project requirements.</p><ul><li>Review timeline</li><li>Assign tasks</li><li>Set milestones</li></ul>",
      attachments: ["meeting-notes.pdf"],
      date: "2024-01-20 10:30 AM",
    },
    {
      id: "2",
      subject: "Design Review",
      to: ["mike@example.com"],
      message: "<p>Please review the latest design mockups.</p><p><strong>Key changes:</strong></p><ol><li>Updated color scheme</li><li>New navigation layout</li><li>Mobile responsive improvements</li></ol>",
      attachments: [],
      date: "2024-01-21 02:15 PM",
    },
  ]);
  
  // Mock data - Baad mein API se laana
  const [project, setProject] = useState(() => {
    const mockProjects = {
      "1": { name: "Design Review", description: "spliseit", date: "2024-01-20" },
      "2": { name: "API Integration", description: "spliseit", date: "2024-01-21" },
      "3": { name: "Bug Fixing", description: "spliseit", date: "2024-01-22" },
    };
    return mockProjects[projectId as keyof typeof mockProjects] || null;
  });

  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
  });

  // ✅ Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/project/${projectId}?tab=${value}`, { replace: true });
  };

  // ✅ Sync tab state when URL changes (browser back/forward)
  useEffect(() => {
    const tab = searchParams.get('tab') || 'overview';
    setActiveTab(tab);
  }, [location.search]);

  const handleStar = () => {
    setIsStarred(!isStarred);
  };

  const handleEdit = () => {
    if (project) {
      setEditForm({
        name: project.name,
        description: project.description,
      });
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (project) {
      setProject({
        ...project,
        name: editForm.name,
        description: editForm.description,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleSendMessage = (newMessage: MessageData) => {
    console.log("Message sent:", newMessage);
    setMessages([newMessage, ...messages]);
    setIsComposeModalOpen(false);
  };

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Back Button & Compose Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/my-project")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>
        
        <Button onClick={() => setIsComposeModalOpen(true)}>
          Compose Message
        </Button>
      </div>

      {/* Project Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1">
            Project ID: {projectId}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleStar}
          >
            <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleEdit}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs - NOW WITH URL SYNC */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="relative w-full overflow-x-auto pb-2">
          <TabsList className="inline-flex w-auto min-w-full lg:min-w-0 lg:w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="emails">Email Threads</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="backlog">Backlog</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-6">
          <OverviewTab 
            projectId={projectId}
            name={project.name}
            description={project.description}
            date={project.date}
          />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <DocumentsTab projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="emails" className="mt-6">
          <EmailThreadsTab 
            projectId={projectId} 
            messages={messages}
          />
        </TabsContent>
        
        <TabsContent value="comments" className="mt-6">
          <CommentsTab projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="sprints" className="mt-6">
          <SprintsTab projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="backlog" className="mt-6">
          <BacklogTab projectId={projectId} />
        </TabsContent>
      </Tabs>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Project Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Enter project name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Enter project description"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compose Message Modal */}
      <ComposeMessageModal
        open={isComposeModalOpen}
        onOpenChange={setIsComposeModalOpen}
        onSend={handleSendMessage}
      />
    </div>
  );
}