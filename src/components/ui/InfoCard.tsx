import * as React from "react";
import { 
  Mail, 
  Phone, 
  UserCircle, 
  Globe, 
  ArrowRight 
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface TenantCardProps {
  id: string;
  name: string;
  pmo: string;
  email: string;
  phone: string;
  contactPerson: string;
  website: string;
  createdOn: string;
  onAction?: () => void;
}

const InfoRow = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 text-[13px] text-slate-600 min-w-0">
    <Icon className="size-4 shrink-0 text-slate-500" />
    <span className="truncate">{text}</span>
  </div>
);

const TenantCard = ({ 
  id, name, pmo, email, phone, contactPerson, website, createdOn, onAction 
}: TenantCardProps) => {
  return (
    <Card 
      className="border-[#1e2a5a]/20 w-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:border-[#1e2a5a]/40 bg-white cursor-pointer"
      onClick={onAction} // Whole card clickable
    >
      <CardHeader className="p-5 sm:p-6 pb-2">
        <CardTitle className="text-xl sm:text-2xl font-bold text-secondary-500 truncate">
          {name}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-small-500 font-medium truncate">
          {pmo}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 sm:px-6 py-4 text-small-500">
        <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4">
          <InfoRow icon={Mail} text={email} />
          <InfoRow icon={Phone} text={phone} />
          <InfoRow icon={UserCircle} text={contactPerson} />
          <InfoRow icon={Globe} text={website} />
        </div>
        <div className="mt-6 h-px w-full bg-slate-300" />
      </CardContent>

      <CardFooter className="flex items-center justify-between border-none bg-transparent px-5 sm:px-6 pb-6 pt-0">
        <div className="flex flex-col">
          <span className="text-[11px] sm:text-[13px] font-medium text-secondary-500 uppercase tracking-wider">
            Created on
          </span>
          <span className="text-[14px] sm:text-[15px] font-bold text-small-500">
            {createdOn}
          </span>
        </div>
        
        <button 
          onClick={onAction} // Arrow button triggers the same action
          aria-label="View Details"
          className="flex size-9 sm:size-10 items-center justify-center rounded-full text-secondary-500 transition-all hover:bg-hoverbtn-500 hover:text-white"
        >
          <ArrowRight className="size-5 sm:size-6 cursor-pointer" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default TenantCard;