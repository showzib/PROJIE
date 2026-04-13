// app/development/page.tsx
"use client";

import { useNavigate, useParams } from "react-router-dom";
import { DevelopmentFilterDialog } from "@/components/ui/DevelopmentFilterDialog";
import { useFilters } from "@/hooks/useFilters";
import { MainCarousel } from "@/components/ui/MainCarousel";
import { useDevelopmentData } from "@/hooks/useDevelopmentData";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DevelopmentHeader } from "@/components/ui/evelopmentHeader";
import { MembersModal } from "@/components/ui/MembersModal";
import type { Member } from "@/components/ui/MembersModal";

interface DevelopmentPageProps {
  onBack?: () => void;
}

export default function DevelopmentPage({ onBack }: DevelopmentPageProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  
  const {
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedTeam,
    setSelectedTeam,
    selectedIssueType,
    setSelectedIssueType,
    clearFilters,
  } = useFilters();

  const { categories, updateTaskStatus } = useDevelopmentData();

  const handleBackToBacklog = () => {
    if (onBack) {
      onBack(); 
    } else {
      navigate(`/project/${projectId}?tab=backlog`);
    }
  };

  const handleApplyFilters = () => {
    console.log("Filters applied");
    setFilterOpen(false);
  };

  const handleReadAllNotifications = () => {
    console.log("Read all notifications");
  };

  const handleStarClick = () => {
    console.log("Star clicked");
  };

  const handleMembersClick = () => {
    setMemberModalOpen(true);
  };

  const handleMemberClick = (member: Member) => {
    console.log("Member clicked:", member);
    // You can add custom logic here
  };

  // Update active filter count
  useEffect(() => {
    const count = [
      selectedStatus !== "all",
      selectedPriority !== "all",
      selectedTeam !== "all",
      selectedIssueType !== "all",
    ].filter(Boolean).length;
    setActiveFilterCount(count);
  }, [selectedStatus, selectedPriority, selectedTeam, selectedIssueType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-background dark:to-slate-900">
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToBacklog}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Backlog
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <DevelopmentHeader
          onMembersClick={handleMembersClick}
          onStarClick={handleStarClick}
          onReadAllNotifications={handleReadAllNotifications}
          onFilterClick={() => setFilterOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Main Carousel with Categories */}
        <MainCarousel
          categories={categories}
          onTaskStatusChange={updateTaskStatus}
        />

        {/* Filter Dialog */}
        <DevelopmentFilterDialog
          open={filterOpen}
          onOpenChange={setFilterOpen}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedIssueType={selectedIssueType}
          setSelectedIssueType={setSelectedIssueType}
          onApplyFilters={handleApplyFilters}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFilterCount}
        />

        {/* Members Modal - members prop hata diya */}
        <MembersModal
          open={memberModalOpen}
          onOpenChange={setMemberModalOpen}
          onMemberClick={handleMemberClick}
        />
      </div>
    </div>
  );
}