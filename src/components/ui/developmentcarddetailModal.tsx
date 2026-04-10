// components/ui/developmentcarddetailmodal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  X,
  Calendar,
  Clock,
  Flag,
  Users,
  Tag,
  GitBranch,
  TrendingUp,
  TrendingDown,
  Repeat,
  MessageSquare,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee?: string;
  dueDate?: string;
  storyPoints?: number;
}

interface DevelopmentCardDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any;
}

export function DevelopmentCardDetailModal({ open, onOpenChange, task }: DevelopmentCardDetailModalProps) {
  const [mediaItems, setMediaItems] = useState<string[]>([]);
  const [description, setDescription] = useState(task?.description || "");
  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>([]);
  const [message, setMessage] = useState("");
  
  // Mock members data
  const members = [
    { id: "1", name: "John Doe", avatar: "", role: "Developer" },
    { id: "2", name: "Jane Smith", avatar: "", role: "Designer" },
    { id: "3", name: "Mike Johnson", avatar: "", role: "PM" },
  ];

  const handleAddMedia = () => {
    console.log("Add media");
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const handleRemoveCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {task?.title || "Task Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* LEFT SECTION */}
          <div className="space-y-6">
            {/* Labels Section */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Labels</Label>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="gap-1">
                  Bug
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  Frontend
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Media</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {mediaItems.map((item, index) => (
                    <div key={index} className="relative">
                      <img src={item} alt="Media" className="h-20 w-20 object-cover rounded" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 bg-red-500 text-white rounded-full"
                        onClick={() => setMediaItems(mediaItems.filter((_, i) => i !== index))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="h-20 w-20"
                    onClick={handleAddMedia}
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Description</Label>
              <Textarea
                placeholder="Add a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Custom Fields Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Custom Fields</Label>
                <Button variant="ghost" size="sm" onClick={handleAddCustomField}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {customFields.map((field, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Field name"
                    value={field.key}
                    onChange={(e) => {
                      const newFields = [...customFields];
                      newFields[index].key = e.target.value;
                      setCustomFields(newFields);
                    }}
                  />
                  <Input
                    placeholder="Value"
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...customFields];
                      newFields[index].value = e.target.value;
                      setCustomFields(newFields);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCustomField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Metrics Section */}
            <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h4 className="font-semibold text-sm">Metrics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Negative Flow:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Re Open Count:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Positive Flow:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">ETA:</span>
                  <span className="font-semibold">-</span>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message
              </Label>
              <Textarea
                placeholder="Write a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-4">
            {/* Assign */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Assign</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assign To Member */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Assign To Member</Label>
              <div className="flex gap-2 flex-wrap">
                {members.map((member) => (
                  <Badge key={member.id} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    <Avatar className="h-4 w-4 mr-1">
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    {member.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Estimates */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Estimates</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="0" className="w-24" />
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
            </div>

            {/* Teams */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Teams</Label>
              <Select defaultValue="design">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">DESIGN</SelectItem>
                  <SelectItem value="development">DEVELOPMENT</SelectItem>
                  <SelectItem value="qa">QA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feature */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Feature</Label>
              <Input placeholder="Feature name" />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Priority</Label>
              <Select defaultValue={task?.priority || "high"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Severity</Label>
              <Select defaultValue="high">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Ticket Type */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Ticket Type</Label>
              <Select defaultValue="story">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Name */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Project Name</Label>
              <Input defaultValue="Project Revamp Project" readOnly />
            </div>

            {/* Create Branch */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Create Branch</Label>
              <Button variant="outline" className="w-full gap-2">
                <GitBranch className="h-4 w-4" />
                Create Branch
              </Button>
            </div>

            {/* Members */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </Label>
              <div className="flex -space-x-2">
                {members.map((member) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Labels
              </Label>
              <div className="flex gap-2 flex-wrap">
                <Badge>Bug</Badge>
                <Badge variant="outline">Frontend</Badge>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Dates
              </Label>
              <div className="space-y-2">
                <Input type="date" placeholder="Start Date" />
                <Input type="date" placeholder="Due Date" />
              </div>
            </div>

            {/* Custom Fields (Right Side) */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Custom Fields</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input placeholder="Field 1" className="flex-1" />
                  <Input placeholder="Value" className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}