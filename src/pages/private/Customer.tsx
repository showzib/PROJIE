// app/components/Customer.tsx
import { useState } from "react";
import { Search, Edit, Trash2, UserPlus, Mail } from "lucide-react";
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
import { toast } from "sonner";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  whatsapp: string;
  role: string;
  company: string;
  userType: string;
  invitedStatus: "Pending" | "Accepted" | "Expired";
}

// Sample initial data
const initialCustomers: Customer[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "+1234567890",
    whatsapp: "+1234567890",
    role: "Admin",
    company: "Splise It",
    userType: "Collaborator",
    invitedStatus: "Accepted",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "+1987654321",
    whatsapp: "+1987654321",
    role: "Manager",
    company: "Tech Corp",
    userType: "Customer",
    invitedStatus: "Pending",
  },
];

export default function Customer() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phoneNumber.includes(searchTerm)
  );

  // Handle Invite User
  const handleInviteUser = (data: any) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const newCustomer: Customer = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: fullName,
      email: data.email,
      phoneNumber: "",
      whatsapp: "",
      role: data.userType === "Collaborator" ? "Collaborator" : "Customer",
      company: data.company,
      userType: data.userType,
      invitedStatus: "Pending",
    };
    
    setCustomers([...customers, newCustomer]);
    setModalType(null);
  };

  // Handle Edit Customer
  const handleEditCustomer = (data: any) => {
    if (selectedCustomer) {
      setCustomers(
        customers.map((customer) =>
          customer.id === selectedCustomer.id
            ? {
                ...customer,
                firstName: data.firstName || customer.firstName,
                lastName: data.lastName || customer.lastName,
                fullName: `${data.firstName || customer.firstName} ${data.lastName || customer.lastName}`,
                email: data.email || customer.email,
                company: data.company || customer.company,
                userType: data.userType || customer.userType,
                role: data.userType === "Collaborator" ? "Collaborator" : "Customer",
              }
            : customer
        )
      );
      toast.success("Customer updated successfully!");
      setModalType(null);
      setSelectedCustomer(null);
    }
  };

  // Handle Delete Customer
  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter((c) => c.id !== selectedCustomer.id));
      toast.success("Customer deleted successfully!");
      setModalType(null);
      setSelectedCustomer(null);
    }
  };

  // Handle Resend Invite
  const handleResendInvite = (customer: Customer) => {
    toast.success("Invitation resent!", {
      description: `New invitation sent to ${customer.email}`,
      duration: 3000,
    });
  };

  // Open Edit Modal
  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType("inviteUser");
  };

  // Open Delete Modal
  const openDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setModalType("deleteConfirm");
  };

  // Open Invite Modal
  const openInviteModal = () => {
    setModalType("inviteUser");
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Expired":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get modal data
  const getModalData = () => {
    if (modalType === "inviteUser" && selectedCustomer) {
      return {
        firstName: selectedCustomer.firstName,
        lastName: selectedCustomer.lastName,
        email: selectedCustomer.email,
        company: selectedCustomer.company,
        userType: selectedCustomer.userType,
      };
    }
    if (modalType === "deleteConfirm" && selectedCustomer) {
      return { title: selectedCustomer.fullName };
    }
    return {};
  };

  // Handle modal confirm
  const handleModalConfirm = (data: any) => {
    if (modalType === "inviteUser") {
      if (selectedCustomer) {
        handleEditCustomer(data);
      } else {
        handleInviteUser(data);
      }
    } else if (modalType === "deleteConfirm") {
      handleDeleteCustomer();
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>

      {/* Search and Invite Button */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openInviteModal}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite
        </Button>
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
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-muted-foreground">No customers found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.fullName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phoneNumber || "-"}</TableCell>
                    <TableCell>{customer.whatsapp || "-"}</TableCell>
                    <TableCell>{customer.role}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(customer.invitedStatus)}`}>
                        {customer.invitedStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {customer.invitedStatus === "Pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResendInvite(customer)}
                            className="h-8 px-2 text-blue-600"
                          >
                            <Mail className="h-3.5 w-3.5 mr-1" />
                            Resend
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(customer)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(customer)}
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

      {/* Invite/Edit Customer Modal */}
      <CommonModal
        open={modalType === "inviteUser"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedCustomer(null);
        }}
        type="inviteUser"
        data={getModalData()}
        onConfirm={handleModalConfirm}
      />

      {/* Delete Confirmation Modal */}
      <CommonModal
        open={modalType === "deleteConfirm"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedCustomer(null);
        }}
        type="deleteConfirm"
        data={{ title: selectedCustomer?.fullName }}
        onConfirm={handleDeleteCustomer}
      />
    </div>
  );
}