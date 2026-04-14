// Payment.tsx
import { useState } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
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

interface Payment {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  date: string;
  currency: string;
  bankName: string;
  amount: number;
  items: string;
}

// Sample initial data
const initialPayments: Payment[] = [
  {
    id: 1,
    name: "Design Phase",
    description: "UI/UX design for main dashboard",
    createdAt: "Jan 7, 2026",
    date: "2026-01-07",
    currency: "AED",
    bankName: "Emirates NBD",
    amount: 2000,
    items: "Design Phase",
  },
  {
    id: 2,
    name: "Development Phase",
    description: "Frontend development",
    createdAt: "Jan 10, 2026",
    date: "2026-01-10",
    currency: "AED",
    bankName: "Emirates NBD",
    amount: 5000,
    items: "Development",
  },
  {
    id: 3,
    name: "Testing Phase",
    description: "QA and testing",
    createdAt: "Jan 15, 2026",
    date: "2026-01-15",
    currency: "USD",
    bankName: "CBD",
    amount: 1500,
    items: "Testing",
  },
  {
    id: 4,
    name: "Deployment Phase",
    description: "Server deployment",
    createdAt: "Jan 20, 2026",
    date: "2026-01-20",
    currency: "AED",
    bankName: "Abu Dhabi Islamic Bank",
    amount: 3000,
    items: "Deployment",
  },
];

export function Payment() {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Filter payments based on search
  const filteredPayments = payments.filter((payment) =>
    payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.currency.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Add Payment
  const handleAddPayment = (data: any) => {
    const newPayment: Payment = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      date: data.date,
      currency: data.currency,
      bankName: data.bankName,
      amount: parseFloat(data.amount),
      items: data.items,
    };
    
    setPayments([...payments, newPayment]);
    toast.success("Payment added successfully!");
    setModalType(null);
  };

  // Handle Edit Payment
  const handleEditPayment = (data: any) => {
    if (selectedPayment) {
      setPayments(
        payments.map((payment) =>
          payment.id === selectedPayment.id
            ? {
                ...payment,
                name: data.name || payment.name,
                description: data.description || payment.description,
                date: data.date || payment.date,
                currency: data.currency || payment.currency,
                bankName: data.bankName || payment.bankName,
                amount: parseFloat(data.amount) || payment.amount,
                items: data.items || payment.items,
              }
            : payment
        )
      );
      toast.success("Payment updated successfully!");
      setModalType(null);
      setSelectedPayment(null);
    }
  };

  // Handle Delete Payment
  const handleDeletePayment = () => {
    if (selectedPayment) {
      setPayments(payments.filter((p) => p.id !== selectedPayment.id));
      toast.success("Payment deleted successfully!");
      setModalType(null);
      setSelectedPayment(null);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setSelectedPayment(null);
    setModalType("addPayment");
  };

  // Open Edit Modal
  const openEditModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalType("addPayment");
  };

  // Open Delete Modal
  const openDeleteModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalType("deleteConfirm");
  };

  // Open View Modal
  const openViewModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setModalType("viewPayment");
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Get modal data
  const getModalData = () => {
    if (modalType === "addPayment" && selectedPayment) {
      return {
        id: selectedPayment.id,
        name: selectedPayment.name,
        description: selectedPayment.description,
        date: selectedPayment.date,
        currency: selectedPayment.currency,
        bankName: selectedPayment.bankName,
        amount: selectedPayment.amount.toString(),
        items: selectedPayment.items,
        createdAt: selectedPayment.createdAt,
      };
    }
    if (modalType === "deleteConfirm" && selectedPayment) {
      return { title: selectedPayment.name };
    }
    if (modalType === "viewPayment" && selectedPayment) {
      return {
        name: selectedPayment.name,
        description: selectedPayment.description,
        date: selectedPayment.date,
        currency: selectedPayment.currency,
        bankName: selectedPayment.bankName,
        amount: selectedPayment.amount.toString(),
        items: selectedPayment.items,
        createdAt: selectedPayment.createdAt,
      };
    }
    return {};
  };

  // Handle modal confirm
  const handleModalConfirm = (data: any) => {
    if (modalType === "addPayment") {
      if (selectedPayment) {
        handleEditPayment(data);
      } else {
        handleAddPayment(data);
      }
    } else if (modalType === "deleteConfirm") {
      handleDeletePayment();
    } else if (modalType === "viewPayment") {
      setModalType(null);
      setSelectedPayment(null);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Payment</h1>
      </div>

      {/* Search and Add Button */}
      <div className="flex gap-4 items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openAddModal}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <div className="min-w-[1200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Bank Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <p className="text-muted-foreground">No payments found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.name}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>{payment.createdAt}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.currency}</TableCell>
                    <TableCell>{payment.bankName}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell>{payment.items}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(payment)}
                          className="h-8 w-8 p-0 text-blue-600"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(payment)}
                          className="h-8 w-8 p-0"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(payment)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          title="Delete"
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

      {/* Add/Edit Payment Modal */}
      <CommonModal
        open={modalType === "addPayment"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedPayment(null);
        }}
        type="addPayment"
        data={getModalData()}
        onConfirm={handleModalConfirm}
      />

      {/* Delete Confirmation Modal */}
      <CommonModal
        open={modalType === "deleteConfirm"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedPayment(null);
        }}
        type="deleteConfirm"
        data={{ title: selectedPayment?.name }}
        onConfirm={handleDeletePayment}
      />

      {/* View Payment Modal */}
      <CommonModal
        open={modalType === "viewPayment"}
        onOpenChange={() => {
          setModalType(null);
          setSelectedPayment(null);
        }}
        type="viewPayment"
        data={getModalData()}
        onConfirm={() => {
          setModalType(null);
          setSelectedPayment(null);
        }}
      />
    </div>
  );
}