// src/pages/private/project-detail/EmailThreadsTab.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, User, Calendar } from "lucide-react";
import { Renderer } from "richtor";
import type { MessageData } from "@/components/ui/ComposeMessageModal";

interface EmailThreadsTabProps {
  projectId?: string;
  messages: MessageData[];  // ✅ Parent se messages receive karega
}

export default function EmailThreadsTab({ projectId, messages }: EmailThreadsTabProps) {
  return (
    <div className="space-y-4">
      {/* Messages List */}
      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No messages yet. Click "Compose Message" to send one.
          </div>
        ) : (
          messages.map((message) => (
            <Card key={message.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header with subject and date */}
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{message.subject}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{message.date}</span>
                    </div>
                  </div>

                  {/* To section */}
                  <div className="flex items-start gap-2 text-sm">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <span className="text-muted-foreground">To: </span>
                      <span>{message.to.join(", ")}</span>
                    </div>
                  </div>

                  {/* Message body with rich text rendering */}
                  <div className="text-sm prose prose-sm max-w-none">
                    <Renderer value={message.message} />
                  </div>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                      <div className="flex flex-wrap gap-2">
                        {message.attachments.map((att, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded hover:bg-accent cursor-pointer">
                            {att}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}