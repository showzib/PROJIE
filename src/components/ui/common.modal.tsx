// components/ui/common-modal.tsx
import * as React from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserPlus,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  FileText,
  Upload,
  Plus,
  Send
} from "lucide-react";

export type ModalType =
  | "addTask"
  | "editTask"
  | "deleteConfirm"
  | "addProject"
  | "composeMessage"
  | "developmentDetail"
  | "filter"
  | "backlogFilter"
  | "developmentFilter"
  | "documentUpload"
  | "documentDelete"
  | "inviteUser"
  | "viewTask"
  | "addPayment"
  | "viewPayment"
  | "addProduct"
  | "viewProduct"
  | "addUnit"
  | "viewUnit";

export interface CommonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ModalType;
  data?: any;
  onConfirm?: (data?: any) => void;
  onCancel?: () => void;
}

// Helper function to clean HTML text
const cleanHtmlText = (html: string) => {
  if (!html) return '';
  // Remove HTML tags
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

// Helper function to clean data for Payment, Product, Unit
const cleanDataForModal = (data: any, modalType: ModalType) => {
  if (!data) return data;

  // Only clean for these types
  if (modalType === "addPayment" || modalType === "addProduct" || modalType === "addUnit") {
    const cleaned = { ...data };
    if (cleaned.description && (cleaned.description.includes('<') || cleaned.description.includes('>'))) {
      cleaned.description = cleanHtmlText(cleaned.description);
    }
    return cleaned;
  }
  return data;
};

interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export function CommonModal({
  open,
  onOpenChange,
  type,
  data,
  onConfirm,
  onCancel,
}: CommonModalProps) {
  // Clean data when setting initial state
  const getCleanedData = () => {
    return cleanDataForModal(data, type);
  };

  const [formData, setFormData] = React.useState<any>(getCleanedData() || {});
  const [step, setStep] = React.useState(1);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  // Development Detail specific states
  const [message, setMessage] = React.useState("");
  const [labels, setLabels] = React.useState<string[]>(["SN", "AC"]);
  const [newLabel, setNewLabel] = React.useState("");
  const [customFields, setCustomFields] = React.useState([
    { id: 1, name: "Negative Flow", value: "" },
    { id: 2, name: "Re Open Count", value: "" },
    { id: 3, name: "Positive flow", value: "" },
  ]);

  // Add Project specific states
  const [searchPeopleQuery, setSearchPeopleQuery] = React.useState("");
  const [searchResults] = React.useState<TeamMember[]>([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
  ]);
  const [selectedNewMembers, setSelectedNewMembers] = React.useState<TeamMember[]>([]);
  const [existingMembers] = React.useState<TeamMember[]>([
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
    { id: 5, name: "Tom Brown", email: "tom@example.com" },
    { id: 6, name: "Emily Davis", email: "emily@example.com" },
  ]);
  const [searchExistingQuery, setSearchExistingQuery] = React.useState("");

  // TipTap Rich Text Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write project description here...',
      }),
    ],
    content: formData.description || "",
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, description: editor.getHTML() });
    },
  });

  React.useEffect(() => {
    if (data) {
      // Clean data when it changes
      const cleanedData = cleanDataForModal(data, type);
      setFormData(cleanedData);
    }
    if (open) {
      setStep(1);
      setSearchPeopleQuery("");
      setSelectedNewMembers([]);
      setSearchExistingQuery("");
      setSelectedFile(null);
      setMessage("");
      setLabels(["SN", "AC"]);
      setNewLabel("");
      setCustomFields([
        { id: 1, name: "Negative Flow", value: "" },
        { id: 2, name: "Re Open Count", value: "" },
        { id: 3, name: "Positive flow", value: "" },
      ]);
    }
  }, [data, open, type]);

  React.useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description || "");
    }
  }, [editor, formData.description]);

  const resetProjectForm = () => {
    setStep(1);
    setSearchPeopleQuery("");
    setSelectedNewMembers([]);
    setSearchExistingQuery("");
    setSelectedFile(null);
    if (editor) {
      editor.commands.setContent('');
    }
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

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()]);
      setNewLabel("");
    }
  };

  const removeLabel = (label: string) => {
    setLabels(labels.filter((l) => l !== label));
  };

  const handleConfirm = () => {
    if (type === "addProject") {
      const newProject = {
        ...formData,
        newMembers: selectedNewMembers,
        existingMembers: existingMembers,
        createdAt: new Date().toISOString()
      };
      onConfirm?.(newProject);
      resetProjectForm();
    } else if (type === "documentUpload") {
      onConfirm?.({
        name: formData.name,
        description: formData.description,
        file: selectedFile,
        fileName: selectedFile?.name
      });
      setFormData({});
      setSelectedFile(null);
    } else if (type === "developmentDetail") {
      onConfirm?.({
        ...formData,
        message,
        labels,
        customFields,
      });
    } else {
      // For Payment, Product, Unit - ensure description is clean
      const finalData = { ...formData };
      if ((type === "addPayment" || type === "addProduct" || type === "addUnit") && finalData.description) {
        finalData.description = cleanHtmlText(finalData.description);
      }
      onConfirm?.(finalData);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    resetProjectForm();
    onOpenChange(false);
  };

  // Invite User Modal Content
  const renderInviteUserContent = () => {
    const companiesList = [
      { id: 1, name: "Splise It" },
      { id: 2, name: "Tech Corp" },
      { id: 3, name: "Design Studio" },
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>First Name *</Label>
            <Input
              value={formData.firstName || ""}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <Label>Last Name *</Label>
            <Input
              value={formData.lastName || ""}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
          />
        </div>

        <div>
          <Label>Company *</Label>
          <Select value={formData.company || ""} onValueChange={(value) => setFormData({ ...formData, company: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {companiesList.map((company) => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>User Type *</Label>
          <Select value={formData.userType || "Collaborator"} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Collaborator">Collaborator</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  // Payment Form Modal Content
  const renderPaymentForm = () => {
    const currencies = ["AED", "USD", "EUR", "GBP", "SAR"];

    return (
      <div className="space-y-4">
        <div>
          <Label>Payment Name *</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter payment name"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={cleanHtmlText(formData.description || "")}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description"
            rows={3}
          />
        </div>

        <div>
          <Label>Date *</Label>
          <Input
            type="date"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Currency *</Label>
            <Select value={formData.currency || ""} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Amount *</Label>
            <Input
              type="number"
              value={formData.amount || ""}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div>
          <Label>Bank Name *</Label>
          <Input
            value={formData.bankName || ""}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            placeholder="Enter bank name"
          />
        </div>

        <div>
          <Label>Items</Label>
          <Input
            value={formData.items || ""}
            onChange={(e) => setFormData({ ...formData, items: e.target.value })}
            placeholder="Enter items"
          />
        </div>
      </div>
    );
  };

  // View Payment Modal Content
  const renderViewPayment = () => {
    const formatCurrency = (amount: number, currency: string) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    };

    // Clean description for display
    const displayDescription = formData.description ? cleanHtmlText(formData.description) : "-";

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground text-xs">Payment Name</Label>
            <p className="font-medium mt-1">{formData.name || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Created At</Label>
            <p className="font-medium mt-1">{formData.createdAt || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Date</Label>
            <p className="font-medium mt-1">{formData.date || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Currency</Label>
            <p className="font-medium mt-1">{formData.currency || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Amount</Label>
            <p className="font-medium mt-1 text-green-600">
              {formData.amount && formData.currency
                ? formatCurrency(parseFloat(formData.amount), formData.currency)
                : formData.amount || "-"}
            </p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Bank Name</Label>
            <p className="font-medium mt-1">{formData.bankName || "-"}</p>
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Description</Label>
          <p className="text-sm mt-1">{displayDescription}</p>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Items</Label>
          <p className="text-sm mt-1">{formData.items || "-"}</p>
        </div>
      </div>
    );
  };

  // Product Form Modal Content
  const renderProductForm = () => {
    const brandOptions = ["Splise It", "Tech Corp", "Design Studio", "Apple", "Samsung", "Dell"];
    const unitOptions = ["Piece", "Kg", "Liter", "Box", "Set", "--"];

    return (
      <div className="space-y-4">
        <div>
          <Label>Product Name *</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <Label>Brand Name *</Label>
          <Select value={formData.brandName || ""} onValueChange={(value) => setFormData({ ...formData, brandName: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brandOptions.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Unit Name</Label>
          <Select value={formData.unitName || "--"} onValueChange={(value) => setFormData({ ...formData, unitName: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              {unitOptions.map((unit) => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={cleanHtmlText(formData.description || "")}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter product description"
            rows={3}
          />
        </div>
      </div>
    );
  };

  // View Product Modal Content
  const renderViewProduct = () => {
    const displayDescription = formData.description ? cleanHtmlText(formData.description) : "-";

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground text-xs">Product Name</Label>
            <p className="font-medium mt-1">{formData.name || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Brand Name</Label>
            <p className="font-medium mt-1">{formData.brandName || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Unit Name</Label>
            <p className="font-medium mt-1">{formData.unitName || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Created At</Label>
            <p className="font-medium mt-1">{formData.createdAt || "-"}</p>
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Description</Label>
          <p className="text-sm mt-1">{displayDescription}</p>
        </div>
      </div>
    );
  };

  // Unit Form Modal Content
  const renderUnitForm = () => {
    return (
      <div className="space-y-4">
        <div>
          <Label>Unit Name *</Label>
          <Input
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter unit name (e.g., Piece, Kg, Liter)"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter unit description"
            rows={3}
          />
        </div>
      </div>
    );
  };

  // View Unit Modal Content
  const renderViewUnit = () => {
    const displayDescription = formData.description ? cleanHtmlText(formData.description) : "-";

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-muted-foreground text-xs">Unit Name</Label>
            <p className="font-medium mt-1">{formData.name || "-"}</p>
          </div>
          <div>
            <Label className="text-muted-foreground text-xs">Created At</Label>
            <p className="font-medium mt-1">{formData.createdAt || "-"}</p>
          </div>
        </div>
        <div>
          <Label className="text-muted-foreground text-xs">Description</Label>
          <p className="text-sm mt-1">{displayDescription}</p>
        </div>
      </div>
    );
  };

  // Add/Edit Task Modal Content
  const renderTaskContent = () => (
    <div className="space-y-4">
      <div>
        <Label>People</Label>
        <Input
          value={formData.people || ""}
          onChange={(e) => setFormData({ ...formData, people: e.target.value })}
          placeholder="Enter person name"
        />
      </div>
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
        />
      </div>
      <div>
        <Label>Project Name</Label>
        <Input
          value={formData.projectName || ""}
          onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          placeholder="Enter project name"
        />
      </div>
      <div>
        <Label>Estimates</Label>
        <Input
          value={formData.estimates || ""}
          onChange={(e) => setFormData({ ...formData, estimates: e.target.value })}
          placeholder="e.g., 5 days"
        />
      </div>
    </div>
  );

  // Delete Confirm Modal Content
  const renderDeleteContent = () => (
    <div>
      <p>Are you sure you want to delete <strong>"{formData?.title || formData?.name || "this item"}"</strong>?</p>
      <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
    </div>
  );

  // Development Detail Modal Content
  const renderDevelopmentDetailContent = () => (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[65%] space-y-4 overflow-y-auto pr-2" style={{ maxHeight: "calc(70vh - 100px)" }}>
        <div>
          <div className="flex justify-between mb-2">
            <Label className="font-semibold text-sm">Labels</Label>
            <Button size="sm" variant="ghost" className="h-7 px-2">
              <Plus className="w-3 h-3 mr-1" /> Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <span key={label} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs">
                {label}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeLabel(label)} />
              </span>
            ))}
            <Input
              className="w-24 h-7 text-xs"
              placeholder="Add"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLabel()}
            />
          </div>
        </div>

        <div>
          <Label className="font-semibold text-sm mb-2 block">Media</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground hover:border-primary transition-colors cursor-pointer">
            <Plus className="h-6 w-6 mx-auto mb-1" />
            <p className="text-xs">Click to upload</p>
          </div>
        </div>

        <div>
          <Label className="font-semibold text-sm mb-2 block">Description</Label>
          <Textarea
            placeholder="Please Enter Description"
            className="min-h-[100px] resize-none"
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <Label className="font-semibold text-sm mb-3 block">Custom Fields</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {customFields.map((field) => (
              <div key={field.id}>
                <Label className="text-xs text-muted-foreground">{field.name}</Label>
                <Input
                  className="mt-1 h-8"
                  value={field.value}
                  onChange={(e) =>
                    setCustomFields(
                      customFields.map((f) =>
                        f.id === field.id ? { ...f, value: e.target.value } : f
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          <div className="mt-3 w-full sm:w-1/2">
            <Label className="text-xs text-muted-foreground">ETA</Label>
            <Input className="mt-1 h-8" type="date" />
          </div>
        </div>

        <div>
          <Label className="font-semibold text-sm mb-2 block">Messages</Label>
          <div className="flex gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="h-16 resize-none"
            />
            <Button className="h-16 px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[35%] space-y-3 overflow-y-auto" style={{ maxHeight: "calc(70vh - 100px)" }}>
        <div>
          <Label className="font-semibold text-sm block mb-2">Members</Label>
          <div className="flex gap-2 flex-wrap">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">JD</div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">JS</div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">MK</div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">+</Button>
          </div>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Assign</Label>
          <Input className="mt-1 h-8" placeholder="Assign to member" value={formData.assignee || ""} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Estimates</Label>
          <Input className="mt-1 h-8" defaultValue={formData.estimatedTime || "0"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Teams</Label>
          <Input className="mt-1 h-8" defaultValue={formData.teams || "Design"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Feature</Label>
          <Input className="mt-1 h-8" defaultValue={formData.feature || ""} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Priority</Label>
          <Select defaultValue={formData.priority || "High"}>
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Severity</Label>
          <Select defaultValue="High">
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Ticket Type</Label>
          <Select defaultValue={formData.issueType || "Story"}>
            <SelectTrigger className="h-8 mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Story">Story</SelectItem>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Task">Task</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Project Name</Label>
          <Input className="mt-1 h-8" defaultValue="Project Revamp Project" />
        </div>

        <Button className="w-full mt-2 h-8">Create Branch</Button>
      </div>
    </div>
  );

  // Document Upload Modal Content
  const renderDocumentUploadContent = () => (
    <div className="space-y-4">
      <div>
        <Label>Document Name *</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter document name"
        />
      </div>
      <div>
        <Label>Description (Optional)</Label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter document description"
          rows={3}
        />
      </div>
      <div>
        <Label>Upload File *</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setFormData({ ...formData, fileName: file.name });
              }
            }}
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-8 w-8 text-blue-500" />
                <span className="text-sm">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedFile(null);
                    setFormData({ ...formData, fileName: "" });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click or drag file to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, JPG, PNG (Max 10MB)</p>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );

  // Add Project Modal - Step 1: Project Info
  const renderProjectStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label>Project Name *</Label>
        <Input
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter project name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date *</Label>
          <Input type="date" value={formData.startDate || ""} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
        </div>
        <div>
          <Label>End Date</Label>
          <Input type="date" value={formData.endDate || ""} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
        </div>
      </div>
      <div>
        <Label>Company/Client *</Label>
        <Input value={formData.company || ""} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Enter company name" />
      </div>
      <div>
        <Label>Description</Label>
        <div className="border rounded-lg overflow-hidden">
          <div className="border-b p-2 flex gap-2 flex-wrap bg-gray-50 dark:bg-gray-900">
            <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="p-2 rounded hover:bg-gray-200"><Bold className="h-4 w-4" /></button>
            <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="p-2 rounded hover:bg-gray-200"><Italic className="h-4 w-4" /></button>
            <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="p-2 rounded hover:bg-gray-200"><List className="h-4 w-4" /></button>
            <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="p-2 rounded hover:bg-gray-200"><ListOrdered className="h-4 w-4" /></button>
          </div>
          <EditorContent editor={editor} className="prose prose-sm dark:prose-invert max-w-none p-3 min-h-[120px] focus:outline-none" />
        </div>
      </div>
    </div>
  );

  // Add Project Modal - Step 2: Search People
  const renderProjectStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label>Search People to Add</Label>
        <div className="relative">
          <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-9" value={searchPeopleQuery} onChange={(e) => setSearchPeopleQuery(e.target.value)} />
        </div>
      </div>
      {searchPeopleQuery && filteredSearchResults.length > 0 && (
        <div className="border rounded-lg divide-y max-h-48 overflow-y-auto">
          {filteredSearchResults.map(user => (
            <div key={user.id} className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center" onClick={() => addNewMember(user)}>
              <div><p className="font-medium">{user.name}</p><p className="text-sm text-muted-foreground">{user.email}</p></div>
              <Button size="sm" variant="ghost">Add</Button>
            </div>
          ))}
        </div>
      )}
      {selectedNewMembers.length > 0 && (
        <div>
          <Label>Selected Members ({selectedNewMembers.length})</Label>
          <div className="mt-2 space-y-2">
            {selectedNewMembers.map(member => (
              <div key={member.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <div><p className="text-sm font-medium">{member.name}</p><p className="text-xs text-muted-foreground">{member.email}</p></div>
                <Button size="sm" variant="ghost" onClick={() => removeNewMember(member.id)}><X className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Add Project Modal - Step 3: Existing People
  const renderProjectStep3 = () => (
    <div className="space-y-4">
      <div>
        <Label>Search Existing Team Members</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search existing members..." className="pl-9" value={searchExistingQuery} onChange={(e) => setSearchExistingQuery(e.target.value)} />
        </div>
      </div>
      <div className="border rounded-lg divide-y max-h-64 overflow-y-auto">
        {filteredExistingMembers.map(member => (
          <div key={member.id} className="p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><span className="text-sm font-medium">{member.name.charAt(0)}</span></div>
            <div><p className="font-medium">{member.name}</p><p className="text-sm text-muted-foreground">{member.email}</p></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Compose Message Modal
  const renderComposeMessageContent = () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 3, name: "Mike Johnson", email: "mike@example.com" },
    ];
    return (
      <div className="space-y-4">
        <div><Label>Subject</Label><Input value={formData.subject || ""} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Enter subject" /></div>
        <div><Label>Who should be notified</Label><div className="mt-2 space-y-2 border rounded-md p-2 max-h-32 overflow-y-auto">{users.map((user) => (<label key={user.id} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={formData.selectedUsers?.includes(user.email) || false} onChange={(e) => { const selected = formData.selectedUsers || []; if (e.target.checked) { setFormData({ ...formData, selectedUsers: [...selected, user.email] }); } else { setFormData({ ...formData, selectedUsers: selected.filter((u: string) => u !== user.email) }); } }} className="rounded" /><span className="text-sm">{user.name}</span><span className="text-xs text-muted-foreground">({user.email})</span></label>))}</div></div>
        <div><Label>Message</Label><Textarea value={formData.message || ""} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Write your message here..." rows={4} /></div>
      </div>
    );
  };

  // Filter Modal Content
  const renderFilterContent = () => {
    const filterData = data as any;
    if (!filterData) return null;
    return (
      <div className="space-y-4">
        <div><Label>Status</Label><Select value={filterData.selectedStatus} onValueChange={filterData.setSelectedStatus}><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="To Do">To Do</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Done">Done</SelectItem></SelectContent></Select></div>
        <div><Label>Priority</Label><Select value={filterData.selectedPriority} onValueChange={filterData.setSelectedPriority}><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger><SelectContent><SelectItem value="all">All Priorities</SelectItem><SelectItem value="High">High</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="Low">Low</SelectItem></SelectContent></Select></div>
        <div><Label>Team</Label><Select value={filterData.selectedTeam} onValueChange={filterData.setSelectedTeam}><SelectTrigger><SelectValue placeholder="Select team" /></SelectTrigger><SelectContent><SelectItem value="all">All Teams</SelectItem><SelectItem value="DESIGN">DESIGN</SelectItem><SelectItem value="DEVELOPMENT">DEVELOPMENT</SelectItem><SelectItem value="QA">QA</SelectItem></SelectContent></Select></div>
        <div><Label>Issue Type</Label><Select value={filterData.selectedIssueType} onValueChange={filterData.setSelectedIssueType}><SelectTrigger><SelectValue placeholder="Select issue type" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Story">Story</SelectItem><SelectItem value="Bug">Bug</SelectItem><SelectItem value="Task">Task</SelectItem></SelectContent></Select></div>
      </div>
    );
  };

  const getModalTitle = () => {
    switch (type) {
      case "addTask": return "Add Task Request";
      case "editTask": return "Edit Project";
      case "deleteConfirm": return "Delete Item";
      case "addProject": return step === 1 ? "Add New Project" : step === 2 ? "Add Team Members" : "Existing Team";
      case "composeMessage": return "Compose Message";
      case "developmentDetail": return formData?.title || "Task Details";
      case "documentUpload": return "Upload Document";
      case "documentDelete": return "Delete Document";
      case "inviteUser": return "Invite Person";
      case "addPayment": return formData?.id ? "Edit Payment" : "Add Payment";
      case "viewPayment": return "Payment Details";
      case "addProduct": return formData?.id ? "Edit Product" : "Add Product";
      case "viewProduct": return "Product Details";
      case "addUnit": return formData?.id ? "Edit Unit" : "Add Unit";
      case "viewUnit": return "Unit Details";
      case "filter": return "Filter Tasks";
      case "backlogFilter": return "Filter Backlog Tasks";
      case "developmentFilter": return "Filter Development Tasks";
      default: return "Modal";
    }
  };

  const getModalDescription = () => {
    switch (type) {
      case "addProject": return `Step ${step} of 3: ${step === 1 ? "Project Information" : step === 2 ? "Add Team Members" : "Existing Team"}`;
      case "deleteConfirm": return "This action cannot be undone.";
      case "documentDelete": return "This action cannot be undone.";
      default: return "";
    }
  };

  const getConfirmText = () => {
    switch (type) {
      case "deleteConfirm": return "Delete";
      case "documentDelete": return "Delete";
      case "documentUpload": return "Upload";
      case "developmentDetail": return "Save Changes";
      case "inviteUser": return "Invite People";
      case "addPayment": return "Save Payment";
      case "viewPayment": return "Close";
      case "addProduct": return "Save Product";
      case "viewProduct": return "Close";
      case "addUnit": return "Save Unit";
      case "viewUnit": return "Close";
      case "addProject": return step === 3 ? "Create Project" : "Next";
      case "composeMessage": return "Send";
      default: return type === "addTask" ? "Add Task" : "Save Changes";
    }
  };

  const getModalSize = () => {
    switch (type) {
      case "developmentDetail":
        return "max-w-[95vw] lg:max-w-[1200px] w-full";
      default:
        return "sm:max-w-[600px]";
    }
  };

  const renderContent = () => {
    switch (type) {
      case "addTask":
      case "editTask":
        return renderTaskContent();
      case "deleteConfirm":
        return renderDeleteContent();
      case "documentDelete":
        return renderDeleteContent();
      case "documentUpload":
        return renderDocumentUploadContent();
      case "developmentDetail":
        return renderDevelopmentDetailContent();
      case "inviteUser":
        return renderInviteUserContent();
      case "addPayment":
        return renderPaymentForm();
      case "viewPayment":
        return renderViewPayment();
      case "addProduct":
        return renderProductForm();
      case "viewProduct":
        return renderViewProduct();
      case "addUnit":
        return renderUnitForm();
      case "viewUnit":
        return renderViewUnit();
      case "addProject":
        if (step === 1) return renderProjectStep1();
        if (step === 2) return renderProjectStep2();
        return renderProjectStep3();
      case "composeMessage":
        return renderComposeMessageContent();
      case "filter":
      case "backlogFilter":
      case "developmentFilter":
        return renderFilterContent();
      default:
        return null;
    }
  };

  const handleModalConfirm = () => {
    // Payment validation
    if (type === "addPayment") {
      if (!formData.name?.trim()) {
        toast.error("Payment name is required");
        return;
      }
      if (!formData.date) {
        toast.error("Date is required");
        return;
      }
      if (!formData.currency) {
        toast.error("Currency is required");
        return;
      }
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        toast.error("Valid amount is required");
        return;
      }
      if (!formData.bankName?.trim()) {
        toast.error("Bank name is required");
        return;
      }

      toast.success(formData.id ? "Payment updated successfully!" : "Payment added successfully!", {
        duration: 2000,
      });
    }

    // Product validation
    if (type === "addProduct") {
      if (!formData.name?.trim()) {
        toast.error("Product name is required");
        return;
      }
      if (!formData.brandName?.trim()) {
        toast.error("Brand name is required");
        return;
      }

      toast.success(formData.id ? "Product updated successfully!" : "Product added successfully!", {
        duration: 2000,
      });
    }

    // Unit validation
    if (type === "addUnit") {
      if (!formData.name?.trim()) {
        toast.error("Unit name is required");
        return;
      }

      toast.success(formData.id ? "Unit updated successfully!" : "Unit added successfully!", {
        duration: 2000,
      });
    }

    if (type === "viewPayment" || type === "viewProduct" || type === "viewUnit") {
      onOpenChange(false);
      return;
    }

    if (type === "addProject") {
      if (step === 1) {
        if (!formData.name?.trim()) {
          toast.error("Project name is required");
          return;
        }
        if (!formData.startDate) {
          toast.error("Start date is required");
          return;
        }
        if (!formData.company?.trim()) {
          toast.error("Company/Client name is required");
          return;
        }
        setStep(2);
        return;
      }
      if (step === 2) {
        setStep(3);
        return;
      }
    }

    if (type === "documentUpload") {
      if (!formData.name?.trim()) {
        toast.error("Document name is required");
        return;
      }
      if (!selectedFile) {
        toast.error("Please select a file to upload");
        return;
      }
    }

    if (type === "composeMessage") {
      if (!formData.subject?.trim()) {
        toast.error("Subject is required");
        return;
      }
      if (!formData.selectedUsers || formData.selectedUsers.length === 0) {
        toast.error("Recipients required");
        return;
      }
      if (!formData.message?.trim()) {
        toast.error("Message is required");
        return;
      }
      toast.success("Message sent successfully!", {
        description: `Your message has been sent to ${formData.selectedUsers.length} recipient(s)`,
        duration: 3000,
      });
    }

    if (type === "inviteUser") {
      if (!formData.firstName?.trim()) {
        toast.error("First name is required");
        return;
      }
      if (!formData.lastName?.trim()) {
        toast.error("Last name is required");
        return;
      }
      if (!formData.email?.trim()) {
        toast.error("Email is required");
        return;
      }
      if (!formData.email?.includes("@")) {
        toast.error("Valid email is required");
        return;
      }
      if (!formData.company) {
        toast.error("Company is required");
        return;
      }
      if (!formData.userType) {
        toast.error("User type is required");
        return;
      }
      toast.success("Invitation sent successfully!", {
        description: `Invitation sent to ${formData.firstName} ${formData.lastName}`,
        duration: 3000,
      });
    }

    if (type === "editTask") {
      const isTaskRequest = formData.title !== undefined || formData.people !== undefined;

      if (isTaskRequest) {
        if (!formData.title?.trim()) {
          toast.error("Title is required");
          return;
        }
        if (!formData.people?.trim()) {
          toast.error("People is required");
          return;
        }
        toast.success("Task updated successfully!", {
          duration: 2000,
        });
      } else {
        const nameValue = formData.name?.trim() || formData.title?.trim();
        const descValue = formData.description?.trim() || formData.company?.trim();

        if (!nameValue) {
          toast.error("Name is required");
          return;
        }
        if (!descValue) {
          toast.error("Description is required");
          return;
        }
        toast.success("Changes saved successfully!", {
          duration: 2000,
        });
      }
    }

    if (type === "filter" && data) {
      data.onApplyFilters();
      onOpenChange(false);
      return;
    }

    handleConfirm();
  };

  const handleModalPrevious = () => {
    if (type === "addProject" && step > 1) setStep(step - 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={getModalSize()}>
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          {getModalDescription() && <DialogDescription>{getModalDescription()}</DialogDescription>}
        </DialogHeader>

        {type === "addProject" && (
          <div className="flex justify-between mb-6">
            {[1, 2, 3].map((s) => (<div key={s} className={`flex-1 h-1 rounded-full mx-1 transition-all ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />))}
          </div>
        )}

        <div className={type === "developmentDetail" ? "h-full" : ""}>
          {renderContent()}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div>{type === "addProject" && step > 1 && (<Button variant="outline" onClick={handleModalPrevious}><ChevronLeft className="mr-2 h-4 w-4" /> Previous</Button>)}</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleModalConfirm}>{getConfirmText()}{type === "addProject" && step < 3 && <ChevronRight className="ml-2 h-4 w-4" />}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}