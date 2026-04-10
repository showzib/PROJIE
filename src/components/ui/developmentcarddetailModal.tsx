// app/development/components/developmentcardDetailModal.tsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X, Send } from "lucide-react";
import type { Task } from "@/hooks/development.type";

interface Props {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DevelopmentCardDetailModal({
  task,
  open,
  onOpenChange,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [labels, setLabels] = useState<string[]>(["SN", "AC"]);
  const [newLabel, setNewLabel] = useState("");

  const [customFields, setCustomFields] = useState([
    { id: 1, name: "Negative Flow", value: "" },
    { id: 2, name: "Re Open Count", value: "" },
    { id: 3, name: "Positive flow", value: "" },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!task || !open || !mounted) return null;

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()]);
      setNewLabel("");
    }
  };

  const removeLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label));
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* MODAL */}
      <div className="relative w-[95vw] max-w-[1400px] h-[90vh] bg-background text-foreground rounded-xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 border border-border">

        {/* HEADER */}
        <div className="bg-primary text-primary-foreground px-6 py-4 flex justify-between items-center shrink-0">
          <h2 className="text-sm md:text-lg font-semibold">
            SPRINT FLOW INCLUDING ALL POPUPS AND ACTIONS
          </h2>
          <button onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

          {/* LEFT */}
          <div className="w-full lg:w-[65%] p-4 md:p-6 overflow-y-auto space-y-6">

            {/* LABELS */}
            <div>
              <div className="flex justify-between mb-2">
                <Label className="font-semibold">Labels</Label>
                <Button size="sm" variant="ghost">
                  <Plus className="w-3 h-3 mr-1" /> Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Input
                  className="w-24 h-7 text-xs"
                  placeholder="Add"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLabel()}
                />
              </div>
            </div>

            {/* MEDIA */}
            <div>
              <Label className="font-semibold mb-2 block">Media</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-10 text-center text-muted-foreground">
                +
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <Label className="font-semibold mb-2 block">Description</Label>
              <Textarea
                placeholder="Please Enter Description"
                className="min-h-[120px]"
              />
            </div>

            {/* CUSTOM FIELDS */}
            <div>
              <Label className="font-semibold mb-3 block">
                Custom Fields
              </Label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {customFields.map((field) => (
                  <div key={field.id}>
                    <Label className="text-xs text-muted-foreground">{field.name}</Label>
                    <Input
                      className="mt-1"
                      value={field.value}
                      onChange={(e) =>
                        setCustomFields(
                          customFields.map((f) =>
                            f.id === field.id
                              ? { ...f, value: e.target.value }
                              : f
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 w-full sm:w-1/2 lg:w-1/3">
                <Label className="text-xs text-muted-foreground">ETA</Label>
                <Input />
              </div>
            </div>

            {/* MESSAGES */}
            <div>
              <Label className="font-semibold mb-2 block">Messages</Label>

             

              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type..."
                  className="h-16"
                />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[35%] border-l border-border bg-muted/40 p-4 md:p-6 space-y-4 overflow-y-auto">

            <div>
              <Label className="font-semibold block mb-2">Members</Label>
              <div className="flex gap-2 flex-wrap">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="w-8 h-8 bg-muted rounded-full" />
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Assign</Label>
              <Input placeholder="Assign to member" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Estimates</Label>
              <Input defaultValue="0" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Teams</Label>
              <Input defaultValue="Design" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Feature</Label>
              <Input />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Priority</Label>
              <Input defaultValue="High" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Severity</Label>
              <Input defaultValue="High" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Ticket Type</Label>
              <Input defaultValue="Story" />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Project Name</Label>
              <Input defaultValue="Projei Revamp Project" />
            </div>

            <Button className="w-full mt-4">Create Branch</Button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-border px-6 py-3 flex justify-end gap-2 shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>,
    document.body
  );
}