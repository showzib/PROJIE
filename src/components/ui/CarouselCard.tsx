import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Plus, Paperclip, MessageSquare } from "lucide-react"

export function TaskModal() {
  return (
    <Dialog open={true}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl">
        {/* Dark Header */}
        <DialogHeader className="bg-[#1e293b] p-6 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
            <span className="p-1 bg-white/10 rounded">■</span>
            BACKLOG FLOW INCLUDING ALL POPUPS AND ACTIONS
          </div>
          <DialogTitle className="text-xl mt-2 flex items-center gap-2">
            in list <span className="underline cursor-pointer">To do</span>
            <Paperclip className="w-4 h-4 rotate-45 text-gray-400" />
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-12 gap-0 bg-white">
          {/* Main Left Content */}
          <div className="col-span-8 p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            <div className="flex gap-12">
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase text-gray-500">Labels</Label>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase text-gray-500">Members</Label>
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="border-2 border-white h-8 w-8">
                      <AvatarImage src={`https://github.com/shadcn.png`} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold border-2 border-white text-gray-500">
                    +12
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gray-500" /> Description
              </Label>
              <Textarea 
                placeholder="Please Enter Description" 
                className="bg-gray-100 border-none min-h-[100px] resize-none focus-visible:ring-0" 
              />
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-gray-500" /> Custom Fields
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400">Aa Negative Flow</span>
                  <Input className="bg-gray-100 border-none h-10" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400"># Re Open Count</span>
                  <Input className="bg-gray-100 border-none h-10" />
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-2 border-black rounded-sm font-bold">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>

          {/* Right Sidebar Metadata */}
          <div className="col-span-4 p-8 border-l bg-gray-50/50 space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Priority</Label>
              <Select defaultValue="high">
                <SelectTrigger className="border-2 border-black rounded-sm h-10 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Severity</Label>
              <Select defaultValue="high">
                <SelectTrigger className="border-2 border-black rounded-sm h-10 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Ticket Type</Label>
              <Input value="Story" readOnly className="border-2 border-black rounded-sm h-10 bg-white" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Project Name</Label>
              <Input value="Projie Revamp Project" readOnly className="border-2 border-black rounded-sm h-10 bg-white" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}