// src/components/ComposeMessageModal.tsx
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
import { Paperclip, Upload, X } from "lucide-react";
import { toast } from "sonner";

// Rich Text Editor component
import RichTextEditor from "@/components/ui/rich-text-editor";

interface ComposeMessageModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSend: (message: MessageData) => void;
}

export interface MessageData {
    id: string;
    subject: string;
    to: string[];
    message: string;
    attachments: string[];
    date: string;
}

const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
];

export function ComposeMessageModal({ open, onOpenChange, onSend }: ComposeMessageModalProps) {
    const [subject, setSubject] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [attachments, setAttachments] = useState<string[]>([]);

    const handleAddAttachment = () => {
        const newAttachment = `attachment-${Date.now()}.pdf`;
        setAttachments([...attachments, newAttachment]);
        toast.info("Attachment added", {
            description: `${newAttachment} has been attached.`,
            duration: 2000,
        });
    };

    const handleRemoveAttachment = (attachment: string) => {
        setAttachments(attachments.filter(a => a !== attachment));
        toast.info("Attachment removed", {
            description: `${attachment} has been removed.`,
            duration: 2000,
        });
    };

    const handleSend = () => {
        // Validation
        if (!subject.trim()) {
            toast.error("Subject is required", {
                description: "Please enter a subject for your message.",
            });
            return;
        }

        if (selectedUsers.length === 0) {
            toast.error("Recipients required", {
                description: "Please select at least one recipient.",
            });
            return;
        }

        if (!message.trim()) {
            toast.error("Message is required", {
                description: "Please enter your message content.",
            });
            return;
        }

        const newMessage: MessageData = {
            id: Date.now().toString(),
            subject,
            to: selectedUsers,
            message,
            attachments,
            date: new Date().toLocaleString(),
        };
        
        onSend(newMessage);

        // Show success toast
        toast.success("Message sent successfully!", {
            description: `Your message "${subject}" has been sent to ${selectedUsers.length} recipient(s).`,
            duration: 4000,
        });

        // Reset form
        setSubject("");
        setSelectedUsers([]);
        setMessage("");
        setAttachments([]);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Compose Message</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Subject */}
                    <div>
                        <Label htmlFor="subject" className="mb-2">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    {/* Who should be notified */}
                    <div>
                        <Label>Who should be notified</Label>
                        <div className="mt-2 space-y-2 border rounded-md p-2 max-h-32 overflow-y-auto">
                            {users.map((user) => (
                                <label key={user.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={user.email}
                                        checked={selectedUsers.includes(user.email)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedUsers([...selectedUsers, user.email]);
                                            } else {
                                                setSelectedUsers(selectedUsers.filter(u => u !== user.email));
                                            }
                                        }}
                                        className="rounded"
                                    />
                                    <span className="text-sm">{user.name}</span>
                                    <span className="text-xs text-muted-foreground">({user.email})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Message Body with Editor */}
                    <div>
                        <Label>Message</Label>
                        <div className="mt-2">
                            <RichTextEditor
                                value={message}
                                onChange={setMessage}
                                placeholder="Write your message here..."
                            />
                        </div>
                    </div>

                    {/* Attachments */}
                    <div>
                        <Label>Attachments</Label>
                        <div className="mt-2 space-y-2">
                            {/* Attachment list */}
                            {attachments.length > 0 && (
                                <div className="space-y-1">
                                    {attachments.map((att) => (
                                        <div key={att} className="flex items-center justify-between bg-muted p-2 rounded">
                                            <span className="text-sm">{att}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => handleRemoveAttachment(att)}
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Attachment buttons */}
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handleAddAttachment}>
                                    <Upload className="h-4 w-4 mr-1" />
                                    Upload Attachment
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Paperclip className="h-4 w-4 mr-1" />
                                    Upload Existing
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSend}>Compose</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}