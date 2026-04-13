// app/components/Team.tsx
import { useState } from "react";
import { Search, RefreshCw, UserPlus, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CommonModal } from "@/components/ui/common.modal";
import type { ModalType } from "@/components/ui/common.modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialTeamMembers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 234 567 8900",
    whatsapp: "+1 234 567 8900",
    role: "Admin",
    invitedStatus: "Accepted",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+1 234 567 8901",
    whatsapp: "+1 234 567 8901",
    role: "Member",
    invitedStatus: "Pending",
  },
  {
    id: 3,
    fullName: "Mike Johnson",
    email: "mike.johnson@example.com",
    phoneNumber: "+1 234 567 8902",
    whatsapp: "+1 234 567 8902",
    role: "Viewer",
    invitedStatus: "Accepted",
  },
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsapp: "",
    role: "",
    invitedStatus: "Pending",
  });

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRefresh = () => {
    setSearchTerm("");
    // You can add API call here to fetch fresh data
  };

  const handleInviteMember = (data: any) => {
    const newMember = {
      id: Date.now(),
      ...data,
      invitedStatus: "Pending",
    };
    setTeamMembers([...teamMembers, newMember]);
    setModalType(null);
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      whatsapp: "",
      role: "",
      invitedStatus: "Pending",
    });
  };

  const handleEditMember = (data: any) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === selectedMember.id ? { ...selectedMember, ...data } : member
      )
    );
    setModalType(null);
    setSelectedMember(null);
  };

  const handleDeleteMember = () => {
    setTeamMembers(teamMembers.filter((member) => member.id !== selectedMember.id));
    setModalType(null);
    setSelectedMember(null);
  };

  const openEditModal = (member: any) => {
    setSelectedMember(member);
    setModalType("editTask");
  };

  const openDeleteModal = (member: any) => {
    setSelectedMember(member);
    setModalType("deleteConfirm");
  };

  const openViewModal = (member: any) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">TEAM ({teamMembers.length})</h1>

      {/* Search Bar and Action Buttons */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => {
            setFormData({
              fullName: "",
              email: "",
              phoneNumber: "",
              whatsapp: "",
              role: "",
              invitedStatus: "Pending",
            });
            setModalType("inviteUser");
          }}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Whatsapp</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Invited Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No team members found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.fullName}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phoneNumber}</TableCell>
                    <TableCell>{member.whatsapp}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.role === "Admin" 
                          ? "bg-purple-100 text-purple-700" 
                          : member.role === "Member"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {member.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        member.invitedStatus === "Accepted" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {member.invitedStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(member)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(member)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(member)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Common Modal for Add/Edit/Delete */}
      <CommonModal
        open={modalType !== null}
        onOpenChange={() => {
          setModalType(null);
          setSelectedMember(null);
        }}
        type={modalType || "addTask"}
        data={modalType === "editTask" ? selectedMember : formData}
        onConfirm={(data) => {
          if (modalType === "inviteUser") {
            handleInviteMember(data);
          } else if (modalType === "editTask") {
            handleEditMember(data);
          } else if (modalType === "deleteConfirm") {
            handleDeleteMember();
          }
        }}
      />

      {/* View Modal - Separate Dialog for Read-only View */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <p className="text-base">{selectedMember?.fullName}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-base">{selectedMember?.email}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
              <p className="text-base">{selectedMember?.phoneNumber}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">WhatsApp</label>
              <p className="text-base">{selectedMember?.whatsapp}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <p className="text-base">{selectedMember?.role}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Invited Status</label>
              <p className="text-base">{selectedMember?.invitedStatus}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowViewModal(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}