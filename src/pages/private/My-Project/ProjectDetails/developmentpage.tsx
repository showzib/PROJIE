// app/development/page.tsx
"use client";

import { DevelopmentFilterDialog } from "@/components/ui/DevelopmentFilterDialog";
import { useFilters } from "@/components/ui/hooks/useFilters";
import { MainCarousel } from "@/components/ui/MainCarousel";
import { useDevelopmentData } from "@/hooks/useDevelopmentData";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DevelopmentHeader } from "@/components/ui/evelopmentHeader";

interface DevelopmentPageProps {
  onBack?: () => void;
}

export default function DevelopmentPage({ onBack }: DevelopmentPageProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
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

  const handleApplyFilters = () => {
    console.log("Filters applied");
    setFilterOpen(false);
  };

  const handleReadAllNotifications = () => {
    console.log("Read all notifications");
    // Notification logic here
  };

  const handleStarClick = () => {
    console.log("Star clicked");
    // Favorite logic here
  };

  const handleMembersClick = () => {
    console.log("Members clicked");
    // Members list logic here
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Back Button - Only show if onBack prop is provided */}
      {onBack && (
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Backlog
            </Button>
          </div>
        </div>
      )}

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
      </div>
    </div>
  );
}