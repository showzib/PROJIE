"use client";

import { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { toast } from "sonner"; // Sonner import
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Users, ChevronRight, ChevronLeft, X, Bold, Italic, List, ListOrdered } from "lucide-react";

interface ProjectInfo {
  name: string;
  startDate: string;
  endDate: string;
  company: string;
  description: string;
}

interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreate: (project: any) => void;
}

export function AddProjectModal({ open, onOpenChange, onProjectCreate }: AddProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Project Info
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    name: "",
    startDate: "",
    endDate: "",
    company: "",
    description: ""
  });
  
  // TipTap Rich Text Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write project description here...',
      }),
    ],
    content: projectInfo.description,
    onUpdate: ({ editor }) => {
      setProjectInfo({ ...projectInfo, description: editor.getHTML() });
    },
  });
  
  // Step 2: Search People
  const [searchPeopleQuery, setSearchPeopleQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TeamMember[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
  ]);
  const [selectedNewMembers, setSelectedNewMembers] = useState<TeamMember[]>([]);
  
  // Step 3: Existing People
  const [existingMembers, setExistingMembers] = useState<TeamMember[]>([
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
    { id: 5, name: "Tom Brown", email: "tom@example.com" },
    { id: 6, name: "Emily Davis", email: "emily@example.com" },
  ]);
  const [searchExistingQuery, setSearchExistingQuery] = useState("");

  const resetForm = () => {
    setCurrentStep(1);
    setProjectInfo({
      name: "",
      startDate: "",
      endDate: "",
      company: "",
      description: ""
    });
    setSearchPeopleQuery("");
    setSelectedNewMembers([]);
    setSearchExistingQuery("");
    if (editor) {
      editor.commands.setContent('');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validation with Sonner
      if (!projectInfo.name.trim()) {
        toast.error("Project name is required", {
          description: "Please enter a valid project name",
          duration: 3000,
        });
        return;
      }
      if (!projectInfo.startDate) {
        toast.error("Start date is required", {
          description: "Please select a start date for the project",
          duration: 3000,
        });
        return;
      }
      if (!projectInfo.company.trim()) {
        toast.error("Company/Client name is required", {
          description: "Please enter the company or client name",
          duration: 3000,
        });
        return;
      }
      
      toast.success("Project info saved!", {
        description: "Moving to next step",
        duration: 2000,
      });
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCreateProject = () => {
    // Final validation with Sonner
    if (!projectInfo.name.trim()) {
      toast.error("Missing information", {
        description: "Project name is required",
        duration: 3000,
      });
      return;
    }
    if (!projectInfo.startDate) {
      toast.error("Missing information", {
        description: "Start date is required",
        duration: 3000,
      });
      return;
    }
    if (!projectInfo.company.trim()) {
      toast.error("Missing information", {
        description: "Company name is required",
        duration: 3000,
      });
      return;
    }

    const newProject = {
      ...projectInfo,
      newMembers: selectedNewMembers,
      existingMembers: existingMembers,
      createdAt: new Date().toISOString()
    };
    
    onProjectCreate(newProject);
    
    toast.success("Project created successfully! 🎉", {
      description: `${newProject.name} has been added to your projects`,
      duration: 4000,
    });
    
    resetForm();
    onOpenChange(false);
  };

  const addNewMember = (member: TeamMember) => {
    if (!selectedNewMembers.find(m => m.id === member.id)) {
      setSelectedNewMembers([...selectedNewMembers, member]);
      toast.success(`${member.name} added`, {
        description: "Team member added successfully",
        duration: 2000,
      });
    } else {
      toast.error(`${member.name} already added`, {
        description: "This member is already in the team",
        duration: 2000,
      });
    }
    setSearchPeopleQuery("");
  };

  const removeNewMember = (memberId: number) => {
    const member = selectedNewMembers.find(m => m.id === memberId);
    setSelectedNewMembers(selectedNewMembers.filter(m => m.id !== memberId));
    if (member) {
      toast.info(`${member.name} removed`, {
        description: "Team member has been removed",
        duration: 2000,
      });
    }
  };

  const filteredExistingMembers = existingMembers.filter(member =>
    member.name.toLowerCase().includes(searchExistingQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchExistingQuery.toLowerCase())
  );

  const filteredSearchResults = searchResults.filter(user =>
    user.name.toLowerCase().includes(searchPeopleQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchPeopleQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetForm();
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Step {currentStep} of 3: {currentStep === 1 ? "Project Information" : currentStep === 2 ? "Add Team Members" : "Existing Team"}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicators */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 rounded-full mx-1 transition-all ${
                step <= currentStep ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Project Info */}
        {currentStep === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="Enter project name"
                value={projectInfo.name}
                onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={projectInfo.startDate}
                  onChange={(e) => setProjectInfo({ ...projectInfo, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={projectInfo.endDate}
                  onChange={(e) => setProjectInfo({ ...projectInfo, endDate: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Company/Client *</Label>
              <Input
                id="company"
                placeholder="Enter company name"
                value={projectInfo.company}
                onChange={(e) => setProjectInfo({ ...projectInfo, company: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Description (Rich Text Editor)</Label>
              <div className="border rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="border-b p-2 flex gap-2 flex-wrap bg-gray-50 dark:bg-gray-900">
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      editor?.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      editor?.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      editor?.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
                      editor?.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1" />
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold ${
                      editor?.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Heading 1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-bold ${
                      editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
                    }`}
                    title="Heading 2"
                  >
                    H2
                  </button>
                </div>
                
                {/* Editor Content */}
                <EditorContent 
                  editor={editor} 
                  className="prose prose-sm dark:prose-invert max-w-none p-3 min-h-[150px] focus:outline-none"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Format your description with rich text editing tools
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Search People */}
        {currentStep === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="search-people">Search People to Add</Label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-people"
                  placeholder="Search by name or email..."
                  className="pl-9"
                  value={searchPeopleQuery}
                  onChange={(e) => setSearchPeopleQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Search Results */}
            {searchPeopleQuery && filteredSearchResults.length > 0 && (
              <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
                {filteredSearchResults.map(user => (
                  <div
                    key={user.id}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex justify-between items-center"
                    onClick={() => addNewMember(user)}
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Button size="sm" variant="ghost" type="button">Add</Button>
                  </div>
                ))}
              </div>
            )}

            {searchPeopleQuery && filteredSearchResults.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No users found
              </div>
            )}

            {/* Selected New Members */}
            {selectedNewMembers.length > 0 && (
              <div className="mt-4">
                <Label>Selected Members ({selectedNewMembers.length})</Label>
                <div className="mt-2 space-y-2">
                  {selectedNewMembers.map(member => (
                    <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeNewMember(member.id)}
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedNewMembers.length === 0 && !searchPeopleQuery && (
              <div className="text-center py-8 text-muted-foreground">
                <UserPlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Search and add team members</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Existing People */}
        {currentStep === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="search-existing">Search Existing Team Members</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-existing"
                  placeholder="Search existing members..."
                  className="pl-9"
                  value={searchExistingQuery}
                  onChange={(e) => setSearchExistingQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
              {filteredExistingMembers.length > 0 ? (
                filteredExistingMembers.map(member => (
                  <div key={member.id} className="p-3 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No existing members found
                </div>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePreviousStep} type="button">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNextStep} type="button">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleCreateProject} type="button">
                Create Project
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}