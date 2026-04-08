import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}



export function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogDescription>
            You will be redirected to the login page. Any unsaved changes will be lost.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}