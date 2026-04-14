// app/components/DsmLogs.tsx
import { useState } from "react";
import { Search, Edit, Trash2, Plus, Upload } from "lucide-react";
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

// Sample initial data
const initialDsmLogs = [
  {
    id: 1,
    people: "John Doe",
    title: "System Backup Completed",
    createdOn: "2024-01-15",
  },
  {
    id: 2,
    people: "Jane Smith",
    title: "Database Migration",
    createdOn: "2024-01-14",
  },
  {
    id: 3,
    people: "Rahul Sharma",
    title: "Server Restart",
    createdOn: "2024-01-13",
  },
  {
    id: 4,
    people: "Priya Patel",
    title: "Security Patch Applied",
    createdOn: "2024-01-12",
  },
  {
    id: 5,
    people: "Amit Kumar",
    title: "Log Rotation",
    createdOn: "2024-01-11",
  },
];

export default function DsmLogs() {
  const [dsmLogs, setDsmLogs] = useState(initialDsmLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [formData, setFormData] = useState({
    people: "",
    title: "",
  });

  // Filter logs based on search
  const filteredLogs = dsmLogs.filter(
    (log) =>
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.people.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add Log
  const handleAddLog = (data: any) => {
    const newLog = {
      id: Date.now(),
      people: data.people,
      title: data.title,
      createdOn: new Date().toISOString().split("T")[0],
    };
    setDsmLogs([...dsmLogs, newLog]);
    setFormData({ people: "", title: "" });
    setModalType(null);
  };

  // Handle Edit Log
  const handleEditLog = () => {
    setDsmLogs(
      dsmLogs.map((log) =>
        log.id === selectedLog.id
          ? { ...log, people: formData.people, title: formData.title }
          : log
      )
    );
    setModalType(null);
    setSelectedLog(null);
    setFormData({ people: "", title: "" });
  };

  // Handle Delete Log
  const handleDeleteLog = () => {
    setDsmLogs(dsmLogs.filter((log) => log.id !== selectedLog.id));
    setModalType(null);
    setSelectedLog(null);
  };

  // Open Edit Modal
  const openEditModal = (log: any) => {
    setSelectedLog(log);
    setFormData({
      people: log.people,
      title: log.title,
    });
    setModalType("editTask");
  };

  // Open Delete Modal
  const openDeleteModal = (log: any) => {
    setSelectedLog(log);
    setModalType("deleteConfirm");
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData({ people: "", title: "" });
    setModalType("addTask");
  };

  // Handle Upload
  const handleUpload = () => {
    // Upload logic yahan aayegi
    console.log("Upload clicked");
    // You can implement file upload here
  };

  // Get modal data based on type
  const getModalData = () => {
    if (modalType === "editTask" && selectedLog) {
      return {
        title: selectedLog.title,
        people: selectedLog.people,
      };
    }
    if (modalType === "deleteConfirm" && selectedLog) {
      return { title: selectedLog.title };
    }
    return formData;
  };

  // Handle modal confirm
  const handleModalConfirm = (data: any) => {
    if (modalType === "addTask") {
      handleAddLog(data);
    } else if (modalType === "editTask") {
      handleEditLog();
    } else if (modalType === "deleteConfirm") {
      handleDeleteLog();
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">DSM Logs ({dsmLogs.length})</h1>
      </div>

      {/* Search Bar and Buttons */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search DSM Logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button onClick={openAddModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add DSM Log
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>People</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <p className="text-muted-foreground">No DSM logs found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.people}</TableCell>
                    <TableCell>{log.title}</TableCell>
                    <TableCell>{log.createdOn}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(log)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(log)}
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

      {/* Common Modal */}
      <CommonModal
        open={modalType !== null}
        onOpenChange={() => {
          setModalType(null);
          setSelectedLog(null);
        }}
        type={modalType || "addTask"}
        data={getModalData()}
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}