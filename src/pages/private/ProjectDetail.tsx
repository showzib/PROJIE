import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Star, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const [projectName, setProjectName] = useState("Loading...");

  // Mock data - Baad mein API se laana
  const mockProjects = {
    "1": { name: "Design Review", description: "spliseit", date: "2024-01-20" },
    "2": { name: "API Integration", description: "spliseit", date: "2024-01-21" },
    "3": { name: "Bug Fixing", description: "spliseit", date: "2024-01-22" },
  };

  const project = mockProjects[projectId as keyof typeof mockProjects];

  const handleStar = () => {
    setIsStarred(!isStarred);
    // TODO: Save to backend
  };

  const handleEdit = () => {
    // TODO: Open edit modal
    console.log("Edit project:", projectId);
  };

  const handleDelete = () => {
    // TODO: Delete project
    console.log("Delete project:", projectId);
    navigate("/my-project"); // Go back after delete
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/my-project")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      {/* Project Header with Actions */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project?.name || "Project"}</h1>
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
          <Button 
            variant="destructive" 
            size="icon"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-muted-foreground">
              {project?.description || "No description available"}
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Start Date: {project?.date}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <div className="rounded-lg border p-6">
            <p className="text-muted-foreground">Tasks will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="members" className="mt-6">
          <div className="rounded-lg border p-6">
            <p className="text-muted-foreground">Team members will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-6">
          <div className="rounded-lg border p-6">
            <p className="text-muted-foreground">Project settings will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}